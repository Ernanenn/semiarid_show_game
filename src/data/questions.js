// Array com as perguntas e respostas.
const rawQuestions = [
    {
        question: "Qual é a técnica de convivência com o Semiárido que consiste em armazenar água da chuva para uso posterior?",
        answers: [
            { text: "Cisternas", correct: true },
            { text: "Irrigação por gotejamento", correct: false },
            { text: "Captação da água de rios", correct: false },
            { text: "Aproveitamento da água de nascentes", correct: false }
        ]
    },
    {
        question: "Qual é a técnica que consiste em revestir o solo com palha ou outros materiais, para reduzir a evaporação da água?",
        answers: [
            { text: "Rotação de culturas", correct: false },
            { text: "Cobertura morta", correct: true },
            { text: "Adubação orgânica", correct: false },
            { text: "Irrigação por aspersão", correct: false }
        ]
    },
    {
        question: "Qual é a planta resistente à seca, rica em água e fibras, utilizada para alimentar o gado do Semiárido?",
        answers: [
            { text: "Cana-de-açúcar", correct: false },
            { text: "Soja", correct: false },
            { text: "Silagem", correct: false },
            { text: "Palma-forrageira", correct: true }
        ]
    },
    {
        question: "Qual é a técnica que consiste em captar água da chuva por meio de telhados inclinados?",
        answers: [
            { text: "Cisternas calçadão", correct: false },
            { text: "Irrigação por gotejamento", correct: false },
            { text: "Cisternas de placas", correct: true },
            { text: "Aproveitamento de água de nascentes", correct: false }
        ],
    },
    {
        question: "Qual é a principal vantagem da exploração do umbuzeiro (Spondia tuberosa Arruda) no Semiárido?",
        answers: [
            { text: "Potencial de produção de frutas e produtos derivados para consumo e comercialização", correct: true },
            { text: "Capacidade de purificação da água subterrânea", correct: false },
            { text: "Produção de madeira de alta qualidade", correct: false },
            { text: "Nenhuma das alternativas", correct: false }
        ]
    },
    {
        question: "Qual é a principal característica climática do Semiárido brasileiro?",
        answers: [
            { text: "Baixa temperatura média anual", correct: false },
            { text: "Longos períodos de seca", correct: true },
            { text: "Elevada pluviosidade", correct: false },
            { text: "Alta umidade relativa do ar", correct: false }
        ]
    },
    {
        question: "A vegetação predominante no Semiárido brasileiro é conhecida como?",
        answers: [
            { text: "Floresta Amazônica", correct: false },
            { text: "Mata Atlântica", correct: false },
            { text: "Caatinga", correct: true },
            { text: "Cerrado", correct: false }
        ]
    },
    {
        question: "Como ocorre a precipitação pluviométrica no Semiárido brasileiro?",
        answers: [
            { text: "Chuvas irregulares e concentradas em curtos períodos", correct: true },
            { text: "Chuvas de inverno e nevoeiros frequentes", correct: false },
            { text: "Chuvas de verão e neblina densa", correct: false },
            { text: "Chuvas torrenciais e tempestades de neve", correct: false }
        ]
    },
    {
        question: "A biodiversidade no semiárido brasileiro é:",
        answers: [
            { text: "Baixa, devido às condições adversas do clima", correct: false },
            { text: "Alta, devido à elevada pluviosidade", correct: false },
            { text: "Baixa, devido à falta de recursos hídricos", correct: false },
            { text: "Alta, com uma grande variedade de espécies adaptadas às condições áridas", correct: true }
        ]
    },
    {
        question: "Quais são algumas das espécies típicas da fauna do Semiárido brasileiro?",
        answers: [
            { text: "Tatu-peba e raposa-do-campo", correct: true },
            { text: "Arara-azul e Lhama", correct: false },
            { text: "Mico-leão-dourado e papagaio-verdadeiro", correct: false },
            { text: "Onça-pintada e jacaré-do-pantanal", correct: false }
        ]
    },
    {
        question: "O que é a palma forrageira?",
        answers: [
            { text: "Uma leguminosa", correct: false },
            { text: "Uma gramínea", correct: false },
            { text: "Um cacto", correct: true },
            { text: "Uma hortaliça", correct: false }
        ]
    },
    {
        question: "A palma é rica em que?",
        answers: [
            { text: "Matéria-seca", correct: false },
            { text: "Proteína", correct: false },
            { text: "Água", correct: true },
            { text: "Pêlos", correct: false }
        ]
    },
    {
        question: "A palma serve para alimentar?",
        answers: [
            { text: "Humanos", correct: false },
            { text: "Animais", correct: false },
            { text: "Humanos e animais", correct: true },
            { text: "Nenhuma das alternativas", correct: false }
        ]
    },
    {
        question: "O que a palma produz?",
        answers: [
            { text: "Frutos", correct: false },
            { text: "Alimento", correct: false },
            { text: "Forragem", correct: false },
            { text: "Todas as alternativas", correct: true }
        ]
    },
    {
        question: "Como se chama o fruto da palma?",
        answers: [
            { text: "Figo-da-China", correct: false },
            { text: "Figo-da-Indonésia", correct: false },
            { text: "Figo-da-Índia", correct: true },
            { text: "Fruto do Conde", correct: false }
        ]
    },
    {
        question: "Na dieta animal a palma forrageira entra principalmente como fonte de?",
        answers: [
            { text: "Proteína", correct: false },
            { text: "Sacarose", correct: false },
            { text: "Energia", correct: true },
            { text: "Gordura", correct: false }
        ]
    },
    {
        question: "Após colhida, a palma precisa passar por um período de “cura”, para perder umidade e cicatrizar o corte. Como deve ser o ambiente de armazenamento?",
        answers: [
            { text: "Em ambiente úmido", correct: false },
            { text: "Á sombra, em local coberto e ventilado e preferencialmente sem amontoar", correct: true },
            { text: "Ao ar livre e amontoadas", correct: false },
            { text: "Nenhuma das alternativas", correct: false }
        ]
    },
    {
        question: "Qual o tempo médio indicado para deixar os cladódios sementes, em processo de “cura”, antes do plantio?",
        answers: [
            { text: "A palma não precisa desse período", correct: false },
            { text: "Entre 1 e 4 dias", correct: false },
            { text: "Entre 6 e 5 dias", correct: false },
            { text: "Entre 8 e 15 dias", correct: true }
        ]
    },
    {
        question: "Como devem ser as plantas matrizes de onde serão colhidos os cladódios sementes para o plantio?",
        answers: [
            { text: "Plantas sadias, livres de pragas e doenças e com bom desenvolvimento", correct: true },
            { text: "Plantas que apresentem infestação de pragas e doenças", correct: false },
            { text: "Plantas raquíticas", correct: false },
            { text: "Nenhuma das alternativas", correct: false }
        ]
    },
    {
        question: "Quais as formas de propagação da palma forrageira?",
        answers: [
            { text: "Somente por raquete inteira", correct: false },
            { text: "Por raquetes inteiras e fracionadas", correct: false },
            { text: "Por raquetes inteiras, fracionadas e sementes", correct: true },
            { text: "Somente por sementes", correct: false }
        ]
    },
    {
        question: "Qual é uma estratégia comum para lidar com a escassez de água na região Semiárida?",
        answers: [
            { text: "Utilização de irrigação em larga escala", correct: false },
            { text: "Captar e armazenar água de chuva", correct: true },
            { text: "Consumo excessivo de água", correct: false },
            { text: "Nenhuma das alternativas", correct: false }
        ]
    },
    {
        question: "Qual é um dos desafios enfrentado pelos produtores rurais da região Semiárida?",
        answers: [
            { text: "Erosão do solo e falta de água para irrigação", correct: true },
            { text: "Deficiência de luz solar", correct: false },
            { text: "Excesso de chuvas e enxurradas frequentes", correct: false },
            { text: "Nenhuma das alternativas", correct: false }
        ]
    },
    {
        question: "Como as comunidades no Semiárido podem lidar com a falta de alimentos durante a seca?",
        answers: [
            { text: "Importação de alimentos de outras regiões", correct: false },
            { text: "Aumento das áreas de plantio", correct: false },
            { text: "Desenvolvimento de técnicas de beneficiamento e utilização de PANC", correct: true },
            { text: "Nenhuma das alternativas", correct: false }
        ]
    },
    {
        question: "Quais as formações rochosas comuns em áreas de clima Árido e Semiárido?",
        answers: [
            { text: "Morros e colinas", correct: false },
            { text: "Cânions e vales", correct: true },
            { text: "Serras e planaltos", correct: false },
            { text: "Nenhuma das alternativas", correct: false }
        ]
    },
    {
        question: "Quais desses Estados do Brasil estão dentro da delimitação do Semiárido?",
        answers: [
            { text: "Ceará, Pernambuco e Paraíba", correct: true },
            { text: "Bahia, Sergipe e Goiás", correct: false },
            { text: "Rio Grande do Norte, Paraná e Piauí", correct: false },
            { text: "Maranhão, Amazonas e Acre", correct: false }
        ]
    },
    {
        question: "Qual é uma fonte importante de água na região semiárida?",
        answers: [
            { text: "Lagos e rios perenes", correct: false },
            { text: "Açudes e cisternas para armazenamento de água da chuva", correct: true },
            { text: "Grandes aquíferos subterrâneos", correct: false },
            { text: "Açudes e rios perenes", correct: false }
        ]
    },
    {
        question: "O Semiárido brasileiro predomina em qual região do país?",
        answers: [
            { text: "Região Nordeste", correct: true },
            { text: "Região Centro-Oeste", correct: false },
            { text: "Região Norte", correct: false },
            { text: "Região Sul", correct: false }
        ]
    },
    {
        question: "Qual é o principal rio que atravessa a região Semiárida do Brasil?",
        answers: [
            { text: "Rio Amazonas", correct: false },
            { text: "Rio São Francisco", correct: true },
            { text: "Rio Paraná", correct: false },
            { text: "Rio Tocantins", correct: false }
        ]
    },
    {
        question: "O que é a transposição do São Francisco?",
        answers: [
            { text: "Um projeto de construção de uma barragem para armazenar água", correct: false },
            { text: "Interligação de bacias hidrográficas para levar água a outras regiões", correct: true },
            { text: "Um projeto de reflorestamento de áreas degradadas", correct: false },
            { text: "Aterramento e construção de cidades dentro do rio", correct: false }
        ]
    },
    {
        question: "Quais as principais adaptações das plantas da Caatinga para sobreviverem ao clima seco?",
        answers: [
            { text: "Raízes profundas, folhas pequenas e caules suculentos", correct: true },
            { text: "Folhas grandes e raízes superficiais", correct: false },
            { text: "Caules finos e folhas caducas durante todo o ano", correct: false },
            { text: "Nenhuma das alternativas", correct: false }
        ]
    },
    {
        question: "Cite algumas espécies de plantas típicas da Caatinga e suas importâncias.",
        answers: [
            { text: "Cacto, mandacaru e umbuzeiro, importantes fontes de água e alimento", correct: true },
            { text: "Ipê, jacarandá e mangue, comuns em áreas úmidas", correct: false },
            { text: "Samambaia, orquídea e bromélia, típicas de regiões montanhosas", correct: false },
            { text: "Nenhuma das alternativas", correct: false }
        ]
    },
    {
        question: "Quais os principais desafios enfrentados pela população do Semiárido?",
        answers: [
            { text: "Secas prolongadas, falta de acesso à água potável e pobreza", correct: true },
            { text: "Excesso de chuvas, inundações e deslizamentos de terra", correct: false },
            { text: "Baixas temperaturas e geadas frequentes", correct: false },
            { text: "Nenhuma das alternativas", correct: false }
        ]
    },
    {
        question: "Qual a principal atividade agrícola praticada pela população rural do Semiárido?",
        answers: [
            { text: "Monocultura de soja e milho", correct: false },
            { text: "Agricultura familiar de subsistência", correct: true },
            { text: "Produção de frutas tropicais em larga escala", correct: false },
            { text: "Nenhuma das alternativas", correct: false }
        ]
    },
    {
        question: "Quais as principais festas e manifestações culturais do Semiárido?",
        answers: [
            { text: "São João, Festa do Divino Espírito Santo e Vaqueijada", correct: true },
            { text: "Carnaval, Oktoberfest e Festa Junina", correct: false },
            { text: "Natal, Ano Novo e Páscoa", correct: false },
            { text: "Nenhuma das alternativas", correct: false }
        ]
    },
    {
        question: "Qual a importância das cisternas para a vida das comunidades rurais?",
        answers: [
            { text: "Garantir o abastecimento de água para consumo humano e animal", correct: true },
            { text: "Armazenar água para irrigação de grandes lavouras", correct: false },
            { text: "Gerar energia elétrica para as comunidades", correct: false },
            { text: "Nenhuma das alternativas", correct: false }
        ]
    },
    {
        question: "Como a agroecologia pode contribuir para a sustentabilidade da agricultura familiar no Semiárido?",
        answers: [
            { text: "Promovendo o uso de agrotóxicos e fertilizantes químicos", correct: false },
            { text: "Conservando o solo, a água e a biodiversidade", correct: true },
            { text: "Aumentando a produção em larga escala para o mercado externo", correct: false },
            { text: "Nenhuma das alternativas", correct: false }
        ]
    },
    {
        question: "Qual a principal característica dos recursos hídricos no Semiárido brasileiro?",
        answers: [
            { text: "Abundância de rios perenes e grandes lagos", correct: false },
            { text: "Irregularidade das chuvas e escassez de água em muitos períodos do ano", correct: true },
            { text: "Predomínio de geleiras e neves eternas", correct: false },
            { text: "Alta umidade relativa do ar durante todo o ano", correct: false }
        ]
    },
    {
        question: "Qual a principal adaptação das plantas da Caatinga ao clima semiárido?",
        answers: [
            { text: "Folhas largas e perenes para realizar a fotossíntese durante todo o ano", correct: false },
            { text: "Raízes profundas para buscar água no subsolo", correct: true },
            { text: "Troncos finos e delicados para facilitar a perda de água por transpiração", correct: false },
            { text: "Frutos grandes e suculentos para atrair animais", correct: false }
        ]
    },
    {
        question: "Qual dos seguintes desafios sociais é mais comum nas áreas rurais do Semiárido brasileiro?",
        answers: [
            { text: "Alto índice de desenvolvimento humano (IDH)", correct: false },
            { text: "Baixo acesso à educação e saúde", correct: true },
            { text: "Predomínio de atividades industriais", correct: false },
            { text: "Alta renda per capita", correct: false }
        ]
    },
    {
        question: "Qual das seguintes políticas públicas é fundamental para a melhoria da qualidade de vida no Semiárido brasileiro?",
        answers: [
            { text: "Incentivo à monocultura em larga escala", correct: false },
            { text: "Investimento em infraestrutura hídrica, como cisternas e barragens", correct: true },
            { text: "Redução dos investimentos em pesquisa científica", correct: false },
            { text: "Desestímulo à agricultura familiar", correct: false }
        ]
    }
];

export const questions = rawQuestions.map((question, questionIndex) => {
    const questionId = `q-${String(questionIndex + 1).padStart(3, '0')}`;

    return {
        ...question,
        id: questionId,
        answers: question.answers.map((answer, answerIndex) => ({
            ...answer,
            id: `${questionId}-a-${answerIndex + 1}`,
        })),
    };
});