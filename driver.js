const QUESTIONS_PER_QUIZ = 20;
const startScreen = document.getElementById('startScreen');
const quizScreen = document.getElementById('quizScreen');
const resultsScreen = document.getElementById('resultsScreen');
const startButton = document.getElementById('startButton');
const progressText = document.getElementById('progressText');
const progressBar = document.getElementById('progressBar');
const questionCategory = document.getElementById('questionCategory');
const questionText = document.getElementById('questionText');
const answerChoices = document.getElementById('answerChoices');
const answerFeedback = document.getElementById('answerFeedback');
const previousButton = document.getElementById('previousButton');
const nextButton = document.getElementById('nextButton');
const resultHeading = document.getElementById('resultHeading');
const finalScore = document.getElementById('finalScore');
const resultMessage = document.getElementById('resultMessage');
const answerReview = document.getElementById('answerReview');
const retryButton = document.getElementById('retryButton');

let quizQuestions = [];
let currentQuestionIndex = 0;
let answers = [];

startButton.addEventListener('click', startQuiz);
retryButton.addEventListener('click', startQuiz);
previousButton.addEventListener('click', () => moveTo(currentQuestionIndex - 1));
nextButton.addEventListener('click', () => {
  if (currentQuestionIndex === quizQuestions.length - 1) {
    showResults();
  } else {
    moveTo(currentQuestionIndex + 1);
  }
});

function startQuiz() {
  // driverQuestions.js declares this as a top-level const, not a window property.
  if (typeof driverQuestionBank === 'undefined' || !Array.isArray(driverQuestionBank) || driverQuestionBank.length < QUESTIONS_PER_QUIZ) {
    questionText.textContent = 'The question bank could not be loaded. Please reload the page.';
    startScreen.classList.remove('hidden');
    return;
  }
  quizQuestions = shuffle([...driverQuestionBank]).slice(0, QUESTIONS_PER_QUIZ).map(randomizeChoices);
  currentQuestionIndex = 0;
  answers = Array(quizQuestions.length).fill(null);
  startScreen.classList.add('hidden');
  resultsScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');
  renderQuestion();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function randomizeChoices(question) {
  const choices = question.choices.map((text, index) => ({
    text,
    isCorrect: index === question.answer
  }));
  shuffle(choices);

  return {
    ...question,
    choices: choices.map(choice => choice.text),
    answer: choices.findIndex(choice => choice.isCorrect)
  };
}

function moveTo(index) {
  if (index < 0 || index >= quizQuestions.length) return;
  currentQuestionIndex = index;
  renderQuestion();
}

function renderQuestion() {
  const item = quizQuestions[currentQuestionIndex];
  const number = currentQuestionIndex + 1;
  progressText.textContent = `Question ${number} of ${quizQuestions.length}`;
  progressBar.style.width = `${(number / quizQuestions.length) * 100}%`;
  questionCategory.textContent = item.category;
  questionText.textContent = item.question;
  answerChoices.replaceChildren();
  answerFeedback.textContent = '';
  answerFeedback.className = 'feedback';

  item.choices.forEach((choice, index) => {
    const button = document.createElement('button');
    button.className = 'choice-btn';
    button.type = 'button';
    button.textContent = choice;
    button.setAttribute('aria-pressed', String(answers[currentQuestionIndex] === index));
    if (answers[currentQuestionIndex] === index) button.classList.add('selected');
    button.addEventListener('click', () => {
      answers[currentQuestionIndex] = index;
      renderQuestion();
    });
    answerChoices.appendChild(button);
  });

  if (answers[currentQuestionIndex] !== null) {
    const selected = answers[currentQuestionIndex];
    const correct = item.answer;
    [...answerChoices.children].forEach((button, index) => {
      if (index === correct) button.classList.add('correct');
      if (index === selected && selected !== correct) button.classList.add('incorrect');
    });
    answerFeedback.textContent = selected === correct ? 'Correct!' : `Not quite. Correct answer: ${item.choices[correct]}`;
    answerFeedback.classList.add(selected === correct ? 'feedback-correct' : 'feedback-incorrect');
  }

  previousButton.disabled = currentQuestionIndex === 0;
  nextButton.textContent = currentQuestionIndex === quizQuestions.length - 1 ? 'See results' : 'Next';
}

function showResults() {
  const correctCount = quizQuestions.reduce((count, item, index) => count + (answers[index] === item.answer ? 1 : 0), 0);
  const percent = Math.round((correctCount / quizQuestions.length) * 100);
  finalScore.textContent = `${correctCount} / ${quizQuestions.length} (${percent}%)`;
  resultHeading.textContent = percent >= 80 ? 'Great driving knowledge!' : 'Keep practicing!';
  resultMessage.textContent = 'Review missed topics with your team and confirm season-specific rules in the official Competition Manual.';
  answerReview.replaceChildren();

  quizQuestions.forEach((item, index) => {
    const row = document.createElement('article');
    row.className = 'review-item';
    const status = document.createElement('strong');
    status.textContent = answers[index] === item.answer ? 'Correct' : 'Review';
    const prompt = document.createElement('p');
    prompt.textContent = item.question;
    const response = document.createElement('small');
    response.textContent = `Your answer: ${answers[index] === null ? 'Not answered' : item.choices[answers[index]]} · Answer: ${item.choices[item.answer]}`;
    row.append(status, prompt, response);
    answerReview.appendChild(row);
  });

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
