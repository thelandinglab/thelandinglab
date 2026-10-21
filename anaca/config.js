/* ============================================================
   CONFIGURAÇÃO DO CARDÁPIO — único arquivo que muda por cliente
   Anacá · Doces saudáveis
   ============================================================ */

window.CARDAPIO_CONFIG = {
  // Link do Apps Script publicado (deixe vazio para o MODO DE TESTE,
  // em que tudo fica salvo só neste navegador).
  API_URL: "https://script.google.com/macros/s/AKfycbyT9unLda8GMMPJ5BXz9VbMcTA0LnQa09P2qDxaG0Ux8JtdFZmLjGdEU7gBRlYmADpU/exec",

  // Cloudinary (fotos novas que o dono enviar pelo painel).
  // Vazio = fotos ficam salvas só no navegador, apenas para teste.
  CLOUDINARY_CLOUD: "argmsyvj",
  CLOUDINARY_PRESET: "cardapioyukey",

  // Senha do painel no modo de teste. Em produção, a senha fica no Apps Script.
  SENHA_TESTE: "1234",

  // Identificador interno (muda por cliente, sem espaços)
  LOJA_ID: "anaca"
};

/* Dados iniciais (vindos do cardápio em PDF). Usados no modo de teste e para
   preencher a planilha no primeiro "Salvar" do painel.
   Campos vazios = não configurado. Fotos "@id" ficam no arquivo fotos.js. */
window.CARDAPIO_INICIAL = {
 "loja": {
  "nome": "Anacá",
  "slogan": "",
  "whatsapp": "19996471565",
  "instagram": "anaca.confeitaria",
  "email": "anacadoces@gmail.com",
  "ifood": "",
  "endereco": "",
  "notaGoogle": null,
  "avaliacoesGoogle": null,
  "horarios": [
   {
    "status": "",
    "abre": "",
    "fecha": ""
   },
   {
    "status": "",
    "abre": "",
    "fecha": ""
   },
   {
    "status": "",
    "abre": "",
    "fecha": ""
   },
   {
    "status": "",
    "abre": "",
    "fecha": ""
   },
   {
    "status": "",
    "abre": "",
    "fecha": ""
   },
   {
    "status": "",
    "abre": "",
    "fecha": ""
   },
   {
    "status": "",
    "abre": "",
    "fecha": ""
   }
  ],
  "aviso": "",
  "fechadoAgora": false,
  "modalidades": {
   "entrega": true,
   "retirada": true,
   "mesa": false
  },
  "entrega": {
   "tipo": "",
   "taxaFixa": null,
   "bairros": []
  },
  "pedidoMinimo": null,
  "tempoMedio": "",
  "pagamentos": {
   "pix": true,
   "credito": true,
   "debito": true,
   "dinheiro": true,
   "vale": false
  },
  "chavePix": "",
  "capa": "",
  "logo": ""
 },
 "categorias": [
  {
   "id": "bombons",
   "nome": "Bombons",
   "oculta": false,
   "ordem": 0
  },
  {
   "id": "brigadeiros",
   "nome": "Brigadeiros",
   "oculta": false,
   "ordem": 1
  },
  {
   "id": "brownie-cookie",
   "nome": "Brownie e cookie",
   "oculta": false,
   "ordem": 2
  },
  {
   "id": "copinhos",
   "nome": "Copinhos",
   "oculta": false,
   "ordem": 3
  },
  {
   "id": "presentear",
   "nome": "Para presentear",
   "oculta": false,
   "ordem": 4
  }
 ],
 "itens": [
  {
   "id": "bombom-prestigio",
   "catId": "bombons",
   "nome": "Bombom de Prestígio",
   "descricao": "Bombom recheado com nosso maravilhoso e super cremoso brigadeiro de prestígio (45g)",
   "preco": 12,
   "foto": "@bombom-prestigio",
   "esgotado": false,
   "destaque": false,
   "etiqueta": "",
   "tags": [
    "semacucar",
    "semgluten",
    "semlactose",
    "sempoliois"
   ],
   "adicionais": [],
   "ordem": 0
  },
  {
   "id": "bombom-brownie",
   "catId": "bombons",
   "nome": "Bombom de Brownie",
   "descricao": "Bombom recheado com nosso brigadeiro super cremoso e brownie de chocolate (45g)",
   "preco": 12,
   "foto": "@bombom-brownie",
   "esgotado": false,
   "destaque": false,
   "etiqueta": "",
   "tags": [
    "semacucar",
    "semgluten",
    "semlactose",
    "sempoliois"
   ],
   "adicionais": [],
   "ordem": 1
  },
  {
   "id": "bombom-pao-de-mel",
   "catId": "bombons",
   "nome": "Bombom de Pão de Mel",
   "descricao": "Bombom recheado com doce de leite sem açúcar e nosso delicioso pão de mel, adoçado com açúcar de coco (50g)",
   "preco": 12,
   "foto": "@bombom-pao-de-mel",
   "esgotado": false,
   "destaque": false,
   "etiqueta": "",
   "tags": [
    "acucarcoco",
    "sempoliois"
   ],
   "adicionais": [],
   "ordem": 2
  },
  {
   "id": "bombom-frutas-vermelhas",
   "catId": "bombons",
   "nome": "Bombom de Frutas Vermelhas",
   "descricao": "Bombom recheado com ganache de chocolate branco e geleia de frutas vermelhas (45g)",
   "preco": 14,
   "foto": "@bombom-frutas-vermelhas",
   "esgotado": false,
   "destaque": false,
   "etiqueta": "",
   "tags": [
    "semacucar",
    "semgluten",
    "semlactose",
    "sempoliois",
    "vegano"
   ],
   "adicionais": [],
   "ordem": 3
  },
  {
   "id": "bombom-morango",
   "catId": "bombons",
   "nome": "Bombom de Morango",
   "descricao": "Bombom recheado com nosso delicioso brigadeiro branco, morango e coberto com chocolate (40-45g)",
   "preco": 15,
   "foto": "@bombom-morango",
   "esgotado": false,
   "destaque": true,
   "etiqueta": "Best Seller",
   "tags": [
    "semacucar",
    "semgluten",
    "semlactose",
    "sempoliois"
   ],
   "adicionais": [],
   "ordem": 4
  },
  {
   "id": "bombom-uva",
   "catId": "bombons",
   "nome": "Bombom de Uva",
   "descricao": "Bombom recheado com nosso delicioso brigadeiro branco, uva e coberto com chocolate branco (30-40g)",
   "preco": 13,
   "foto": "@bombom-uva",
   "esgotado": false,
   "destaque": false,
   "etiqueta": "",
   "tags": [
    "semacucar",
    "semgluten",
    "semlactose",
    "sempoliois"
   ],
   "adicionais": [],
   "ordem": 5
  },
  {
   "id": "brig-tradicional",
   "catId": "brigadeiros",
   "nome": "Brigadeiro Tradicional",
   "descricao": "Caixa com 6 unidades",
   "preco": 28,
   "foto": "@brig-tradicional",
   "esgotado": false,
   "destaque": false,
   "etiqueta": "",
   "tags": [
    "semacucar",
    "semgluten",
    "semlactose",
    "sempoliois"
   ],
   "adicionais": [],
   "ordem": 6
  },
  {
   "id": "brig-trufado",
   "catId": "brigadeiros",
   "nome": "Brigadeiro Trufado",
   "descricao": "Caixa com 6 unidades",
   "preco": 28,
   "foto": "@brig-trufado",
   "esgotado": false,
   "destaque": false,
   "etiqueta": "",
   "tags": [
    "semacucar",
    "semgluten",
    "semlactose",
    "sempoliois"
   ],
   "adicionais": [],
   "ordem": 7
  },
  {
   "id": "brig-nozes",
   "catId": "brigadeiros",
   "nome": "Brigadeiro de Nozes",
   "descricao": "Caixa com 6 unidades",
   "preco": 28,
   "foto": "@brig-nozes",
   "esgotado": false,
   "destaque": false,
   "etiqueta": "",
   "tags": [
    "semacucar",
    "semgluten",
    "semlactose",
    "sempoliois"
   ],
   "adicionais": [],
   "ordem": 8
  },
  {
   "id": "brig-brulee",
   "catId": "brigadeiros",
   "nome": "Brigadeiro Brulee com lascas de Amêndoas",
   "descricao": "Caixa com 6 unidades",
   "preco": 28,
   "foto": "@brig-brulee",
   "esgotado": false,
   "destaque": false,
   "etiqueta": "",
   "tags": [
    "semacucar",
    "semgluten",
    "semlactose",
    "sempoliois"
   ],
   "adicionais": [],
   "ordem": 9
  },
  {
   "id": "beijinho",
   "catId": "brigadeiros",
   "nome": "Beijinho",
   "descricao": "Caixa com 6 unidades",
   "preco": 28,
   "foto": "@beijinho",
   "esgotado": false,
   "destaque": false,
   "etiqueta": "",
   "tags": [
    "semacucar",
    "semgluten",
    "semlactose",
    "sempoliois"
   ],
   "adicionais": [],
   "ordem": 10
  },
  {
   "id": "brig-pistache",
   "catId": "brigadeiros",
   "nome": "Brigadeiro de Pistache",
   "descricao": "Caixa com 6 unidades",
   "preco": 28,
   "foto": "@brig-pistache",
   "esgotado": false,
   "destaque": false,
   "etiqueta": "",
   "tags": [
    "semacucar",
    "semgluten",
    "semlactose",
    "sempoliois"
   ],
   "adicionais": [],
   "ordem": 11
  },
  {
   "id": "caixa-6",
   "catId": "brigadeiros",
   "nome": "Caixa com 6 Brigadeiros Sortidos",
   "descricao": "Sabores: Brulee, Tradicional, Trufado, Beijinho, Nozes e Pistache",
   "preco": 28,
   "foto": "@caixa-6",
   "esgotado": false,
   "destaque": true,
   "etiqueta": "Best Seller",
   "tags": [
    "semacucar",
    "semgluten",
    "semlactose",
    "sempoliois"
   ],
   "adicionais": [],
   "ordem": 12
  },
  {
   "id": "caixa-12",
   "catId": "brigadeiros",
   "nome": "Caixa com 12 Brigadeiros Sortidos",
   "descricao": "Sabores: 2 Brulees, 2 Tradicionais, 2 Trufados, 2 Beijinhos, 2 Nozes e 2 Pistaches",
   "preco": 56,
   "foto": "@caixa-12",
   "esgotado": false,
   "destaque": false,
   "etiqueta": "",
   "tags": [
    "semacucar",
    "semgluten",
    "semlactose",
    "sempoliois"
   ],
   "adicionais": [],
   "ordem": 13
  },
  {
   "id": "brownie",
   "catId": "brownie-cookie",
   "nome": "Brownie de Chocolate",
   "descricao": "Brownie super macio, molhadinho e mega cremoso (60g)",
   "preco": 15,
   "foto": "@brownie",
   "esgotado": false,
   "destaque": false,
   "etiqueta": "",
   "tags": [
    "semacucar",
    "semgluten",
    "semlactose",
    "sempoliois"
   ],
   "adicionais": [],
   "ordem": 14
  },
  {
   "id": "cookie",
   "catId": "brownie-cookie",
   "nome": "Double Chocolate Cookie",
   "descricao": "Cookie com pedaços de chocolate branco e preto. Super crocante, leve e delicioso (40g)",
   "preco": 15,
   "foto": "@cookie",
   "esgotado": false,
   "destaque": false,
   "etiqueta": "",
   "tags": [
    "semacucar",
    "semgluten",
    "semlactose",
    "sempoliois",
    "vegano"
   ],
   "adicionais": [],
   "ordem": 15
  },
  {
   "id": "copinho-morango",
   "catId": "copinhos",
   "nome": "Bombom de Morango",
   "descricao": "Nosso bombom de morango em uma versão ainda melhor - de colher! Camadas de brigadeiro branco, morango e finalizado com ganache de chocolate (100g)",
   "preco": 18,
   "foto": "@copinho-morango",
   "esgotado": false,
   "destaque": false,
   "etiqueta": "",
   "tags": [
    "semacucar",
    "semgluten",
    "semlactose",
    "sempoliois"
   ],
   "adicionais": [],
   "ordem": 16
  },
  {
   "id": "copinho-uva",
   "catId": "copinhos",
   "nome": "Bombom de Uva",
   "descricao": "Em sua versão - colher. Camadas de brigadeiro branco, uva verde, finalizado com ganache de chocolate branco (100g)",
   "preco": 18,
   "foto": "@copinho-uva",
   "esgotado": false,
   "destaque": false,
   "etiqueta": "",
   "tags": [
    "semacucar",
    "semgluten",
    "semlactose",
    "sempoliois"
   ],
   "adicionais": [],
   "ordem": 17
  },
  {
   "id": "bolo-cenoura",
   "catId": "copinhos",
   "nome": "Bolo de Cenoura com Brigadeiro",
   "descricao": "Delicioso bolo de cenoura, super leve e fofinho intercalado com camadas do nosso brigadeiro cremoso (100g)",
   "preco": 18,
   "foto": "@bolo-cenoura",
   "esgotado": false,
   "destaque": false,
   "etiqueta": "",
   "tags": [
    "semacucar",
    "semgluten",
    "semlactose",
    "sempoliois"
   ],
   "adicionais": [],
   "ordem": 18
  },
  {
   "id": "mousse",
   "catId": "copinhos",
   "nome": "Mousse de Chocolate",
   "descricao": "Nosso delicioso mousse de chocolate. Igualzinho ao tradicional, mas na sua versão saudável. Leve, aerado e derrete na boca (100g)",
   "preco": 18,
   "foto": "@mousse",
   "esgotado": false,
   "destaque": false,
   "etiqueta": "",
   "tags": [
    "semacucar",
    "semgluten",
    "semlactose",
    "sempoliois"
   ],
   "adicionais": [],
   "ordem": 19
  },
  {
   "id": "sacola",
   "catId": "presentear",
   "nome": "Sacola Luxo",
   "descricao": "Adicione nossa maravilhosa sacola luxo para presentear quem você ama",
   "preco": 7,
   "foto": "@sacola",
   "esgotado": false,
   "destaque": false,
   "etiqueta": "",
   "tags": [],
   "adicionais": [],
   "ordem": 20
  },
  {
   "id": "champagne",
   "catId": "presentear",
   "nome": "Champagne",
   "descricao": "Adicione nossa Champagne personalizada no seu presente. Espumante brut rosé elaborado pelo Método Charmat de fermentação natural, com a temperamental uva tinta Pinot Noir. Não contém glúten. Garrafa (187,5 ml)",
   "preco": 40,
   "foto": "@champagne",
   "esgotado": false,
   "destaque": false,
   "etiqueta": "",
   "tags": [],
   "adicionais": [],
   "ordem": 21
  }
 ]
};
