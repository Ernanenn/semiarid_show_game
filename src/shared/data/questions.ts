import type { Question } from '../types';

// Array com as perguntas e respostas.
const rawQuestions: Omit<Question, 'id'>[] = [
  {
    question: 'Qual é a técnica de convivência com o Semiárido que consiste em armazenar água da chuva para uso posterior?',
    answers: [
      { text: 'Cisternas', correct: true },
      { text: 'Irrigação por gotejamento', correct: false },
      { text: 'Captação da água de rios', correct: false },
      { text: 'Aproveitamento da água de nascentes', correct: false },
    ],
  },
  {
    question: 'Qual é a técnica que consiste em revestir o solo com palha ou outros materiais, para reduzir a evaporação da água?',
    answers: [
      { text: 'Rotação de culturas', correct: false },
      { text: 'Cobertura morta', correct: true },
      { text: 'Adubação orgânica', correct: false },
      { text: 'Irrigação por aspersão', correct: false },
    ],
  },
  {
    question: 'Qual é a planta resistente à seca, rica em água e fibras, utilizada para alimentar o gado do Semiárido?',
    answers: [
      { text: 'Cana-de-açúcar', correct: false },
      { text: 'Soja', correct: false },
      { text: 'Silagem', correct: false },
      { text: 'Palma-forrageira', correct: true },
    ],
  },
  {
    question: 'Qual é o principal bioma do Semiárido brasileiro?',
    answers: [
      { text: 'Mata Atlântica', correct: false },
      { text: 'Caatinga', correct: true },
      { text: 'Cerrado', correct: false },
      { text: 'Pantanal', correct: false },
    ],
  },
  {
    question: 'Qual é a principal característica climática do Semiárido?',
    answers: [
      { text: 'Chuvas abundantes durante todo o ano', correct: false },
      { text: 'Estação seca prolongada e chuvas irregulares', correct: true },
      { text: 'Temperaturas muito baixas no inverno', correct: false },
      { text: 'Umidade relativa do ar sempre alta', correct: false },
    ],
  },
  {
    question: 'Qual é o nome dado ao período de estiagem prolongada no Semiárido?',
    answers: [
      { text: 'Inverno', correct: false },
      { text: 'Seca', correct: true },
      { text: 'Verão', correct: false },
      { text: 'Entressafra', correct: false },
    ],
  },
  {
    question: 'Qual é a técnica de captação de água da chuva que utiliza calhas e canos para direcionar a água para reservatórios?',
    answers: [
      { text: 'Poço artesiano', correct: false },
      { text: 'Cisterna de placa', correct: true },
      { text: 'Barragem subterrânea', correct: false },
      { text: 'Açude', correct: false },
    ],
  },
  {
    question: 'Qual é o animal símbolo da Caatinga?',
    answers: [
      { text: 'Onça-pintada', correct: false },
      { text: 'Arara-azul', correct: false },
      { text: 'Tatu-bola', correct: true },
      { text: 'Capivara', correct: false },
    ],
  },
  {
    question: 'Qual é a principal atividade econômica do Semiárido?',
    answers: [
      { text: 'Agricultura de sequeiro e pecuária extensiva', correct: true },
      { text: 'Mineracao', correct: false },
      { text: 'Indústria têxtil', correct: false },
      { text: 'Turismo de praia', correct: false },
    ],
  },
  {
    question: 'Qual é o nome dado às comunidades rurais do Semiárido que praticam agricultura familiar?',
    answers: [
      { text: 'Fazendas', correct: false },
      { text: 'Assentamentos', correct: true },
      { text: 'Latifúndios', correct: false },
      { text: 'Agronegócios', correct: false },
    ],
  },
  {
    question: 'Qual é a técnica de plantio que utiliza sulcos para reter água da chuva?',
    answers: [
      { text: 'Plantio direto', correct: false },
      { text: 'Plantio em curva de nível', correct: true },
      { text: 'Plantio em linha reta', correct: false },
      { text: 'Plantio em espiral', correct: false },
    ],
  },
  {
    question: 'Qual é o nome dado ao sistema de produção que combina agricultura e criação de animais?',
    answers: [
      { text: 'Monocultura', correct: false },
      { text: 'Agrofloresta', correct: false },
      { text: 'Sistema agrossilvipastoril', correct: true },
      { text: 'Hidroponia', correct: false },
    ],
  },
  {
    question: 'Qual é a principal fonte de energia renovável no Semiárido?',
    answers: [
      { text: 'Energia hidrelétrica', correct: false },
      { text: 'Energia eólica', correct: true },
      { text: 'Energia nuclear', correct: false },
      { text: 'Energia geotérmica', correct: false },
    ],
  },
  {
    question: 'Qual é o nome dado ao período de chuvas no Semiárido?',
    answers: [
      { text: 'Inverno', correct: true },
      { text: 'Verão', correct: false },
      { text: 'Primavera', correct: false },
      { text: 'Outono', correct: false },
    ],
  },
  {
    question: 'Qual é a técnica de conservação do solo que utiliza plantas para cobrir o solo?',
    answers: [
      { text: 'Queimada', correct: false },
      { text: 'Cobertura vegetal', correct: true },
      { text: 'Desmatamento', correct: false },
      { text: 'Erosão', correct: false },
    ],
  },
  {
    question: 'Qual é o nome dado às pequenas propriedades rurais do Semiárido?',
    answers: [
      { text: 'Latifúndios', correct: false },
      { text: 'Minifúndios', correct: true },
      { text: 'Fazendas', correct: false },
      { text: 'Estâncias', correct: false },
    ],
  },
  {
    question: 'Qual é a principal dificuldade enfrentada pelos agricultores do Semiárido?',
    answers: [
      { text: 'Excesso de chuvas', correct: false },
      { text: 'Falta de água', correct: true },
      { text: 'Solo muito fértil', correct: false },
      { text: 'Temperaturas muito baixas', correct: false },
    ],
  },
  {
    question: 'Qual é o nome dado ao sistema de captação de água que utiliza telhados?',
    answers: [
      { text: 'Cisterna de placa', correct: false },
      { text: 'Cisterna de calçadão', correct: false },
      { text: 'Cisterna de telhado', correct: true },
      { text: 'Barragem', correct: false },
    ],
  },
  {
    question: 'Qual é a principal cultura alimentar do Semiárido?',
    answers: [
      { text: 'Arroz', correct: false },
      { text: 'Feijão', correct: true },
      { text: 'Soja', correct: false },
      { text: 'Trigo', correct: false },
    ],
  },
  {
    question: 'Qual é o nome dado ao processo de adaptação das plantas ao clima semiárido?',
    answers: [
      { text: 'Xerofitismo', correct: true },
      { text: 'Hidrofitismo', correct: false },
      { text: 'Mesofitismo', correct: false },
      { text: 'Higrofitismo', correct: false },
    ],
  },
  {
    question: 'Qual é o nome popular dado ao cacto mandacaru no Semiárido?',
    answers: [
      { text: 'Xique-xique', correct: false },
      { text: 'Mandacaru', correct: true },
      { text: 'Pitaya', correct: false },
      { text: 'Palma', correct: false },
    ],
  },
  {
    question: 'Qual é a principal festa popular do Semiárido brasileiro?',
    answers: [
      { text: 'Carnaval', correct: false },
      { text: 'São João', correct: true },
      { text: 'Festa do Peão', correct: false },
      { text: 'Oktoberfest', correct: false },
    ],
  },
  {
    question: 'Qual é o nome dado ao artesanato típico feito com barro no Semiárido?',
    answers: [
      { text: 'Cerâmica', correct: true },
      { text: 'Porcelana', correct: false },
      { text: 'Vidro', correct: false },
      { text: 'Metal', correct: false },
    ],
  },
  {
    question: 'Qual é o principal rio do Semiárido brasileiro?',
    answers: [
      { text: 'Rio São Francisco', correct: true },
      { text: 'Rio Amazonas', correct: false },
      { text: 'Rio Paraná', correct: false },
      { text: 'Rio Tietê', correct: false },
    ],
  },
  {
    question: 'Qual é o nome dado ao sistema de irrigação que economiza água?',
    answers: [
      { text: 'Irrigação por aspersão', correct: false },
      { text: 'Irrigação por gotejamento', correct: true },
      { text: 'Irrigação por inundação', correct: false },
      { text: 'Irrigação por canais', correct: false },
    ],
  },
  {
    question: 'Qual é a principal dança folclórica do Semiárido?',
    answers: [
      { text: 'Samba', correct: false },
      { text: 'Forró', correct: true },
      { text: 'Axé', correct: false },
      { text: 'Funk', correct: false },
    ],
  },
  {
    question: 'Qual é o nome dado ao período de chuvas intensas no Semiárido?',
    answers: [
      { text: 'Inverno', correct: true },
      { text: 'Verão', correct: false },
      { text: 'Seca', correct: false },
      { text: 'Entressafra', correct: false },
    ],
  },
  {
    question: 'Qual é a técnica de armazenamento de grãos no Semiárido?',
    answers: [
      { text: 'Silos', correct: true },
      { text: 'Caixas de madeira', correct: false },
      { text: 'Sacos plásticos', correct: false },
      { text: 'Latas', correct: false },
    ],
  },
  {
    question: 'Qual é o nome dado ao sistema de criação de animais em áreas secas?',
    answers: [
      { text: 'Pecuária extensiva', correct: true },
      { text: 'Pecuária intensiva', correct: false },
      { text: 'Avicultura', correct: false },
      { text: 'Piscicultura', correct: false },
    ],
  },
  {
    question: 'Qual é a principal fonte de renda das famílias rurais do Semiárido?',
    answers: [
      { text: 'Agricultura familiar', correct: true },
      { text: 'Indústria', correct: false },
      { text: 'Comércio', correct: false },
      { text: 'Serviços', correct: false },
    ],
  },
  {
    question: 'Qual é o nome dado ao processo de desertificação no Semiárido?',
    answers: [
      { text: 'Degradação do solo', correct: true },
      { text: 'Fertilização', correct: false },
      { text: 'Irrigação', correct: false },
      { text: 'Reflorestamento', correct: false },
    ],
  },
  {
    question: 'Qual é a principal técnica de conservação de alimentos no Semiárido?',
    answers: [
      { text: 'Secagem ao sol', correct: true },
      { text: 'Congelamento', correct: false },
      { text: 'Refrigeração', correct: false },
      { text: 'Enlatamento', correct: false },
    ],
  },
  {
    question: 'Qual é o nome dado ao sistema de produção que integra árvores, cultivos e animais?',
    answers: [
      { text: 'Sistema agrossilvipastoril', correct: true },
      { text: 'Monocultura', correct: false },
      { text: 'Agricultura orgânica', correct: false },
      { text: 'Hidroponia', correct: false },
    ],
  },
  {
    question: 'Qual é a principal dificuldade de acesso à água no Semiárido?',
    answers: [
      { text: 'Escassez hídrica', correct: true },
      { text: 'Excesso de água', correct: false },
      { text: 'Água contaminada', correct: false },
      { text: 'Custo elevado', correct: false },
    ],
  },
  {
    question: 'Qual é o nome dado ao sistema de captação de água de poços?',
    answers: [
      { text: "Bomba d'água", correct: true },
      { text: 'Cisterna', correct: false },
      { text: 'Barragem', correct: false },
      { text: 'Açude', correct: false },
    ],
  },
  {
    question: 'Qual é a principal cultura de subsistência no Semiárido?',
    answers: [
      { text: 'Milho e feijão', correct: true },
      { text: 'Soja e trigo', correct: false },
      { text: 'Arroz e algodão', correct: false },
      { text: 'Café e cana', correct: false },
    ],
  },
  {
    question: 'Qual é o nome dado ao sistema de rotação de culturas no Semiárido?',
    answers: [
      { text: 'Consórcio', correct: true },
      { text: 'Monocultura', correct: false },
      { text: 'Plantio direto', correct: false },
      { text: 'Agrofloresta', correct: false },
    ],
  },
  {
    question: 'Qual é a principal técnica de manejo do solo no Semiárido?',
    answers: [
      { text: 'Cobertura morta', correct: true },
      { text: 'Queimada', correct: false },
      { text: 'Desmatamento', correct: false },
      { text: 'Erosão', correct: false },
    ],
  },
  {
    question: 'Qual é o nome dado ao sistema de produção de mel no Semiárido?',
    answers: [
      { text: 'Apicultura', correct: true },
      { text: 'Piscicultura', correct: false },
      { text: 'Avicultura', correct: false },
      { text: 'Suinocultura', correct: false },
    ],
  },
];

// Adiciona IDs únicos às perguntas e respostas
export const questions: Question[] = rawQuestions.map((question, questionIndex) => {
  const questionId = `q-${questionIndex + 1}`;
  return {
    ...question,
    id: questionId,
    answers: question.answers.map((answer, answerIndex) => ({
      ...answer,
      id: `${questionId}-a-${answerIndex + 1}`,
    })),
  };
});

