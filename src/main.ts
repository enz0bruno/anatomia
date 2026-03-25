import confetti from 'canvas-confetti';
import './index.css';

// --- DATA TYPES ---
interface Question {
  id: number;
  text: string;
  type: 'text' | 'boolean' | 'choice';
  correctAnswer: string | boolean;
  options?: string[];
  explanation?: string;
}

interface QuizPart {
  title: string;
  description: string;
  questions: Question[];
}

interface StudyTopic {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  details: { name: string; description: string }[];
}

// --- DATA ---
const QUIZ_DATA: QuizPart[] = [
  {
    title: "PARTE 1: RELAÇÕES E ARTICULAÇÕES (Escrita)",
    description: "Escreva a resposta correta para cada pergunta técnica.",
    questions: [
      { id: 1, text: "O Capítulo do úmero se articula com qual osso do antebraço?", type: 'text', correctAnswer: "radio", explanation: "O capítulo do úmero é redondo para o rádio girar sobre ele." },
      { id: 2, text: "O Processo Condilar da mandíbula se encaixa em qual fossa do osso temporal?", type: 'text', correctAnswer: "fossa mandibular", explanation: "É o buraquinho no osso temporal onde a mandíbula encaixa." },
      { id: 3, text: "Quais são os 3 ossos que se fundem para formar o Osso do Quadril (Coxal)?", type: 'text', correctAnswer: "ilio, isquio e pubis", explanation: "Os três se unem no Acetábulo." },
      { id: 4, text: "A Cavidade Glenoidal da escápula recebe a cabeça de qual osso?", type: 'text', correctAnswer: "umero", explanation: "Forma a articulação Glenoumeral." },
      { id: 5, text: "Qual acidente da Ulna se encaixa na Fossa do Olécrano do Úmero?", type: 'text', correctAnswer: "olecrano", explanation: "A pontinha da Ulna que 'trava' no cotovelo quando esticamos o braço." },
    ]
  },
  {
    title: "PARTE 2: MOVIMENTOS E MÚSCULOS (Assinalar)",
    description: "Escolha a alternativa correta.",
    questions: [
      { id: 6, text: "Ao fazer o movimento de 'rosca direta' (dobrar o cotovelo), o principal músculo acionado é o:", type: 'choice', options: ["Tríceps Braquial", "Bíceps Braquial", "Deltoide"], correctAnswer: "Bíceps Braquial", explanation: "Bíceps flexiona, Tríceps estende." },
      { id: 7, text: "Qual destes músculos NÃO faz parte do grupo Quadríceps Femoral?", type: 'choice', options: ["Vasto Lateral", "Reto Femoral", "Bíceps Femoral"], correctAnswer: "Bíceps Femoral", explanation: "Bíceps Femoral fica atrás da coxa; o Quadríceps fica na frente." },
      { id: 8, text: "O músculo Gastrocnêmio e o Sóleo se unem para formar qual tendão famoso?", type: 'choice', options: ["Tendão do Bíceps", "Tendão de Aquiles (Calcâneo)", "Tendão Patelar"], correctAnswer: "Tendão de Aquiles (Calcâneo)", explanation: "Tendão Calcâneo é o nome técnico." },
      { id: 9, text: "Qual a função principal do músculo Masseter?", type: 'choice', options: ["Girar o pescoço", "Elevação da mandíbula (mastigação)", "Fechar os olhos"], correctAnswer: "Elevação da mandíbula (mastigação)", explanation: "O Masseter é o músculo mais forte da face." },
      { id: 10, text: "O músculo Sartório tem esse nome porque sua contração permite a posição de:", type: 'choice', options: ["Sentar como um alfaiate (pernas cruzadas)", "Correr", "Nadar"], correctAnswer: "Sentar como um alfaiate (pernas cruzadas)", explanation: "Ele flexiona, abduz e rotaciona a coxa." },
    ]
  },
  {
    title: "PARTE 3: VERDADEIRO OU FALSO",
    description: "Responda se a afirmação é Verdadeira ou Falsa.",
    questions: [
      { id: 11, text: "O osso Etmoide localiza-se na base do crânio, atrás do Esfenoide.", type: 'boolean', correctAnswer: false, explanation: "Falso. O Etmoide fica na frente do Esfenoide." },
      { id: 12, text: "As vértebras Lombares são as únicas que possuem forames nos processos transversos.", type: 'boolean', correctAnswer: false, explanation: "Falso. Isso é característica das vértebras Cervicais." },
      { id: 13, text: "O Trocânter Menor do fêmur serve como ponto de inserção para o músculo Ilio-psoas.", type: 'boolean', correctAnswer: true, explanation: "Verdadeiro. É um ponto importante de força no quadril." },
      { id: 14, text: "A articulação do joelho é formada pela união do Fêmur, Tíbia e Fíbula.", type: 'boolean', correctAnswer: false, explanation: "Falso. A Fíbula NÃO faz parte da articulação do joelho, apenas Tíbia, Fêmur e Patela." },
      { id: 15, text: "O músculo Trapézio possui fibras que podem elevar, retrair ou deprimir a escápula.", type: 'boolean', correctAnswer: true, explanation: "Verdadeiro. O Trapézio é um músculo muito grande e versátil." },
    ]
  }
];

const STUDY_CONTENT: StudyTopic[] = [
  { id: 'skull_face', title: '1. Crânio e Face', description: 'Foque nestes nomes. Se o professor colocar a etiqueta, será em um destes:', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Human_skull_front_simplified_%28bones%29.svg/800px-Human_skull_front_simplified_%28bones%29.svg.png', details: [{ name: 'CRÂNIO', description: 'Frontal, Parietal, Occipital, Temporal e Esfenoide (Asa Maior).' }, { name: 'FACE', description: 'Maxila, Mandíbula (Processo Condilar e Ângulo), Zigomático e Nasal.' }] },
  { id: 'trunk', title: '2. Coluna e Tórax', description: 'Estruturas centrais de suporte e proteção.', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Vertebral_column_front_en.svg/800px-Vertebral_column_front_en.svg.png', details: [{ name: 'COLUNA', description: 'C1 (Atlas) - segura o peso; C2 (Áxis) - tem o Dente.' }, { name: 'TÓRAX', description: 'Esterno (Manúbrio, Corpo e Processo Xifoide). Costelas Verdadeiras (1-7) e Flutuantes (11-12).' }] },
  { id: 'upper_limbs', title: '3. Membros Superiores', description: 'Ossos do ombro, braço, antebraço e mão.', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Carpus_bones_en.svg/800px-Carpus_bones_en.svg.png', details: [{ name: 'OMBRO', description: 'Escápula (Acrômio e Espinha) e Clavícula.' }, { name: 'BRAÇO', description: 'Úmero (Cabeça e Epicôndilos).' }, { name: 'ANTEBRAÇO', description: 'Rádio (lado do polegar) e Ulna (lado do mindinho, Olécrano).' }, { name: 'MÃO', description: 'Escafoide (base do polegar) e Hamato (o que tem o ganchinho).' }] },
  { id: 'lower_limbs', title: '4. Membros Inferiores', description: 'Ossos do quadril, coxa, perna e pé.', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Human_skeleton_front_en.svg/800px-Human_skeleton_front_en.svg.png', details: [{ name: 'QUADRIL', description: 'Ílio (a asa), Ísquio (onde sentamos) e Acetábulo (buraco do fêmur).' }, { name: 'COXA', description: 'Fêmur (Cabeça e Trocânter Maior - saliência lateral).' }, { name: 'PERNA', description: 'Tíbia (grossa, lado de dentro - Maléolo Medial) e Fíbula (fina, lado de fora - Maléolo Lateral).' }, { name: 'PÉ', description: 'Calcâneo (calcanhar) e Tálus (osso que "sobe" para a canela).' }] },
  { id: 'muscles_main', title: '5. Sistema Muscular', description: 'Estes são os músculos que aparecem claramente nas peças anatômicas:', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Muscular_system_front_en.svg/800px-Muscular_system_front_en.svg.png', details: [{ name: 'PESCOÇO', description: 'ECOM (Esternocleidomastóideo).' }, { name: 'TRONCO', description: 'Peitoral Maior, Reto do Abdome ("tanquinho") e Trapézio (costas/nuca).' }, { name: 'OMBRO/BRAÇO', description: 'Deltoide (ombro), Bíceps (frente) e Tríceps (atrás).' }, { name: 'COXA', description: 'Quadríceps (frente), Sartório (fita comprida que cruza a coxa) e Bíceps Femoral (atrás).' }, { name: 'PERNA', description: 'Gastrocnêmio (batata da perna) e Tibial Anterior (frente da canela).' }] },
  { id: 'articulations', title: '6. Articulações (As 3 "Estrelas")', description: 'As articulações mais importantes para a prova.', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Joints_en.svg/800px-Joints_en.svg.png', details: [{ name: 'ATM (Temporomandibular)', description: 'Articulação da boca.' }, { name: 'Glenoumeral', description: 'Articulação do ombro.' }, { name: 'Coxofemoral', description: 'Articulação do quadril.' }] }
];

// --- STATE ---
let currentView: 'welcome' | 'study' | 'quiz' | 'result' = 'welcome';
let currentPartIndex = 0;
let currentQuestionIndex = 0;
let score = 0;
let showFeedback = false;
let isCorrect = false;
let selectedTopicId = STUDY_CONTENT[0].id;
const totalQuestions = QUIZ_DATA.reduce((acc, part) => acc + part.questions.length, 0);

// --- UTILS ---
const normalizeText = (text: string) => {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
};

const render = () => {
  const container = document.getElementById('view-container');
  if (!container) return;

  container.innerHTML = '';

  if (currentView === 'welcome') {
    container.innerHTML = `
      <div class="glass-card p-8 md:p-12 max-w-2xl w-full text-center shadow-2xl animate-fade-in">
        <div class="flex justify-center mb-6">
          <div class="relative">
            <i data-lucide="heart" class="w-16 h-16 text-romantic-deep animate-pulse fill-current"></i>
            <i data-lucide="brain" class="w-8 h-8 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></i>
          </div>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold text-romantic-deep mb-4">Academia de Anatomia do Amor</h1>
        <p class="text-lg text-gray-700 mb-8 leading-relaxed">
          Oi meu amor! Preparei esse site especial para você estudar e testar seus conhecimentos. 
          Você quer estudar primeiro ou ir direto para o quiz?
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button id="btn-study" class="bg-white text-romantic-deep border-2 border-romantic-deep px-8 py-4 rounded-full text-xl font-semibold hover:bg-romantic-pink/20 transition-all flex items-center gap-2 group">
            <i data-lucide="book-open" class="w-6 h-6"></i>
            Estudar Agora
          </button>
          <button id="btn-quiz" class="bg-romantic-deep text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-opacity-90 transition-all flex items-center gap-2 group">
            <i data-lucide="graduation-cap" class="w-6 h-6"></i>
            Fazer o Quiz
            <i data-lucide="chevron-right" class="group-hover:translate-x-1 transition-transform"></i>
          </button>
        </div>
      </div>
    `;
    document.getElementById('btn-study')?.addEventListener('click', () => { currentView = 'study'; render(); });
    document.getElementById('btn-quiz')?.addEventListener('click', () => { currentView = 'quiz'; currentPartIndex = 0; currentQuestionIndex = 0; score = 0; render(); });
  } else if (currentView === 'study') {
    const topic = STUDY_CONTENT.find(t => t.id === selectedTopicId)!;
    container.innerHTML = `
      <div class="glass-card p-4 md:p-10 max-w-5xl w-full shadow-xl flex flex-col md:flex-row gap-6 md:gap-8 max-h-[95vh] md:h-auto overflow-hidden animate-slide-in">
        <div class="w-full md:w-1/3 flex flex-col h-auto md:h-full overflow-hidden max-h-[35vh] md:max-h-none shrink-0">
          <button id="btn-back-home" class="flex items-center gap-2 text-romantic-deep font-bold mb-4 hover:underline w-fit shrink-0">
            <i data-lucide="arrow-left" class="w-4 h-4"></i> Voltar ao Início
          </button>
          <h2 class="text-xl md:text-2xl font-bold text-romantic-deep mb-4 shrink-0">Tópicos de Estudo</h2>
          <div class="space-y-2 overflow-y-auto flex-grow pr-2 custom-scrollbar">
            ${STUDY_CONTENT.map(t => `
              <button data-topic-id="${t.id}" class="btn-topic w-full text-left p-3 md:p-4 rounded-xl md:rounded-2xl transition-all text-sm md:text-base ${selectedTopicId === t.id ? 'bg-romantic-deep text-white shadow-lg' : 'bg-white hover:bg-romantic-pink/20 text-gray-700 border border-romantic-soft/20'}">
                ${t.title}
              </button>
            `).join('')}
          </div>
          <div class="pt-4 shrink-0 hidden md:block">
            <button id="btn-start-quiz-from-study" class="w-full bg-romantic-deep text-white py-3 md:py-4 rounded-xl md:rounded-2xl font-bold hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 shadow-md">
              <i data-lucide="graduation-cap" class="w-5 h-5"></i>
              Testar com Quiz
            </button>
          </div>
        </div>
        <div class="w-full md:w-2/3 bg-white/60 p-4 md:p-8 rounded-2xl md:rounded-3xl overflow-y-auto custom-scrollbar border border-white/40 flex-grow">
          <div class="space-y-6">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-800">${topic.title}</h3>
            <p class="text-gray-600 leading-relaxed">${topic.description}</p>
            <div class="relative group">
              <img src="${topic.imageUrl}" alt="${topic.title}" class="w-full rounded-xl md:rounded-2xl shadow-md border-2 border-romantic-soft/30" referrerPolicy="no-referrer" />
            </div>
            <div class="grid gap-4">
              <h4 class="text-lg md:text-xl font-bold text-romantic-deep flex items-center gap-2">
                <i data-lucide="info" class="w-5 h-5"></i> Detalhes Técnicos
              </h4>
              <div class="grid grid-cols-1 gap-3">
                ${topic.details.map(d => `
                  <div class="bg-white/80 p-4 rounded-xl border border-romantic-soft/20 shadow-sm">
                    <span class="font-bold text-romantic-deep block mb-1">${d.name}</span>
                    <span class="text-gray-600 text-sm leading-relaxed">${d.description}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
        <div class="md:hidden pt-2 shrink-0">
          <button id="btn-start-quiz-mobile" class="w-full bg-romantic-deep text-white py-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2">
            <i data-lucide="graduation-cap" class="w-5 h-5"></i>
            Fazer o Quiz
          </button>
        </div>
      </div>
    `;
    document.getElementById('btn-back-home')?.addEventListener('click', () => { currentView = 'welcome'; render(); });
    document.querySelectorAll('.btn-topic').forEach(btn => btn.addEventListener('click', (e) => {
      selectedTopicId = (e.currentTarget as HTMLElement).dataset.topicId!;
      render();
    }));
    const startQuiz = () => { currentView = 'quiz'; currentPartIndex = 0; currentQuestionIndex = 0; score = 0; render(); };
    document.getElementById('btn-start-quiz-from-study')?.addEventListener('click', startQuiz);
    document.getElementById('btn-start-quiz-mobile')?.addEventListener('click', startQuiz);
  } else if (currentView === 'quiz') {
    const part = QUIZ_DATA[currentPartIndex];
    const question = part.questions[currentQuestionIndex];
    const answeredCount = QUIZ_DATA.slice(0, currentPartIndex).reduce((acc, p) => acc + p.questions.length, 0) + currentQuestionIndex;

    container.innerHTML = `
      <div class="glass-card p-6 md:p-10 max-w-3xl w-full shadow-xl overflow-y-auto max-h-[95vh] custom-scrollbar animate-scale-in">
        <div class="flex flex-col gap-4 mb-8">
          <button id="btn-exit-quiz" class="flex items-center gap-2 text-romantic-deep font-bold hover:underline w-fit">
            <i data-lucide="arrow-left" class="w-4 h-4"></i> Sair do Quiz
          </button>
          <div class="flex justify-between items-center">
            <div class="text-left">
              <span class="text-[10px] md:text-xs font-bold uppercase tracking-widest text-romantic-deep opacity-70">${part.title}</span>
              <div class="flex items-center gap-2 mt-1">
                <div class="h-2 w-24 sm:w-48 bg-gray-200 rounded-full overflow-hidden">
                  <div class="h-full bg-romantic-deep transition-all duration-500" style="width: ${(answeredCount / totalQuestions) * 100}%"></div>
                </div>
                <span class="text-[10px] md:text-xs font-medium text-gray-500">${answeredCount + 1} / ${totalQuestions}</span>
              </div>
            </div>
            <div class="flex items-center gap-1 text-romantic-deep font-bold bg-white px-3 py-1 rounded-full shadow-sm">
              <i data-lucide="trophy" class="w-4 h-4 md:w-5 h-5"></i>
              <span class="text-sm md:text-base">${score}</span>
            </div>
          </div>
        </div>

        <div class="mb-6">
          <h2 class="text-xl md:text-2xl font-semibold text-gray-800 mb-6 italic leading-tight">${question.text}</h2>
          <div id="quiz-content">
            ${!showFeedback ? `
              <div class="space-y-4">
                ${question.type === 'text' ? `
                  <div class="relative">
                    <input id="text-input" type="text" placeholder="Escreva sua resposta aqui..." class="w-full p-4 bg-white border-2 border-romantic-soft rounded-2xl focus:border-romantic-deep outline-none transition-all text-lg shadow-sm" />
                    <button id="btn-confirm-text" class="mt-4 w-full bg-romantic-deep text-white py-3 rounded-xl font-bold md:hidden">Confirmar Resposta</button>
                    <p class="hidden md:block text-xs text-gray-400 mt-2 ml-2">Pressione Enter para responder</p>
                  </div>
                ` : question.type === 'choice' ? `
                  <div class="grid grid-cols-1 gap-3">
                    ${question.options?.map((opt, idx) => `
                      <button class="btn-option p-4 bg-white border-2 border-romantic-soft rounded-2xl hover:bg-romantic-soft hover:text-white transition-all text-base md:text-lg font-semibold text-romantic-deep text-left shadow-sm" data-answer="${opt}">
                        ${String.fromCharCode(65 + idx)}) ${opt}
                      </button>
                    `).join('')}
                  </div>
                ` : `
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button class="btn-bool p-5 md:p-6 bg-white border-2 border-green-100 rounded-2xl hover:bg-green-500 hover:text-white transition-all text-xl md:text-2xl font-bold text-green-600 shadow-sm" data-answer="true">Verdadeiro</button>
                    <button class="btn-bool p-5 md:p-6 bg-white border-2 border-red-100 rounded-2xl hover:bg-red-500 hover:text-white transition-all text-xl md:text-2xl font-bold text-red-600 shadow-sm" data-answer="false">Falso</button>
                  </div>
                `}
              </div>
            ` : `
              <div class="p-5 md:p-6 rounded-2xl border-2 shadow-sm ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} animate-fade-in">
                <div class="flex items-center gap-3 mb-3">
                  <i data-lucide="${isCorrect ? 'check-circle-2' : 'heart'}" class="${isCorrect ? 'text-green-600' : 'text-red-600'} w-6 h-6 shrink-0"></i>
                  <span class="font-bold text-lg md:text-xl ${isCorrect ? 'text-green-700' : 'text-red-700'}">
                    ${isCorrect ? 'Arrasou, meu amor!' : 'Quase lá, vida!'}
                  </span>
                </div>
                <div class="space-y-3">
                  <p class="text-gray-700">A resposta correta é: <span class="font-bold uppercase text-romantic-deep">${String(question.correctAnswer === true ? 'Verdadeiro' : question.correctAnswer === false ? 'Falso' : question.correctAnswer)}</span></p>
                  ${question.explanation ? `
                    <div class="bg-white/80 p-4 rounded-xl text-sm md:text-base text-gray-600 border border-gray-100 italic">
                      <span class="font-bold text-romantic-deep not-italic">Explicação: </span>${question.explanation}
                    </div>
                  ` : ''}
                </div>
                <button id="btn-next" class="mt-6 w-full bg-gray-800 text-white py-4 rounded-xl font-bold hover:bg-black transition-all flex items-center justify-center gap-2 shadow-md">
                  Próxima Questão <i data-lucide="chevron-right" class="w-5 h-5"></i>
                </button>
              </div>
            `}
          </div>
        </div>
      </div>
    `;

    document.getElementById('btn-exit-quiz')?.addEventListener('click', () => { currentView = 'welcome'; render(); });

    const check = (userAnswer: string | boolean) => {
      let correct = false;
      if (typeof userAnswer === 'boolean') {
        correct = userAnswer === question.correctAnswer;
      } else if (question.type === 'choice') {
        correct = userAnswer === question.correctAnswer;
      } else {
        const normalizedUser = normalizeText(userAnswer);
        const normalizedCorrect = normalizeText(question.correctAnswer as string);
        if (normalizedCorrect.includes(',')) {
          const correctParts = normalizedCorrect.split(',').map(p => p.trim());
          const userParts = normalizedUser.split(/[,e\s]+/).map(p => p.trim()).filter(p => p.length > 0);
          correct = correctParts.every(cp => userParts.some(up => up.includes(cp) || cp.includes(up)));
        } else {
          correct = normalizedUser.includes(normalizedCorrect) || normalizedCorrect.includes(normalizedUser);
        }
      }

      isCorrect = correct;
      if (correct) {
        score++;
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#ff69b4', '#ff1493', '#ffffff'] });
      }
      showFeedback = true;
      render();
    };

    if (!showFeedback) {
      if (question.type === 'text') {
        const input = document.getElementById('text-input') as HTMLInputElement;
        input?.focus();
        input?.addEventListener('keydown', (e) => { if (e.key === 'Enter' && input.value.trim()) check(input.value); });
        document.getElementById('btn-confirm-text')?.addEventListener('click', () => { if (input.value.trim()) check(input.value); });
      } else if (question.type === 'choice') {
        document.querySelectorAll('.btn-option').forEach(btn => btn.addEventListener('click', (e) => check((e.currentTarget as HTMLElement).dataset.answer!)));
      } else {
        document.querySelectorAll('.btn-bool').forEach(btn => btn.addEventListener('click', (e) => check((e.currentTarget as HTMLElement).dataset.answer === 'true')));
      }
    } else {
      document.getElementById('btn-next')?.addEventListener('click', () => {
        showFeedback = false;
        if (currentQuestionIndex < part.questions.length - 1) {
          currentQuestionIndex++;
        } else if (currentPartIndex < QUIZ_DATA.length - 1) {
          currentPartIndex++;
          currentQuestionIndex = 0;
        } else {
          currentView = 'result';
        }
        render();
      });
    }
  } else if (currentView === 'result') {
    container.innerHTML = `
      <div class="glass-card p-8 md:p-12 max-w-2xl w-full text-center shadow-2xl animate-scale-in">
        <div class="flex justify-center mb-6">
          <div class="relative">
            <i data-lucide="trophy" class="w-20 h-20 text-yellow-500"></i>
            <i data-lucide="sparkles" class="w-8 h-8 text-romantic-deep absolute -top-2 -right-2 animate-bounce"></i>
          </div>
        </div>
        <h1 class="text-4xl font-bold text-romantic-deep mb-2">Quiz Finalizado!</h1>
        <p class="text-xl text-gray-600 mb-8">Você é incrível!</p>
        <div class="bg-white p-6 rounded-3xl shadow-inner mb-8 border border-romantic-soft">
          <div class="text-sm text-gray-500 uppercase tracking-widest font-bold mb-1">Sua Pontuação</div>
          <div class="text-6xl font-black text-romantic-deep">${score} <span class="text-2xl text-gray-400">/ ${totalQuestions}</span></div>
        </div>
        <p class="text-lg text-gray-700 mb-10 italic">
          "${score > 12 ? 'Você é uma mestre da anatomia! Meu coração bate no ritmo certo por você.' : 
            score > 8 ? 'Mandou muito bem! Cada osso e músculo meu te ama cada vez mais.' : 
            'O importante é o esforço! Eu te amo do crânio ao calcâneo.'}"
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button id="btn-restart" class="flex items-center justify-center gap-2 px-8 py-4 bg-gray-100 text-gray-700 rounded-full font-bold hover:bg-gray-200 transition-all">
            <i data-lucide="arrow-left" class="w-5 h-5"></i> Tentar Novamente
          </button>
          <button id="btn-te-amo" class="flex items-center justify-center gap-2 px-8 py-4 bg-romantic-deep text-white rounded-full font-bold hover:bg-opacity-90 transition-all shadow-lg">
            <i data-lucide="heart" class="w-5 h-5 fill-current"></i> Te Amo!
          </button>
        </div>
      </div>
    `;
    document.getElementById('btn-restart')?.addEventListener('click', () => { currentView = 'welcome'; render(); });
    document.getElementById('btn-te-amo')?.addEventListener('click', () => { window.location.reload(); });
  }

  // Re-initialize Lucide icons
  const lucide = (window as any).lucide;
  if (lucide && typeof lucide.createIcons === 'function') {
    lucide.createIcons();
  }
};

// Initial render
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', render);
} else {
  render();
}
