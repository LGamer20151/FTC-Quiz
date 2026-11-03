const homeScreen = document.getElementById('homeScreen');
const driverQuizScreen = document.getElementById('driverQuizScreen');
const resultsScreen = document.getElementById('resultsScreen');

const driverProgress = document.getElementById('driverProgress');
const driverQuestion = document.getElementById('driverQuestion');
const driverChoices = document.getElementById('driverChoices');
const driverNextBtn = document.getElementById('driverNextBtn');
const driverPrevBtn = document.getElementById('driverPrevBtn');
const driverHomeBtn = document.getElementById('driverHomeBtn');

const resultsTitle = document.getElementById('resultsTitle');
const scoreSummary = document.getElementById('scoreSummary');
const resultsMessage = document.getElementById('resultsMessage');
const reviewList = document.getElementById('reviewList');
const retryDriverBtn = document.getElementById('retryDriverBtn');
const resultsHomeBtn = document.getElementById('resultsHomeBtn');

const state = {
  role: null,
  questions: [],
  currentIndex: 0,
  selectedAnswers: [],
};

const builderBtn = document.querySelector('.builder-card');
const driverBtn = document.querySelector('.driver-card');

builderBtn.addEventListener('click', () => {
  alert('Builder quiz is coming soon. We will add the robot-part quiz after the Driver quiz is finished.');
});

driverBtn.addEventListener('click', () => {
  startDriverQuiz();
});

driverHomeBtn.addEventListener('click', () => {
  showScreen('home');
});

resultsHomeBtn.addEventListener('click', () => {
  showScreen('home');
});

retryDriverBtn.addEventListener('click', () => {
  startDriverQuiz();
});

driverNextBtn.addEventListener('click', () => {
  if (state.selectedAnswers[state.currentIndex] === undefined) {
    state.selectedAnswers[state.currentIndex] = -1;
  }

  if (state.currentIndex < state.questions.length - 1) {
    state.currentIndex += 1;
    renderDriverQuestion();
    return;
  }

  showDriverResults();
});

driverPrevBtn.addEventListener('click', () => {
  if (state.currentIndex > 0) {
    state.currentIndex -= 1;
    renderDriverQuestion();
  }
});

function startDriverQuiz() {
  state.role = 'driver';
  state.currentIndex = 0;
  state.selectedAnswers = [];
  state.questions = shuffle([...driverQuestions]);
  showScreen('driver');
  renderDriverQuestion();
}

function renderDriverQuestion() {
  const question = state.questions[state.currentIndex];
  if (!question) return;

  const total = state.questions.length;
  driverProgress.textContent = `Question ${state.currentIndex + 1} / ${total}`;
  driverQuestion.textContent = question.question;
  driverChoices.innerHTML = '';

  question.choices.forEach((choice) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'choice-btn';
    button.textContent = choice;

    const selectedIndex = state.selectedAnswers[state.currentIndex];
    if (selectedIndex !== undefined && question.choices[selectedIndex] === choice) {
      button.classList.add('selected');
    }

    button.addEventListener('click', () => {
      state.selectedAnswers[state.currentIndex] = question.choices.indexOf(choice);
      renderDriverQuestion();
    });

    driverChoices.appendChild(button);
  });

  if (state.selectedAnswers[state.currentIndex] !== undefined) {
    const selectedIndex = state.selectedAnswers[state.currentIndex];
    const selectedChoice = question.choices[selectedIndex];
    const answerIndex = question.choices.indexOf(question.answer);

    Array.from(driverChoices.children).forEach((button, index) => {
      if (index === answerIndex) button.classList.add('correct');
      if (index === selectedIndex && selectedChoice !== question.answer) button.classList.add('wrong');
    });
  }

  driverPrevBtn.disabled = state.currentIndex === 0;
  driverPrevBtn.style.opacity = state.currentIndex === 0 ? '0.5' : '1';
  driverNextBtn.textContent = state.currentIndex === total - 1 ? 'Finish' : 'Next';
}

function showDriverResults() {
  let correct = 0;
  const review = [];

  state.questions.forEach((question, index) => {
    const selectedIndex = state.selectedAnswers[index];
    const selectedChoice = selectedIndex !== undefined && selectedIndex >= 0 ? question.choices[selectedIndex] : null;
    const isCorrect = selectedChoice === question.answer;

    if (isCorrect) correct += 1;

    review.push({
      question: question.question,
      selectedChoice,
      correctAnswer: question.answer,
      isCorrect,
    });
  });

  const total = state.questions.length;
  const percent = Math.round((correct / total) * 100);
  scoreSummary.textContent = `${correct} / ${total}`;

  if (percent >= 85) {
    resultsTitle.textContent = 'Excellent work!';
    resultsMessage.textContent = `You scored ${percent}% and clearly understand the 2026–2027 FTC Driver rules.`;
  } else if (percent >= 70) {
    resultsTitle.textContent = 'Great job!';
    resultsMessage.textContent = `You scored ${percent}%. You have a strong grasp of the FTC game flow and rules.`;
  } else if (percent >= 50) {
    resultsTitle.textContent = 'Good start!';
    resultsMessage.textContent = `You scored ${percent}%. Review the competition manual and try again.`;
  } else {
    resultsTitle.textContent = 'Keep studying!';
    resultsMessage.textContent = `You scored ${percent}%. Re-read the FTC Competition Manual sections on Game Details and Game Rules.`;
  }

  reviewList.innerHTML = review
    .slice(0, 10)
    .map((item) => {
      const status = item.isCorrect ? 'Correct' : 'Incorrect';
      return `
        <div class="review-item">
          <strong>${status}</strong> — ${item.question}<br>
          <small>Your answer: ${item.selectedChoice || 'No answer'} • Correct: ${item.correctAnswer}</small>
        </div>
      `;
    })
    .join('');

  showScreen('results');
}

function showScreen(screenName) {
  [homeScreen, driverQuizScreen, resultsScreen].forEach((screen) => {
    screen.classList.remove('active');
  });

  if (screenName === 'home') {
    homeScreen.classList.add('active');
  } else if (screenName === 'driver') {
    driverQuizScreen.classList.add('active');
  } else if (screenName === 'results') {
    resultsScreen.classList.add('active');
  }
}

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

showScreen('home');
