const startButton = document.getElementById('startButton');
const startScreen = document.getElementById('builderStart');
const quizScreen = document.getElementById('quizScreen');
const answerChoices = document.getElementById('answerChoices');
const answerFeedback = document.getElementById('answerFeedback');
const retryButton = document.getElementById('retryButton');

const question = {
  choices: [
    'Robits BIOBUZZ StarterBot',
    'A generic mecanum wheel assembly',
    'A REV Robotics control hub',
    'A practice field element'
  ],
  correctAnswer: 'Robits BIOBUZZ StarterBot'
};

startButton.addEventListener('click', startQuiz);
retryButton.addEventListener('click', startQuiz);

function startQuiz() {
  startScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');
  retryButton.classList.add('hidden');
  answerFeedback.textContent = '';
  answerFeedback.className = 'feedback';
  answerChoices.replaceChildren();

  const choices = shuffle([...question.choices]);
  choices.forEach(choice => {
    const button = document.createElement('button');
    button.className = 'choice-btn';
    button.type = 'button';
    button.textContent = choice;
    button.addEventListener('click', () => {
      [...answerChoices.children].forEach(option => { option.disabled = true; });
      if (choice === question.correctAnswer) {
        button.classList.add('correct');
        answerFeedback.textContent = 'Correct! This is the Robits BIOBUZZ StarterBot.';
        answerFeedback.classList.add('feedback-correct');
      } else {
        button.classList.add('incorrect');
        answerFeedback.textContent = `Not quite. The pictured robot is the ${question.correctAnswer}.`;
        answerFeedback.classList.add('feedback-incorrect');
        [...answerChoices.children].find(option => option.textContent === question.correctAnswer)?.classList.add('correct');
      }
      retryButton.classList.remove('hidden');
    });
    answerChoices.appendChild(button);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function shuffle(items) {
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}
