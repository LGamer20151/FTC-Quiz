// Item names and quantities follow the BIOBUZZ StarterBot kit listing.
// Local SVG illustrations are intentionally schematic, so the quiz never depends on remote image hosting.
const PARTS = [
  { name: '24 in. 3-Wire PWM Extension Cable (am-0694b)', quantity: 2, type: 'cable' },
  { name: '10-32 x 0.5 in. Socket Head Cap Screw (am-1002)', quantity: 25, type: 'screw' },
  { name: '10-32 x 1.5 in. Socket Head Cap Screw (am-1014)', quantity: 30, type: 'screw' },
  { name: '#10 Steel Washer (am-1026)', quantity: 30, type: 'washer' },
  { name: '10-32 x 1.25 in. Socket Head Cap Screw (am-1041)', quantity: 25, type: 'screw' },
  { name: '10-32 x 0.75 in. Socket Head Cap Screw (am-1047)', quantity: 15, type: 'screw' },
  { name: '10-32 x 1.75 in. Socket Head Cap Screw (am-1048)', quantity: 30, type: 'screw' },
  { name: '10-32 x 2.0 in. Socket Head Cap Screw (am-1049)', quantity: 5, type: 'screw' },
  { name: '10-32 x 2.25 in. Socket Head Cap Screw (am-1049)', quantity: 5, type: 'screw' },
  { name: '10-32 x 1.0 in. Socket Head Cap Screw (am-1056)', quantity: 50, type: 'screw' },
  { name: '10-32 Nylock Jam Nut (am-1063)', quantity: 125, type: 'nut' },
  { name: 'M3-0.5 x 8mm Socket Head Cap Screw with Thread Lock Nylon Patch (am-1500)', quantity: 10, type: 'screw' },
  { name: '4 in. Black Cable Tie (am-1589_black)', quantity: 100, type: 'cable-tie' },
  { name: '0.375 OD x 0.194 ID x 1.00 in. Long Nylon Spacer (am-1696)', quantity: 5, type: 'spacer' },
  { name: '0.375 OD x 0.194 ID x 0.50 in. Long Nylon Spacer (am-1697)', quantity: 20, type: 'spacer' },
  { name: '0.430 ID x 0.500 OD x 0.250 in. Long Aluminum Spacer (am-1698)', quantity: 30, type: 'spacer' },
  { name: '0.430 ID x 0.500 OD x 0.500 in. Long Aluminum Spacer (am-1699)', quantity: 24, type: 'spacer' },
  { name: '0.375 OD x 0.194 ID x 0.25 in. Long Nylon Spacer (am-1700)', quantity: 5, type: 'spacer' },
  { name: '3/8 OD x 1 in. Long 10-32 Aluminum Standoff (am-1701)', quantity: 4, type: 'standoff' },
  { name: '3/8 OD x 2 in. Long 10-32 Aluminum Standoff (am-1702)', quantity: 8, type: 'standoff' },
  { name: '3/8 OD x 4 in. Long 10-32 Aluminum Standoff (am-1704)', quantity: 4, type: 'standoff' },
  { name: '2 in. Green Compliant Wheel, 0.375 in. Hex Bore (am-3571_green)', quantity: 4, type: 'compliant-wheel' },
  { name: '12 in. Encoder Cable for NeveRest Motors (am-3926b-1200)', quantity: 3, type: 'cable' },
  { name: '0.375 OD x 0.194 ID x 0.750 in. Long Nylon Spacer (am-4107)', quantity: 5, type: 'spacer' },
  { name: '3 in. Gray Stealth Wheel, 0.375 in. Hex Bore (am-4718_gray)', quantity: 2, type: 'stealth-wheel' },
  { name: '4-Wire Programmable Servo, High Torque (am-4954a)', quantity: 1, type: 'servo' },
  { name: '4-Wire Programmable Servo, High Speed (am-4955a)', quantity: 2, type: 'servo' },
  { name: '5mm Hex to 0.375 in. Hex-Shaft Adapter (am-4957-0100)', quantity: 3, type: 'adapter' },
  { name: '14T HTD Pulley Half, 0.375 in. Hex Bore (am-4960_half)', quantity: 16, type: 'pulley' },
  { name: '15.5 x 6 x 0.03 in. Perforated Clear Polycarbonate Sheet (am-4964a)', quantity: 3, type: 'sheet' },
  { name: '3 in. Omni Wheel, 3/8 in. Hex Bore (am-4967a)', quantity: 2, type: 'omni-wheel' },
  { name: 'Power Switch with Bracket (am-4969)', quantity: 1, type: 'switch' }
];

const startButton = document.getElementById('startButton');
const startScreen = document.getElementById('builderStart');
const quizScreen = document.getElementById('quizScreen');
const resultsScreen = document.getElementById('resultsScreen');
const progressText = document.getElementById('progressText');
const progressBar = document.getElementById('progressBar');
const questionText = document.getElementById('questionText');
const partImage = document.getElementById('partImage');
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
  questions = shuffle([...PARTS]);
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
  questionText.textContent = 'What part is shown?';
  partImage.src = makePartIllustration(item.type);
  partImage.alt = `Simplified illustration of a robot ${partKind(item.type)}`;
  answerFeedback.textContent = '';
  answerFeedback.className = 'feedback';
  answerChoices.replaceChildren();
  nextButton.disabled = true;
  nextButton.textContent = currentQuestion === questions.length - 1 ? 'See results' : 'Next part';

  const distractors = shuffle(PARTS.filter(part => part.name !== item.name)).slice(0, 3).map(part => part.name);
  const choices = shuffle([item.name, ...distractors]);
  choices.forEach(choice => {
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

  if (choice === item.name) {
    score += 1;
    button.classList.add('correct');
    answerFeedback.textContent = `Correct! This is ${item.name}. The kit listing includes ${item.quantity}.`;
    answerFeedback.classList.add('feedback-correct');
  } else {
    button.classList.add('incorrect');
    answerFeedback.textContent = `Not quite. This is ${item.name}; the kit listing includes ${item.quantity}.`;
    answerFeedback.classList.add('feedback-incorrect');
    [...answerChoices.children].find(option => option.textContent === item.name)?.classList.add('correct');
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

function partKind(type) {
  if (type.includes('wheel')) return 'wheel';
  if (type === 'screw') return 'screw';
  if (type === 'cable' || type === 'cable-tie') return 'cable';
  return type.replace('-', ' ');
}

function makePartIllustration(type) {
  const start = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 340"><rect width="480" height="340" rx="24" fill="#f5f7fa"/>';
  const end = '</svg>';
  const drawings = {
    screw: '<g transform="rotate(-22 240 170)"><rect x="112" y="151" width="247" height="38" rx="12" fill="#aebdca" stroke="#566a7c" stroke-width="6"/><path d="M154 153l-22 34m50-34-22 34m50-34-22 34m50-34-22 34m50-34-22 34m50-34-22 34" stroke="#718597" stroke-width="6"/><path d="M92 137h45v66H92z" rx="8" fill="#63798d" stroke="#405568" stroke-width="6"/><path d="M103 153h22m-11-11v22" stroke="#dce6ee" stroke-width="5"/></g>',
    washer: '<circle cx="240" cy="170" r="105" fill="#8296a8" stroke="#43596b" stroke-width="12"/><circle cx="240" cy="170" r="54" fill="#f5f7fa" stroke="#43596b" stroke-width="10"/>',
    nut: '<path d="M240 65l92 53v104l-92 53-92-53V118z" fill="#9eafbd" stroke="#506577" stroke-width="12"/><path d="M240 125l38 22v44l-38 22-38-22v-44z" fill="#f5f7fa" stroke="#506577" stroke-width="9"/>',
    cable: '<path d="M82 220C140 65 330 275 395 116" fill="none" stroke="#263747" stroke-width="24" stroke-linecap="round"/><path d="M82 220C140 65 330 275 395 116" fill="none" stroke="#5cc8ff" stroke-width="7" stroke-linecap="round"/><rect x="60" y="202" width="48" height="36" rx="7" fill="#536c80"/><rect x="374" y="95" width="48" height="42" rx="8" fill="#536c80"/><path d="M390 103v25m12-25v25m12-25v25" stroke="#dce6ee" stroke-width="4"/>',
    'cable-tie': '<path d="M100 210c-70-80 62-142 140-102l114 59" fill="none" stroke="#263747" stroke-width="20" stroke-linecap="round"/><rect x="324" y="143" width="58" height="45" rx="9" fill="#536c80"/><path d="M333 165h35" stroke="#dce6ee" stroke-width="5"/>',
    spacer: '<ellipse cx="240" cy="116" rx="62" ry="25" fill="#d5e0e8" stroke="#60778a" stroke-width="8"/><path d="M178 116v105c0 14 28 26 62 26s62-12 62-26V116" fill="#a9bac8" stroke="#60778a" stroke-width="8"/><ellipse cx="240" cy="221" rx="62" ry="25" fill="#91a5b5" stroke="#60778a" stroke-width="8"/><ellipse cx="240" cy="116" rx="24" ry="10" fill="#f5f7fa" stroke="#60778a" stroke-width="5"/>',
    standoff: '<ellipse cx="240" cy="92" rx="47" ry="19" fill="#d5e0e8" stroke="#60778a" stroke-width="7"/><path d="M193 92v158m94-158v158" stroke="#60778a" stroke-width="7"/><path d="M193 250c0 11 21 20 47 20s47-9 47-20" fill="#91a5b5" stroke="#60778a" stroke-width="7"/><path d="M222 90v-34m36 34V56m-36 194v33m36-33v33" stroke="#73899a" stroke-width="8"/>',
    'compliant-wheel': '<circle cx="240" cy="170" r="112" fill="#396f55" stroke="#263747" stroke-width="12"/><circle cx="240" cy="170" r="78" fill="#5e9d74" stroke="#a8d1b3" stroke-width="6"/><circle cx="240" cy="170" r="44" fill="#d5e0e8" stroke="#506577" stroke-width="8"/><path d="M240 145l22 13v25l-22 13-22-13v-25z" fill="#34495d"/>',
    'stealth-wheel': '<circle cx="240" cy="170" r="112" fill="#293747"/><circle cx="240" cy="170" r="98" fill="#596879" stroke="#1b2733" stroke-width="12"/><circle cx="240" cy="170" r="57" fill="#d3dce5" stroke="#263748" stroke-width="9"/><path d="M240 140l26 15v30l-26 15-26-15v-30z" fill="#30465b"/>',
    'omni-wheel': '<circle cx="240" cy="170" r="108" fill="#263748" stroke="#162535" stroke-width="9"/><g fill="#8296a8" stroke="#33485c" stroke-width="4"><rect x="225" y="56" width="30" height="52" rx="14"/><rect x="225" y="56" width="30" height="52" rx="14" transform="rotate(30 240 170)"/><rect x="225" y="56" width="30" height="52" rx="14" transform="rotate(60 240 170)"/><rect x="225" y="56" width="30" height="52" rx="14" transform="rotate(90 240 170)"/><rect x="225" y="56" width="30" height="52" rx="14" transform="rotate(120 240 170)"/><rect x="225" y="56" width="30" height="52" rx="14" transform="rotate(150 240 170)"/><rect x="225" y="56" width="30" height="52" rx="14" transform="rotate(180 240 170)"/><rect x="225" y="56" width="30" height="52" rx="14" transform="rotate(210 240 170)"/><rect x="225" y="56" width="30" height="52" rx="14" transform="rotate(240 240 170)"/><rect x="225" y="56" width="30" height="52" rx="14" transform="rotate(270 240 170)"/><rect x="225" y="56" width="30" height="52" rx="14" transform="rotate(300 240 170)"/><rect x="225" y="56" width="30" height="52" rx="14" transform="rotate(330 240 170)"/></g><circle cx="240" cy="170" r="45" fill="#d3dce5" stroke="#263748" stroke-width="8"/><path d="M240 145l22 13v25l-22 13-22-13v-25z" fill="#30465b"/>',
    servo: '<rect x="125" y="90" width="230" height="165" rx="22" fill="#263747" stroke="#152333" stroke-width="9"/><rect x="150" y="113" width="180" height="120" rx="15" fill="#3d566d"/><circle cx="240" cy="165" r="31" fill="#dce6ee" stroke="#8ea3b6" stroke-width="7"/><circle cx="240" cy="165" r="10" fill="#354d62"/><path d="M240 165l112-42q16-5 21 10t-10 21l-117 32z" fill="#e2e9ef" stroke="#697f92" stroke-width="6"/><path d="M150 255v30m18-30v30m18-30v30" stroke="#d84b4b" stroke-width="8" stroke-linecap="round"/>',
    adapter: '<path d="M145 118h190v104H145z" fill="#9eafbd" stroke="#506577" stroke-width="9"/><path d="M145 118l-32 25v54l32 25m190-104 32 25v54l-32 25" fill="#c6d2dc" stroke="#506577" stroke-width="8"/><path d="M207 144l33-19 33 19v38l-33 19-33-19z" fill="#f5f7fa" stroke="#506577" stroke-width="8"/>',
    pulley: '<circle cx="240" cy="170" r="105" fill="#d59a3d" stroke="#704d24" stroke-width="12" stroke-dasharray="12 5"/><circle cx="240" cy="170" r="68" fill="#f7d38d" stroke="#a56d29" stroke-width="8"/><path d="M240 137l29 17v33l-29 17-29-17v-33z" fill="#34495d" stroke="#172838" stroke-width="6"/>',
    sheet: '<rect x="112" y="77" width="256" height="186" rx="8" fill="#b9dbe5" fill-opacity=".65" stroke="#4b7182" stroke-width="9"/><g fill="#789eac"><circle cx="145" cy="110" r="6"/><circle cx="190" cy="110" r="6"/><circle cx="235" cy="110" r="6"/><circle cx="280" cy="110" r="6"/><circle cx="325" cy="110" r="6"/><circle cx="145" cy="150" r="6"/><circle cx="190" cy="150" r="6"/><circle cx="235" cy="150" r="6"/><circle cx="280" cy="150" r="6"/><circle cx="325" cy="150" r="6"/><circle cx="145" cy="190" r="6"/><circle cx="190" cy="190" r="6"/><circle cx="235" cy="190" r="6"/><circle cx="280" cy="190" r="6"/><circle cx="325" cy="190" r="6"/><circle cx="145" cy="230" r="6"/><circle cx="190" cy="230" r="6"/><circle cx="235" cy="230" r="6"/><circle cx="280" cy="230" r="6"/><circle cx="325" cy="230" r="6"/></g>',
    switch: '<rect x="125" y="120" width="230" height="116" rx="17" fill="#263747" stroke="#152333" stroke-width="9"/><rect x="153" y="145" width="90" height="62" rx="9" fill="#3d566d"/><path d="M285 173l30-54" stroke="#a9bac8" stroke-width="18" stroke-linecap="round"/><circle cx="285" cy="173" r="18" fill="#dce6ee" stroke="#526a7d" stroke-width="6"/><path d="M280 110h44" stroke="#657d91" stroke-width="9" stroke-linecap="round"/>'
  };
  const svg = start + (drawings[type] || drawings.screw) + end;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function shuffle(items) {
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}
