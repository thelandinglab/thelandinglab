/* Núcleo compartilhado: dados, horários, fotos e utilidades.
   Usado pelas três páginas (cardápio, peça aqui e painel). */
(function () {
  const CFG = window.CARDAPIO_CONFIG || {};
  const INICIAL = window.CARDAPIO_INICIAL || { loja: {}, categorias: [], itens: [] };
  const ASSETS = window.CARDAPIO_ASSETS || {};
  const TESTE = !CFG.API_URL;
  const KEY = "cardapio:" + (CFG.LOJA_ID || "demo");
  const CACHE = KEY + ":cache";

  const ls = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); return true; } catch (e) { return e; } }
  };

  const clone = (o) => JSON.parse(JSON.stringify(o));

  function normalizar(d) {
    const base = clone(INICIAL);
    d = d || {};
    const loja = Object.assign({}, base.loja, d.loja || {});
    loja.modalidades = Object.assign({}, base.loja.modalidades, (d.loja || {}).modalidades || {});
    loja.pagamentos = Object.assign({}, base.loja.pagamentos, (d.loja || {}).pagamentos || {});
    loja.entrega = Object.assign({}, base.loja.entrega, (d.loja || {}).entrega || {});
    if (!Array.isArray(loja.entrega.bairros)) loja.entrega.bairros = [];
    if (!Array.isArray(loja.horarios) || loja.horarios.length !== 7) loja.horarios = base.loja.horarios;
    const categorias = (d.categorias || []).slice().sort((a, b) => (a.ordem || 0) - (b.ordem || 0));
    const itens = (d.itens || []).map((i) => Object.assign({ adicionais: [] }, i, {
      preco: i.preco === "" || i.preco == null ? null : Number(i.preco),
      esgotado: !!i.esgotado, destaque: !!i.destaque,
      adicionais: Array.isArray(i.adicionais) ? i.adicionais : []
    })).sort((a, b) => (a.ordem || 0) - (b.ordem || 0));
    return { loja, categorias, itens };
  }

  async function carregar() {
    if (TESTE) {
      const raw = ls.get(KEY);
      try { return normalizar(raw ? JSON.parse(raw) : INICIAL); } catch (e) { return normalizar(INICIAL); }
    }
    try {
      const r = await fetch(CFG.API_URL + (CFG.API_URL.includes("?") ? "&" : "?") + "t=" + Date.now());
      const j = await r.json();
      const dados = j && j.vazio ? INICIAL : j;
      ls.set(CACHE, JSON.stringify(dados));
      return normalizar(dados);
    } catch (e) {
      const raw = ls.get(CACHE);
      const d = normalizar(raw ? JSON.parse(raw) : INICIAL);
      d._offline = true;
      return d;
    }
  }

  // Lê do cache local primeiro (abre mais rápido), depois atualiza.
  function carregarRapido(cb) {
    if (!TESTE) {
      const raw = ls.get(CACHE);
      if (raw) { try { cb(normalizar(JSON.parse(raw)), true); } catch (e) {} }
    }
    return carregar().then((d) => { cb(d, false); return d; });
  }

  async function post(corpo) {
    const r = await fetch(CFG.API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(corpo)
    });
    return r.json();
  }

  async function entrar(senha) {
    if (TESTE) return senha === String(CFG.SENHA_TESTE || "1234");
    const j = await post({ acao: "entrar", senha });
    return !!(j && j.ok);
  }

  async function salvar(dados, senha) {
    const limpo = clone(dados);
    delete limpo._offline;
    limpo.categorias.forEach((c, i) => (c.ordem = i));
    limpo.itens.forEach((it, i) => (it.ordem = i));
    if (TESTE) {
      const r = ls.set(KEY, JSON.stringify(limpo));
      if (r !== true) throw new Error("O navegador está sem espaço para fotos de teste. Use fotos menores ou configure o Cloudinary.");
      return true;
    }
    const j = await post({ acao: "salvar", senha, dados: limpo });
    if (!j || !j.ok) throw new Error((j && j.erro) || "Não foi possível salvar. Confira a internet e tente de novo.");
    ls.set(CACHE, JSON.stringify(limpo));
    return true;
  }

  // Reduz a foto no próprio celular antes de enviar.
  function comprimir(file, larg, qual) {
    return new Promise((res, rej) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        const s = Math.min(1, larg / img.width);
        const c = document.createElement("canvas");
        c.width = Math.round(img.width * s);
        c.height = Math.round(img.height * s);
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url);
        c.toBlob((b) => (b ? res(b) : rej(new Error("Não foi possível ler a foto."))), "image/jpeg", qual);
      };
      img.onerror = () => rej(new Error("Esse arquivo não é uma foto válida."));
      img.src = url;
    });
  }

  async function enviarFoto(file) {
    if (CFG.CLOUDINARY_CLOUD && CFG.CLOUDINARY_PRESET) {
      const blob = await comprimir(file, 900, 0.78);
      const fd = new FormData();
      fd.append("file", blob);
      fd.append("upload_preset", CFG.CLOUDINARY_PRESET);
      fd.append("folder", CFG.LOJA_ID || "cardapio");
      const r = await fetch("https://api.cloudinary.com/v1_1/" + CFG.CLOUDINARY_CLOUD + "/image/upload", { method: "POST", body: fd });
      const j = await r.json();
      if (!j.secure_url) throw new Error("O envio da foto falhou. Tente de novo.");
      return j.secure_url.replace("/upload/", "/upload/f_auto,q_auto,w_700/");
    }
    const blob = await comprimir(file, 520, 0.7);
    return new Promise((res) => { const fr = new FileReader(); fr.onload = () => res(fr.result); fr.readAsDataURL(blob); });
  }

  /* ---------- horários ---------- */
  const DIAS = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
  const min = (h) => { const [a, b] = String(h || "0:0").split(":").map(Number); return a * 60 + (b || 0); };
  const hora = (h) => (h || "").replace(/^0/, "").replace(":00", "h").replace(":", "h");

  function status(loja, agora) {
    agora = agora || new Date();
    if (loja.fechadoAgora) return { aberto: false, texto: "Fechado agora" };
    const d = agora.getDay();
    const m = agora.getHours() * 60 + agora.getMinutes();
    const H = loja.horarios || [];
    const ontem = H[(d + 6) % 7];
    if (ontem && ontem.status === "aberto" && min(ontem.fecha) < min(ontem.abre) && m < min(ontem.fecha))
      return { aberto: true, texto: "Aberto até " + hora(ontem.fecha) };
    const h = H[d];
    if (!h || !h.status) return null;
    if (h.status === "aberto") {
      const a = min(h.abre), f = min(h.fecha);
      const vira = f < a;
      if (m >= a && (vira || m < f)) return { aberto: true, texto: "Aberto até " + hora(h.fecha) };
      if (m < a) return { aberto: false, texto: "Abre hoje às " + hora(h.abre) };
    }
    for (let i = 1; i <= 7; i++) {
      const p = H[(d + i) % 7];
      if (p && p.status === "aberto")
        return { aberto: false, texto: "Abre " + (i === 1 ? "amanhã" : DIAS[(d + i) % 7].toLowerCase()) + " às " + hora(p.abre) };
    }
    return { aberto: false, texto: "Fechado" };
  }

  function textoHorario(h) {
    if (!h || !h.status) return null;
    if (h.status === "fechado") return "Fechado";
    return hora(h.abre) + " às " + hora(h.fecha);
  }

  /* ---------- utilidades ---------- */
  const brl = (n) => (n == null || isNaN(n) ? "" : Number(n).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }));
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const uid = () => Math.random().toString(36).slice(2, 9);
  const digitos = (s) => String(s || "").replace(/\D/g, "");
  const telefone = (s) => { const d = digitos(s); return d.length === 11 ? "(" + d.slice(0, 2) + ") " + d.slice(2, 7) + "-" + d.slice(7) : d.length === 10 ? "(" + d.slice(0, 2) + ") " + d.slice(2, 6) + "-" + d.slice(6) : s; };
  const linkWhats = (num, msg) => "https://wa.me/55" + digitos(num) + (msg ? "?text=" + encodeURIComponent(msg) : "");
  const linkMapa = (end) => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(end || "");
  const logo = (loja) => loja.logo || ASSETS.logo || "";
  const capa = (loja) => loja.capa || ASSETS.capa || "";
  const emFrame = (() => { try { return window.top !== window.self; } catch (e) { return true; } })();

  // Abre link externo (WhatsApp) de forma compatível com celular
  function abrirExterno(url, ancora) {
    if (emFrame && ancora) { ancora.href = url; ancora.target = "_blank"; ancora.rel = "noopener"; return false; }
    window.location.href = url;
    return true;
  }

  function aoMudar(cb) {
    window.addEventListener("storage", (e) => { if (e.key === KEY || e.key === CACHE) carregar().then(cb); });
  }

  function toast(msg, tipo) {
    let t = document.getElementById("toast");
    if (!t) { t = document.createElement("div"); t.id = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
    t.textContent = msg;
    t.className = "toast mostra " + (tipo || "");
    clearTimeout(t._h);
    t._h = setTimeout(() => (t.className = "toast " + (tipo || "")), 2800);
  }

  // Bottom sheet genérico
  function sheet(html, opts) {
    opts = opts || {};
    const wrap = document.createElement("div");
    wrap.className = "sheet-wrap";
    wrap.innerHTML = '<div class="sheet-fundo"></div><div class="sheet" role="dialog" aria-modal="true"><button class="sheet-fechar" aria-label="Fechar">' +
      '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg></button><div class="sheet-corpo">' + html + "</div></div>";
    document.body.appendChild(wrap);
    document.body.classList.add("travado");
    requestAnimationFrame(() => wrap.classList.add("aberto"));
    const fechar = () => {
      wrap.classList.remove("aberto");
      document.body.classList.remove("travado");
      setTimeout(() => wrap.remove(), 260);
      opts.aoFechar && opts.aoFechar();
      document.removeEventListener("keydown", esc_);
    };
    const esc_ = (e) => { if (e.key === "Escape") fechar(); };
    document.addEventListener("keydown", esc_);
    wrap.querySelector(".sheet-fundo").onclick = fechar;
    wrap.querySelector(".sheet-fechar").onclick = fechar;
    const foco = wrap.querySelector(".sheet-corpo input, .sheet-corpo button, .sheet-corpo select");
    setTimeout(() => (foco && !opts.semFoco ? foco.focus({ preventScroll: true }) : wrap.querySelector(".sheet").focus()), 50);
    wrap.querySelector(".sheet").tabIndex = -1;
    return { el: wrap.querySelector(".sheet-corpo"), fechar };
  }

  // Confirmação dentro da página (o navegador de alguns apps bloqueia confirm())
  function confirmar(titulo, texto, botao) {
    return new Promise((res) => {
      let ok = false;
      const s = sheet('<h3 class="sheet-titulo">' + esc(titulo) + '</h3><p class="sheet-texto">' + esc(texto) +
        '</p><div class="linha-botoes"><button class="btn btn-claro" data-n>Cancelar</button><button class="btn btn-perigo" data-s>' + esc(botao || "Excluir") + "</button></div>",
        { aoFechar: () => res(ok), semFoco: true });
      s.el.querySelector("[data-n]").onclick = () => s.fechar();
      s.el.querySelector("[data-s]").onclick = () => { ok = true; s.fechar(); };
    });
  }

  window.Cardapio = {
    CFG, TESTE, DIAS, carregar, carregarRapido, salvar, entrar, enviarFoto, status, textoHorario, hora,
    brl, esc, uid, digitos, telefone, linkWhats, linkMapa, logo, capa, abrirExterno, aoMudar, toast, sheet, confirmar, clone, ls
  };
})();
