const API_BASE = "https://genshin.jmp.blue";
const STORAGE_KEY = "calc-teyvat-state-v2";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const CHARACTER_EXP = [
  0, 0, 1000, 2325, 4025, 6175, 8800, 11950, 15675, 20025, 25025,
  30725, 37175, 44400, 52450, 61375, 71200, 81950, 93675, 106400,
  120175, 135050, 151850, 169850, 189100, 209650, 231525, 254775,
  279425, 305525, 333100, 362200, 392850, 425100, 458975, 494525,
  531775, 570750, 611500, 654075, 698500, 744800, 795425, 848125,
  902900, 959800, 1018875, 1080150, 1143675, 1209475, 1277600,
  1348075, 1424575, 1503625, 1585275, 1669550, 1756500, 1846150,
  1938550, 2033725, 2131725, 2232600, 2341550, 2453600, 2568775,
  2687100, 2808625, 2933400, 3061475, 3192875, 3327650, 3465825,
  3614525, 3766900, 3922975, 4082800, 4246400, 4413825, 4585125,
  4760350, 4939525, 5122700, 5338925, 5581950, 5855050, 6161850,
  6506450, 6893400, 7327825, 7815450, 8362650,
];

const WEAPON_EXP = {
  5: [
    0, 0, 600, 1550, 2900, 4700, 7025, 9950, 13475, 17675, 22625,
    28325, 34850, 42250, 50550, 59775, 69975, 81225, 93525, 106950,
    121550, 137300, 155150, 174325, 194875, 216850, 240300, 265250,
    291725, 319775, 349450, 380800, 413850, 448650, 485225, 523625,
    563875, 606025, 650125, 696225, 744350, 794500, 849375, 906500,
    965900, 1027625, 1091725, 1158225, 1227150, 1298550, 1372500,
    1449000, 1532075, 1617925, 1706575, 1798125, 1892550, 1989950,
    2090300, 2193700, 2300175, 2409750, 2528100, 2649800, 2774900,
    2903450, 3035500, 3171075, 3310200, 3452925, 3599300, 3749375,
    3910900, 4076400, 4245900, 4419450, 4597100, 4778900, 4964900,
    5155150, 5349675, 5548550, 5783275, 6047100, 6343500, 6676475,
    7050425, 7470350, 7941725, 8470775, 9064450,
  ],
  4: [
    0, 0, 400, 1025, 1925, 3125, 4675, 6625, 8975, 11775, 15075,
    18875, 23225, 28150, 33675, 39825, 46625, 54125, 62325, 71275,
    81000, 91500, 103400, 116175, 129875, 144525, 160150, 176775,
    194425, 213125, 232900, 253800, 275825, 299025, 323400, 349000,
    375825, 403925, 433325, 464050, 496125, 529550, 566125, 604200,
    643800, 684950, 727675, 772000, 817950, 865550, 914850, 965850,
    1021225, 1078450, 1137550, 1198575, 1261525, 1326450, 1393350,
    1462275, 1533250, 1606300, 1685200, 1766325, 1849725, 1935425,
    2023450, 2113825, 2206575, 2301725, 2399300, 2499350, 2607025,
    2717350, 2830350, 2946050, 3064475, 3185675, 3309675, 3436500,
    3566175, 3698750, 3855225, 4031100, 4228700, 4450675, 4699975,
    4979925, 5294175, 5646875, 6042650,
  ],
  3: [
    0, 0, 275, 700, 1300, 2100, 3125, 4400, 5950, 7800, 9975, 12475,
    15350, 18600, 22250, 26300, 30800, 35750, 41150, 47050, 53475,
    60400, 68250, 76675, 85725, 95400, 105725, 116700, 128350, 140700,
    153750, 167550, 182075, 197375, 213475, 230375, 248075, 266625,
    286025, 306300, 327475, 349525, 373675, 398800, 424925, 452075,
    480275, 509525, 539850, 571275, 603825, 637475, 674025, 711800,
    750800, 791075, 832625, 875475, 919625, 965125, 1011975, 1060200,
    1112275, 1165825, 1220875, 1277425, 1335525, 1395175, 1456400,
    1519200, 1583600, 1649625, 1720700, 1793525, 1868100, 1944450,
    2022600, 2102600, 2184450, 2268150, 2353725, 2441225, 2544500,
    2660575, 2791000, 2937500, 3102050, 3286825, 3494225, 3727000,
    3988200,
  ],
};

const ARTIFACT_EXP = {
  5: [
    0, 3000, 6725, 11150, 16300, 22200, 28875, 36375, 44725, 53950,
    64075, 75125, 87150, 100175, 115325, 132925, 153300, 176800,
    203850, 234900, 270475,
  ],
  4: [
    0, 2400, 5375, 8925, 13050, 17775, 23125, 29125, 35800, 43175,
    51275, 60125, 69750, 80175, 91400, 103400, 122675,
  ],
  3: [
    0, 1800, 4050, 6725, 9825, 13375, 17425, 22000, 27150, 32900,
    39300, 46375, 52200,
  ],
};

const CHAR_ASCENSION = [
  { cap: 40, mora: 20000, gem1: 1, specialty: 3, common1: 3 },
  { cap: 50, mora: 40000, gem2: 3, boss: 2, specialty: 10, common1: 15 },
  { cap: 60, mora: 60000, gem2: 6, boss: 4, specialty: 20, common2: 12 },
  { cap: 70, mora: 80000, gem3: 3, boss: 8, specialty: 30, common2: 18 },
  { cap: 80, mora: 100000, gem3: 6, boss: 12, specialty: 45, common3: 12 },
  { cap: 90, mora: 120000, gem4: 6, boss: 20, specialty: 60, common3: 24 },
];

const TALENT_COSTS = {
  2: { teachings: 3, common1: 6, mora: 12500 },
  3: { guide: 2, common2: 3, mora: 17500 },
  4: { guide: 4, common2: 4, mora: 25000 },
  5: { guide: 6, common2: 6, mora: 30000 },
  6: { guide: 9, common2: 9, mora: 37500 },
  7: { philosophies: 4, common3: 4, weekly: 1, mora: 120000 },
  8: { philosophies: 6, common3: 6, weekly: 1, mora: 260000 },
  9: { philosophies: 12, common3: 9, weekly: 2, mora: 450000 },
  10: { philosophies: 16, common3: 12, weekly: 2, crown: 1, mora: 700000 },
};

const WEAPON_ASCENSION = {
  5: [
    { cap: 40, mora: 10000, mat1: 5, elite1: 5, common1: 3 },
    { cap: 50, mora: 20000, mat2: 5, elite1: 18, common1: 12 },
    { cap: 60, mora: 30000, mat2: 9, elite2: 9, common2: 9 },
    { cap: 70, mora: 45000, mat3: 5, elite2: 18, common2: 14 },
    { cap: 80, mora: 55000, mat3: 9, elite3: 14, common3: 9 },
    { cap: 90, mora: 65000, mat4: 6, elite3: 27, common3: 18 },
  ],
  4: [
    { cap: 40, mora: 5000, mat1: 3, elite1: 3, common1: 2 },
    { cap: 50, mora: 15000, mat2: 3, elite1: 12, common1: 8 },
    { cap: 60, mora: 20000, mat2: 6, elite2: 6, common2: 6 },
    { cap: 70, mora: 30000, mat3: 3, elite2: 12, common2: 9 },
    { cap: 80, mora: 35000, mat3: 6, elite3: 9, common3: 6 },
    { cap: 90, mora: 45000, mat4: 4, elite3: 18, common3: 12 },
  ],
  3: [
    { cap: 40, mora: 5000, mat1: 2, elite1: 2, common1: 1 },
    { cap: 50, mora: 10000, mat2: 2, elite1: 8, common1: 5 },
    { cap: 60, mora: 15000, mat2: 4, elite2: 4, common2: 4 },
    { cap: 70, mora: 20000, mat3: 2, elite2: 8, common2: 6 },
    { cap: 80, mora: 25000, mat3: 4, elite3: 6, common3: 4 },
    { cap: 90, mora: 30000, mat4: 3, elite3: 12, common3: 8 },
  ],
};

const ELEMENT_GEMS = {
  pyro: "Ágata Agnidus",
  hydro: "Lazurita Varunada",
  anemo: "Turquesa Vayuda",
  electro: "Ametista Vajrada",
  dendro: "Esmeralda Nagadus",
  cryo: "Jade Shivada",
  geo: "Topázio Prithiva",
};

const LEGACY_ELEMENT_GEMS = {
  pyro: "Agnidus Agate",
  hydro: "Varunada Lazurite",
  anemo: "Vayuda Turquoise",
  electro: "Vajrada Amethyst",
  dendro: "Nagadus Emerald",
  cryo: "Shivada Jade",
  geo: "Prithiva Topaz",
};

const EXTRA_CHARACTERS = [
  { id: "aino", name: "Aino", rarity: 4, vision: "Hydro", weapon: "Claymore" },
  { id: "chasca", name: "Chasca", rarity: 5, vision: "Anemo", weapon: "Bow" },
  { id: "citlali", name: "Citlali", rarity: 5, vision: "Cryo", weapon: "Catalyst" },
  { id: "columbina", name: "Columbina", rarity: 5, vision: "Hydro", weapon: "Catalyst" },
  { id: "dahlia", name: "Dahlia", rarity: 4, vision: "Hydro", weapon: "Sword" },
  { id: "durin", name: "Durin", rarity: 5, vision: "Pyro", weapon: "Sword" },
  { id: "escoffier", name: "Escoffier", rarity: 5, vision: "Cryo", weapon: "Polearm" },
  { id: "flins", name: "Flins", rarity: 5, vision: "Electro", weapon: "Polearm" },
  { id: "iansan", name: "Iansan", rarity: 4, vision: "Electro", weapon: "Polearm" },
  { id: "ifa", name: "Ifa", rarity: 4, vision: "Anemo", weapon: "Catalyst" },
  { id: "illuga", name: "Illuga", rarity: 4, vision: "Geo", weapon: "Polearm" },
  { id: "ineffa", name: "Ineffa", rarity: 5, vision: "Electro", weapon: "Polearm" },
  { id: "jahoda", name: "Jahoda", rarity: 4, vision: "Anemo", weapon: "Bow" },
  { id: "lan-yan", name: "Lan Yan", rarity: 4, vision: "Anemo", weapon: "Catalyst" },
  { id: "lauma", name: "Lauma", rarity: 5, vision: "Dendro", weapon: "Catalyst" },
  { id: "linnea", name: "Linnea", rarity: 5, vision: "Geo", weapon: "Bow" },
  { id: "mavuika", name: "Mavuika", rarity: 5, vision: "Pyro", weapon: "Claymore" },
  { id: "yumemizuki-mizuki", name: "Yumemizuki Mizuki", rarity: 5, vision: "Anemo", weapon: "Catalyst" },
  { id: "nefer", name: "Nefer", rarity: 5, vision: "Dendro", weapon: "Catalyst" },
  { id: "ororon", name: "Ororon", rarity: 4, vision: "Electro", weapon: "Bow" },
  { id: "skirk", name: "Skirk", rarity: 5, vision: "Cryo", weapon: "Sword" },
  { id: "varesa", name: "Varesa", rarity: 5, vision: "Electro", weapon: "Catalyst" },
  { id: "varka", name: "Varka", rarity: 5, vision: "Anemo", weapon: "Claymore" },
  { id: "xilonen", name: "Xilonen", rarity: 5, vision: "Geo", weapon: "Sword" },
  { id: "zibai", name: "Zibai", rarity: 5, vision: "Geo", weapon: "Sword" },
];

const FALLBACK_CHARACTERS = [
  ...EXTRA_CHARACTERS,
  { id: "furina", name: "Furina", rarity: 5, vision: "Hydro", weapon: "Sword" },
  { id: "arlecchino", name: "Arlecchino", rarity: 5, vision: "Pyro", weapon: "Polearm" },
  { id: "neuvillette", name: "Neuvillette", rarity: 5, vision: "Hydro", weapon: "Catalyst" },
  { id: "nahida", name: "Nahida", rarity: 5, vision: "Dendro", weapon: "Catalyst" },
  { id: "kazuha", name: "Kaedehara Kazuha", rarity: 5, vision: "Anemo", weapon: "Sword" },
  { id: "bennett", name: "Bennett", rarity: 4, vision: "Pyro", weapon: "Sword" },
  { id: "xingqiu", name: "Xingqiu", rarity: 4, vision: "Hydro", weapon: "Sword" },
  { id: "xiangling", name: "Xiangling", rarity: 4, vision: "Pyro", weapon: "Polearm" },
];

const FALLBACK_WEAPONS = [
  { id: "a-thousand-floating-dreams", name: "A Thousand Floating Dreams", rarity: 5, weapon: "Catalyst" },
  { id: "beacon-of-the-reed-sea", name: "Beacon of the Reed Sea", rarity: 5, weapon: "Claymore" },
  { id: "favonius-sword", name: "Favonius Sword", rarity: 4, weapon: "Sword" },
  { id: "freedom-sworn", name: "Freedom-Sworn", rarity: 5, weapon: "Sword" },
  { id: "key-of-khaj-nisut", name: "Key of Khaj-Nisut", rarity: 5, weapon: "Sword" },
  { id: "mistsplitter-reforged", name: "Mistsplitter Reforged", rarity: 5, weapon: "Sword" },
  { id: "prototype-amber", name: "Prototype Amber", rarity: 4, weapon: "Catalyst" },
  { id: "sacrificial-sword", name: "Sacrificial Sword", rarity: 4, weapon: "Sword" },
  { id: "serpent-spine", name: "Serpent Spine", rarity: 4, weapon: "Claymore" },
  { id: "splendor-of-tranquil-waters", name: "Splendor of Tranquil Waters", rarity: 5, weapon: "Sword" },
  { id: "staff-of-homa", name: "Staff of Homa", rarity: 5, weapon: "Polearm" },
  { id: "the-catch", name: "The Catch", rarity: 4, weapon: "Polearm" },
  { id: "the-widsith", name: "The Widsith", rarity: 4, weapon: "Catalyst" },
  { id: "tome-of-the-eternal-flow", name: "Tome of the Eternal Flow", rarity: 5, weapon: "Catalyst" },
  { id: "wolf-s-gravestone", name: "Wolf's Gravestone", rarity: 5, weapon: "Claymore" },
];

const CHARACTER_MATERIAL_PRESETS = {
  aino: {
    specialty: "Rolamento Portatil",
    boss: "Matriz de Estampar Kuuvahki de Precisao",
    common: "Eixo de Transmissao",
    talentBook: "Elisio",
    talentCommon: "Eixo de Transmissao",
    weekly: "Pena de Seda",
  },
  arlecchino: {
    specialty: "Rosa Arco-Iris",
    boss: "Fragmento de uma Melodia Dourada",
    common: "Insignia Fatui",
    talentBook: "Ordem",
    talentCommon: "Insignia Fatui",
    weekly: "Vela Desbotada",
  },
  baizhu: {
    specialty: "Violeta",
    boss: "Anel Sombrio Eterno",
    common: "Esporos Fungicos",
    talentBook: "Ouro",
    talentCommon: "Esporos Fungicos",
    weekly: "Samambaia do Mundo",
  },
  bennett: {
    specialty: "Margarida Voadora",
    boss: "Semente de Fogo Eterno",
    common: "Insignia dos Ladrões de Tesouro",
    talentBook: "Resistencia",
    talentCommon: "Insignia dos Ladrões de Tesouro",
    weekly: "Pluma de Dvalin",
  },
  chasca: {
    specialty: "Flor Purpura Murcha",
    boss: "Olhar Aprisionador",
    common: "Presa de Sauriano",
    talentBook: "Conflito",
    talentCommon: "Presa de Sauriano",
    weekly: "Pena de Seda",
  },
  citlali: {
    specialty: "Baga Quenepa",
    boss: "Talismã da Terra Enigmatica",
    common: "Presa de Sauriano",
    talentBook: "Ignicao",
    talentCommon: "Presa de Sauriano",
    weekly: "Negacao e Julgamento",
  },
  diona: {
    specialty: "Lirio de Calla",
    boss: "Nucleo de Gelo",
    common: "Ponta de Flecha",
    talentBook: "Liberdade",
    talentCommon: "Ponta de Flecha",
    weekly: "Fragmento de Legado Maligno",
  },
  fischl: {
    specialty: "Pequena Lampada de Grama",
    boss: "Prisma Relampago",
    common: "Ponta de Flecha",
    talentBook: "Poesia",
    talentCommon: "Ponta de Flecha",
    weekly: "Medalhao Espiritual de Boreas",
  },
  flins: {
    specialty: "Flor Lamparina Gelida",
    boss: "Matriz de Estampar Kuuvahki de Precisao",
    common: "Eixo de Transmissao",
    talentBook: "Vadiagem",
    talentCommon: "Eixo de Transmissao",
    weekly: "Amostra Ascendida: Rainha",
  },
  furina: {
    specialty: "Lirio Lumilago",
    boss: "Agua que Falhou em Transcender",
    common: "Nectar de Flor Gigante",
    talentBook: "Justica",
    talentCommon: "Nectar de Flor Gigante",
    weekly: "Massa sem Luz",
  },
  kazuha: {
    specialty: "Ganoderma Maritimo",
    boss: "Nucleo Marionete",
    common: "Insignia dos Ladrões de Tesouro",
    talentBook: "Diligencia",
    talentCommon: "Insignia dos Ladrões de Tesouro",
    weekly: "Escama Dourada",
  },
  lauma: {
    specialty: "Prata do Luar",
    boss: "Escama-Pena Luminifera",
    common: "Mandado Fatui",
    talentBook: "Luar",
    talentCommon: "Mandado Fatui",
    weekly: "Escama-Pena Erodida",
  },
  mavuika: {
    specialty: "Flor Purpura Murcha",
    boss: "Nucleo de Fonte Secreta com Inscricao Dourada",
    common: "Apito Tribal Sauroforme",
    talentBook: "Contenda",
    talentCommon: "Apito Tribal Sauroforme",
    weekly: "Chifre Erodido",
  },
  nahida: {
    specialty: "Lotus Kalpalata",
    boss: "Trepadeira Suprimida",
    common: "Esporos Fungicos",
    talentBook: "Engenhosidade",
    talentCommon: "Esporos Fungicos",
    weekly: "Fios da Marionete",
  },
  nefer: {
    specialty: "Prata do Luar",
    boss: "Chifre Radiante",
    common: "Mandado Fatui",
    talentBook: "Elisio",
    talentCommon: "Mandado Fatui",
    weekly: "Amostra Ascendida: Torre",
  },
  neuvillette: {
    specialty: "Lumitoile",
    boss: "Chifre Fontemer",
    common: "Perola Transoceanica",
    talentBook: "Equidade",
    talentCommon: "Perola Transoceanica",
    weekly: "Eterno Âmbar",
  },
  nilou: {
    specialty: "Padisarah",
    boss: "Calibre Perpetuo",
    common: "Esporos Fungicos",
    talentBook: "Praxis",
    talentCommon: "Esporos Fungicos",
    weekly: "Lagrimas da Deusa Calamitosa",
  },
  sangonomiya_kokomi: {
    specialty: "Perola Sango",
    boss: "Orvalho da Renuncia",
    common: "Espectro",
    talentBook: "Transitoriedade",
    talentCommon: "Espectro",
    weekly: "Borboleta Infernal",
  },
  sucrose: {
    specialty: "Margarida Voadora",
    boss: "Semente do Furacao",
    common: "Nectar de Flor Gigante",
    talentBook: "Liberdade",
    talentCommon: "Nectar de Flor Gigante",
    weekly: "Medalhao Espiritual de Boreas",
  },
  xilonen: {
    specialty: "Crisantemo Brilhante",
    boss: "Nucleo de Fonte Secreta com Inscricao Dourada",
    common: "Apito Tribal Sauroforme",
    talentBook: "Ignicao",
    talentCommon: "Apito Tribal Sauroforme",
    weekly: "Espelho de Mushin",
  },
  xiangling: {
    specialty: "Pimenta de Jueyun",
    boss: "Semente de Fogo Eterno",
    common: "Slime",
    talentBook: "Diligencia",
    talentCommon: "Slime",
    weekly: "Garra de Dvalin",
  },
  xingqiu: {
    specialty: "Flor de Seda",
    boss: "Coracao Purificador",
    common: "Mascara Hilichurl",
    talentBook: "Ouro",
    talentCommon: "Mascara Hilichurl",
    weekly: "Cauda de Boreas",
  },
  yelan: {
    specialty: "Concha Estrela",
    boss: "Presa Runica",
    common: "Insignia Fatui",
    talentBook: "Prosperidade",
    talentCommon: "Insignia Fatui",
    weekly: "Escama Dourada",
  },
  yaoyao: {
    specialty: "Pimenta de Jueyun",
    boss: "Trepadeira Suprimida",
    common: "Slime",
    talentBook: "Diligencia",
    talentCommon: "Slime",
    weekly: "Sino de Daka",
  },
  zhongli: {
    specialty: "Cor Lapis",
    boss: "Pilar de Basalto",
    common: "Slime",
    talentBook: "Ouro",
    talentCommon: "Slime",
    weekly: "Chifre de Monoceros Caeli",
  },
};

const CHARACTER_MATERIAL_ALIASES = {
  "kaedehara-kazuha": "kazuha",
  kokomi: "sangonomiya_kokomi",
  "sangonomiya-kokomi": "sangonomiya_kokomi",
};

const WEAPON_MATERIAL_PRESETS = {
  "a-thousand-floating-dreams": {
    domain: "Jardim Oasis",
    elite: "Prisma",
    common: "Esporos Fungicos",
  },
  "beacon-of-the-reed-sea": {
    domain: "Poder do Sol Escaldante",
    elite: "Casca Dessecada",
    common: "Brocado Vermelho",
  },
  "favonius-sword": {
    domain: "Decarabian",
    elite: "Chifre Hilichurl",
    common: "Ponta de Flecha",
  },
  "freedom-sworn": {
    domain: "Decarabian",
    elite: "Dispositivo do Caos",
    common: "Pergaminho Samachurl",
  },
  "key-of-khaj-nisut": {
    domain: "Talismã do Orvalho da Floresta",
    elite: "Prisma",
    common: "Brocado Vermelho",
  },
  "mistsplitter-reforged": {
    domain: "Mar Distante",
    elite: "Engrenagem do Caos",
    common: "Protetor de Mao",
  },
  "sacrificial-sword": {
    domain: "Lobo Boreal",
    elite: "Ramo de Linha Ley",
    common: "Slime",
  },
  "serpent-spine": {
    domain: "Aerosiderita",
    elite: "Fragil Osseo",
    common: "Nectar de Flor Gigante",
  },
  "splendor-of-tranquil-waters": {
    domain: "Gota de Orvalho Sagrado Puro",
    elite: "Agua Maculada",
    common: "Perola Transoceanica",
  },
  "staff-of-homa": {
    domain: "Aerosiderita",
    elite: "Ramo de Linha Ley",
    common: "Slime",
  },
  "the-catch": {
    domain: "Mascara do Tenente Mau",
    elite: "Engrenagem do Caos",
    common: "Espectro",
  },
  "the-widsith": {
    domain: "Lobo Boreal",
    elite: "Ramo de Linha Ley",
    common: "Mascara Hilichurl",
  },
  "tome-of-the-eternal-flow": {
    domain: "Gota de Orvalho Sagrado Puro",
    elite: "Nucleo da Fenda",
    common: "Engrenagem Mecanica",
  },
  "wolf-s-gravestone": {
    domain: "Decarabian",
    elite: "Chifre Hilichurl",
    common: "Pergaminho Samachurl",
  },
};

const CHARACTER_ASSETS = {
  nefer: {
    icon: [
      "https://enka.network/ui/UI_AvatarIcon_Nefer.png",
      "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Nefer_Icon.png",
    ],
    hero: [
      "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Character_Nefer_Wish.png",
      "https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Character_Nefer_Card.png",
      "https://enka.network/ui/UI_Gacha_AvatarImg_Nefer.png",
    ],
  },
};

const ENKA_ICON_OVERRIDES = {
  "hu tao": "Hutao",
  "kaedehara kazuha": "Kazuha",
  "kamisato ayaka": "Ayaka",
  "kamisato ayato": "Ayato",
  "kuki shinobu": "Shinobu",
  "raiden shogun": "Shougun",
  "sangonomiya kokomi": "Kokomi",
  "yumemizuki mizuki": "Mizuki",
  "yae miko": "Yae",
};

const ARTIFACT_RECS = {
  aino: {
    set: "Instructor x4 ou Noblesse Oblige x4",
    stats: "Areia Recarga / Calice HP ou Hydro / Coroa Cura ou CRIT",
    substats: "Recarga > HP% > EM",
  },
  chasca: {
    set: "Obsidian Codex x4",
    stats: "Areia ATK / Calice ATK ou Anemo / Coroa CRIT",
    substats: "CRIT > ATK% > Recarga",
  },
  citlali: {
    set: "Scroll of the Hero of Cinder City x4",
    stats: "Areia EM ou Recarga / Calice EM / Coroa EM",
    substats: "EM > Recarga > CRIT",
  },
  dahlia: {
    set: "Noblesse Oblige x4 ou Tenacity x4",
    stats: "Areia HP ou Recarga / Calice HP / Coroa Cura",
    substats: "HP% > Recarga",
  },
  escoffier: {
    set: "Golden Troupe x4 ou Blizzard Strayer x4",
    stats: "Areia ATK ou Recarga / Calice Cryo / Coroa CRIT",
    substats: "CRIT > ATK% > Recarga",
  },
  ifa: {
    set: "Viridescent Venerer x4",
    stats: "Areia EM ou ATK / Calice Anemo ou EM / Coroa CRIT ou EM",
    substats: "EM > CRIT > Recarga",
  },
  iansan: {
    set: "Scroll of the Hero of Cinder City x4 ou Noblesse Oblige x4",
    stats: "Areia Recarga ou ATK / Calice Electro / Coroa CRIT",
    substats: "Recarga > CRIT > ATK%",
  },
  "lan yan": {
    set: "Viridescent Venerer x4",
    stats: "Areia ATK ou Recarga / Calice ATK / Coroa ATK",
    substats: "ATK% > Recarga > EM",
  },
  mavuika: {
    set: "Obsidian Codex x4",
    stats: "Areia ATK ou EM / Calice Pyro / Coroa CRIT",
    substats: "CRIT > ATK% > EM",
  },
  "yumemizuki mizuki": {
    set: "Viridescent Venerer x4",
    stats: "Areia EM / Calice EM / Coroa EM",
    substats: "EM > Recarga",
  },
  nefer: {
    set: "Night of the Sky's Unveiling x4",
    stats: "Areia EM / Calice EM / Coroa CRIT Rate ou CRIT DMG",
    substats: "CRIT DMG = CRIT Rate > EM",
  },
  ororon: {
    set: "Scroll of the Hero of Cinder City x4",
    stats: "Areia Recarga ou ATK / Calice Electro / Coroa CRIT",
    substats: "Recarga > CRIT > ATK%",
  },
  skirk: {
    set: "Blizzard Strayer x4 ou Marechaussee Hunter x4",
    stats: "Areia ATK / Calice Cryo / Coroa CRIT",
    substats: "CRIT > ATK% > Recarga",
  },
  varesa: {
    set: "Obsidian Codex x4 ou Thundering Fury x4",
    stats: "Areia ATK ou EM / Calice Electro / Coroa CRIT",
    substats: "CRIT > ATK% > EM",
  },
  xilonen: {
    set: "Scroll of the Hero of Cinder City x4",
    stats: "Areia DEF ou Recarga / Calice DEF / Coroa Cura ou DEF",
    substats: "DEF% > Recarga > CRIT",
  },
  lauma: {
    set: "Deepwood Memories x4 ou Silken Moon's Serenade x4",
    stats: "Areia EM / Calice EM / Coroa EM",
    substats: "EM > Recarga > CRIT",
  },
  flins: {
    set: "Thundering Fury x4 ou set Lunar-Charged dedicado",
    stats: "Areia ATK ou EM / Calice Electro / Coroa CRIT",
    substats: "CRIT > ATK% > EM",
  },
  ineffa: {
    set: "Silken Moon's Serenade x4 ou Golden Troupe x4",
    stats: "Areia ATK ou Recarga / Calice Electro / Coroa CRIT",
    substats: "CRIT > Recarga > ATK%",
  },
  aino: {
    set: "Instructor x4",
    stats: "Areia Recarga / Calice flex / Coroa flex",
    substats: "Recarga > EM",
  },
  yaoyao: {
    set: "Silken Moon's Serenade x4 ou Deepwood Memories x4",
    stats: "Areia HP ou EM / Calice HP / Coroa Cura",
    substats: "HP% > Recarga",
  },
  nilou: {
    set: "Vourukasha's Glow x2 + Tenacity x2",
    stats: "Areia HP / Calice HP / Coroa HP",
    substats: "HP% > HP > EM",
  },
  nahida: {
    set: "Deepwood Memories x4",
    stats: "Areia EM / Calice EM ou Dendro / Coroa EM ou CRIT",
    substats: "EM > CRIT > Recarga",
  },
  furina: {
    set: "Golden Troupe x4",
    stats: "Areia HP ou Recarga / Calice HP / Coroa CRIT",
    substats: "CRIT > HP% > Recarga",
  },
  neuvillette: {
    set: "Marechaussee Hunter x4",
    stats: "Areia HP / Calice Hydro / Coroa CRIT",
    substats: "CRIT > HP% > Recarga",
  },
  "kaedehara kazuha": {
    set: "Viridescent Venerer x4",
    stats: "Areia EM / Calice EM / Coroa EM",
    substats: "EM > Recarga",
  },
  kazuha: {
    set: "Viridescent Venerer x4",
    stats: "Areia EM / Calice EM / Coroa EM",
    substats: "EM > Recarga",
  },
  bennett: {
    set: "Noblesse Oblige x4",
    stats: "Areia Recarga / Calice HP / Coroa Cura",
    substats: "Recarga > HP%",
  },
  xiangling: {
    set: "Emblem of Severed Fate x4",
    stats: "Areia Recarga ou EM / Calice Pyro / Coroa CRIT",
    substats: "Recarga > CRIT > EM",
  },
  xingqiu: {
    set: "Emblem of Severed Fate x4",
    stats: "Areia Recarga / Calice Hydro / Coroa CRIT",
    substats: "Recarga > CRIT > ATK%",
  },
  yelan: {
    set: "Emblem of Severed Fate x4",
    stats: "Areia HP ou Recarga / Calice Hydro / Coroa CRIT",
    substats: "CRIT > HP% > Recarga",
  },
  arlecchino: {
    set: "Fragment of Harmonic Whimsy x4",
    stats: "Areia ATK / Calice Pyro / Coroa CRIT",
    substats: "CRIT > ATK% > EM",
  },
  chevreuse: {
    set: "Noblesse Oblige x4",
    stats: "Areia HP ou Recarga / Calice HP / Coroa Cura",
    substats: "HP% > Recarga",
  },
  fischl: {
    set: "Golden Troupe x4",
    stats: "Areia ATK ou EM / Calice Electro / Coroa CRIT",
    substats: "CRIT > ATK% > EM",
  },
  "kuki shinobu": {
    set: "Flower of Paradise Lost x4 ou Gilded Dreams x4",
    stats: "Areia EM / Calice EM / Coroa EM",
    substats: "EM > HP%",
  },
  baizhu: {
    set: "Deepwood Memories x4",
    stats: "Areia HP ou Recarga / Calice HP / Coroa Cura",
    substats: "HP% > Recarga",
  },
  kokomi: {
    set: "Ocean-Hued Clam x4 ou Tenacity x4",
    stats: "Areia HP / Calice Hydro ou HP / Coroa Cura",
    substats: "HP% > Recarga",
  },
  sucrose: {
    set: "Viridescent Venerer x4",
    stats: "Areia EM / Calice EM / Coroa EM",
    substats: "EM > Recarga",
  },
  zhongli: {
    set: "Tenacity of the Millelith x4",
    stats: "Areia HP / Calice HP / Coroa HP",
    substats: "HP% > HP",
  },
  diona: {
    set: "Noblesse Oblige x4 ou Tenacity x2 + Vourukasha x2",
    stats: "Areia HP ou Recarga / Calice HP / Coroa HP ou Cura",
    substats: "HP% > Recarga",
  },
};

const ROLE_HINTS = {
  aino: "Hydro off-field",
  albedo: "Geo off-field",
  arlecchino: "Main DPS",
  baizhu: "Cura / Dendro",
  bennett: "Buff / cura",
  chasca: "Main DPS",
  chevreuse: "Buff Overload",
  citlali: "Escudo / suporte",
  dahlia: "Cura / suporte",
  escoffier: "Cryo off-field",
  fischl: "Electro off-field",
  furina: "Buff / Sub DPS",
  ifa: "Anemo / cura",
  iansan: "Buff / suporte",
  ineffa: "Electro off-field",
  "kaedehara kazuha": "VV / buff",
  "kuki shinobu": "Trigger Hyperbloom",
  lauma: "Suporte Lunar-Bloom",
  "lan yan": "Escudo / VV",
  mavuika: "Main DPS / Pyro",
  nahida: "Dendro / EM",
  nefer: "Main DPS",
  neuvillette: "Main DPS",
  nilou: "Bloom",
  ororon: "Electro off-field",
  skirk: "Main DPS",
  sucrose: "EM / VV",
  varesa: "Main DPS",
  xilonen: "Buff / cura",
  xiangling: "Pyro off-field",
  xingqiu: "Hydro off-field",
  yelan: "Hydro off-field",
  yaoyao: "Cura / Dendro",
  zhongli: "Escudo",
};

const ON_FIELD_DPS = new Set([
  "arlecchino",
  "chasca",
  "clorinde",
  "cyno",
  "diluc",
  "eula",
  "flins",
  "hu tao",
  "itto",
  "kamisato ayaka",
  "kamisato ayato",
  "kinich",
  "klee",
  "linnea",
  "lyney",
  "mavuika",
  "nefer",
  "neuvillette",
  "raiden shogun",
  "skirk",
  "tartaglia",
  "varesa",
  "wanderer",
  "xiao",
  "yoimiya",
]);

const DEFENSIVE_SUPPORTS = new Set([
  "baizhu",
  "bennett",
  "charlotte",
  "citlali",
  "dahlia",
  "diona",
  "ifa",
  "jean",
  "kuki shinobu",
  "lan yan",
  "layla",
  "noelle",
  "qiqi",
  "sangonomiya kokomi",
  "sayu",
  "thoma",
  "xilonen",
  "yaoyao",
  "zhongli",
]);

const BUFF_SUPPORTS = new Set([
  "bennett",
  "chevreuse",
  "citlali",
  "furina",
  "iansan",
  "kaedehara kazuha",
  "kazuha",
  "lauma",
  "linnea",
  "mona",
  "nahida",
  "nilou",
  "sucrose",
  "xilonen",
  "zhongli",
]);

const OFF_FIELD_APPLIERS = new Set([
  "aino",
  "albedo",
  "beidou",
  "collei",
  "dehya",
  "escoffier",
  "fischl",
  "furina",
  "ineffa",
  "kaeya",
  "kuki shinobu",
  "lauma",
  "nahida",
  "ororon",
  "raiden shogun",
  "rosaria",
  "xiangling",
  "xingqiu",
  "yae miko",
  "yelan",
  "yaoyao",
]);

const TEAM_GUIDES = {
  nefer: [
    {
      title: "Lunar-Bloom Core",
      note: "Time forte e direto para Nefer em campo, com Hydro constante e buffs de EM/Lunar-Bloom.",
      tier: "SS",
      members: [
        { name: "Nefer", role: "Main DPS" },
        { name: "Lauma", role: "Suporte Dendro" },
        { name: "Nahida", role: "Sub DPS / EM" },
        { name: "Aino", role: "Hydro / aplicacao" },
      ],
    },
    {
      title: "Lunar-Bloom com Nilou",
      note: "Versao agressiva para Bloom/Lunar-Bloom, com dano alto e boa escala de HP/EM.",
      tier: "SS",
      members: [
        { name: "Nefer", role: "Main DPS" },
        { name: "Lauma", role: "Suporte Dendro" },
        { name: "Nilou", role: "Hydro / Bloom" },
        { name: "Yaoyao", role: "Cura / Dendro" },
      ],
    },
    {
      title: "Lunar-Bloom acessivel",
      note: "Base mais barata para jogar em torno da Nefer sem depender de varios cinco estrelas.",
      tier: "S+",
      members: [
        { name: "Nefer", role: "Main DPS" },
        { name: "Xingqiu", role: "Hydro off-field" },
        { name: "Yaoyao", role: "Cura / Dendro" },
        { name: "Sucrose", role: "EM / controle" },
      ],
    },
  ],
  furina: [
    {
      title: "Neuvillette premium",
      note: "Furina amplifica o dano enquanto Neuvillette dirige o time com cura/sustento.",
      tier: "SS",
      members: [
        { name: "Neuvillette", role: "Main DPS" },
        { name: "Furina", role: "Buff / Sub DPS" },
        { name: "Kaedehara Kazuha", role: "VV / buff Hydro" },
        { name: "Baizhu", role: "Cura / escudo" },
      ],
    },
    {
      title: "Vape double Hydro",
      note: "Base de dano consistente para carries Pyro que aproveitam o buff da Furina.",
      tier: "S+",
      members: [
        { name: "Arlecchino", role: "Main DPS" },
        { name: "Furina", role: "Buff / Sub DPS" },
        { name: "Yelan", role: "Hydro off-field" },
        { name: "Bennett", role: "Buff / cura" },
      ],
    },
  ],
  neuvillette: [
    {
      title: "Hydro Hypercarry",
      note: "Equipe confortavel para dano alto e rotacao simples com Neuvillette em campo.",
      tier: "SS",
      members: [
        { name: "Neuvillette", role: "Main DPS" },
        { name: "Furina", role: "Buff / Sub DPS" },
        { name: "Kaedehara Kazuha", role: "VV / agrupamento" },
        { name: "Baizhu", role: "Cura / protecao" },
      ],
    },
    {
      title: "Taser seguro",
      note: "Alternativa com resistencia a interrupcao e reacoes constantes.",
      tier: "S",
      members: [
        { name: "Neuvillette", role: "Main DPS" },
        { name: "Fischl", role: "Electro off-field" },
        { name: "Kaedehara Kazuha", role: "VV / agrupamento" },
        { name: "Zhongli", role: "Escudo" },
      ],
    },
  ],
  nahida: [
    {
      title: "Hyperbloom",
      note: "Uma das bases mais eficientes: Dendro constante, Hydro off-field e Kuki full EM.",
      tier: "SS",
      members: [
        { name: "Nahida", role: "Dendro / EM" },
        { name: "Xingqiu", role: "Hydro off-field" },
        { name: "Kuki Shinobu", role: "Trigger Hyperbloom" },
        { name: "Yelan", role: "Hydro / dano" },
      ],
    },
    {
      title: "Lunar-Bloom suporte",
      note: "Nahida entra como aplicadora Dendro e suporte de EM para Nefer.",
      tier: "SS",
      members: [
        { name: "Nefer", role: "Main DPS" },
        { name: "Lauma", role: "Suporte Lunar-Bloom" },
        { name: "Nahida", role: "Sub DPS / EM" },
        { name: "Aino", role: "Hydro / aplicacao" },
      ],
    },
  ],
  arlecchino: [
    {
      title: "Vape carry",
      note: "Composicao classica para vaporizar golpes fortes da Arlecchino.",
      tier: "SS",
      members: [
        { name: "Arlecchino", role: "Main DPS" },
        { name: "Yelan", role: "Hydro off-field" },
        { name: "Bennett", role: "Buff" },
        { name: "Kaedehara Kazuha", role: "VV / buff Pyro" },
      ],
    },
    {
      title: "Overload Chevreuse",
      note: "Boa para contas sem Kazuha e com foco em Pyro/Electro.",
      tier: "S+",
      members: [
        { name: "Arlecchino", role: "Main DPS" },
        { name: "Chevreuse", role: "Buff / cura" },
        { name: "Fischl", role: "Electro off-field" },
        { name: "Bennett", role: "Buff" },
      ],
    },
  ],
  bennett: [
    {
      title: "National",
      note: "Base universal, barata e eficiente para Abismo e eventos.",
      tier: "S+",
      members: [
        { name: "Bennett", role: "Buff / cura" },
        { name: "Xiangling", role: "Pyro off-field" },
        { name: "Xingqiu", role: "Hydro off-field" },
        { name: "Sucrose", role: "VV / EM" },
      ],
    },
  ],
  xiangling: [
    {
      title: "National",
      note: "Xiangling carrega dano de Pyronado com Bennett alimentando energia e buff.",
      tier: "S+",
      members: [
        { name: "Xiangling", role: "Pyro off-field" },
        { name: "Bennett", role: "Buff / bateria" },
        { name: "Xingqiu", role: "Hydro off-field" },
        { name: "Sucrose", role: "VV / EM" },
      ],
    },
  ],
  xingqiu: [
    {
      title: "Hyperbloom acessivel",
      note: "Xingqiu garante Hydro constante para sementes com Kuki full EM.",
      tier: "S+",
      members: [
        { name: "Nahida", role: "Dendro / EM" },
        { name: "Xingqiu", role: "Hydro off-field" },
        { name: "Kuki Shinobu", role: "Trigger Hyperbloom" },
        { name: "Sucrose", role: "EM / controle" },
      ],
    },
  ],
};

const GUIDE_DAILY_TASKS = [
  {
    id: "daily-commissions",
    title: "Comissoes diarias / Encounter Points",
    reward: "60 Primogems, AR EXP, Mora e materiais de amizade",
    priority: "Alta",
  },
  {
    id: "spend-resin",
    title: "Gastar Resina Original",
    reward: "Materiais de personagem, talentos, armas, artefatos ou Mora",
    priority: "Alta",
  },
  {
    id: "events",
    title: "Eventos ativos da versao 6.5",
    reward: "Primogems, Mora, livros e recompensas como Surveying & Mapping, Rapid Capture e Ley Line Overflow",
    priority: "Alta",
  },
  {
    id: "expeditions",
    title: "Coletar e reenviar expedicoes",
    reward: "Mora, minerio e ingredientes sem custo de resina",
    priority: "Media",
  },
  {
    id: "forge-cook-teapot",
    title: "Forja, comida e bule",
    reward: "Minerios, Adeptal Energy, Realm Currency e recursos passivos",
    priority: "Media",
  },
  {
    id: "battle-pass",
    title: "Passe de Batalha semanal",
    reward: "EXP do PB, Mora, livros, minerio e destinos no plano pago",
    priority: "Media",
  },
];

const GUIDE_RESIN_TASKS = [
  {
    id: "resin-plan-first",
    title: "Priorize o plano atual",
    reward: "Use os materiais faltantes do app: chefe, livro, arma, Mora ou artefato",
    priority: "Alta",
  },
  {
    id: "weekly-bosses",
    title: "Bosses semanais com desconto",
    reward: "Talentos 7-10, billets, Dream Solvent e artefatos",
    priority: "Alta",
  },
  {
    id: "character-boss",
    title: "Chefes normais para personagens em build",
    reward: "Drops de ascensao + gemas elementais",
    priority: "Alta",
  },
  {
    id: "talent-weapon-domain",
    title: "Dominios do dia",
    reward: "Livros de talento ou materiais de arma no calendario certo",
    priority: "Media",
  },
  {
    id: "artifact-domain",
    title: "Artefatos so depois do basico",
    reward: "Melhora de dano, mas com RNG alto",
    priority: "Media",
  },
  {
    id: "ley-lines",
    title: "Linhas Ley quando travar em Mora/EXP",
    reward: "Mora ou livros de EXP garantidos",
    priority: "Situacional",
  },
];

const QUEST_GUIDE = [
  {
    id: "mondstadt-dornman-long-day",
    nation: "Mondstadt",
    title: "A Long Day in the Mountains",
    priority: "Alta",
    rewards: "Primogems, acesso a linhas de Dornman Port/Windrest Peak e progresso da 6.5",
    why: "E a cadeia principal de world quest da area nova de Mondstadt na versao 6.5.",
    action: "Comece por Dornman Port antes de limpar objetivos escondidos da regiao.",
  },
  {
    id: "mondstadt-dornman-wind-ceased",
    nation: "Mondstadt",
    title: "The Wind Has Ceased",
    priority: "Alta",
    rewards: "Primogems, Mora, EXP e avanco do arco Magic Mountain",
    why: "Subquest direta da cadeia nova e boa para abrir o fluxo de exploracao de Windrest Peak.",
    action: "Priorize se a quest aparecer automaticamente perto do norte de Dornman Port.",
  },
  {
    id: "mondstadt-dornman-tower-silence",
    nation: "Mondstadt",
    title: "Winds Beneath the Tower of Silence",
    priority: "Alta",
    rewards: "Primogems, chests e progresso da area nova de Dornman Port",
    why: "World quest introduzida na 6.5 com mecanicas locais e bom retorno de exploracao.",
    action: "Faca depois de abrir os waypoints principais de Windrest Peak.",
  },
  {
    id: "mondstadt-temple-space",
    nation: "Mondstadt",
    title: "Temple of Space - exploracao guiada",
    priority: "Media",
    rewards: "Chests, segredos de area, materiais locais e progresso de exploracao da 6.5",
    why: "Nao e uma daily, mas e uma boa rota quando voce quer limpar conteudo novo sem gastar resina.",
    action: "Entre quando tiver uma sessao livre; deixe para depois das comissoes, eventos e resina.",
  },
  {
    id: "mondstadt-dornman-boar",
    nation: "Mondstadt",
    title: "Forest Boar Pauses for the Bloom",
    priority: "Media",
    rewards: "Primogems, Mora e conclusao de world quest de Dornman Port",
    why: "Boa para limpar a lista da 6.5, mas menos estrutural que a cadeia principal.",
    action: "Faca quando estiver rodando a nova area e ja tiver gasto a resina do dia.",
  },
  {
    id: "mondstadt-dornman-hidden",
    nation: "Mondstadt",
    title: "Objetivos escondidos de Dornman Port",
    priority: "Baixa",
    rewards: "Chests, conquistas e pequenas quantidades de Primogems",
    why: "Inclui objetivos como Blown Away, Fishing for Fishie, Koch's Lost Cargo e Wind's Breath.",
    action: "Ignore em dias curtos; limpe quando estiver usando mapa interativo ou explorando 100%.",
  },
  {
    id: "mondstadt-in-the-mountains",
    nation: "Mondstadt",
    title: "In the Mountains",
    priority: "Alta",
    rewards: "Primogems, chests, acesso ao Peak of Vindagnyr e progresso de Dragonspine",
    why: "Desbloqueia dominio importante e limpa uma das maiores barreiras de exploracao.",
    action: "Faca cedo se ainda nao abriu o dominio de artefatos de Dragonspine.",
  },
  {
    id: "mondstadt-time-and-wind",
    nation: "Mondstadt",
    title: "Time and Wind",
    priority: "Media",
    rewards: "Primogems, Adventure EXP, chests e conquista",
    why: "Boa quest escondida de exploracao, mas nao bloqueia progressao central.",
    action: "Faca quando quiser limpar ilhas/achievements.",
  },
  {
    id: "mondstadt-small-errands",
    nation: "Mondstadt",
    title: "Errands curtas de NPC",
    priority: "Baixa",
    rewards: "Pouca Mora/EXP e baixo impacto",
    why: "Servem para completismo e reputacao, mas quase nunca mudam sua conta.",
    action: "Ignore quando estiver sem tempo.",
  },
  {
    id: "liyue-chi-yore",
    nation: "Liyue",
    title: "The Chi of Yore",
    priority: "Alta",
    rewards: "Primogems, Luxurious Chest e varias recompensas de exploracao",
    why: "Boa relacao tempo/recompensa e libera uma area classica de Liyue.",
    action: "Priorize se ainda nao fez Qingce Village.",
  },
  {
    id: "liyue-nine-pillars",
    nation: "Liyue",
    title: "Nine Pillars of Peace",
    priority: "Alta",
    rewards: "Primogems, Luxurious Chest, 5-star artifact e Mora via Dull Ring",
    why: "Uma das melhores quests antigas em recompensa bruta.",
    action: "Faca depois de coletar Geoculus e subir a Statue of The Seven.",
  },
  {
    id: "liyue-chasm-delvers",
    nation: "Liyue",
    title: "The Chasm Delvers",
    priority: "Alta",
    rewards: "Acesso ao Chasm subterraneo, Primogems, gadgets e muita exploracao",
    why: "Abre mapa inteiro e conteudo ligado a historia.",
    action: "Priorize antes de limpar missoes pequenas do Chasm.",
  },
  {
    id: "liyue-chenyu-blessing",
    nation: "Liyue",
    title: "Chenyu's Blessings of Sunken Jade",
    priority: "Alta",
    rewards: "Primogems, offering local, Spirit Carp e acesso pleno de Chenyu Vale",
    why: "Melhor rota para liberar recompensas grandes de Chenyu Vale.",
    action: "Faca se estiver explorando Chenyu.",
  },
  {
    id: "inazuma-sakura-cleansing",
    nation: "Inazuma",
    title: "Sacred Sakura Cleansing Ritual",
    priority: "Alta",
    rewards: "Primogems, memento lens, puzzles, chests e areas escondidas",
    why: "Quest essencial de Inazuma, desbloqueia mecanicas e recompensas.",
    action: "Priorize assim que Narukami estiver acessivel.",
  },
  {
    id: "inazuma-tatara",
    nation: "Inazuma",
    title: "Tatara Tales",
    priority: "Alta",
    rewards: "Primogems, acesso/seguranca em Tatarasuna e progresso em cadeia de dias",
    why: "Tem trava temporal, entao e melhor comecar cedo.",
    action: "Inicie mesmo que nao termine tudo no mesmo dia.",
  },
  {
    id: "inazuma-seirai",
    nation: "Inazuma",
    title: "Seirai Stormchasers",
    priority: "Alta",
    rewards: "Primogems, boss Thunder Manifestation e exploracao de Seirai",
    why: "Desbloqueia boss usado por personagens e limpa clima da ilha.",
    action: "Faca antes de farmar personagens que usam Thunder Manifestation.",
  },
  {
    id: "inazuma-tsurumi",
    nation: "Inazuma",
    title: "Through the Mists",
    priority: "Media",
    rewards: "Primogems, chests, exploracao de Tsurumi e conquistas",
    why: "Boa recompensa, mas e uma cadeia longa e segmentada.",
    action: "Faca quando tiver tempo para varios dias.",
  },
  {
    id: "sumeru-aranyaka",
    nation: "Sumeru",
    title: "Aranyaka",
    priority: "Alta",
    rewards: "Primogems, Songs/Gadgets, areas escondidas, Tree of Dreams e muito bau",
    why: "E a grande chave de exploracao da floresta de Sumeru.",
    action: "Prioridade maxima se voce quer 100% em Sumeru.",
  },
  {
    id: "sumeru-golden-slumber",
    nation: "Sumeru",
    title: "Golden Slumber",
    priority: "Alta",
    rewards: "Primogems, Scarlet Sand Slate, templos e exploracao do deserto",
    why: "Desbloqueia permissoes e caminhos que travam muitos puzzles.",
    action: "Faca antes de caçar baus no deserto.",
  },
  {
    id: "sumeru-dirge-bilqis",
    nation: "Sumeru",
    title: "The Dirge of Bilqis",
    priority: "Alta",
    rewards: "Primogems, Jinni gadget, areas do deserto e muitos chests",
    why: "Continua os sistemas do deserto e libera zonas grandes.",
    action: "Faca depois de Golden Slumber.",
  },
  {
    id: "sumeru-khvarena",
    nation: "Sumeru",
    title: "Khvarena of Good and Evil",
    priority: "Media",
    rewards: "Primogems, Sorush gadget e exploracao do norte do deserto",
    why: "Recompensa boa, mas longa e melhor para uma sessao dedicada.",
    action: "Faca quando for limpar Gavireh Lajavard/Farakhkert.",
  },
  {
    id: "fontaine-narzissenkreuz",
    nation: "Fontaine",
    title: "Ann of the Narzissenkreuz / In the Wake of Narcissus",
    priority: "Alta",
    rewards: "Primogems, lore, areas submarinas, chests e conclusao de cadeia longa",
    why: "E o eixo principal de varias quests de Fontaine.",
    action: "Priorize se estiver seguindo historia e exploracao.",
  },
  {
    id: "fontaine-ancient-colors",
    nation: "Fontaine",
    title: "Ancient Colors",
    priority: "Alta",
    rewards: "Primogems, Merusea Village, chests, lore e recursos de Fontaine",
    why: "Abre uma vila inteira e varias ramificacoes.",
    action: "Faca cedo em Fontaine.",
  },
  {
    id: "fontaine-unfinished-comedy",
    nation: "Fontaine",
    title: "Unfinished Comedy",
    priority: "Media",
    rewards: "Primogems, Credit Coupons, Fortress of Meropide e side quests",
    why: "Boa para lore e recompensas, mas menos urgente que Narzissenkreuz.",
    action: "Faca quando chegar na Fortress of Meropide.",
  },
  {
    id: "fontaine-canticles-harmony",
    nation: "Fontaine",
    title: "Canticles of Harmony",
    priority: "Alta",
    rewards: "Primogems, mapa de Remuria/Sea of Bygone Eras e recompensas de exploracao",
    why: "Desbloqueia conteudo grande de versoes posteriores de Fontaine.",
    action: "Priorize antes de limpar Remuria.",
  },
  {
    id: "natlan-chosen-dragons",
    nation: "Natlan",
    title: "In the Footsteps of the Chosen Dragons",
    priority: "Alta",
    rewards: "Primogems, exploracao, reputacao tribal e missoes de saurianos",
    why: "Conecta varias missoes escondidas e progresso de Natlan.",
    action: "Faca quando estiver explorando tribos e rotas de saurianos.",
  },
  {
    id: "natlan-lost-woods",
    nation: "Natlan",
    title: "Lost in the Woods / Rite of the Bold",
    priority: "Alta",
    rewards: "Primogems, acesso a cadeias principais de Natlan e exploracao",
    why: "Boa porta de entrada para o conteudo de mapa de Natlan.",
    action: "Priorize antes de missoes avulsas.",
  },
  {
    id: "natlan-every-aspect",
    nation: "Natlan",
    title: "Every Aspect of a Warrior",
    priority: "Media",
    rewards: "Reputacao tribal, Primogems e progresso de Flower-Feather Clan",
    why: "Boa se voce quer reputacao e recompensas de tribo.",
    action: "Faca depois das tres pre-quests de Qucusaurus.",
  },
  {
    id: "natlan-hidden-small",
    nation: "Natlan",
    title: "Quests pequenas escondidas de desafios",
    priority: "Baixa",
    rewards: "Chests e pequenas quantidades de Primogems",
    why: "Boas para 100%, mas dispersas e menos eficientes sem mapa interativo.",
    action: "Ignore em dia curto; volte quando limpar mapa.",
  },
  {
    id: "nodkrai-colors-emptiness",
    nation: "Nod-Krai",
    title: "Colors of Emptiness",
    priority: "Alta",
    rewards: "Primogems, progresso de Nod-Krai, chests e desbloqueios de historia local",
    why: "Cadeia central da regiao Luna/Nod-Krai.",
    action: "Priorize na 6.5 se ainda nao iniciou Nod-Krai.",
  },
  {
    id: "nodkrai-east-west",
    nation: "Nod-Krai",
    title: "East of the Moon, West of the Sun",
    priority: "Alta",
    rewards: "Primogems, lore, cadeia longa e progresso em areas de Nod-Krai",
    why: "Uma das maiores linhas de world quest da regiao.",
    action: "Faca em sessoes longas; salve como objetivo principal do dia.",
  },
  {
    id: "nodkrai-nightingale",
    nation: "Nod-Krai",
    title: "Nightingale's Song",
    priority: "Alta",
    rewards: "Primogems, chests, sequencia em capitulos e areas de quest",
    why: "Cadeia grande com capitulos e final, boa para progresso real.",
    action: "Priorize se quiser limpar a historia regional.",
  },
  {
    id: "nodkrai-polkka",
    nation: "Nod-Krai",
    title: "Polkka Beneath the Moon's Oracle",
    priority: "Media",
    rewards: "Primogems, chests e progresso lateral de Nod-Krai",
    why: "Boa quest, mas pode vir depois das cadeias maiores.",
    action: "Faca quando ja tiver adiantado Colors/Nightingale.",
  },
  {
    id: "nodkrai-bell-mourning",
    nation: "Nod-Krai",
    title: "Bell of Mourning Echoes",
    priority: "Media",
    rewards: "Primogems, chests e recompensas ligadas a Sigurd's Relics",
    why: "Requer passos previos e e boa para completismo eficiente.",
    action: "Faca quando ja estiver caçando relics/Wild Hunt spots.",
  },
  {
    id: "nodkrai-small-category",
    nation: "Nod-Krai",
    title: "Quests avulsas e NPCs pequenos",
    priority: "Baixa",
    rewards: "Recompensas menores, lore e chests pontuais",
    why: "Sao muitas e dispersas; melhor fazer quando estiver perto do NPC.",
    action: "Ignore se o objetivo do dia e Primogems rapidas.",
  },
];

const state = {
  characters: FALLBACK_CHARACTERS,
  weapons: FALLBACK_WEAPONS,
  roster: [],
  guideDaily: {},
  guideQuests: {},
  plans: {
    character: { mora: 0, bossDrops: 0 },
    talents: { mora: 0 },
    weapon: { mora: 0 },
    artifact: { mora: 0, exp: 0 },
    resin: { resin: 0 },
  },
  lastLists: {},
};

function number(value) {
  return Number.parseFloat(value) || 0;
}

function integer(value) {
  return Math.max(0, Math.floor(number(value)));
}

function read(id) {
  return number($(id).value);
}

function format(value) {
  return Math.round(value).toLocaleString("pt-BR");
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function addTotals(total, cost) {
  Object.entries(cost).forEach(([key, value]) => {
    if (key === "cap") return;
    total[key] = (total[key] || 0) + value;
  });
  return total;
}

function fillLevelOptions(select, min, max, selected) {
  select.replaceChildren();
  for (let level = min; level <= max; level += 1) {
    const option = document.createElement("option");
    option.value = String(level);
    option.textContent = String(level);
    if (level === selected) option.selected = true;
    select.append(option);
  }
}

function titleFromSlug(slug) {
  return String(slug)
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function normalizeEntity(item, id) {
  const data = typeof item === "object" && item ? item : {};
  const entityId = data.id || data.nameTextMapHash || id || data.name || "";
  const slug = String(entityId || data.name || "").toLowerCase().replace(/\s+/g, "-");
  return {
    ...data,
    id: slug,
    name: data.name || titleFromSlug(slug),
    rarity: Number(data.rarity || data.rank || data.stars || 0),
    vision: data.vision || data.element || data.vision_key || "",
    weapon: data.weapon || data.type || data.weapon_type || "",
  };
}

function mergeEntities(primary, extras) {
  const seenIds = new Set(primary.map((item) => item.id));
  const seenNames = new Set(primary.map((item) => item.name.toLowerCase()));
  const merged = [...primary];
  extras.forEach((item) => {
    if (seenIds.has(item.id) || seenNames.has(item.name.toLowerCase())) return;
    merged.push(item);
    seenIds.add(item.id);
    seenNames.add(item.name.toLowerCase());
  });
  return merged;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const WEAPON_TYPE_LABELS = {
  bow: "Arco",
  catalyst: "Catalisador",
  claymore: "Espadão",
  polearm: "Lança",
  sword: "Espada",
};

const PT_BR_EXACT = new Map([
  ["Agnidus Agate", "Ágata Agnidus"],
  ["Varunada Lazurite", "Lazurita Varunada"],
  ["Vayuda Turquoise", "Turquesa Vayuda"],
  ["Vajrada Amethyst", "Ametista Vajrada"],
  ["Nagadus Emerald", "Esmeralda Nagadus"],
  ["Shivada Jade", "Jade Shivada"],
  ["Prithiva Topaz", "Topázio Prithiva"],
  ["Traveler", "Viajante"],
  ["Wanderer", "Andarilho"],
  ["Raiden Shogun", "Shogun Raiden"],
  ["Sucrose", "Sacarose"],
  ["Hero's Wit", "EXP de Herói"],
  ["Adventurer's Experience", "EXP de Aventureiro"],
  ["Wanderer's Advice", "Conselho do Andarilho"],
  ["Mystic Enhancement Ore", "Minério de Refinamento Místico"],
  ["Fine Enhancement Ore", "Minério de Refinamento Fino"],
  ["Enhancement Ore", "Minério de Refinamento"],
  ["Sanctifying Essence", "Essência Santificadora"],
  ["Sanctifying Unction", "Unção Santificadora"],
  ["Main DPS", "DPS principal"],
  ["Sub DPS", "DPS secundário"],
  ["Flex", "Flexível"],
  ["Media", "Média"],
  ["National", "Nacional"],
  ["Freeze", "Congelamento"],
  ["Melt", "Fusão"],
  ["Aggravate", "Intensificação"],
  ["Hyperbloom", "Superflorescimento"],
  ["Bloom", "Florescimento"],
  ["Overload Chevreuse", "Sobrecarga com Chevreuse"],
  ["Taser seguro", "Eletrocarregado seguro"],
  ["Time flex", "Time flexível"],
  ["Hydro Hypercarry", "Carregador Hydro"],
  ["Vape carry", "Vaporização com DPS"],
  ["Vape Pyro", "Vaporização Pyro"],
  ["Vape double Hydro", "Vaporização com dois Hydro"],
  ["National driver", "Condutor Nacional"],
  ["Double Geo", "Geo duplo"],
  ["Hyperbloom base", "Superflorescimento base"],
  ["Hyperbloom Hydro", "Superflorescimento Hydro"],
  ["Hyperbloom acessivel", "Superflorescimento acessível"],
  ["Taser Hydro", "Eletrocarregado Hydro"],
  ["Bloom Dendro/Hydro", "Florescimento Dendro/Hydro"],
  ["Lunar-Bloom Core", "Núcleo de Florescimento Lunar"],
  ["Lunar-Bloom suporte", "Suporte de Florescimento Lunar"],
  ["Lunar-Bloom acessivel", "Florescimento Lunar acessível"],
  ["A Long Day in the Mountains", "Um Longo Dia nas Montanhas"],
  ["The Wind Has Ceased", "O Vento Cessou"],
  ["Winds Beneath the Tower of Silence", "Ventos Sob a Torre do Silêncio"],
  ["Temple of Space - exploracao guiada", "Templo do Espaço - exploração guiada"],
  ["Forest Boar Pauses for the Bloom", "O Javali da Floresta Pausa para a Flor"],
  ["In the Mountains", "Nas Montanhas"],
  ["Time and Wind", "Tempo e Vento"],
  ["Errands curtas de NPC", "Tarefas curtas de NPC"],
  ["The Chi of Yore", "O Chi de Outrora"],
  ["Nine Pillars of Peace", "Nove Pilares da Paz"],
  ["The Chasm Delvers", "Exploradores do Despenhadeiro"],
  ["Chenyu's Blessings of Sunken Jade", "Bênçãos do Jade Submerso de Chenyu"],
  ["Sacred Sakura Cleansing Ritual", "Ritual de Purificação da Sakura Sagrada"],
  ["Tatara Tales", "Contos de Tatara"],
  ["Seirai Stormchasers", "Caçadores da Tempestade de Seirai"],
  ["Through the Mists", "Através da Névoa"],
  ["Golden Slumber", "Sono Dourado"],
  ["The Dirge of Bilqis", "O Canto Fúnebre de Bilqis"],
  ["Khvarena of Good and Evil", "Khvarena do Bem e do Mal"],
  ["Ann of the Narzissenkreuz / In the Wake of Narcissus", "Ann de Narzissenkreuz / No Rastro de Narciso"],
  ["Ancient Colors", "Cores Antigas"],
  ["Unfinished Comedy", "Comédia Inacabada"],
  ["Canticles of Harmony", "Cânticos da Harmonia"],
  ["In the Footsteps of the Chosen Dragons", "Nos Passos dos Dragões Escolhidos"],
  ["Lost in the Woods / Rite of the Bold", "Perdido na Floresta / Ritual dos Corajosos"],
  ["Every Aspect of a Warrior", "Todo Aspecto de um Guerreiro"],
  ["Colors of Emptiness", "Cores do Vazio"],
  ["East of the Moon, West of the Sun", "A Leste da Lua, a Oeste do Sol"],
  ["Nightingale's Song", "Canção do Rouxinol"],
  ["Polkka Beneath the Moon's Oracle", "Polca Sob o Oráculo da Lua"],
  ["Bell of Mourning Echoes", "Eco do Sino de Luto"],
]);

const PT_BR_REPLACEMENTS = [
  ["Scroll of the Hero of Cinder City", "Pergaminho do Herói da Cidade das Cinzas"],
  ["Night of the Sky's Unveiling", "Noite da Revelação do Céu"],
  ["Silken Moon's Serenade", "Serenata da Lua de Seda"],
  ["Marechaussee Hunter", "Caçador das Sombras"],
  ["Emblem of Severed Fate", "Selo da Insulação"],
  ["Fragment of Harmonic Whimsy", "Fragmento da Harmonia Fantasiosa"],
  ["Flower of Paradise Lost", "Flor do Paraíso Perdido"],
  ["Golden Troupe", "Trupe Dourada"],
  ["Blizzard Strayer", "Herói Invernal"],
  ["Viridescent Venerer", "Sombra Verde"],
  ["Noblesse Oblige", "Antigo Ritual Real"],
  ["Deepwood Memories", "Memórias da Floresta"],
  ["Thundering Fury", "Trovão Furioso"],
  ["Gilded Dreams", "Sonhos Dourados"],
  ["Ocean-Hued Clam", "Concha Tingida pelo Mar"],
  ["Tenacity of the Millelith", "Millelith Firmes"],
  ["Vourukasha's Glow", "Brilho Vourukasha"],
  ["Instructor", "Instrutor"],
  ["Tenacity", "Millelith Firmes"],
  ["off-field", "fora de campo"],
  ["Off-field", "fora de campo"],
  ["Trigger Hyperbloom", "Ativador de Superflorescimento"],
  ["Lunar-Bloom", "Florescimento Lunar"],
  ["Hyperbloom", "Superflorescimento"],
  ["Bloom", "Florescimento"],
  ["Overload", "Sobrecarga"],
  ["Vape", "Vaporização"],
  ["Vaporize", "Vaporização"],
  ["Quicken", "Aceleração"],
  ["Aggravate", "Intensificação"],
  ["Spread", "Propagação"],
  ["Melt", "Fusão"],
  ["Freeze", "Congelamento"],
  ["Electro-Charged", "Eletrocarregado"],
  ["Lunar-Charged", "Carregamento Lunar"],
  ["Bountiful Cores", "Núcleos da Abundância"],
  ["Hypercarry", "carregador principal"],
  ["driver", "condutor"],
  ["Driver", "Condutor"],
  ["buffer", "suporte de bônus"],
  ["carries", "DPS em campo"],
  ["carry", "DPS"],
  ["full", "com"],
  ["flex", "flexível"],
  ["shred", "redução de resistência"],
  ["Shred", "redução de resistência"],
  ["Buff", "Bônus"],
  ["buff", "bônus"],
  ["buffs", "bônus"],
  ["premium", "avançado"],
  ["Stats", "Atributos"],
  ["Substats", "Subatributos"],
  ["CRIT Rate", "Taxa CRIT"],
  ["CRIT DMG", "Dano CRIT"],
  ["ATK%", "ATQ%"],
  ["ATK", "ATQ"],
  ["HP%", "Vida%"],
  ["HP", "Vida"],
  ["EM", "Prof. Elemental"],
  ["Sliver", "Lasca"],
  ["Fragment", "Fragmento"],
  ["Chunk", "Pedaço"],
  ["Gemstone", "Gema"],
  ["Primogems", "Primogemas"],
  ["Adventure EXP", "EXP de Aventura"],
  ["AR EXP", "EXP de RA"],
  ["Luxurious Chest", "Baú Luxuoso"],
  ["chests", "baús"],
  ["Chests", "Baús"],
  ["5-star artifact", "artefato 5 estrelas"],
  ["Dull Ring", "Anel Opaco"],
  ["World quest", "missão do mundo"],
  ["world quest", "missão do mundo"],
  ["daily", "diária"],
  ["Adeptal Energy", "Energia Adeptal"],
  ["Realm Currency", "Moeda do Paraíso"],
  ["Dream Solvent", "Solvente dos Sonhos"],
  ["Encounter Points", "Pontos de Encontro"],
  ["Surveying & Mapping", "Pesquisa e Mapeamento"],
  ["Rapid Capture", "Captura Rápida"],
  ["Ley Line Overflow", "Transbordamento das Linhas Ley"],
  ["billets", "moldes"],
  ["Drops", "Espólios"],
  ["drops", "espólios"],
  ["RNG", "aleatoriedade"],
  ["Magic Mountain", "Montanha Mágica"],
  ["Windrest Peak", "Pico do Descanso do Vento"],
  ["Temple of Space", "Templo do Espaço"],
  ["Dornman Port", "Porto de Dornman"],
  ["Dragonspine", "Espinha do Dragão"],
  ["Peak of Vindagnyr", "Pico de Vindagnyr"],
  ["The Chasm", "Despenhadeiro"],
  ["Chasm", "Despenhadeiro"],
  ["Memento Lens", "Lente das Memórias"],
  ["memento lens", "Lente das Memórias"],
  ["Thunder Manifestation", "Manifestação Trovejante"],
  ["Songs/Gadgets", "Canções/recursos"],
  ["Gadgets", "recursos"],
  ["gadgets", "recursos"],
  ["Tree of Dreams", "Árvore dos Sonhos"],
  ["Scarlet Sand Slate", "Lousa das Areias Escarlates"],
  ["Jinni", "Gênio"],
  ["Merusea Village", "Vila Merusea"],
  ["Credit Coupons", "Cupons de Crédito"],
  ["Fortress of Meropide", "Fortaleza Meropide"],
  ["Sea of Bygone Eras", "Mar de Eras Passadas"],
  ["Flower-Feather Clan", "Clã Pluma-Flora"],
  ["Sigurd's Relics", "Relíquias de Sigurd"],
  ["Wild Hunt", "Caçada Selvagem"],
  ["Quest", "Missão"],
  ["quest", "missão"],
  ["Quests", "Missões"],
  ["pre-quests", "pré-missões"],
  ["Offering", "oferenda"],
  ["offering", "oferenda"],
  ["Spirit Carp", "Carpas Espirituais"],
  ["Banner", "Oração"],
  ["banner", "oração"],
  ["Pity", "contador"],
  ["hard pity", "limite máximo"],
  ["Hard pity", "limite máximo"],
  ["Starglitter", "Brilho Estrelar"],
  ["Stardust", "Poeira Estrelar"],
  ["Genesis", "Gênesis"],
  ["Bosses", "Chefes"],
  ["Boss", "Chefe"],
  ["boss", "chefe"],
  ["Domain", "Domínio"],
  ["domain", "domínio"],
  ["Versao", "Versão"],
  ["Comissoes", "Comissões"],
  ["comissoes", "comissões"],
  ["Missoes", "Missões"],
  ["missoes", "missões"],
  ["versao", "versão"],
  ["Portatil", "Portátil"],
  ["portatil", "portátil"],
  ["Precisao", "Precisão"],
  ["precisao", "precisão"],
  ["Transmissao", "Transmissão"],
  ["transmissao", "transmissão"],
  ["Purpura", "Púrpura"],
  ["purpura", "púrpura"],
  ["Nucleo", "Núcleo"],
  ["nucleo", "núcleo"],
  ["Inscricao", "Inscrição"],
  ["inscricao", "inscrição"],
  ["Furacao", "Furacão"],
  ["furacao", "furacão"],
  ["Lampada", "Lâmpada"],
  ["lampada", "lâmpada"],
  ["Gelida", "Gélida"],
  ["gelida", "gélida"],
  ["Luminifera", "Luminífera"],
  ["luminifera", "luminífera"],
  ["Coracao", "Coração"],
  ["coracao", "coração"],
  ["Justica", "Justiça"],
  ["justica", "justiça"],
  ["Resistencia", "Resistência"],
  ["resistencia", "resistência"],
  ["Diligencia", "Diligência"],
  ["diligencia", "diligência"],
  ["Insignia", "Insígnia"],
  ["insignia", "insígnia"],
  ["Mascara", "Máscara"],
  ["mascara", "máscara"],
  ["Mao", "Mão"],
  ["mao", "mão"],
  ["Osseo", "Ósseo"],
  ["osseo", "ósseo"],
  ["Fragil", "Frágil"],
  ["fragil", "frágil"],
  ["Negacao", "Negação"],
  ["negacao", "negação"],
  ["Ignicao", "Ignição"],
  ["ignicao", "ignição"],
  ["Enigmatica", "Enigmática"],
  ["enigmatica", "enigmática"],
  ["Agua", "Água"],
  ["agua", "água"],
  ["Elisio", "Elísio"],
  ["elisio", "elísio"],
  ["elisia", "elísia"],
  ["Eterno Amber", "Eterno Âmbar"],
  ["Crisantemo", "Crisântemo"],
  ["crisantemo", "crisântemo"],
  ["Perola", "Pérola"],
  ["perola", "pérola"],
  ["Lirio", "Lírio"],
  ["lirio", "lírio"],
  ["Maritimo", "Marítimo"],
  ["maritimo", "marítimo"],
  ["regiao", "região"],
  ["regioes", "regiões"],
  ["exploracao", "exploração"],
  ["reputacao", "reputação"],
  ["conclusao", "conclusão"],
  ["historia", "história"],
  ["aplicacao", "aplicação"],
  ["rotacao", "rotação"],
  ["rotacoes", "rotações"],
  ["reacoes", "reações"],
  ["ressonancia", "ressonância"],
  ["avaliacao", "avaliação"],
  ["sugestao", "sugestão"],
  ["sugestoes", "sugestões"],
  ["diarias", "diárias"],
  ["diaria", "diária"],
  ["expedicoes", "expedições"],
  ["Ascensoes", "Ascensões"],
  ["ascensoes", "ascensões"],
  ["calendario", "calendário"],
  ["conteudo", "conteúdo"],
  ["permissoes", "permissões"],
  ["ramificacoes", "ramificações"],
  ["seguranca", "segurança"],
  ["entao", "então"],
  ["comecar", "começar"],
  ["sequencia", "sequência"],
  ["capitulos", "capítulos"],
  ["previos", "prévios"],
  ["Sao", "São"],
  [" e e boa", " e é boa"],
  ["dia e Primogemas", "dia é Primogemas"],
  ["sessao", "sessão"],
  ["area", "área"],
  ["areas", "áreas"],
  ["Nao", "Não"],
  ["nao", "não"],
  ["Faca", "Faça"],
  ["faca", "faça"],
  ["ja tiver", "já tiver"],
  ["ja estiver", "já estiver"],
  ["Colors/Nightingale", "Cores/Rouxinol"],
  ["relics", "relíquias"],
  ["spots", "pontos"],
  ["tres", "três"],
  ["rapidas", "rápidas"],
  ["possiveis", "possíveis"],
  ["viaveis", "viáveis"],
  ["generico", "genérico"],
  ["generica", "genérica"],
  ["Generico", "Genérico"],
  ["Generica", "Genérica"],
  ["media", "média"],
  ["basico", "básico"],
  ["basica", "básica"],
  ["fragil", "frágil"],
  ["dominios", "domínios"],
  ["Dominios", "Domínios"],
  ["Minerio", "Minério"],
  ["minerio", "minério"],
  ["Minerios", "Minérios"],
  ["minerios", "minérios"],
  ["ascensao", "ascensão"],
  ["Nivel", "Nível"],
  ["nivel", "nível"],
  ["necessario", "necessário"],
  ["Pecas", "Peças"],
  ["pecas", "peças"],
  ["Calice", "Cálice"],
  ["calice", "cálice"],
  ["Proxima", "Próxima"],
  ["proxima", "próxima"],
  ["Premios", "Prêmios"],
  ["premios", "prêmios"],
  ["Direcao", "Direção"],
  ["direcao", "direção"],
  ["Atencao", "Atenção"],
  ["atencao", "atenção"],
  ["bau", "baú"],
  ["baus", "baús"],
  ["confortavel", "confortável"],
  ["dificil", "difícil"],
  ["voce", "você"],
].sort((a, b) => b[0].length - a[0].length);

function ptBr(value) {
  if (value == null) return "";
  let text = String(value);
  if (PT_BR_EXACT.has(text)) return PT_BR_EXACT.get(text);
  PT_BR_REPLACEMENTS.forEach(([from, to]) => {
    text = text.replaceAll(from, to);
  });
  return text;
}

function displayWeaponType(value) {
  const key = keyForName(value);
  return WEAPON_TYPE_LABELS[key] || ptBr(value || "");
}

function displayCharacterMetaPart(value) {
  const key = keyForName(value);
  return WEAPON_TYPE_LABELS[key] || ptBr(value || "");
}

function displayEntityName(entity) {
  return ptBr(entity?.name || "");
}

function displayCharacterName(character) {
  const name = displayEntityName(character);
  if (!character) return name;
  const isTraveler = character.id?.startsWith("traveler") || keyForName(character.name) === "traveler";
  if (!isTraveler) return name;
  const element = displayCharacterMetaPart(character.vision);
  return element ? `${name} (${element})` : name;
}

const WEAPON_NAME_EXACT = new Map([
  ["A Thousand Floating Dreams", "Mil Sonhos Flutuantes"],
  ["Alley Hunter", "Caçador do Beco"],
  ["Amber Catalyst", "Catalisador de Âmbar"],
  ["Amos' Bow", "Arco de Amos"],
  ["Apprentice's Notes", "Anotações do Aprendiz"],
  ["Ballad of the Boundless Blue", "Balada do Azul Ilimitado"],
  ["Ballad Of The Fjords", "Balada dos Fiordes"],
  ["Beacon of the Reed Sea", "Farol do Mar de Juncos"],
  ["Beginner's Protector", "Protetor do Iniciante"],
  ["Black Tassel", "Borla Preta"],
  ["Blackcliff Agate", "Ágata do Penhasco Obscuro"],
  ["Blackcliff Longsword", "Espada Longa do Penhasco Obscuro"],
  ["Blackcliff Pole", "Lança do Penhasco Obscuro"],
  ["Blackcliff Slasher", "Foice do Penhasco Obscuro"],
  ["Blackcliff Warbow", "Arco de Guerra do Penhasco Obscuro"],
  ["Bloodtainted Greatsword", "Espadão Ensanguentado"],
  ["Calamity Queller", "Subjugadora de Calamidades"],
  ["Cashflow Supervision", "Supervisão de Fluxo de Caixa"],
  ["Cinnabar Spindle", "Haste de Cinábrio"],
  ["Compound Bow", "Arco Composto"],
  ["Cool Steel", "Aço Frio"],
  ["Crane's Echoing Call", "Chamado Ecoante da Garça"],
  ["Crescent Pike", "Pique Crescente"],
  ["Crimson Moon's Semblance", "Semblante da Lua Carmesim"],
  ["Dark Iron Sword", "Espada de Ferro Negro"],
  ["Deathmatch", "Lança do Duelo"],
  ["Debate Club", "Porrete do Debate"],
  ["Dialogues of the Desert Sages", "Diálogos dos Sábios do Deserto"],
  ["Dodoco Tales", "Contos de Dodoco"],
  ["Dragon's Bane", "Perdição do Dragão"],
  ["Dragonspine Spear", "Lança de Espinha do Dragão"],
  ["Dull Blade", "Lâmina Sem Fio"],
  ["Ebony Bow", "Arco de Ébano"],
  ["Elegy for the End", "Elegia do Suspiro Final"],
  ["Emerald Orb", "Orbe Esmeralda"],
  ["End of the Line", "Fim da Linha"],
  ["Engulfing Lightning", "Luz do Cortador de Grama"],
  ["Everlasting Moonglow", "Luz Lunar Eterna"],
  ["Eye of Perception", "Olho da Percepção"],
  ["Fading Twilight", "Crepúsculo Desvanecido"],
  ["Favonius Codex", "Códice de Favonius"],
  ["Favonius Greatsword", "Espadão de Favonius"],
  ["Favonius Lance", "Lança de Favonius"],
  ["Favonius Sword", "Espada de Favonius"],
  ["Favonius Warbow", "Arco de Guerra de Favonius"],
  ["Ferrous Shadow", "Sombra de Ferro"],
  ["Festering Desire", "Desejo Pútrido"],
  ["Fillet Blade", "Lâmina de Filetar"],
  ["Finale Of The Deep", "Finale das Profundezas"],
  ["Fleuve Cendre Ferryman", "Barqueiro de Fleuve Cendre"],
  ["Flowing Purity", "Pureza Fluente"],
  ["Forest Regalia", "Regalia da Floresta"],
  ["Freedom-Sworn", "Juramento pela Liberdade"],
  ["Frostbearer", "Fruto do Sabugueiro"],
  ["Fruit of Fulfillment", "Fruto da Realização"],
  ["Hakushin Ring", "Anel de Hakushin"],
  ["Halberd", "Alabarda"],
  ["Harbinger of Dawn", "Prenúncio do Alvorecer"],
  ["Hunter's Bow", "Arco do Caçador"],
  ["Hunter's Path", "Caminho do Caçador"],
  ["Ibis Piercer", "Bico da Íbis"],
  ["Iron Point", "Ponta de Ferro"],
  ["Iron Sting", "Espinho de Ferro"],
  ["Jadefall's Splendor", "Esplendor do Jade Caído"],
  ["Kagura's Verity", "Veracidade de Kagura"],
  ["Key of Khaj-Nisut", "Chave de Khaj-Nisut"],
  ["King's Squire", "Escudeiro do Rei"],
  ["Kitain Cross Spear", "Lança Cruzada de Kitain"],
  ["Light of Foliar Incision", "Luz da Incisão Foliar"],
  ["Lion's Roar", "Rugido do Leão"],
  ["Lithic Blade", "Lâmina Lítica"],
  ["Lithic Spear", "Lança Lítica"],
  ["Lost Prayer to the Sacred Winds", "Oração Perdida aos Ventos Sagrados"],
  ["Magic Guide", "Guia de Magia"],
  ["Mailed Flower", "Flor Encouraçada"],
  ["Makaira Aquamarine", "Água-Marinha de Makaira"],
  ["Memory of Dust", "Memória da Poeira"],
  ["Messenger", "Mensageiro"],
  ["Missive Windspear", "Lança do Vento Epistolar"],
  ["Mistsplitter Reforged", "Cortador de Névoa Reforjado"],
  ["Mitternachts Waltz", "Valsa da Meia-Noite"],
  ["Moonpiercer", "Perfurador da Lua"],
  ["Mouun's Moon", "Lua de Mouun"],
  ["Oathsworn Eye", "Olho do Juramento"],
  ["Old Merc's Pal", "Companheiro do Velho Mercenário"],
  ["Otherworldly Story", "História de Outro Mundo"],
  ["Pocket Grimoire", "Grimório de Bolso"],
  ["Polar Star", "Estrela Polar"],
  ["Predator", "Predador"],
  ["Primordial Jade Cutter", "Cortador de Jade Primordial"],
  ["Primordial Jade Winged-Spear", "Lança de Jade Primitiva"],
  ["Prospector's Drill", "Broca do Prospector"],
  ["Prototype Amber", "Protótipo Âmbar"],
  ["Prototype Archaic", "Protótipo Arcaico"],
  ["Prototype Crescent", "Protótipo Crescente"],
  ["Prototype Rancour", "Protótipo Rancor"],
  ["Prototype Starglitter", "Protótipo Brilho Estelar"],
  ["Rainslasher", "Cortador de Chuva"],
  ["Raven Bow", "Arco do Corvo"],
  ["Recurve Bow", "Arco Recurvo"],
  ["Redhorn Stonethresher", "Chifres Vermelhos Destruidores de Pedras"],
  ["Rightful Reward", "Recompensa Justa"],
  ["Royal Bow", "Arco Real"],
  ["Royal Greatsword", "Espadão Real"],
  ["Royal Grimoire", "Grimório Real"],
  ["Royal Longsword", "Espada Longa Real"],
  ["Royal Spear", "Lança Real"],
  ["Rust", "Ferrugem"],
  ["Sacrificial Bow", "Arco do Sacrifício"],
  ["Sacrificial Fragments", "Fragmentos do Sacrifício"],
  ["Sacrificial Greatsword", "Espadão do Sacrifício"],
  ["Sacrificial Jade", "Jade do Sacrifício"],
  ["Sacrificial Sword", "Espada do Sacrifício"],
  ["Sapwood Blade", "Lâmina da Madeira Macia"],
  ["Seasoned Hunter's Bow", "Arco do Caçador Experiente"],
  ["Serpent Spine", "Espinha de Serpente"],
  ["Sharpshooter's Oath", "Juramento do Atirador"],
  ["Silver Sword", "Espada de Prata"],
  ["Skyrider Greatsword", "Espadão do Cavaleiro do Céu"],
  ["Skyrider Sword", "Espada do Cavaleiro do Céu"],
  ["Skyward Atlas", "Atlas Celestial"],
  ["Skyward Blade", "Espada Celestial"],
  ["Skyward Harp", "Harpa Celestial"],
  ["Skyward Pride", "Orgulho Celestial"],
  ["Skyward Spine", "Espinha Celestial"],
  ["Slingshot", "Estilingue"],
  ["Snow-Tombed Starsilver", "Estrela de Prata Sepultada na Neve"],
  ["Solar Pearl", "Pérola Solar"],
  ["Song of Broken Pines", "Canção dos Pinhos Quebrados"],
  ["Song Of Stillness", "Canção da Quietude"],
  ["Splendor of Tranquil Waters", "Esplendor das Águas Tranquilas"],
  ["Staff of Homa", "Báculo de Homa"],
  ["Summit Shaper", "Cortador de Montanhas"],
  ["Sword of Descension", "Espada da Descida"],
  ["Sword of Narzissenkreuz", "Espada de Narzissenkreuz"],
  ["Talking Stick", "Bastão Falante"],
  ["The Alley Flash", "Clarão do Beco"],
  ["The Bell", "O Sino"],
  ["The Black Sword", "A Espada Negra"],
  ["The Catch", "A Fisgada"],
  ["The Dockhand's Assistant", "Assistente do Estivador"],
  ["The First Great Magic", "A Primeira Grande Magia"],
  ["The Flute", "A Flauta"],
  ["The Stringless", "Último Acorde"],
  ["The Unforged", "Espada Áspera"],
  ["The Viridescent Hunt", "Caçada Esverdeada"],
  ["The Widsith", "Sinfonia dos Indolentes"],
  ["Thrilling Tales of Dragon Slayers", "Histórias Extraordinárias de Caçadores de Dragões"],
  ["Thundering Pulse", "Pulso Trovejante"],
  ["Tidal Shadow", "Sombra da Maré"],
  ["Tome of the Eternal Flow", "Tomo do Fluxo Eterno"],
  ["Traveler's Handy Sword", "Espada Útil do Viajante"],
  ["Tulaytullah's Remembrance", "Recordação de Tulaytullah"],
  ["Twin Nephrite", "Nefrita Gêmea"],
  ["Ultimate Overlord's Mega Magic Sword", "Mega Espada Mágica do Supremo Soberano"],
  ["Verdict", "Veredito"],
  ["Vortex Vanquisher", "Perfuradora do Vórtice"],
  ["Wandering Evenstar", "Estrela Errante"],
  ["Waster Greatsword", "Espadão do Treino"],
  ["Wavebreaker's Fin", "Barbatana do Quebra-Ondas"],
  ["White Iron Greatsword", "Espadão de Ferro Branco"],
  ["White Tassel", "Borla Branca"],
  ["Whiteblind", "Sombra Branca"],
  ["Windblume Ode", "Ode à Brisa Florescente"],
  ["Wine and Song", "Vinho e Música"],
  ["Wolf-Fang", "Presa de Lobo"],
  ["Wolf's Gravestone", "Túmulo do Lobo"],
  ["Xiphos' Moonlight", "Luar de Xiphos"],
]);

const WEAPON_WORD_LABELS = new Map([
  ["A", "Um"],
  ["The", "O"],
  ["Of", "de"],
  ["of", "de"],
  ["And", "e"],
  ["and", "e"],
  ["Bow", "Arco"],
  ["Sword", "Espada"],
  ["Greatsword", "Espadão"],
  ["Spear", "Lança"],
  ["Pole", "Lança"],
  ["Catalyst", "Catalisador"],
  ["Blade", "Lâmina"],
  ["Staff", "Báculo"],
  ["Tome", "Tomo"],
  ["Book", "Livro"],
  ["Magic", "Magia"],
  ["Hunter", "Caçador"],
  ["Hunter's", "do Caçador"],
  ["Traveler", "Viajante"],
  ["Traveler's", "do Viajante"],
  ["Reward", "Recompensa"],
  ["Rightful", "Justa"],
  ["Dreams", "Sonhos"],
  ["Floating", "Flutuantes"],
  ["Thousand", "Mil"],
  ["Ballad", "Balada"],
  ["Blue", "Azul"],
  ["Beacon", "Farol"],
  ["Sea", "Mar"],
  ["Reed", "Juncos"],
  ["Black", "Preta"],
  ["White", "Branca"],
  ["Iron", "Ferro"],
  ["Dark", "Negro"],
  ["Steel", "Aço"],
  ["Moon", "Lua"],
  ["Crimson", "Carmesim"],
  ["Light", "Luz"],
  ["Lightning", "Relâmpago"],
  ["Thunder", "Trovão"],
  ["Thundering", "Trovejante"],
  ["Skyward", "Celestial"],
  ["Sacred", "Sagrados"],
  ["Winds", "Ventos"],
  ["Forest", "Floresta"],
  ["Freedom", "Liberdade"],
  ["Song", "Canção"],
  ["Memory", "Memória"],
  ["Dust", "Poeira"],
  ["Dawn", "Alvorecer"],
  ["Twilight", "Crepúsculo"],
  ["End", "Fim"],
  ["Line", "Linha"],
  ["Dragon", "Dragão"],
  ["Dragon's", "do Dragão"],
  ["Wolf", "Lobo"],
  ["Wolf's", "do Lobo"],
  ["Jade", "Jade"],
  ["Pearl", "Pérola"],
  ["Solar", "Solar"],
  ["Royal", "Real"],
  ["Prototype", "Protótipo"],
  ["Crescent", "Crescente"],
  ["Oath", "Juramento"],
  ["Tales", "Contos"],
  ["Story", "História"],
  ["Stories", "Histórias"],
  ["Slayers", "Caçadores"],
  ["Eternal", "Eterno"],
  ["Flow", "Fluxo"],
  ["Flowing", "Fluente"],
  ["Purity", "Pureza"],
  ["Stillness", "Quietude"],
  ["Tranquil", "Tranquilas"],
  ["Waters", "Águas"],
  ["Broken", "Quebrados"],
  ["Pines", "Pinhos"],
  ["First", "Primeira"],
  ["Great", "Grande"],
  ["Mega", "Mega"],
  ["Ultimate", "Supremo"],
  ["Overlord", "Soberano"],
  ["Handy", "Útil"],
  ["Wandering", "Errante"],
  ["Fang", "Presa"],
  ["Gravestone", "Túmulo"],
  ["Moonlight", "Luar"],
]);

function displayWeaponName(weapon) {
  const raw = weapon?.name || "";
  if (!raw) return "";
  if (WEAPON_NAME_EXACT.has(raw)) return WEAPON_NAME_EXACT.get(raw);
  const translated = raw.replace(/\b[A-Za-z]+(?:'[A-Za-z]+)?\b/g, (word) => WEAPON_WORD_LABELS.get(word) || word);
  return ptBr(translated);
}

const CHARACTER_AUTO_MATERIAL_FIELDS = {
  charSpecialtyName: "specialty",
  charBossName: "boss",
  charCommonName: "common",
  talentBookName: "talentBook",
  talentCommonName: "talentCommon",
  talentWeeklyName: "weekly",
};

const WEAPON_AUTO_MATERIAL_FIELDS = {
  weaponDomainName: "domain",
  weaponEliteName: "elite",
  weaponCommonName: "common",
};

const MATERIAL_FIELD_DEFAULTS = {
  charSpecialtyName: ["Especialidade local"],
  charBossName: ["Material de chefe normal"],
  charCommonName: ["Material de monstro"],
  talentBookName: ["Livro de talento"],
  talentCommonName: ["Material de monstro"],
  talentWeeklyName: ["Material de chefe semanal"],
  weaponDomainName: ["Material de ascensão da arma", "Material de ascensao da arma"],
  weaponEliteName: ["Material de elite"],
  weaponCommonName: ["Material comum"],
};

function materialPresetKey(entity) {
  const id = keyForName(entity?.id || "");
  const name = keyForName(entity?.name || "");
  return CHARACTER_MATERIAL_ALIASES[id] || CHARACTER_MATERIAL_ALIASES[name] || id || name;
}

function characterMaterialPreset(character) {
  if (!character) return null;
  const direct = materialPresetKey(character);
  return CHARACTER_MATERIAL_PRESETS[direct] || CHARACTER_MATERIAL_PRESETS[keyForName(character.name)] || null;
}

function weaponMaterialPreset(weapon) {
  if (!weapon) return null;
  return WEAPON_MATERIAL_PRESETS[keyForName(weapon.id)] || WEAPON_MATERIAL_PRESETS[keyForName(weapon.name)] || null;
}

function knownAutoMaterialValues(fieldId) {
  const prop = CHARACTER_AUTO_MATERIAL_FIELDS[fieldId] || WEAPON_AUTO_MATERIAL_FIELDS[fieldId];
  const presets = CHARACTER_AUTO_MATERIAL_FIELDS[fieldId] ? CHARACTER_MATERIAL_PRESETS : WEAPON_MATERIAL_PRESETS;
  const values = [...(MATERIAL_FIELD_DEFAULTS[fieldId] || [])];
  Object.values(presets).forEach((preset) => {
    if (preset?.[prop]) values.push(preset[prop], ptBr(preset[prop]));
  });
  return new Set(values.filter(Boolean).map((value) => keyForName(value)));
}

function applyAutoMaterialField(fieldId, value) {
  const field = $(`#${fieldId}`);
  if (!field || !value) return;
  const normalized = keyForName(field.value);
  const defaultValues = new Set((MATERIAL_FIELD_DEFAULTS[fieldId] || []).map((item) => keyForName(item)));
  const knownValues = knownAutoMaterialValues(fieldId);
  const canReplace =
    !field.value.trim() ||
    field.dataset.autoMaterial === "true" ||
    defaultValues.has(normalized) ||
    knownValues.has(normalized);
  if (!canReplace) return;
  field.value = ptBr(value);
  field.dataset.autoMaterial = "true";
  field.title = "Preenchido automaticamente pelo personagem/arma selecionado. Você ainda pode editar.";
}

function applyCharacterMaterialPreset(character) {
  const preset = characterMaterialPreset(character);
  if (!preset) return;
  Object.entries(CHARACTER_AUTO_MATERIAL_FIELDS).forEach(([fieldId, prop]) => {
    applyAutoMaterialField(fieldId, preset[prop]);
  });
}

function applyWeaponMaterialPreset(weapon) {
  const preset = weaponMaterialPreset(weapon);
  if (!preset) return;
  Object.entries(WEAPON_AUTO_MATERIAL_FIELDS).forEach(([fieldId, prop]) => {
    applyAutoMaterialField(fieldId, preset[prop]);
  });
}

function keyForName(name) {
  return String(name || "")
    .trim()
    .toLowerCase();
}

function getArtifactRec(name, role = "", selectedCharacter = null) {
  const selectedKey = selectedCharacter?.id || "";
  const exact = ARTIFACT_RECS[keyForName(name)] || ARTIFACT_RECS[selectedKey];
  if (exact) return exact;

  const roleKey = keyForName(role);
  const element = keyForName(selectedCharacter?.vision);
  if (roleKey.includes("healer") || roleKey.includes("cura")) {
    return {
      set: "Noblesse Oblige x4 ou set de cura do personagem",
      stats: "Areia HP ou Recarga / Calice HP / Coroa Cura",
      substats: "Recarga > HP%",
    };
  }
  if (roleKey.includes("vv") || element === "anemo") {
    return {
      set: "Viridescent Venerer x4",
      stats: "Areia EM / Calice EM / Coroa EM",
      substats: "EM > Recarga",
    };
  }
  if (element === "dendro") {
    return {
      set: "Deepwood Memories x4 ou Gilded Dreams x4",
      stats: "Areia EM / Calice Dendro ou EM / Coroa CRIT ou EM",
      substats: "EM > CRIT > Recarga",
    };
  }
  return {
    set: "Set de dano do personagem ou Emblem/Noblesse conforme funcao",
    stats: "Areia atributo principal / Calice dano elemental / Coroa CRIT",
    substats: "CRIT > Recarga > atributo de escala",
  };
}

function enkaIconName(name) {
  const key = keyForName(name);
  if (ENKA_ICON_OVERRIDES[key]) return ENKA_ICON_OVERRIDES[key];
  return String(name || "")
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .trim()
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("_");
}

function wikiFileName(name) {
  return String(name || "")
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .trim()
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("_");
}

function setImageWithFallback(image, urls, onSuccess, onFail) {
  const queue = urls.filter(Boolean);
  image.onload = null;
  image.onerror = null;
  image.removeAttribute("src");

  const next = () => {
    const url = queue.shift();
    if (!url) {
      if (onFail) onFail();
      return;
    }
    image.onload = () => {
      if (onSuccess) onSuccess(url);
    };
    image.onerror = next;
    image.src = url;
  };
  next();
}

function characterImageUrls(character, type) {
  if (!character) return [];
  const asset = CHARACTER_ASSETS[character.id] || {};
  const wikiName = wikiFileName(character.name);
  if (type === "icon") {
    return [
      ...(Array.isArray(asset.icon) ? asset.icon : [asset.icon]),
      `${API_BASE}/characters/${character.id}/icon-big`,
      `${API_BASE}/characters/${character.id}/icon`,
      `https://genshin-impact.fandom.com/wiki/Special:Redirect/file/${wikiName}_Icon.png`,
      `https://enka.network/ui/UI_AvatarIcon_${enkaIconName(character.name)}.png`,
    ];
  }
  return [
    ...(Array.isArray(asset.hero) ? asset.hero : [asset.hero]),
    `https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Character_${wikiName}_Wish.png`,
    `https://genshin-impact.fandom.com/wiki/Special:Redirect/file/Character_${wikiName}_Card.png`,
    `${API_BASE}/characters/${character.id}/gacha-splash`,
    `${API_BASE}/characters/${character.id}/gacha-card`,
    `${API_BASE}/characters/${character.id}/portrait`,
    `${API_BASE}/characters/${character.id}/icon-big`,
    `https://enka.network/ui/UI_Gacha_AvatarImg_${enkaIconName(character.name)}.png`,
  ];
}

function memberIconUrls(name) {
  const id = keyForName(name).replace(/\s+/g, "-");
  const asset = CHARACTER_ASSETS[id] || {};
  const wikiName = wikiFileName(name);
  return [
    ...(Array.isArray(asset.icon) ? asset.icon : [asset.icon]),
    `https://genshin-impact.fandom.com/wiki/Special:Redirect/file/${wikiName}_Icon.png`,
    `https://enka.network/ui/UI_AvatarIcon_${enkaIconName(name)}.png`,
    `${API_BASE}/characters/${id}/icon`,
  ];
}

function initialsForName(name, fallback = "GI") {
  return String(name || "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase() || fallback;
}

function selectedOptionText(select) {
  return select.selectedOptions[0]?.textContent || "";
}

function setApiStatus(kind, text) {
  const status = $("#apiStatus");
  status.classList.remove("online", "offline");
  if (kind) status.classList.add(kind);
  status.querySelector("span:last-child").textContent = text;
}

async function fetchJson(url) {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), 7000);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } finally {
    window.clearTimeout(timer);
  }
}

function apiCollectionEntries(collection) {
  if (Array.isArray(collection)) {
    return collection.map((item, index) => [item?.id || item?.name || String(index), item]);
  }
  if (collection && typeof collection === "object") {
    return Object.entries(collection);
  }
  return [];
}

function mergeApiCollections(localized, fallback) {
  const merged = new Map();
  const put = (id, item, prefer) => {
    const data = typeof item === "object" && item ? item : { name: String(item || id) };
    const key = keyForName(data.id || id || data.name);
    const previous = merged.get(key) || {};
    merged.set(key, prefer ? { ...previous, ...data, id: data.id || previous.id || id } : { ...data, id: data.id || id });
  };

  apiCollectionEntries(fallback).forEach(([id, item]) => put(id, item, false));
  apiCollectionEntries(localized).forEach(([id, item]) => put(id, item, true));
  return Object.fromEntries([...merged.entries()].map(([key, item]) => [item.id || key, item]));
}

async function fetchLocalizedAll(resource) {
  const [localizedResult, fallbackResult] = await Promise.allSettled([
    fetchJson(`${API_BASE}/${resource}/all?lang=pt`),
    fetchJson(`${API_BASE}/${resource}/all?lang=en`),
  ]);

  if (localizedResult.status === "fulfilled" && fallbackResult.status === "fulfilled") {
    return mergeApiCollections(localizedResult.value, fallbackResult.value);
  }
  if (localizedResult.status === "fulfilled") return localizedResult.value;
  if (fallbackResult.status === "fulfilled") return fallbackResult.value;
  return fetchJson(`${API_BASE}/${resource}/all`);
}

function populateSelect(select, items, fallbackLabel, labelForItem = displayEntityName) {
  const previous = select.value;
  select.replaceChildren();
  const empty = document.createElement("option");
  empty.value = "";
  empty.textContent = fallbackLabel;
  select.append(empty);

  items
    .slice()
    .sort((a, b) => labelForItem(a).localeCompare(labelForItem(b), "pt-BR"))
    .forEach((item) => {
      const option = document.createElement("option");
      option.value = item.id;
      option.textContent = labelForItem(item);
      select.append(option);
    });

  if ([...select.options].some((option) => option.value === previous)) {
    select.value = previous;
  }
}

function teamSlotSelects() {
  return ["#teamSlot1", "#teamSlot2", "#teamSlot3", "#teamSlot4"]
    .map((selector) => $(selector))
    .filter(Boolean);
}

function populateTeamBuilderSelects() {
  const characters = state.characters
    .slice()
    .sort((a, b) => displayCharacterName(a).localeCompare(displayCharacterName(b), "pt-BR"));

  teamSlotSelects().forEach((select, index) => {
    const previous = select.value;
    select.replaceChildren();
    const empty = document.createElement("option");
    empty.value = "";
    empty.textContent = `Slot ${index + 1}`;
    select.append(empty);

    characters.forEach((character) => {
      const option = document.createElement("option");
      option.value = character.id;
      option.textContent = displayCharacterName(character);
      select.append(option);
    });

    if ([...select.options].some((option) => option.value === previous)) {
      select.value = previous;
    }
  });
}

function populateRosterCharacterSelect() {
  const select = $("#ownedCharacterSelect");
  if (!select) return;
  const previous = select.value;
  select.replaceChildren();

  const empty = document.createElement("option");
  empty.value = "";
  empty.textContent = "Escolha um personagem";
  select.append(empty);

  state.characters
    .slice()
    .sort((a, b) => displayCharacterName(a).localeCompare(displayCharacterName(b), "pt-BR"))
    .forEach((character) => {
      const option = document.createElement("option");
      option.value = character.id;
      option.textContent = displayCharacterName(character);
      select.append(option);
    });

  if ([...select.options].some((option) => option.value === previous)) {
    select.value = previous;
  }
}

async function loadApiData() {
  setApiStatus(null, "API carregando");
  const [characterResult, weaponResult] = await Promise.allSettled([
    fetchLocalizedAll("characters"),
    fetchLocalizedAll("weapons"),
  ]);

  try {
    if (characterResult.status === "fulfilled") {
      const characterData = characterResult.value;
      const characters = Array.isArray(characterData)
        ? characterData.map((item) => normalizeEntity(item, item.id))
        : Object.entries(characterData).map(([id, item]) => normalizeEntity(item, id));
      if (characters.length) state.characters = mergeEntities(characters, state.characters);
    }

    if (weaponResult.status === "fulfilled") {
      const weaponData = weaponResult.value;
      const weapons = Array.isArray(weaponData)
        ? weaponData.map((item) => normalizeEntity(item, item.id))
        : Object.entries(weaponData).map(([id, item]) => normalizeEntity(item, id));
      if (weapons.length) state.weapons = mergeEntities(weapons, state.weapons);
    }

    populateSelect($("#characterSelect"), state.characters, "Genérico", displayCharacterName);
    populateTeamBuilderSelects();
    populateRosterCharacterSelect();
    populateSelect($("#weaponSelect"), state.weapons, "Genérica", displayWeaponName);
    restorePersisted();
    migratePersistedLanguage();
    syncSelectedCharacter();
    syncSelectedWeapon();
    evaluateCustomTeam();
    renderRoster();
    renderGuide();
    setApiStatus(characterResult.status === "fulfilled" ? "online" : "offline", characterResult.status === "fulfilled" ? "API conectada" : "API parcial");
  } catch (error) {
    populateSelect($("#characterSelect"), state.characters, "Genérico", displayCharacterName);
    populateTeamBuilderSelects();
    populateRosterCharacterSelect();
    populateSelect($("#weaponSelect"), state.weapons, "Genérica", displayWeaponName);
    restorePersisted();
    migratePersistedLanguage();
    syncSelectedCharacter();
    syncSelectedWeapon();
    evaluateCustomTeam();
    renderRoster();
    renderGuide();
    setApiStatus("offline", "API sem conexão");
  }
}

function collectPersisted() {
  const values = {};
  $$("[data-persist]").forEach((field) => {
    values[field.id] = field.value;
  });
  values.__roster = state.roster || [];
  values.__guideDaily = state.guideDaily || {};
  values.__guideQuests = state.guideQuests || {};
  return values;
}

function restorePersisted() {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  try {
    const values = JSON.parse(raw);
    if (Array.isArray(values.__roster)) {
      state.roster = values.__roster;
    }
    if (values.__guideDaily && typeof values.__guideDaily === "object" && !Array.isArray(values.__guideDaily)) {
      state.guideDaily = values.__guideDaily;
    }
    if (values.__guideQuests && typeof values.__guideQuests === "object" && !Array.isArray(values.__guideQuests)) {
      state.guideQuests = values.__guideQuests;
    }
    Object.entries(values).forEach(([id, value]) => {
      if (id.startsWith("__")) return;
      const field = document.getElementById(id);
      if (field) field.value = value;
    });
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
  }
}

function migratePersistedLanguage() {
  let changed = false;
  $$("input[data-persist]").forEach((field) => {
    if (field.type === "number") return;
    const translated = ptBr(field.value);
    if (translated && translated !== field.value) {
      field.value = translated;
      changed = true;
    }
  });
  if (changed) savePersisted();
}

function savePersisted() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(collectPersisted()));
}

function optimizeItems(requiredExp, items) {
  if (requiredExp <= 0) {
    return { provided: 0, waste: 0, counts: Object.fromEntries(items.map((item) => [item.key, 0])) };
  }

  const [large, medium, small] = items;
  const maxLarge = Math.ceil(requiredExp / large.value);
  let best = null;
  for (let largeCount = Math.max(0, maxLarge - 12); largeCount <= maxLarge + 1; largeCount += 1) {
    for (let mediumCount = 0; mediumCount <= 8; mediumCount += 1) {
      for (let smallCount = 0; smallCount <= 14; smallCount += 1) {
        const provided =
          largeCount * large.value + mediumCount * medium.value + smallCount * small.value;
        if (provided < requiredExp) continue;
        const counts = {
          [large.key]: largeCount,
          [medium.key]: mediumCount,
          [small.key]: smallCount,
        };
        const totalItems = largeCount + mediumCount + smallCount;
        const waste = provided - requiredExp;
        if (
          !best ||
          waste < best.waste ||
          (waste === best.waste && totalItems < best.totalItems)
        ) {
          best = { provided, waste, counts, totalItems };
        }
      }
    }
  }
  return best;
}

function optimizeTwoItems(requiredExp, items) {
  if (requiredExp <= 0) {
    return { provided: 0, waste: 0, counts: Object.fromEntries(items.map((item) => [item.key, 0])) };
  }

  const [large, small] = items;
  const maxLarge = Math.ceil(requiredExp / large.value);
  let best = null;
  for (let largeCount = Math.max(0, maxLarge - 12); largeCount <= maxLarge + 1; largeCount += 1) {
    for (let smallCount = 0; smallCount <= 8; smallCount += 1) {
      const provided = largeCount * large.value + smallCount * small.value;
      if (provided < requiredExp) continue;
      const totalItems = largeCount + smallCount;
      const waste = provided - requiredExp;
      if (
        !best ||
        waste < best.waste ||
        (waste === best.waste && totalItems < best.totalItems)
      ) {
        best = {
          provided,
          waste,
          totalItems,
          counts: { [large.key]: largeCount, [small.key]: smallCount },
        };
      }
    }
  }
  return best;
}

function makeMaterial(label, total, owned = 0, icon = "◆", color = "teal", note = "") {
  const roundedTotal = Math.max(0, Math.ceil(total || 0));
  const roundedOwned = Math.max(0, Math.ceil(owned || 0));
  return {
    label: ptBr(label),
    total: roundedTotal,
    owned: roundedOwned,
    missing: Math.max(0, roundedTotal - roundedOwned),
    icon,
    color,
    note: ptBr(note),
  };
}

function makeValue(label, value, icon = "◆", color = "teal", note = "") {
  return {
    ...makeMaterial(label, value, value, icon, color, note),
    valueOnly: true,
  };
}

function renderSummary(container, tiles) {
  container.replaceChildren();
  tiles.forEach((tile) => {
    const element = document.createElement("div");
    element.className = `summary-tile ${tile.color || "teal"}`;
    element.innerHTML = `<span>${escapeHtml(ptBr(tile.label))}</span><strong>${escapeHtml(tile.value)}</strong>`;
    container.append(element);
  });
}

function renderResults(container, materials) {
  container.replaceChildren();
  const visible = materials.filter((item) => item.valueOnly || item.total > 0 || item.owned > 0);
  if (!visible.length) {
    const empty = document.createElement("div");
    empty.className = "result-row complete";
    empty.innerHTML = `<div class="result-name"><span class="result-icon">0</span><div class="result-label"><strong>Nada faltando</strong><span>Os alvos atuais não pedem materiais.</span></div></div>`;
    container.append(empty);
    return;
  }

  visible.forEach((item) => {
    const row = document.createElement("div");
    const progress = item.valueOnly || !item.total ? 100 : clamp((item.owned / item.total) * 100, 0, 100);
    const statusClass = item.valueOnly ? "info" : item.missing > 0 ? "missing" : "complete";
    row.className = `result-row ${statusClass}`;
    const ownedText = item.valueOnly ? item.note || "Valor atual" : `Total ${format(item.total)} · Inv ${format(item.owned)}`;
    const neededText = item.valueOnly ? format(item.total) : item.missing > 0 ? `Falta ${format(item.missing)}` : "Completo";
    const statusText = item.valueOnly ? "Informação" : item.missing > 0 ? "Faltando" : "OK";
    row.innerHTML = `
      <div class="result-name">
        <span class="result-icon ${item.color || "teal"}">${escapeHtml(item.icon)}</span>
        <div class="result-label">
          <strong>${escapeHtml(item.label)}</strong>
          <span>${escapeHtml(item.note || "Total calculado")}</span>
          <div class="result-meter" style="--progress: ${progress}%"><span></span></div>
        </div>
      </div>
      <div class="result-owned">${escapeHtml(ownedText)}</div>
      <div class="result-needed">
        <span class="result-status">${statusText}</span>
        <strong>${escapeHtml(neededText)}</strong>
      </div>
    `;
    container.append(row);
  });
}

function guideTodayKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function guideDateLabel() {
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
  }).format(new Date());
}

function guideDailyBucket() {
  const key = guideTodayKey();
  if (!state.guideDaily[key] || typeof state.guideDaily[key] !== "object") {
    state.guideDaily[key] = {};
  }
  return state.guideDaily[key];
}

function priorityClass(priority) {
  const normalized = String(priority || "media")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");
  return `priority-${normalized}`;
}

function priorityColor(priority) {
  const normalized = priorityClass(priority);
  if (normalized === "priority-alta") return "coral";
  if (normalized === "priority-media") return "gold";
  if (normalized === "priority-baixa") return "violet";
  return "teal";
}

function guideChecked(scope, id) {
  if (scope === "quest") return Boolean(state.guideQuests[id]);
  return Boolean(guideDailyBucket()[`${scope}:${id}`]);
}

function setGuideChecked(scope, id, checked) {
  if (scope === "quest") {
    if (checked) state.guideQuests[id] = true;
    else delete state.guideQuests[id];
    return;
  }

  const bucket = guideDailyBucket();
  const key = `${scope}:${id}`;
  if (checked) bucket[key] = true;
  else delete bucket[key];
}

function fillGuideSelect(select, options) {
  if (!select) return;
  const current = select.value;
  select.replaceChildren();
  options.forEach(([value, label]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    select.append(option);
  });
  if (options.some(([value]) => value === current)) {
    select.value = current;
  }
}

function populateGuideFilters() {
  const nations = [...new Set(QUEST_GUIDE.map((quest) => quest.nation))];
  fillGuideSelect($("#guideNationFilter"), [
    ["all", "Todas as nações"],
    ...nations.map((nation) => [nation, nation]),
  ]);
  fillGuideSelect($("#guidePriorityFilter"), [
    ["all", "Todas as prioridades"],
    ["Alta", "Alta"],
    ["Media", "Média"],
    ["Baixa", "Baixa"],
    ["Situacional", "Situacional"],
  ]);
}

function renderChecklist(container, tasks, scope) {
  if (!container) return;
  container.replaceChildren();
  tasks.forEach((task) => {
    const checked = guideChecked(scope, task.id);
    const item = document.createElement("label");
    item.className = `check-item ${checked ? "done" : ""}`;
    item.innerHTML = `
      <input type="checkbox" class="guide-check" data-guide-scope="${scope}" data-guide-id="${escapeHtml(task.id)}" ${checked ? "checked" : ""} />
      <span class="check-copy">
        <strong>${escapeHtml(ptBr(task.title))}</strong>
        <span>${escapeHtml(ptBr(task.reward))}</span>
        <span class="check-status">${checked ? "Concluído" : "Pendente"}</span>
      </span>
      <span class="priority-pill ${priorityClass(task.priority)}">${escapeHtml(ptBr(task.priority))}</span>
    `;
    container.append(item);
  });
}

function renderQuestGuide() {
  const cards = $("#questGuideCards");
  if (!cards) return;
  const nation = $("#guideNationFilter")?.value || "all";
  const priority = $("#guidePriorityFilter")?.value || "all";
  const pendingOnly = Boolean($("#guidePendingOnly")?.checked);
  const quests = QUEST_GUIDE.filter((quest) => {
    if (nation !== "all" && quest.nation !== nation) return false;
    if (priority !== "all" && quest.priority !== priority) return false;
    if (pendingOnly && guideChecked("quest", quest.id)) return false;
    return true;
  });

  cards.replaceChildren();
  if (!quests.length) {
    const empty = document.createElement("div");
    empty.className = "team-intro";
    empty.innerHTML = `<strong>Nada pendente nesse filtro</strong><span>Troque a nação, prioridade ou desative o filtro de pendentes.</span>`;
    cards.append(empty);
    return;
  }

  quests.forEach((quest) => {
    const checked = guideChecked("quest", quest.id);
    const card = document.createElement("article");
    card.className = `quest-guide-card ${priorityClass(quest.priority)} ${checked ? "done" : ""}`;
    card.innerHTML = `
      <div class="quest-card-head">
        <div class="quest-card-title">
          <span>${escapeHtml(ptBr(quest.nation))}</span>
          <strong>${escapeHtml(ptBr(quest.title))}</strong>
        </div>
        <span class="priority-pill ${priorityClass(quest.priority)}">${escapeHtml(ptBr(quest.priority))}</span>
      </div>
      <div class="quest-rewards">
        <span>Prêmios principais</span>
        <strong>${escapeHtml(ptBr(quest.rewards))}</strong>
      </div>
      <p>${escapeHtml(ptBr(quest.why))}</p>
      <p><strong>Direção:</strong> ${escapeHtml(ptBr(quest.action))}</p>
      <label class="quest-check">
        <input type="checkbox" class="guide-check" data-guide-scope="quest" data-guide-id="${escapeHtml(quest.id)}" ${checked ? "checked" : ""} />
        ${checked ? "Concluída" : "Marcar concluída"}
      </label>
    `;
    cards.append(card);
  });
}

function renderGuide() {
  if (!$("#guideDailyList")) return;
  renderChecklist($("#guideDailyList"), GUIDE_DAILY_TASKS, "daily");
  renderChecklist($("#guideResinList"), GUIDE_RESIN_TASKS, "resin");

  const checklist = [
    ...GUIDE_DAILY_TASKS.map((task) => ["daily", task]),
    ...GUIDE_RESIN_TASKS.map((task) => ["resin", task]),
  ];
  const done = checklist.filter(([scope, task]) => guideChecked(scope, task.id)).length;
  const highPending = QUEST_GUIDE.filter((quest) => quest.priority === "Alta" && !guideChecked("quest", quest.id));
  const questPending = QUEST_GUIDE.filter((quest) => !guideChecked("quest", quest.id)).length;
  const resinPlan = Math.max(0, Math.ceil(state.plans.resin.resin || 0));

  renderSummary($("#guideSummary"), [
    { label: `Hoje ${guideDateLabel()}`, value: `${done}/${checklist.length}`, color: done === checklist.length ? "teal" : "gold" },
    { label: "Missoes altas", value: format(highPending.length), color: highPending.length ? "coral" : "teal" },
    { label: "Mapa pendente", value: format(questPending), color: questPending ? "violet" : "teal" },
  ]);

  const tips = [];
  if (!guideChecked("daily", "daily-commissions")) {
    tips.push(makeValue("Comissoes primeiro", 60, "60", "coral", "Garanta as Primogems do dia: 4 comissoes ou Encounter Points + Katheryne."));
  }
  if (!guideChecked("daily", "spend-resin")) {
    tips.push(makeValue("Evite capar resina", 200, "R", "gold", "Use no plano atual ou condense antes de sair do jogo."));
  }
  if (resinPlan > 0) {
    tips.push(makeValue("Plano de recursos ativo", resinPlan, "P", "violet", "A rota de resina pode seguir os materiais faltantes das abas atuais."));
  }
  if (highPending.length) {
    const next = highPending[0];
    tips.push(makeValue("Proxima quest alta", highPending.length, "!", priorityColor(next.priority), `${next.nation}: ${next.title}`));
  }
  if (!tips.length) {
    tips.push(makeValue("Rotina basica concluida", 1, "OK", "teal", "Agora vale focar em missões de prioridade Alta, eventos ou exploracao por nacao."));
  }

  renderResults($("#guideTips"), tips);
  renderQuestGuide();
}

function buildGenericTeams(character) {
  if (!character) return [];
  const name = character.name;
  const element = keyForName(character.vision);
  const role = character.rarity === 5 ? "Main DPS / flex" : "Flex / suporte";

  const templates = {
    dendro: [
      {
        title: "Hyperbloom base",
        note: "Dendro + Hydro + Electro full EM, facil de montar e eficiente em alvo unico.",
        tier: "S",
        members: [
          { name, role },
          { name: "Xingqiu", role: "Hydro off-field" },
          { name: "Kuki Shinobu", role: "Trigger Hyperbloom" },
          { name: "Sucrose", role: "EM / controle" },
        ],
      },
      {
        title: "Bloom Dendro/Hydro",
        note: "Boa alternativa quando voce quer jogar em torno de aplicacao Dendro e cura.",
        tier: "A+",
        members: [
          { name, role },
          { name: "Nilou", role: "Bloom" },
          { name: "Yaoyao", role: "Cura / Dendro" },
          { name: "Kokomi", role: "Hydro / cura" },
        ],
      },
    ],
    hydro: [
      {
        title: "Taser Hydro",
        note: "Hydro em campo ou off-field com Electro constante e VV para reduzir resistencia.",
        tier: "S",
        members: [
          { name, role },
          { name: "Fischl", role: "Electro off-field" },
          { name: "Kaedehara Kazuha", role: "VV / agrupamento" },
          { name: "Bennett", role: "Buff / cura" },
        ],
      },
      {
        title: "Hyperbloom Hydro",
        note: "Usa Hydro para gerar sementes e Kuki full EM para detonar Hyperbloom.",
        tier: "S",
        members: [
          { name, role },
          { name: "Nahida", role: "Dendro / EM" },
          { name: "Kuki Shinobu", role: "Trigger Hyperbloom" },
          { name: "Yelan", role: "Hydro / dano" },
        ],
      },
    ],
    pyro: [
      {
        title: "Vape Pyro",
        note: "Base de vaporizacao com buff de Bennett e reducao de resistencia por Anemo.",
        tier: "S",
        members: [
          { name, role },
          { name: "Xingqiu", role: "Hydro off-field" },
          { name: "Bennett", role: "Buff / cura" },
          { name: "Kaedehara Kazuha", role: "VV / buff Pyro" },
        ],
      },
      {
        title: "Overload Chevreuse",
        note: "Opcao Pyro/Electro para contas com Chevreuse bem investida.",
        tier: "A+",
        members: [
          { name, role },
          { name: "Chevreuse", role: "Buff / cura" },
          { name: "Fischl", role: "Electro off-field" },
          { name: "Bennett", role: "Buff" },
        ],
      },
    ],
    electro: [
      {
        title: "Aggravate",
        note: "Electro com Dendro constante e Anemo para buffar dano Electro.",
        tier: "S",
        members: [
          { name, role },
          { name: "Nahida", role: "Dendro / EM" },
          { name: "Fischl", role: "Electro off-field" },
          { name: "Kaedehara Kazuha", role: "VV / agrupamento" },
        ],
      },
      {
        title: "Hyperbloom",
        note: "Se o personagem puder aplicar Electro fora de campo, pode detonar sementes com EM.",
        tier: "A+",
        members: [
          { name, role },
          { name: "Nahida", role: "Dendro / EM" },
          { name: "Xingqiu", role: "Hydro off-field" },
          { name: "Yaoyao", role: "Cura / Dendro" },
        ],
      },
    ],
    anemo: [
      {
        title: "National driver",
        note: "Anemo segura Viridescent Venerer e amplifica Xiangling/Xingqiu.",
        tier: "S",
        members: [
          { name, role: "VV / driver" },
          { name: "Xiangling", role: "Pyro off-field" },
          { name: "Xingqiu", role: "Hydro off-field" },
          { name: "Bennett", role: "Buff / cura" },
        ],
      },
    ],
    cryo: [
      {
        title: "Freeze",
        note: "Controle por congelamento com Hydro e Anemo usando Viridescent Venerer.",
        tier: "A+",
        members: [
          { name, role },
          { name: "Kokomi", role: "Hydro / cura" },
          { name: "Kaedehara Kazuha", role: "VV / agrupamento" },
          { name: "Diona", role: "Bateria / escudo" },
        ],
      },
      {
        title: "Melt",
        note: "Bennett e Xiangling mantem Pyro para derreter golpes Cryo importantes.",
        tier: "A+",
        members: [
          { name, role },
          { name: "Bennett", role: "Buff / cura" },
          { name: "Xiangling", role: "Pyro off-field" },
          { name: "Sucrose", role: "EM / VV" },
        ],
      },
    ],
    geo: [
      {
        title: "Double Geo",
        note: "Time confortavel com ressonancia Geo e buffs universais.",
        tier: "A+",
        members: [
          { name, role },
          { name: "Zhongli", role: "Escudo / shred" },
          { name: "Bennett", role: "Buff / cura" },
          { name: "Furina", role: "Buff / Sub DPS" },
        ],
      },
    ],
  };

  return templates[element] || [
    {
      title: "Time flex",
      note: "Sugestao generica: um buffer, um aplicador off-field e um suporte defensivo.",
      tier: "Base",
      members: [
        { name, role },
        { name: "Bennett", role: "Buff / cura" },
        { name: "Xingqiu", role: "Aplicacao off-field" },
        { name: "Sucrose", role: "EM / controle" },
      ],
    },
  ];
}

function getTeamGuides(character) {
  if (!character) return [];
  return TEAM_GUIDES[character.id] || TEAM_GUIDES[keyForName(character.name)] || buildGenericTeams(character);
}

function renderTeamsForSelected() {
  const character = selectedCharacter();
  const cards = $("#teamCards");
  const leadName = $("#teamLeadName");
  const leadMeta = $("#teamLeadMeta");
  if (!cards || !leadName || !leadMeta) return;

  cards.replaceChildren();
  if (!character) {
    leadName.textContent = "Escolha um personagem";
    leadMeta.textContent = "As sugestões aparecem automaticamente a partir do personagem selecionado no topo.";
    return;
  }

  const guides = getTeamGuides(character);
  leadName.textContent = `Times para ${displayCharacterName(character)}`;
  leadMeta.textContent = `${character.rarity || "?"} estrelas · ${displayCharacterMetaPart(character.vision || "Elemento")} · ${displayWeaponType(character.weapon || "Arma")} · ${TEAM_GUIDES[character.id] ? "guia revisado" : "modelo por elemento"}`;

  guides.forEach((guide) => {
    const card = document.createElement("article");
    card.className = "team-card";
    const members = guide.members
      .map((member) => {
        const isSelected = keyForName(member.name) === keyForName(character.name);
        const rec = getArtifactRec(member.name, member.role, isSelected ? character : null);
        const icons = memberIconUrls(member.name).filter(Boolean).join("|");
        const memberLabel = isSelected ? displayCharacterName(character) : ptBr(member.name);
        const initials = initialsForName(memberLabel, "?");
        return `
          <div class="team-member">
            <div class="member-avatar" data-urls="${escapeHtml(icons)}">
              <img alt="" />
              <span>${escapeHtml(initials)}</span>
            </div>
            <div class="member-body">
              <div class="member-topline">
                <strong>${escapeHtml(memberLabel)}</strong>
                <span class="member-role">${escapeHtml(ptBr(member.role))}</span>
              </div>
              <div class="artifact-line"><b>Artefato:</b> ${escapeHtml(ptBr(rec.set))}</div>
              <div class="stat-line"><b>Atributos:</b> ${escapeHtml(ptBr(rec.stats))}</div>
              <div class="stat-line"><b>Subatributos:</b> ${escapeHtml(ptBr(rec.substats))}</div>
            </div>
          </div>
        `;
      })
      .join("");

    card.innerHTML = `
      <div class="team-card-head">
        <strong>${escapeHtml(ptBr(guide.title))} · ${escapeHtml(guide.tier)}</strong>
        <span>${escapeHtml(ptBr(guide.note))}</span>
      </div>
      <div class="team-members">${members}</div>
    `;
    cards.append(card);
  });

  $$(".member-avatar", cards).forEach((avatar) => {
    const image = $("img", avatar);
    setImageWithFallback(
      image,
      (avatar.dataset.urls || "").split("|"),
      () => avatar.classList.add("has-image"),
      () => {
        avatar.classList.remove("has-image");
        image.remove();
      },
    );
  });

  state.lastTeams = guides;
}

function characterById(id) {
  return state.characters.find((character) => character.id === id);
}

function characterTeamKey(character) {
  return keyForName(character?.name || character?.id);
}

function roleForCharacter(character) {
  return ROLE_HINTS[character?.id] || ROLE_HINTS[characterTeamKey(character)] || "Flex";
}

function selectedCustomTeam() {
  const selected = teamSlotSelects()
    .map((select) => characterById(select.value))
    .filter(Boolean);
  const seen = new Set();
  return selected.filter((character) => {
    const key = character.id;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function hasElement(team, element) {
  return team.some((character) => keyForName(character.vision) === element);
}

function addSynergy(points, type, text, reasons) {
  reasons.push({ points, type, text });
  return points;
}

function resonanceNames(elements) {
  const names = [];
  Object.entries(elements).forEach(([element, count]) => {
    if (count < 2) return;
    const label = {
      pyro: "Pyro: bonus de ATK",
      hydro: "Hydro: bonus de HP",
      anemo: "Anemo: mobilidade e recarga",
      electro: "Electro: energia",
      dendro: "Dendro: Maestria Elemental",
      cryo: "Cryo: taxa CRIT situacional",
      geo: "Geo: dano com escudo",
    }[element];
    if (label) names.push(label);
  });
  return names;
}

function evaluateTeamSynergy(team) {
  const reasons = [];
  if (team.length < 4) {
    return {
      score: Math.max(0, team.length * 16),
      grade: "Incompleto",
      reasons: [
        { points: 0, type: "warn", text: "Escolha 4 personagens para uma avaliacao completa." },
      ],
    };
  }

  let score = 30;
  const keys = team.map(characterTeamKey);
  const elements = team.reduce((acc, character) => {
    const element = keyForName(character.vision);
    acc[element] = (acc[element] || 0) + 1;
    return acc;
  }, {});

  const add = (points, type, text) => {
    score += addSynergy(points, type, text, reasons);
  };

  if (hasElement(team, "dendro") && hasElement(team, "hydro") && hasElement(team, "electro")) {
    add(22, "good", "Dendro + Hydro + Electro habilita Hyperbloom, uma base muito consistente.");
  } else if (hasElement(team, "dendro") && hasElement(team, "hydro")) {
    add(14, "good", "Dendro + Hydro cria Bloom/Lunar-Bloom e combina bem com escala de EM.");
  }
  if (hasElement(team, "dendro") && hasElement(team, "electro")) {
    add(12, "good", "Dendro + Electro ativa Quicken/Aggravate/Spread.");
  }
  if (hasElement(team, "pyro") && hasElement(team, "hydro")) {
    add(12, "good", "Pyro + Hydro permite Vaporize.");
  }
  if (hasElement(team, "pyro") && hasElement(team, "cryo")) {
    add(10, "good", "Pyro + Cryo permite Melt.");
  }
  if (hasElement(team, "hydro") && hasElement(team, "cryo")) {
    add(9, "good", "Hydro + Cryo permite Freeze e controle.");
  }
  if (hasElement(team, "hydro") && hasElement(team, "electro")) {
    add(8, "good", "Hydro + Electro gera Electro-Charged/Lunar-Charged.");
  }
  if (hasElement(team, "anemo") && ["pyro", "hydro", "electro", "cryo"].some((element) => hasElement(team, element))) {
    add(12, "good", "Anemo consegue usar Viridescent Venerer para reduzir resistencia elemental.");
  }

  const resonances = resonanceNames(elements);
  if (resonances.length) {
    add(6 + Math.min(6, resonances.length * 2), "good", `Ressonancia ativa: ${resonances.join("; ")}.`);
  }

  if (keys.some((key) => DEFENSIVE_SUPPORTS.has(key))) {
    add(10, "good", "O time tem cura ou escudo para sustentar rotacoes.");
  } else {
    add(-12, "warn", "Nao encontrei cura/escudo claro; pode ficar desconfortavel em conteudo dificil.");
  }

  if (keys.some((key) => BUFF_SUPPORTS.has(key))) {
    add(9, "good", "Ha pelo menos um suporte de buff, shred ou utilidade forte.");
  } else {
    add(-6, "warn", "Falta um buffer/shredder claro para elevar o teto de dano.");
  }

  if (keys.some((key) => OFF_FIELD_APPLIERS.has(key))) {
    add(8, "good", "Ha aplicacao ou dano fora de campo para manter reacoes.");
  } else {
    add(-7, "warn", "Pouca aplicacao fora de campo; o time pode depender demais do personagem ativo.");
  }

  const onFieldCount = keys.filter((key) => ON_FIELD_DPS.has(key)).length;
  if (onFieldCount > 1) {
    add(-8 * (onFieldCount - 1), "warn", "Ha varios carries que querem tempo em campo; as rotacoes podem competir.");
  } else if (onFieldCount === 1) {
    add(6, "good", "O time tem um carry principal bem definido.");
  }

  if (keys.includes("nilou")) {
    const onlyBloom = team.every((character) => ["hydro", "dendro"].includes(keyForName(character.vision)));
    if (onlyBloom) add(14, "good", "Nilou esta em time somente Hydro/Dendro, ideal para Bountiful Cores.");
    else add(-24, "bad", "Nilou perde muito valor fora de times somente Hydro/Dendro.");
  }

  if (keys.includes("chevreuse")) {
    const onlyOverload = team.every((character) => ["pyro", "electro"].includes(keyForName(character.vision)));
    if (onlyOverload) add(14, "good", "Chevreuse esta em time Pyro/Electro, ideal para Overload.");
    else add(-18, "bad", "Chevreuse prefere times apenas Pyro/Electro.");
  }

  if (keys.includes("nefer")) {
    if (hasElement(team, "dendro") && hasElement(team, "hydro")) {
      add(12, "good", "Nefer tem base Dendro/Hydro para Bloom/Lunar-Bloom.");
    } else {
      add(-18, "bad", "Nefer quer Hydro no time para habilitar sua base de Bloom/Lunar-Bloom.");
    }
    if (keys.some((key) => ["lauma", "nahida", "aino", "nilou"].includes(key))) {
      add(8, "good", "Nefer esta acompanhada por suporte/aplicador recomendado.");
    }
  }

  score = clamp(score, 0, 100);
  const grade =
    score >= 85 ? "Excelente" :
    score >= 70 ? "Boa" :
    score >= 52 ? "Mediana" :
    "Fraca";

  return { score, grade, reasons };
}

function renderCustomTeamMembers(team) {
  const cards = $("#customTeamCards");
  if (!cards) return;
  cards.replaceChildren();

  if (!team.length) {
    cards.innerHTML = `
      <article class="team-card">
        <div class="team-card-head">
          <strong>Nenhum personagem escolhido</strong>
          <span>Preencha os slots para ver artefatos e diagnóstico.</span>
        </div>
      </article>
    `;
    return;
  }

  const card = document.createElement("article");
  card.className = "team-card";
  const members = team
    .map((character) => {
      const role = roleForCharacter(character);
      const rec = getArtifactRec(character.name, role, character);
      const icons = memberIconUrls(character.name).filter(Boolean).join("|");
      return `
        <div class="team-member">
          <div class="member-avatar" data-urls="${escapeHtml(icons)}">
            <img alt="" />
            <span>${escapeHtml(initialsForName(displayCharacterName(character), "?"))}</span>
          </div>
          <div class="member-body">
            <div class="member-topline">
              <strong>${escapeHtml(displayCharacterName(character))}</strong>
              <span class="member-role">${escapeHtml(ptBr(role))}</span>
            </div>
            <div class="artifact-line"><b>Artefato:</b> ${escapeHtml(ptBr(rec.set))}</div>
            <div class="stat-line"><b>Atributos:</b> ${escapeHtml(ptBr(rec.stats))}</div>
            <div class="stat-line"><b>Subatributos:</b> ${escapeHtml(ptBr(rec.substats))}</div>
          </div>
        </div>
      `;
    })
    .join("");

  card.innerHTML = `
    <div class="team-card-head">
      <strong>${escapeHtml(team.map(displayCharacterName).join(" / "))}</strong>
      <span>Recomendações de artefatos para o time personalizado.</span>
    </div>
    <div class="team-members">${members}</div>
  `;
  cards.append(card);

  $$(".member-avatar", cards).forEach((avatar) => {
    const image = $("img", avatar);
    setImageWithFallback(
      image,
      (avatar.dataset.urls || "").split("|"),
      () => avatar.classList.add("has-image"),
      () => {
        avatar.classList.remove("has-image");
        image.remove();
      },
    );
  });
}

function evaluateCustomTeam() {
  const team = selectedCustomTeam();
  const evaluation = evaluateTeamSynergy(team);
  const score = Math.round(evaluation.score);

  const scoreEl = $("#synergyScore");
  const gradeEl = $("#synergyGrade");
  const meterEl = $("#synergyMeter");
  const reasonsEl = $("#synergyReasons");
  if (!scoreEl || !gradeEl || !meterEl || !reasonsEl) return;

  scoreEl.textContent = format(score);
  gradeEl.textContent = evaluation.grade;
  meterEl.style.width = `${score}%`;

  const materials = evaluation.reasons.map((reason) =>
    makeValue(
      reason.type === "good" ? "Ponto forte" : reason.type === "bad" ? "Conflito" : "Atencao",
      Math.abs(reason.points),
      reason.type === "good" ? "+" : "!",
      reason.type === "good" ? "teal" : reason.type === "bad" ? "coral" : "gold",
      reason.text,
    ),
  );
  renderResults(reasonsEl, materials);
  $("#customTeamName").textContent = team.length ? `Time com ${team.length}/4 personagens` : "Time personalizado";
  $("#customTeamMeta").textContent = evaluation.grade === "Incompleto"
    ? "Escolha quatro personagens para receber a leitura completa."
    : `Resultado: ${evaluation.grade} (${score}/100).`;
  renderCustomTeamMembers(team);
  state.lastCustomTeam = { team, evaluation };
}

function rosterEntries() {
  return (state.roster || [])
    .map((entry) => {
      const character = characterById(entry.id);
      if (!character && !entry.name) return null;
      return {
        ...(character || {}),
        ...entry,
        id: entry.id,
        name: character?.name || entry.name,
        vision: character?.vision || entry.vision,
        rarity: character?.rarity || entry.rarity,
        weapon: character?.weapon || entry.weapon,
      };
    })
    .filter(Boolean);
}

function clearRosterForm() {
  $("#ownedCharacterSelect").value = "";
  $("#ownedCharLevel").value = "90";
  $("#ownedTalentNormal").value = "1";
  $("#ownedTalentSkill").value = "1";
  $("#ownedTalentBurst").value = "1";
  $("#ownedWeaponName").value = "";
  $("#ownedWeaponLevel").value = "90";
}

function saveRosterFromForm() {
  const character = characterById($("#ownedCharacterSelect").value);
  if (!character) return;

  const entry = {
    id: character.id,
    name: character.name,
    vision: character.vision,
    rarity: character.rarity,
    weapon: character.weapon,
    level: clamp(integer($("#ownedCharLevel").value), 1, 90),
    talents: {
      normal: clamp(integer($("#ownedTalentNormal").value), 1, 10),
      skill: clamp(integer($("#ownedTalentSkill").value), 1, 10),
      burst: clamp(integer($("#ownedTalentBurst").value), 1, 10),
    },
    weaponName: $("#ownedWeaponName").value.trim(),
    weaponLevel: clamp(integer($("#ownedWeaponLevel").value), 1, 90),
  };

  const existingIndex = state.roster.findIndex((item) => item.id === entry.id);
  if (existingIndex >= 0) state.roster[existingIndex] = entry;
  else state.roster.push(entry);
  state.roster.sort((a, b) => a.name.localeCompare(b.name));
  savePersisted();
  renderRoster();
}

function fillRosterForm(entryId) {
  const entry = rosterEntries().find((item) => item.id === entryId);
  if (!entry) return;
  $("#ownedCharacterSelect").value = entry.id;
  $("#ownedCharLevel").value = String(entry.level || 90);
  $("#ownedTalentNormal").value = String(entry.talents?.normal || 1);
  $("#ownedTalentSkill").value = String(entry.talents?.skill || 1);
  $("#ownedTalentBurst").value = String(entry.talents?.burst || 1);
  $("#ownedWeaponName").value = entry.weaponName || "";
  $("#ownedWeaponLevel").value = String(entry.weaponLevel || 90);
}

function removeRosterEntry(entryId) {
  state.roster = state.roster.filter((entry) => entry.id !== entryId);
  savePersisted();
  renderRoster();
}

function rosterByName(name, roster) {
  const target = keyForName(name);
  return roster.find((entry) => keyForName(entry.name) === target || entry.id === target.replace(/\s+/g, "-"));
}

function rosterPower(entry) {
  const talentTotal =
    (entry.talents?.normal || 1) + (entry.talents?.skill || 1) + (entry.talents?.burst || 1);
  return (
    (entry.level || 1) * 0.7 +
    (entry.weaponLevel || 1) * 0.25 +
    talentTotal * 2 +
    (entry.rarity === 5 ? 8 : 0)
  );
}

function comboSignature(team) {
  return team
    .map((entry) => entry.id)
    .slice()
    .sort()
    .join("|");
}

function characterWeight(entry) {
  const key = characterTeamKey(entry);
  return (
    rosterPower(entry) +
    (ON_FIELD_DPS.has(key) ? 18 : 0) +
    (DEFENSIVE_SUPPORTS.has(key) ? 16 : 0) +
    (BUFF_SUPPORTS.has(key) ? 14 : 0) +
    (OFF_FIELD_APPLIERS.has(key) ? 12 : 0)
  );
}

function addRosterSuggestion(team, source, map) {
  if (team.length !== 4) return;
  const unique = new Map(team.map((entry) => [entry.id, entry]));
  if (unique.size !== 4) return;
  const cleanTeam = [...unique.values()];
  const signature = comboSignature(cleanTeam);
  if (map.has(signature)) return;
  const evaluation = evaluateTeamSynergy(cleanTeam);
  const power = cleanTeam.reduce((sum, entry) => sum + rosterPower(entry), 0) / cleanTeam.length;
  map.set(signature, {
    team: cleanTeam,
    evaluation,
    source,
    score: evaluation.score + Math.min(12, power / 16),
  });
}

function suggestRosterTeams(roster = rosterEntries()) {
  const suggestions = new Map();
  if (roster.length < 4) return [];

  Object.values(TEAM_GUIDES).forEach((guides) => {
    guides.forEach((guide) => {
      const team = guide.members.map((member) => rosterByName(member.name, roster)).filter(Boolean);
      addRosterSuggestion(team, `Guia: ${guide.title}`, suggestions);
    });
  });

  const pool = roster
    .slice()
    .sort((a, b) => characterWeight(b) - characterWeight(a))
    .slice(0, 30);

  let checked = 0;
  const maxChecks = 36000;
  for (let a = 0; a < pool.length - 3; a += 1) {
    for (let b = a + 1; b < pool.length - 2; b += 1) {
      for (let c = b + 1; c < pool.length - 1; c += 1) {
        for (let d = c + 1; d < pool.length; d += 1) {
          addRosterSuggestion([pool[a], pool[b], pool[c], pool[d]], "Gerado pelo elenco", suggestions);
          checked += 1;
          if (checked >= maxChecks) break;
        }
        if (checked >= maxChecks) break;
      }
      if (checked >= maxChecks) break;
    }
    if (checked >= maxChecks) break;
  }

  return [...suggestions.values()]
    .sort((a, b) => b.score - a.score)
    .filter((suggestion, index) => suggestion.evaluation.score >= 58 || index < 3)
    .slice(0, 8);
}

function hydrateMemberAvatars(root) {
  $$(".member-avatar", root).forEach((avatar) => {
    const image = $("img", avatar);
    if (!image) return;
    setImageWithFallback(
      image,
      (avatar.dataset.urls || "").split("|"),
      () => avatar.classList.add("has-image"),
      () => {
        avatar.classList.remove("has-image");
        image.remove();
      },
    );
  });
}

function rosterMemberMarkup(entry) {
  const role = roleForCharacter(entry);
  const rec = getArtifactRec(entry.name, role, entry);
  const icons = memberIconUrls(entry.name).filter(Boolean).join("|");
  const talents = `${entry.talents?.normal || 1}/${entry.talents?.skill || 1}/${entry.talents?.burst || 1}`;
  const weaponText = entry.weaponName ? `${entry.weaponName} Nv ${entry.weaponLevel || "?"}` : "Arma não informada";

  return `
    <div class="team-member">
      <div class="member-avatar" data-urls="${escapeHtml(icons)}">
        <img alt="" />
        <span>${escapeHtml(initialsForName(displayCharacterName(entry), "?"))}</span>
      </div>
      <div class="member-body">
        <div class="member-topline">
          <strong>${escapeHtml(displayCharacterName(entry))}</strong>
          <span class="member-role">${escapeHtml(ptBr(role))}</span>
        </div>
        <div class="stat-line"><b>Conta:</b> Nv ${format(entry.level || 1)} · Talentos ${escapeHtml(talents)} · ${escapeHtml(weaponText)}</div>
        <div class="artifact-line"><b>Artefato:</b> ${escapeHtml(ptBr(rec.set))}</div>
        <div class="stat-line"><b>Atributos:</b> ${escapeHtml(ptBr(rec.stats))}</div>
      </div>
    </div>
  `;
}

function renderRosterSuggestions(roster) {
  const cards = $("#rosterTeamCards");
  const name = $("#rosterTeamName");
  const meta = $("#rosterTeamMeta");
  if (!cards || !name || !meta) return [];

  const suggestions = suggestRosterTeams(roster);
  cards.replaceChildren();
  name.textContent = "Times possíveis";

  if (roster.length < 4) {
    meta.textContent = "Cadastre pelo menos 4 personagens para receber sugestões.";
    return suggestions;
  }

  if (!suggestions.length) {
    meta.textContent = "Não encontrei um quarteto com sinergia clara. Adicione suportes, cura ou aplicadores fora de campo.";
    cards.innerHTML = `
      <article class="team-card">
        <div class="team-card-head">
          <strong>Nenhum time forte encontrado</strong>
          <span>Tente cadastrar personagens como Bennett, Xingqiu, Furina, Nahida, Kazuha, Xilonen, Zhongli ou curadores.</span>
        </div>
      </article>
    `;
    return suggestions;
  }

  meta.textContent = `${suggestions.length} sugestões encontradas a partir de ${roster.length} personagens cadastrados.`;
  suggestions.forEach((suggestion, index) => {
    const card = document.createElement("article");
    card.className = "team-card";
    const reason = suggestion.evaluation.reasons.find((item) => item.type === "good")?.text || suggestion.source;
    card.innerHTML = `
      <div class="team-card-head">
        <strong>#${index + 1} · ${escapeHtml(suggestion.evaluation.grade)} · ${format(suggestion.evaluation.score)}/100</strong>
        <span>${escapeHtml(suggestion.team.map(displayCharacterName).join(" / "))}</span>
        <span>${escapeHtml(ptBr(reason))}</span>
      </div>
      <div class="team-members">${suggestion.team.map(rosterMemberMarkup).join("")}</div>
    `;
    cards.append(card);
  });
  hydrateMemberAvatars(cards);
  return suggestions;
}

function renderRoster() {
  const roster = rosterEntries();
  const list = $("#ownedRosterList");
  if (!list) return;
  list.replaceChildren();

  if (!roster.length) {
    list.innerHTML = `
      <div class="roster-card">
        <div class="member-avatar"><span>0</span></div>
        <div class="roster-card-main">
          <strong>Nenhum personagem cadastrado</strong>
          <span>Adicione seus personagens para o app montar times que fazem sentido.</span>
        </div>
      </div>
    `;
  } else {
    roster.forEach((entry) => {
      const icons = memberIconUrls(entry.name).filter(Boolean).join("|");
      const talents = `${entry.talents?.normal || 1}/${entry.talents?.skill || 1}/${entry.talents?.burst || 1}`;
      const card = document.createElement("div");
      card.className = "roster-card";
      card.innerHTML = `
        <div class="member-avatar" data-urls="${escapeHtml(icons)}">
          <img alt="" />
          <span>${escapeHtml(initialsForName(displayCharacterName(entry), "?"))}</span>
        </div>
        <div class="roster-card-main">
          <strong>${escapeHtml(displayCharacterName(entry))}</strong>
          <span>${format(entry.level || 1)} · Talentos ${escapeHtml(talents)} · ${escapeHtml(entry.weaponName || "Arma não informada")} Nv ${format(entry.weaponLevel || 1)}</span>
          <span>${escapeHtml(entry.rarity ? `${entry.rarity} estrelas` : "? estrelas")} · ${escapeHtml(displayCharacterMetaPart(entry.vision || "Elemento"))} · ${escapeHtml(ptBr(roleForCharacter(entry)))}</span>
        </div>
        <div class="roster-actions">
          <button class="small-button" type="button" data-action="edit-roster" data-id="${escapeHtml(entry.id)}">Editar</button>
          <button class="small-button" type="button" data-action="remove-roster" data-id="${escapeHtml(entry.id)}">Remover</button>
        </div>
      `;
      list.append(card);
    });
    hydrateMemberAvatars(list);
  }

  const suggestions = renderRosterSuggestions(roster);
  const averageLevel = roster.length
    ? Math.round(roster.reduce((sum, entry) => sum + (entry.level || 1), 0) / roster.length)
    : 0;
  renderSummary($("#rosterSummary"), [
    { label: "Personagens", value: format(roster.length), color: "teal" },
    { label: "Nível médio", value: format(averageLevel), color: "violet" },
    { label: "Times viáveis", value: format(suggestions.length), color: "gold" },
  ]);
}

function selectedCharacter() {
  const id = $("#characterSelect").value;
  return state.characters.find((character) => character.id === id);
}

function syncSelectedCharacter() {
  const character = selectedCharacter();
  const portrait = $("#characterPortrait");
  const frame = $(".portrait-frame");
  const fallback = $("#portraitFallback");
  const heroBand = $(".hero-band");
  const heroArtwork = $("#heroArtwork");
  const heroName = $("#heroName");
  const heroTags = $("#heroTags");

  frame.classList.remove("has-image");
  portrait.removeAttribute("src");
  heroBand.classList.remove("has-art");
  heroArtwork.removeAttribute("src");

  if (!character) {
    fallback.textContent = "GI";
    $("#characterMeta").textContent = "Cálculo genérico";
    heroName.textContent = "Escolha um personagem";
    heroTags.innerHTML = "<span>Calculadora pronta</span><span>Sem conexão</span>";
    renderTeamsForSelected();
    return;
  }

  const initials = initialsForName(displayCharacterName(character));
  fallback.textContent = initials || "GI";
  const metaParts = [
    character.rarity ? `${character.rarity} estrelas` : "",
    displayCharacterMetaPart(character.vision),
    displayWeaponType(character.weapon),
  ]
    .filter(Boolean);
  $("#characterMeta").textContent = metaParts.join(" · ");
  heroName.textContent = displayCharacterName(character);
  heroTags.replaceChildren(
    ...metaParts.map((part) => {
      const tag = document.createElement("span");
      tag.textContent = part;
      return tag;
    }),
  );

  const elementKey = String(character.vision || "").toLowerCase();
  const gemName = ELEMENT_GEMS[elementKey];
  const gemInput = $("#charGemName");
  const knownGem = [...Object.values(ELEMENT_GEMS), ...Object.values(LEGACY_ELEMENT_GEMS)].includes(gemInput.value);
  if (gemName && (gemInput.value === "Gema elemental" || knownGem)) {
    gemInput.value = gemName;
  }
  applyCharacterMaterialPreset(character);

  setImageWithFallback(
    portrait,
    characterImageUrls(character, "icon"),
    () => frame.classList.add("has-image"),
    () => frame.classList.remove("has-image"),
  );
  setImageWithFallback(
    heroArtwork,
    characterImageUrls(character, "hero"),
    () => heroBand.classList.add("has-art"),
    () => heroBand.classList.remove("has-art"),
  );
  renderTeamsForSelected();
}

function selectedWeapon() {
  const id = $("#weaponSelect").value;
  return state.weapons.find((weapon) => weapon.id === id);
}

function syncSelectedWeapon() {
  const weapon = selectedWeapon();
  const preview = $(".weapon-preview");
  const image = $("#weaponPortrait");
  const fallback = $("#weaponFallback");
  preview.classList.remove("has-image");
  image.removeAttribute("src");

  if (!weapon) {
    fallback.textContent = "A";
    $("#weaponTitle").textContent = "Arma genérica";
    $("#weaponMeta").textContent = `${$("#weaponRarity").value} estrelas`;
    return;
  }

  fallback.textContent = displayWeaponName(weapon).charAt(0).toUpperCase();
  $("#weaponTitle").textContent = displayWeaponName(weapon);
  $("#weaponMeta").textContent = [weapon.rarity ? `${weapon.rarity} estrelas` : "", displayWeaponType(weapon.weapon)]
    .filter(Boolean)
    .join(" · ");

  if (weapon.rarity && [3, 4, 5].includes(weapon.rarity)) {
    $("#weaponRarity").value = String(weapon.rarity);
  }
  applyWeaponMaterialPreset(weapon);

  image.onload = () => preview.classList.add("has-image");
  image.onerror = () => preview.classList.remove("has-image");
  image.src = `${API_BASE}/weapons/${weapon.id}/icon`;
}

function calculateCharacter() {
  const currentLevel = clamp(integer($("#charCurrentLevel").value), 1, 90);
  const targetLevel = clamp(integer($("#charTargetLevel").value), currentLevel, 90);
  const currentCap = clamp(integer($("#charCurrentCap").value), 20, 90);
  const targetCap = clamp(integer($("#charTargetCap").value), currentCap, 90);

  const expNeeded = Math.max(0, CHARACTER_EXP[targetLevel] - CHARACTER_EXP[currentLevel]);
  const books = optimizeItems(expNeeded, [
    { key: "hero", value: 20000 },
    { key: "adventurer", value: 5000 },
    { key: "wanderer", value: 1000 },
  ]);
  const levelMora = Math.ceil(books.provided / 5);

  const totals = {};
  CHAR_ASCENSION.filter((phase) => phase.cap > currentCap && phase.cap <= targetCap).forEach((phase) =>
    addTotals(totals, phase),
  );

  const gemName = $("#charGemName").value || "Gema elemental";
  const commonName = $("#charCommonName").value || "Material de monstro";
  const materials = [
    makeMaterial(`${gemName} - Sliver`, totals.gem1, read("#invCharGem1"), "1", "violet", "Gema T1"),
    makeMaterial(`${gemName} - Fragment`, totals.gem2, read("#invCharGem2"), "2", "violet", "Gema T2"),
    makeMaterial(`${gemName} - Chunk`, totals.gem3, read("#invCharGem3"), "3", "violet", "Gema T3"),
    makeMaterial(`${gemName} - Gemstone`, totals.gem4, read("#invCharGem4"), "4", "violet", "Gema T4"),
    makeMaterial($("#charBossName").value, totals.boss, read("#invCharBoss"), "B", "coral", "Chefe normal"),
    makeMaterial($("#charSpecialtyName").value, totals.specialty, read("#invCharSpecialty"), "S", "leaf", "Especialidade local"),
    makeMaterial(`${commonName} T1`, totals.common1, read("#invCharCommon1"), "1", "teal", "Monstro comum"),
    makeMaterial(`${commonName} T2`, totals.common2, read("#invCharCommon2"), "2", "teal", "Monstro comum"),
    makeMaterial(`${commonName} T3`, totals.common3, read("#invCharCommon3"), "3", "teal", "Monstro comum"),
    makeMaterial("Hero's Wit", books.counts.hero, read("#invHeroWit"), "H", "gold", `${format(expNeeded)} EXP`),
    makeMaterial("Adventurer's Experience", books.counts.adventurer, read("#invAdventurerExp"), "A", "gold", `${format(books.waste)} EXP sobra`),
    makeMaterial("Wanderer's Advice", books.counts.wanderer, read("#invWandererAdvice"), "W", "gold", `${format(books.provided)} EXP usado`),
    makeMaterial("Mora", (totals.mora || 0) + levelMora, read("#invCharMora"), "M", "gold", "Nivel + ascensao"),
  ];

  renderSummary($("#characterSummary"), [
    { label: "EXP necessario", value: format(expNeeded), color: "teal" },
    { label: "Mora faltante", value: format(materials.at(-1).missing), color: "gold" },
    { label: "Ascensoes", value: CHAR_ASCENSION.filter((phase) => phase.cap > currentCap && phase.cap <= targetCap).length, color: "violet" },
  ]);
  renderResults($("#characterResults"), materials);
  state.plans.character = {
    mora: materials.at(-1).missing,
    bossDrops: materials.find((item) => item.note === "Chefe normal")?.missing || 0,
  };
  state.lastLists.character = materials;
}

function talentRange(currentId, targetId) {
  const current = clamp(integer($(currentId).value), 1, 10);
  const target = clamp(integer($(targetId).value), current, 10);
  const total = {};
  for (let level = current + 1; level <= target; level += 1) {
    addTotals(total, TALENT_COSTS[level] || {});
  }
  return total;
}

function calculateTalents() {
  const totals = {};
  [
    talentRange("#talentNormalCurrent", "#talentNormalTarget"),
    talentRange("#talentSkillCurrent", "#talentSkillTarget"),
    talentRange("#talentBurstCurrent", "#talentBurstTarget"),
  ].forEach((cost) => addTotals(totals, cost));

  const bookName = $("#talentBookName").value || "Livro de talento";
  const commonName = $("#talentCommonName").value || "Material de monstro";
  const materials = [
    makeMaterial(`${bookName} - Ensinamentos`, totals.teachings, read("#invTeachings"), "E", "violet", "Livro T1"),
    makeMaterial(`${bookName} - Guia`, totals.guide, read("#invGuide"), "G", "violet", "Livro T2"),
    makeMaterial(`${bookName} - Filosofias`, totals.philosophies, read("#invPhilosophies"), "F", "violet", "Livro T3"),
    makeMaterial(`${commonName} T1`, totals.common1, read("#invTalentCommon1"), "1", "teal", "Monstro comum"),
    makeMaterial(`${commonName} T2`, totals.common2, read("#invTalentCommon2"), "2", "teal", "Monstro comum"),
    makeMaterial(`${commonName} T3`, totals.common3, read("#invTalentCommon3"), "3", "teal", "Monstro comum"),
    makeMaterial($("#talentWeeklyName").value, totals.weekly, read("#invWeekly"), "W", "coral", "Boss semanal"),
    makeMaterial($("#talentCrownName").value, totals.crown, read("#invCrown"), "C", "gold", "Nivel 10"),
    makeMaterial("Mora", totals.mora, read("#invTalentMora"), "M", "gold", "Talentos"),
  ];

  renderSummary($("#talentSummary"), [
    { label: "Livros T3", value: format(totals.philosophies || 0), color: "violet" },
    { label: "Coroas", value: format(totals.crown || 0), color: "gold" },
    { label: "Mora faltante", value: format(materials.at(-1).missing), color: "coral" },
  ]);
  renderResults($("#talentResults"), materials);
  state.plans.talents = { mora: materials.at(-1).missing };
  state.lastLists.talents = materials;
}

function calculateWeapon() {
  const rarity = String($("#weaponRarity").value);
  const currentLevel = clamp(integer($("#weaponCurrentLevel").value), 1, 90);
  const targetLevel = clamp(integer($("#weaponTargetLevel").value), currentLevel, 90);
  const currentCap = clamp(integer($("#weaponCurrentCap").value), 20, 90);
  const targetCap = clamp(integer($("#weaponTargetCap").value), currentCap, 90);
  const expTable = WEAPON_EXP[rarity];

  const expNeeded = Math.max(0, expTable[targetLevel] - expTable[currentLevel]);
  const ores = optimizeItems(expNeeded, [
    { key: "mystic", value: 10000 },
    { key: "fine", value: 2000 },
    { key: "basic", value: 400 },
  ]);
  const levelMora = Math.ceil(ores.provided / 10);

  const totals = {};
  WEAPON_ASCENSION[rarity]
    .filter((phase) => phase.cap > currentCap && phase.cap <= targetCap)
    .forEach((phase) => addTotals(totals, phase));

  const domainName = $("#weaponDomainName").value || "Material de ascensao da arma";
  const eliteName = $("#weaponEliteName").value || "Material de elite";
  const commonName = $("#weaponCommonName").value || "Material comum";
  const materials = [
    makeMaterial(`${domainName} T1`, totals.mat1, read("#invWeaponMat1"), "1", "violet", "Dominio de arma"),
    makeMaterial(`${domainName} T2`, totals.mat2, read("#invWeaponMat2"), "2", "violet", "Dominio de arma"),
    makeMaterial(`${domainName} T3`, totals.mat3, read("#invWeaponMat3"), "3", "violet", "Dominio de arma"),
    makeMaterial(`${domainName} T4`, totals.mat4, read("#invWeaponMat4"), "4", "violet", "Dominio de arma"),
    makeMaterial(`${eliteName} T1`, totals.elite1, read("#invWeaponElite1"), "1", "coral", "Inimigo elite"),
    makeMaterial(`${eliteName} T2`, totals.elite2, read("#invWeaponElite2"), "2", "coral", "Inimigo elite"),
    makeMaterial(`${eliteName} T3`, totals.elite3, read("#invWeaponElite3"), "3", "coral", "Inimigo elite"),
    makeMaterial(`${commonName} T1`, totals.common1, read("#invWeaponCommon1"), "1", "teal", "Inimigo comum"),
    makeMaterial(`${commonName} T2`, totals.common2, read("#invWeaponCommon2"), "2", "teal", "Inimigo comum"),
    makeMaterial(`${commonName} T3`, totals.common3, read("#invWeaponCommon3"), "3", "teal", "Inimigo comum"),
    makeMaterial("Mystic Enhancement Ore", ores.counts.mystic, read("#invMysticOre"), "M", "gold", `${format(expNeeded)} EXP`),
    makeMaterial("Fine Enhancement Ore", ores.counts.fine, read("#invFineOre"), "F", "gold", `${format(ores.waste)} EXP sobra`),
    makeMaterial("Enhancement Ore", ores.counts.basic, read("#invBasicOre"), "E", "gold", `${format(ores.provided)} EXP usado`),
    makeMaterial("Mora", (totals.mora || 0) + levelMora, read("#invWeaponMora"), "M", "gold", "Nivel + ascensao"),
  ];

  renderSummary($("#weaponSummary"), [
    { label: "EXP de arma", value: format(expNeeded), color: "teal" },
    { label: "Minerio mistico", value: format(ores.counts.mystic), color: "gold" },
    { label: "Mora faltante", value: format(materials.at(-1).missing), color: "coral" },
  ]);
  renderResults($("#weaponResults"), materials);
  state.plans.weapon = { mora: materials.at(-1).missing };
  state.lastLists.weapon = materials;
  syncSelectedWeapon();
}

function updateArtifactLevels() {
  const rarity = $("#artifactRarity").value;
  const max = ARTIFACT_EXP[rarity].length - 1;
  const current = clamp(integer($("#artifactCurrentLevel").value), 0, max);
  const target = clamp(integer($("#artifactTargetLevel").value) || max, current, max);
  fillLevelOptions($("#artifactCurrentLevel"), 0, max, current);
  fillLevelOptions($("#artifactTargetLevel"), 0, max, target);
}

function calculateArtifacts() {
  const rarity = $("#artifactRarity").value;
  const table = ARTIFACT_EXP[rarity];
  const current = clamp(integer($("#artifactCurrentLevel").value), 0, table.length - 1);
  const target = clamp(integer($("#artifactTargetLevel").value), current, table.length - 1);
  const pieces = clamp(integer($("#artifactPieces").value) || 1, 1, 5);
  const bonus = number($("#artifactBonus").value) || 1;
  const baseExp = Math.max(0, table[target] - table[current]) * pieces;
  const expNeeded = Math.ceil(baseExp / bonus);
  const essence = optimizeTwoItems(expNeeded, [
    { key: "essence", value: 10000 },
    { key: "unction", value: 2500 },
  ]);

  const readyExp = read("#invArtifactExp") + read("#invSanctEssence") * 10000 + read("#invSanctUnction") * 2500;
  const materials = [
    makeMaterial("Sanctifying Essence", essence.counts.essence, read("#invSanctEssence"), "E", "violet", "10.000 EXP"),
    makeMaterial("Sanctifying Unction", essence.counts.unction, read("#invSanctUnction"), "U", "violet", "2.500 EXP"),
    makeMaterial("EXP de artefato", expNeeded, readyExp, "X", "teal", `${format(baseExp)} EXP bruto`),
    makeMaterial("Mora", essence.provided, read("#invArtifactMora"), "M", "gold", "Fortalecimento"),
  ];

  renderSummary($("#artifactSummary"), [
    { label: "EXP necessario", value: format(expNeeded), color: "teal" },
    { label: "Pecas", value: format(pieces), color: "violet" },
    { label: "Mora faltante", value: format(materials.at(-1).missing), color: "gold" },
  ]);
  renderResults($("#artifactResults"), materials);
  state.plans.artifact = { mora: materials.at(-1).missing, exp: materials[2].missing };
  state.lastLists.artifact = materials;
}

function calculateWishes() {
  const primos = read("#primogems");
  const genesis = read("#genesis");
  const intertwined = read("#intertwined");
  const glitter = read("#starglitter");
  const dust = read("#stardust");
  const acquaint = read("#acquaint");
  const pity = clamp(integer($("#pity").value), 0, 89);
  const days = integer($("#daysUntil").value);
  const daily = read("#dailyPrimos");
  const extras = read("#extraPrimos");
  const goal = Math.max(1, integer($("#wishGoal").value));

  const glitterFates = Math.floor(glitter / 5);
  const dustFates = Math.floor(dust / 75);
  const futurePrimos = days * daily + extras;
  const limitedWishes = intertwined + glitterFates + dustFates + Math.floor((primos + genesis + futurePrimos) / 160);
  const leftoverPrimos = (primos + genesis + futurePrimos) % 160;
  const toHardPity = Math.max(0, 90 - pity);
  const toGuarantee = $("#guaranteed").value === "yes" ? toHardPity : toHardPity + 90;
  const missingForGoal = Math.max(0, goal - limitedWishes);

  const materials = [
    makeValue("Desejos limitados", limitedWishes, "★", "violet", `${format(leftoverPrimos)} primogemas sobrando`),
    makeMaterial("Faltam para hard pity", toHardPity, limitedWishes, "90", "coral", `Pity atual ${pity}`),
    makeMaterial("Faltam para garantido", toGuarantee, limitedWishes, "G", "gold", $("#guaranteed").value === "yes" ? "Garantido" : "Conta 50/50"),
    makeMaterial("Meta de desejos", goal, limitedWishes, "M", "teal", `${format(missingForGoal * 160)} primogemas faltantes`),
    makeValue("Destinos comuns", acquaint, "A", "teal", "Banner comum"),
  ];

  $("#wishMeter").style.width = `${Math.min(100, (pity / 90) * 100)}%`;
  renderSummary($("#wishSummary"), [
    { label: "Tiros limitados", value: format(limitedWishes), color: "violet" },
    { label: "Falta meta", value: format(missingForGoal), color: "coral" },
    { label: "Primos previstos", value: format(futurePrimos), color: "gold" },
  ]);
  renderResults($("#wishResults"), materials);
  state.lastLists.wishes = materials;
}

function calculateResin() {
  const moraNeeded = read("#resinMoraNeeded");
  const moraPerLeyline = Math.max(1, read("#moraPerLeyline"));
  const bossDrops = read("#bossDropsNeeded");
  const bossAvg = Math.max(1, read("#bossDropAverage"));
  const domainRuns = integer($("#domainRuns").value);
  const weekly30 = integer($("#weekly30").value);
  const weekly60 = integer($("#weekly60").value);
  const artifactExp = read("#artifactExpFarm");
  const fragile = integer($("#fragileResin").value);

  const leylineRuns = Math.ceil(moraNeeded / moraPerLeyline);
  const bossRuns = Math.ceil(bossDrops / bossAvg);
  const artifactRuns = Math.ceil(artifactExp / 14767);
  const resin =
    leylineRuns * 20 + bossRuns * 40 + domainRuns * 20 + weekly30 * 30 + weekly60 * 60 + artifactRuns * 20;
  const fragileResin = fragile * 60;
  const remaining = Math.max(0, resin - fragileResin);
  const days = remaining / 180;
  const condensed = domainRuns / 2 + artifactRuns / 2;

  const materials = [
    makeMaterial("Linhas ley de Mora", leylineRuns, 0, "L", "gold", `${format(moraNeeded)} Mora`),
    makeMaterial("Chefes normais", bossRuns, 0, "B", "coral", `${format(bossDrops)} drops`),
    makeMaterial("Dominios 20 resina", domainRuns, 0, "D", "violet", "Livros, armas ou artefatos"),
    makeMaterial("Boss semanal 30", weekly30, 0, "W", "teal", "Primeiros descontos"),
    makeMaterial("Boss semanal 60", weekly60, 0, "W", "teal", "Sem desconto"),
    makeMaterial("Artefatos", artifactRuns, 0, "A", "leaf", `${format(artifactExp)} EXP estimado`),
    makeMaterial("Resina original", resin, fragileResin, "R", "gold", `${format(remaining)} depois de fragil`),
    makeValue("Resina condensada", condensed, "C", "violet", "Equivalente para dominios"),
  ];

  renderSummary($("#resinSummary"), [
    { label: "Resina total", value: format(resin), color: "gold" },
    { label: "Dias sem fragil", value: days ? days.toFixed(1).replace(".", ",") : "0", color: "teal" },
    { label: "Fragil usada", value: format(fragile), color: "violet" },
  ]);
  renderResults($("#resinResults"), materials);
  state.plans.resin = { resin: materials[6].missing };
  state.lastLists.resin = materials;
}

function updateGlobalTotals() {
  const mora =
    state.plans.character.mora +
    state.plans.talents.mora +
    state.plans.weapon.mora +
    state.plans.artifact.mora;
  $("#globalMora").textContent = format(mora);
  $("#globalResin").textContent = format(state.plans.resin.resin);
}

function calculateAll() {
  calculateCharacter();
  calculateTalents();
  calculateWeapon();
  calculateArtifacts();
  calculateWishes();
  calculateResin();
  evaluateCustomTeam();
  updateGlobalTotals();
  renderGuide();
}

function exportPlan() {
  const selected = selectedCharacter();
  const weapon = selectedWeapon();
  const sectionLabels = {
    character: "Personagem",
    talents: "Talentos",
    weapon: "Arma",
    artifact: "Artefatos",
    wishes: "Gemas e desejos",
    resin: "Resina",
  };
  const lines = [
    "CalcTeyvat - plano",
    "",
    `Personagem: ${selected ? displayCharacterName(selected) : "Genérico"}`,
    `Arma: ${weapon ? displayWeaponName(weapon) : selectedOptionText($("#weaponRarity"))}`,
    "",
  ];

  Object.entries(state.lastLists).forEach(([section, materials]) => {
    lines.push((sectionLabels[section] || ptBr(section)).toUpperCase());
    materials
      .filter((item) => item.missing > 0)
      .forEach((item) => lines.push(`- ${item.label}: falta ${format(item.missing)} de ${format(item.total)}`));
    lines.push("");
  });

  $("#exportText").value = lines.join("\n");
  $("#exportDialog").showModal();
}

function fillResinFromPlan() {
  const mora =
    state.plans.character.mora +
    state.plans.talents.mora +
    state.plans.weapon.mora +
    state.plans.artifact.mora;
  $("#resinMoraNeeded").value = String(Math.ceil(mora));
  $("#bossDropsNeeded").value = String(Math.ceil(state.plans.character.bossDrops));
  $("#artifactExpFarm").value = String(Math.ceil(state.plans.artifact.exp));
  savePersisted();
  calculateAll();
}

function wireTabs() {
  $$(".tab-button").forEach((button) => {
    button.addEventListener("click", () => {
      $$(".tab-button").forEach((item) => item.classList.toggle("active", item === button));
      $$(".tab-panel").forEach((panel) => panel.classList.toggle("active", panel.id === button.dataset.tab));
    });
  });
}

function wireEvents() {
  document.addEventListener("input", (event) => {
    if (event.target.dataset?.autoMaterial === "true") {
      delete event.target.dataset.autoMaterial;
      event.target.removeAttribute("title");
    }
    if (event.target.matches("[data-persist]")) {
      savePersisted();
      calculateAll();
    }
  });

  document.addEventListener("change", (event) => {
    if (event.target.matches(".guide-check")) {
      setGuideChecked(event.target.dataset.guideScope, event.target.dataset.guideId, event.target.checked);
      savePersisted();
      renderGuide();
      return;
    }
    if (event.target.matches(".guide-filter")) {
      savePersisted();
      renderQuestGuide();
      return;
    }
    if (event.target.id === "characterSelect") syncSelectedCharacter();
    if (event.target.id === "weaponSelect") syncSelectedWeapon();
    if (event.target.id === "artifactRarity") updateArtifactLevels();
    if (event.target.id === "ownedCharacterSelect") {
      const existing = rosterEntries().find((entry) => entry.id === event.target.value);
      if (existing) fillRosterForm(existing.id);
      else {
        $("#ownedCharLevel").value = "90";
        $("#ownedTalentNormal").value = "1";
        $("#ownedTalentSkill").value = "1";
        $("#ownedTalentBurst").value = "1";
        $("#ownedWeaponName").value = "";
        $("#ownedWeaponLevel").value = "90";
      }
    }
    if (event.target.matches("[data-persist]")) {
      savePersisted();
      calculateAll();
    }
  });

  $("#resetInputs").addEventListener("click", () => {
    if (!window.confirm("Limpar os dados salvos desta calculadora?")) return;
    window.localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  });
  $("#exportPlan").addEventListener("click", exportPlan);
  $("#fillResinFromPlan").addEventListener("click", fillResinFromPlan);
  $("#useSelectedInTeam").addEventListener("click", () => {
    const character = selectedCharacter();
    if (!character) return;
    $("#teamSlot1").value = character.id;
    savePersisted();
    evaluateCustomTeam();
  });
  $("#clearCustomTeam").addEventListener("click", () => {
    teamSlotSelects().forEach((select) => {
      select.value = "";
    });
    savePersisted();
    evaluateCustomTeam();
  });
  $("#saveRosterCharacter").addEventListener("click", saveRosterFromForm);
  $("#clearRosterForm").addEventListener("click", clearRosterForm);
  $("#ownedRosterList").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    if (button.dataset.action === "edit-roster") fillRosterForm(button.dataset.id);
    if (button.dataset.action === "remove-roster") removeRosterEntry(button.dataset.id);
  });
}

function initStaticOptions() {
  fillLevelOptions($("#charCurrentLevel"), 1, 90, 1);
  fillLevelOptions($("#charTargetLevel"), 1, 90, 90);
  fillLevelOptions($("#weaponCurrentLevel"), 1, 90, 1);
  fillLevelOptions($("#weaponTargetLevel"), 1, 90, 90);
  [
    "#talentNormalCurrent",
    "#talentSkillCurrent",
    "#talentBurstCurrent",
  ].forEach((selector) => fillLevelOptions($(selector), 1, 10, 1));
  [
    "#talentNormalTarget",
    "#talentSkillTarget",
    "#talentBurstTarget",
  ].forEach((selector) => fillLevelOptions($(selector), 1, 10, 10));
  updateArtifactLevels();
}

function init() {
  initStaticOptions();
  populateSelect($("#characterSelect"), state.characters, "Genérico", displayCharacterName);
  populateSelect($("#weaponSelect"), state.weapons, "Genérica", displayWeaponName);
  populateTeamBuilderSelects();
  populateRosterCharacterSelect();
  populateGuideFilters();
  wireTabs();
  wireEvents();
  restorePersisted();
  migratePersistedLanguage();
  updateArtifactLevels();
  syncSelectedCharacter();
  syncSelectedWeapon();
  calculateAll();
  renderRoster();
  loadApiData();
}

init();
