const QUESTIONS = [
  {
    question: 'What part is shown?',
    image: 'builder-assets/stealth-wheel.svg',
    alt: 'Illustration of a solid gray robot drive wheel with a hexagonal center bore',
    answer: '3-inch Stealth Wheel',
    choices: ['3-inch Stealth Wheel', 'Omni wheel', 'Timing pulley', 'Compliant wheel'],
    source: 'https://www.andymark.com/products/stealth-wheels-options'
  },
  {
    question: 'What part is shown?',
    image: 'builder-assets/omni-wheel.svg',
    alt: 'Illustration of a robot omni wheel with small rollers around its edge',
    answer: 'Omni wheel',
    choices: ['Omni wheel', 'Stealth wheel', 'Servo', 'Hex shaft adapter'],
    source: 'https://www.andymark.com/products/3in-plastic-omni-wheel-3-8-hex-bore'
  },
  {
    question: 'What part is shown?',
    image: 'builder-assets/servo.svg',
    alt: 'Illustration of a programmable servo motor with a horn attached to its output shaft',
    answer: 'Programmable servo',
    choices: ['Programmable servo', 'Power switch', 'Omni wheel', 'Pulley half'],
    source: 'https://www.andymark.com/products/programmable-servo-high-torque-am-4954a'
  },
  {
    question: 'What part is shown?',
    image: 'builder-assets/pulley.svg',
    alt: 'Illustration of a small toothed belt pulley with a hexagonal center bore',
    answer: '14-tooth HTD pulley half',
    choices: ['14-tooth HTD pulley half', 'Stealth wheel', 'Servo horn', 'Omni wheel'],
    source: 'https://www.andymark.com/products/pulley-half-14t-htd-0-375-in-hex-bore'
  }
];

const startButton = document.getElementById('startButton');
const startScreen = document.getElementById('builderStart');
const quizScreen = document.getElementById('quizScreen');
const resultsScreen = document.getElementById('resultsScreen');
const progressText = document.getElementById('progressText');
const progressBar = document.getElementById('progressBar');
const questionText = document.getElementById('questionText');
const partImage = document.getElementById('partImage');
const imageCaption = document.getElementById('imageCaption');
const sourceLink = document.getElementById('sourceLink');
const answerChoices = document.getElementById('answerChoices');
const answerFeedback = document.getElementById('answerFeedback');
const nextButton = document.getElementById('nextButton');
const resultHeading = document.getElementById('resultHeading');
const finalScore = document.getElementById('finalScore');
const retryButton = document.getElementById('retryButton');

let questions = [];
let currentQuestion = 0;
let score = 0;
let hasAnswered = false;

startButton.addEventListener('click', startQuiz);
retryButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
  if (currentQuestion === questions.length - 1) showResults();
  else {
    currentQuestion += 1;
    renderQuestion();
  }
});

function startQuiz() {
  questions = shuffle([...QUESTIONS]);
  currentQuestion = 0;
  score = 0;
  startScreen.classList.add('hidden');
  resultsScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');
  renderQuestion();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderQuestion() {
  const item = questions[currentQuestion];
  hasAnswered = false;
  progressText.textContent = `Part ${currentQuestion + 1} of ${questions.length}`;
  progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
  questionText.textContent = item.question;
  partImage.src = item.image;
  partImage.alt = item.alt;
  imageCaption.textContent = 'Illustration of an individual robot part';
  sourceLink.href = item.source;
  sourceLink.textContent = 'See related part at AndyMark';
  answerFeedback.textContent = '';
  answerFeedback.className = 'feedback';
  answerChoices.replaceChildren();
  nextButton.disabled = true;
  nextButton.textContent = currentQuestion === questions.length - 1 ? 'See results' : 'Next part';

  shuffle([...item.choices]).forEach(choice => {
    const button = document.createElement('button');
    button.className = 'choice-btn';
    button.type = 'button';
    button.textContent = choice;
    button.addEventListener('click', () => chooseAnswer(button, choice, item));
    answerChoices.appendChild(button);
  });
}

function chooseAnswer(button, choice, item) {
  if (hasAnswered) return;
  hasAnswered = true;
  [...answerChoices.children].forEach(option => { option.disabled = true; });

  if (choice === item.answer) {
    score += 1;
    button.classList.add('correct');
    answerFeedback.textContent = `Correct! This is a ${item.answer}.`;
    answerFeedback.classList.add('feedback-correct');
  } else {
    button.classList.add('incorrect');
    answerFeedback.textContent = `Not quite. This part is a ${item.answer}.`;
    answerFeedback.classList.add('feedback-incorrect');
    [...answerChoices.children].find(option => option.textContent === item.answer)?.classList.add('correct');
  }

  nextButton.disabled = false;
}

function showResults() {
  const percent = Math.round((score / questions.length) * 100);
  resultHeading.textContent = percent >= 75 ? 'Great parts knowledge!' : 'Keep practicing!';
  finalScore.textContent = `${score} / ${questions.length} correct (${percent}%)`;
  quizScreen.classList.add('hidden');
  resultsScreen.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function shuffle(items) {
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}
