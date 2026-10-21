/* ============================================================
   CONFIGURAÇÃO DO CARDÁPIO — único arquivo que muda por cliente
   ============================================================ */

window.CARDAPIO_CONFIG = {
  // Link do Apps Script publicado (deixe vazio para o MODO DE TESTE,
  // em que tudo fica salvo só neste navegador).
  API_URL: "https://script.google.com/macros/s/AKfycbyLLbq-qNJsgRKUlGQ83OPbVcFqYeeT-XeBaHDgFpM2TzcY45fVhpw-F9PyG9GQcWyL/exec",

  // Cloudinary (fotos dos pratos). Vazio = fotos ficam salvas só no
  // navegador, apenas para teste.
  CLOUDINARY_CLOUD: "argmsyvj",
  CLOUDINARY_PRESET: "cardapioyukey",

  // Senha do painel no modo de teste. Em produção, a senha fica no Apps Script.
  SENHA_TESTE: "1234",

  // Identificador interno (muda por cliente, sem espaços)
  LOJA_ID: "yukery"
};

/* Dados iniciais da loja. Usados no modo de teste e para preencher a
   planilha no primeiro "Salvar" do painel. Campos vazios = não configurado. */
window.CARDAPIO_INICIAL = {
  loja: {
    nome: "Yukery",
    slogan: "Sabor que conquista",
    whatsapp: "11974014719",
    instagram: "lanchoneteyukery",
    endereco: "Av. Liberdade, 359 - Centro, Franco da Rocha - SP, 07850-325",
    notaGoogle: 4.9,
    avaliacoesGoogle: 59,
    // 0 = domingo ... 6 = sábado. status: "aberto" | "fechado" | "" (não configurado)
    horarios: [
      { status: "", abre: "", fecha: "" },
      { status: "aberto", abre: "09:00", fecha: "22:30" },
      { status: "aberto", abre: "09:00", fecha: "22:30" },
      { status: "aberto", abre: "09:00", fecha: "22:30" },
      { status: "aberto", abre: "09:00", fecha: "22:30" },
      { status: "aberto", abre: "09:00", fecha: "23:00" },
      { status: "aberto", abre: "16:00", fecha: "23:00" }
    ],
    aviso: "",
    fechadoAgora: false,
    modalidades: { entrega: true, retirada: true, mesa: true },
    // tipo: "" (não configurado = combinar no WhatsApp) | "fixa" | "bairros"
    entrega: { tipo: "", taxaFixa: null, bairros: [] },
    pedidoMinimo: null,
    tempoMedio: "",
    pagamentos: { pix: true, credito: true, debito: true, dinheiro: true, vale: true },
    chavePix: "",
    capa: "",
    logo: ""
  },
  categorias: [],
  itens: []
};
