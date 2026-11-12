// LibrasCode: interações simples para quem está começando a programar.
// Cada parte tem uma responsabilidade pequena para ficar fácil de estudar.

// 1. Controles de acessibilidade
const fontToggle = document.querySelector('#font-toggle');
const contrastToggle = document.querySelector('#contrast-toggle');
const readingToggle = document.querySelector('#reading-toggle');

fontToggle.addEventListener('click', () => {
  const isLarge = document.body.classList.toggle('large-text');
  fontToggle.setAttribute('aria-pressed', isLarge);
  fontToggle.innerHTML = isLarge ? '<span aria-hidden="true">A+</span> Texto normal' : '<span aria-hidden="true">Aa</span> Texto maior';
});

contrastToggle.addEventListener('click', () => {
  const isHighContrast = document.body.classList.toggle('high-contrast');
  contrastToggle.setAttribute('aria-pressed', isHighContrast);
  contrastToggle.innerHTML = isHighContrast ? '<span aria-hidden="true">◑</span> Contraste normal' : '<span aria-hidden="true">◐</span> Alto contraste';
});

readingToggle.addEventListener('click', () => {
  const isFocusMode = document.body.classList.toggle('focus-mode');
  readingToggle.setAttribute('aria-pressed', isFocusMode);
  readingToggle.innerHTML = isFocusMode ? '<span aria-hidden="true">▣</span> Mostrar tudo' : '<span aria-hidden="true">▤</span> Modo foco';
});

// As preferências ficam salvas neste navegador para facilitar o próximo estudo.
let savedPreferences = {};
try {
  savedPreferences = JSON.parse(localStorage.getItem('librasCodePreferences') || '{}');
} catch (error) {
  // Se o navegador tiver um valor inválido, o site continua usando o padrão.
  savedPreferences = {};
}
if (savedPreferences.largeText) {
  document.body.classList.add('large-text');
  fontToggle.setAttribute('aria-pressed', 'true');
  fontToggle.innerHTML = '<span aria-hidden="true">A+</span> Texto normal';
}
if (savedPreferences.highContrast) {
  document.body.classList.add('high-contrast');
  contrastToggle.setAttribute('aria-pressed', 'true');
  contrastToggle.innerHTML = '<span aria-hidden="true">◑</span> Contraste normal';
}
function savePreferences() {
  localStorage.setItem('librasCodePreferences', JSON.stringify({
    largeText: document.body.classList.contains('large-text'),
    highContrast: document.body.classList.contains('high-contrast')
  }));
}
fontToggle.addEventListener('click', savePreferences);
contrastToggle.addEventListener('click', savePreferences);

// 2. Roteiros rápidos para explicar conceitos em Libras
const demoButtons = document.querySelectorAll('.demo-toggle');
demoButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const script = button.nextElementSibling;
    const isOpen = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', !isOpen);
    script.hidden = isOpen;
    button.querySelector('span').textContent = isOpen ? '+' : '−';
  });
});

// 2b. Toda explicação em Libras também pode ser lida como legenda/transcrição.
document.querySelectorAll('.transcript-toggle').forEach((button) => {
  button.addEventListener('click', () => {
    const transcript = button.nextElementSibling;
    const isOpen = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!isOpen));
    transcript.hidden = isOpen;
    button.querySelector('span').textContent = isOpen ? '+' : '−';
  });
});

document.querySelectorAll('.hint-button').forEach((button) => {
  button.addEventListener('click', () => {
    const hint = document.querySelector(`#${button.dataset.hint}-help`);
    const isOpen = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!isOpen));
    hint.hidden = isOpen;
    button.textContent = isOpen ? 'Dica visual +' : 'Fechar dica −';
  });
});

// 3. Slides de conceitos
const slides = [
  {
    tag: 'COMEÇO',
    title: 'O que é programar?',
    text: 'Programar é escrever instruções organizadas para que o computador realize uma tarefa.',
    example: '“Abrir a mochila → pegar o caderno → anotar a ideia.”',
    sign: 'Em Libras: pense em uma sequência de sinais, como um caminho com começo, meio e fim.'
  },
  {
    tag: 'IDEIA 01',
    title: 'Algoritmo é um caminho',
    text: 'Um algoritmo é uma lista de passos. Ele ajuda a transformar uma ideia em uma ação possível.',
    example: '“Escovar os dentes → colocar a pasta → escovar → enxaguar.”',
    sign: 'Em Libras: sinalize cada passo de forma separada e depois conecte todos em uma sequência.'
  },
  {
    tag: 'IDEIA 02',
    title: 'Variável é uma caixa',
    text: 'Uma variável guarda uma informação com um nome. Assim, o programa consegue lembrar e usar esse valor.',
    example: 'const nome = “Lia”;',
    sign: 'Em Libras: imagine uma caixa chamada “nome”. Dentro dela está a informação “Lia”.'
  },
  {
    tag: 'IDEIA 03',
    title: 'Condição é uma escolha',
    text: 'A condição faz uma pergunta. O programa escolhe um caminho se a resposta for sim ou outro se for não.',
    example: 'se estiver chovendo → levar guarda-chuva',
    sign: 'Em Libras: faça uma pergunta visual e mostre os dois caminhos possíveis com as mãos.'
  },
  {
    tag: 'IDEIA 04',
    title: 'Repetição economiza tempo',
    text: 'Com uma repetição, você pede ao computador para fazer a mesma tarefa várias vezes.',
    example: 'repetir “bater palmas” 3 vezes',
    sign: 'Em Libras: repita o sinal três vezes e faça um movimento circular para mostrar o ciclo.'
  },
  {
    tag: 'PRÓXIMO PASSO',
    title: 'Você já começou',
    text: 'Agora escolha um conceito, explique para alguém e teste sua ideia. Aprender programação acontece praticando.',
    example: 'ideia → código → teste → aprendizado',
    sign: 'Em Libras: mostre que aprender é um ciclo: tentar, observar, ajustar e tentar de novo.'
  }
];

let currentSlide = 0;
const slideTag = document.querySelector('#slide-tag');
const slideTitle = document.querySelector('#slide-title');
const slideText = document.querySelector('#slide-text');
const slideExample = document.querySelector('#slide-example');
const slideSign = document.querySelector('#slide-sign');
const slideCounter = document.querySelector('#slide-counter');
const slideNumberBig = document.querySelector('#slide-number-big');
const slideProgressBar = document.querySelector('#slide-progress-bar');
const slideDots = document.querySelector('#slide-dots');

function renderSlide() {
  const slide = slides[currentSlide];
  const number = String(currentSlide + 1).padStart(2, '0');
  slideTag.textContent = slide.tag;
  slideTitle.textContent = slide.title;
  slideText.textContent = slide.text;
  slideExample.textContent = slide.example;
  slideSign.textContent = slide.sign;
  slideCounter.textContent = `${number} / ${String(slides.length).padStart(2, '0')}`;
  slideNumberBig.textContent = number;
  slideProgressBar.style.width = `${((currentSlide + 1) / slides.length) * 100}%`;

  document.querySelectorAll('.slide-dot').forEach((dot, index) => {
    const active = index === currentSlide;
    dot.classList.toggle('active', active);
    dot.setAttribute('aria-current', active ? 'step' : 'false');
  });
}

slides.forEach((slide, index) => {
  const dot = document.createElement('button');
  dot.className = 'slide-dot';
  dot.type = 'button';
  dot.setAttribute('aria-label', `Ir para o slide ${index + 1}`);
  dot.addEventListener('click', () => {
    currentSlide = index;
    renderSlide();
  });
  slideDots.appendChild(dot);
});

document.querySelector('#prev-slide').addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  renderSlide();
});
document.querySelector('#next-slide').addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  renderSlide();
});
renderSlide();

// 4. Quiz: perguntas, alternativas, feedback e pontuação.
const quizQuestions = [
  {
    question: 'Qual frase explica melhor o que é um algoritmo?',
    options: ['Uma cor usada em um site', 'Uma sequência de passos para resolver algo', 'Um erro que aparece no código', 'O nome de um computador'],
    answer: 1,
    explanation: 'Isso! Algoritmo é uma sequência organizada de passos, como uma receita.'
  },
  {
    question: 'Para que serve uma variável?',
    options: ['Para guardar uma informação', 'Para apagar o programa', 'Para deixar a tela colorida', 'Para desligar o computador'],
    answer: 0,
    explanation: 'Muito bem! A variável funciona como uma caixa que guarda um valor.'
  },
  {
    question: 'O que uma condição ajuda o programa a fazer?',
    options: ['Escolher entre caminhos', 'Repetir tudo para sempre', 'Trocar o teclado', 'Criar uma senha automaticamente'],
    answer: 0,
    explanation: 'Exato! A condição faz uma pergunta e ajuda o programa a escolher uma ação.'
  },
  {
    question: 'Qual situação representa uma repetição?',
    options: ['Escolher uma cor', 'Guardar o nome de uma pessoa', 'Fazer 10 desenhos iguais', 'Abrir o editor uma vez'],
    answer: 2,
    explanation: 'Isso! Fazer a mesma tarefa várias vezes é uma repetição.'
  },
  {
    question: 'Qual é uma boa forma de começar a programar?',
    options: ['Tentar entender tudo de uma vez', 'Copiar sem observar o resultado', 'Começar por uma ideia pequena e testar', 'Evitar qualquer erro'],
    answer: 2,
    explanation: 'Perfeito! Ideias pequenas, testes e tentativas fazem parte do aprendizado.'
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;
const quizQuestion = document.querySelector('#quiz-question');
const quizOptions = document.querySelector('#quiz-options');
const quizFeedback = document.querySelector('#quiz-feedback');
const quizNext = document.querySelector('#quiz-next');
const quizProgress = document.querySelector('#quiz-progress');
const quizProgressBar = document.querySelector('#quiz-progress-bar');
const quizScore = document.querySelector('#quiz-score');
const quizQuestionArea = document.querySelector('#quiz-question-area');

function renderQuestion() {
  const item = quizQuestions[currentQuestion];
  answered = false;
  quizQuestion.textContent = item.question;
  quizOptions.innerHTML = '';
  quizFeedback.textContent = '';
  quizFeedback.className = 'quiz-feedback';
  quizNext.disabled = true;
  quizNext.innerHTML = currentQuestion === quizQuestions.length - 1 ? 'Ver resultado <span aria-hidden="true">→</span>' : 'Próxima pergunta <span aria-hidden="true">→</span>';
  quizProgress.textContent = `${String(currentQuestion + 1).padStart(2, '0')} / ${String(quizQuestions.length).padStart(2, '0')}`;
  quizProgressBar.style.width = `${((currentQuestion + 1) / quizQuestions.length) * 100}%`;

  item.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.className = 'quiz-option';
    button.type = 'button';
    button.innerHTML = `<span class="option-letter">${String.fromCharCode(65 + index)}</span><span>${option}</span>`;
    button.addEventListener('click', () => chooseAnswer(index, button));
    quizOptions.appendChild(button);
  });
}

function chooseAnswer(selectedIndex, selectedButton) {
  if (answered) return;
  answered = true;
  const item = quizQuestions[currentQuestion];
  const options = document.querySelectorAll('.quiz-option');
  options.forEach((option) => { option.disabled = true; });

  if (selectedIndex === item.answer) {
    score += 1;
    selectedButton.classList.add('correct');
    quizFeedback.textContent = item.explanation;
    quizFeedback.classList.add('success');
  } else {
    selectedButton.classList.add('wrong');
    options[item.answer].classList.add('correct');
    quizFeedback.textContent = `Quase! ${item.explanation}`;
    quizFeedback.classList.add('error');
  }

  quizScore.textContent = score;
  quizNext.disabled = false;
}

function showResult() {
  const message = score === quizQuestions.length
    ? 'Você mandou muito bem! Já pode explicar esses conceitos para alguém.'
    : score >= 3
      ? 'Ótimo começo! Revise os slides que mais chamaram sua atenção e tente novamente.'
      : 'Tudo bem. O quiz é uma pausa para descobrir o que revisar, não uma prova.';

  quizQuestionArea.innerHTML = `<div class="quiz-result"><div class="result-symbol" aria-hidden="true">${score >= 3 ? '✓' : '↻'}</div><h3>Você fez ${score} de ${quizQuestions.length} pontos.</h3><p>${message}</p><button class="button button-secondary" id="restart-quiz" type="button">Refazer o quiz</button></div>`;
  document.querySelector('#restart-quiz').addEventListener('click', restartQuiz);
  quizNext.style.display = 'none';
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  quizScore.textContent = '0';
  quizNext.style.display = '';
  quizQuestionArea.innerHTML = '<h3 id="quiz-question">Carregando pergunta...</h3><div class="quiz-options" id="quiz-options"></div><div class="quiz-feedback" id="quiz-feedback" aria-live="polite"></div>';
  // Reaponta as referências porque o conteúdo foi recriado.
  window.location.hash = 'quiz';
  window.location.reload();
}

quizNext.addEventListener('click', () => {
  if (!answered) return;
  if (currentQuestion === quizQuestions.length - 1) {
    showResult();
  } else {
    currentQuestion += 1;
    renderQuestion();
  }
});

renderQuestion();


// 5. Pequenas tarefas práticas: são simuladores seguros, sem eval(), para iniciantes.
function showTaskOutput(taskName, message, kind = 'success') {
  const output = document.querySelector(`#output-${taskName}`);
  output.className = `task-output ${kind}`;
  output.querySelector('.output-text').textContent = message;
}

function runTask(taskName) {
  if (taskName === 'hello') {
    const code = document.querySelector('#task-hello-code').value;
    const message = code.match(/console\.log\(\s*["'`](.*?)["'`]\s*\)/s);
    if (message) {
      showTaskOutput('hello', message[1]);
    } else {
      showTaskOutput('hello', 'Procure console.log("sua mensagem") e tente novamente.', 'hint');
    }
  }

  if (taskName === 'variable') {
    const code = document.querySelector('#task-variable-code').value;
    const name = code.match(/(?:let|const|var)\s+nome\s*=\s*["'`](.*?)["'`]/s);
    if (name) {
      showTaskOutput('variable', `Olá, ${name[1]}!`);
    } else {
      showTaskOutput('variable', 'Ainda não encontrei a caixa nome. Veja a dica visual.', 'hint');
    }
  }

  if (taskName === 'condition') {
    const weather = document.querySelector('input[name="weather"]:checked').value;
    showTaskOutput('condition', weather === 'chuva' ? 'Leve um guarda-chuva.' : 'Leve óculos de sol.');
  }

  if (taskName === 'loop') {
    const value = Number(document.querySelector('#repeat-number').value);
    const times = Math.min(Math.max(value || 1, 1), 6);
    showTaskOutput('loop', Array.from({ length: times }, (_, index) => `passo ${index + 1}`).join('  →  '));
  }
}

document.querySelectorAll('.run-task').forEach((button) => {
  button.addEventListener('click', () => runTask(button.dataset.task));
});

// Atalhos opcionais: ajudam quem prefere navegar pelo teclado.
document.addEventListener('keydown', (event) => {
  if (!event.altKey) return;
  const shortcuts = { '1': '#conceitos', '2': '#libras', '3': '#tarefas', '4': '#quiz' };
  const destination = shortcuts[event.key];
  if (destination) {
    event.preventDefault();
    document.querySelector(destination).scrollIntoView({ behavior: 'smooth' });
  }
});
