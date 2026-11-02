const builderParts = [
  {
    part: 'REV Robotics Control Hub',
    alt: 'REV Robotics Control Hub',
    choices: ['REV Robotics Control Hub', 'Servo Motor', 'Omni Wheel', 'Battery Pack'],
    image: makePartSvg('REV HUB', '#4ecdc4', '#123a52', '#dff7ff')
  },
  {
    part: 'Servo Motor',
    alt: 'Servo Motor',
    choices: ['Servo Motor', 'Mecanum Wheel', 'USB Cable', 'Drive Motor'],
    image: makePartSvg('SERVO', '#b8f2e6', '#1f4f59', '#f5f6ff')
  },
  {
    part: 'Drive Motor',
    alt: 'Drive Motor',
    choices: ['Drive Motor', 'Pillow Block', 'Threaded Rod', 'Encoder'],
    image: makePartSvg('MOTOR', '#ffd166', '#5c3d0d', '#fff5d9')
  },
  {
    part: 'Mecanum Wheel',
    alt: 'Mecanum Wheel',
    choices: ['Mecanum Wheel', 'Shaft', 'Battery', 'Tire Foam'],
    image: makePartSvg('MECANUM', '#ff9f1c', '#6a3b00', '#fff0d6')
  },
  {
    part: 'Omni Wheel',
    alt: 'Omni Wheel',
    choices: ['Omni Wheel', 'Piston', 'Latch', 'Motor Mount'],
    image: makePartSvg('OMNI', '#ff6b6b', '#4d1f1f', '#fff1f1')
  },
  {
    part: 'Battery Pack',
    alt: 'Battery Pack',
    choices: ['Battery Pack', 'LED Strip', 'Switch', 'Encoder'],
    image: makePartSvg('BATTERY', '#7bdff2', '#21455d', '#eaf9ff')
  },
  {
    part: 'Linear Slide',
    alt: 'Linear Slide',
    choices: ['Linear Slide', 'Hub', 'Pipe Clamp', 'Chain'],
    image: makePartSvg('SLIDE', '#8ecae6', '#1d3557', '#edfafd')
  },
  {
    part: 'Chain',
    alt: 'Chain',
    choices: ['Chain', 'USB Cable', 'Switch', 'Servo'],
    image: makePartSvg('CHAIN', '#a0c4ff', '#1f2a44', '#f0f5ff')
  },
  {
    part: 'Sprocket',
    alt: 'Sprocket',
    choices: ['Sprocket', 'Motor Plate', 'Rubber Band', 'Bumper'],
    image: makePartSvg('SPROCKET', '#bdb2ff', '#2f285a', '#f4f1ff')
  },
  {
    part: 'Limit Switch',
    alt: 'Limit Switch',
    choices: ['Limit Switch', 'Telescoping Pole', 'Lens', 'Gear'],
    image: makePartSvg('SWITCH', '#ffb5a7', '#6c3b2a', '#fff0eb')
  },
  {
    part: 'Encoder',
    alt: 'Encoder',
    choices: ['Encoder', 'Gimbal', 'Wheel Hub', 'Bearing'],
    image: makePartSvg('ENCODER', '#c7f9cc', '#1d4d35', '#f2fff5')
  },
  {
    part: 'Bearing',
    alt: 'Bearing',
    choices: ['Bearing', 'Phone Mount', 'Cable Clip', 'Tape'],
    image: makePartSvg('BEARING', '#ffafcc', '#46213a', '#fff3f8')
  },
  {
    part: 'Gearbox',
    alt: 'Gearbox',
    choices: ['Gearbox', 'Power Button', 'Flashlight', 'Battery Charger'],
    image: makePartSvg('GEARBOX', '#74c69d', '#1e3b2a', '#f1fff8')
  },
  {
    part: '3D Printed Bracket',
    alt: '3D Printed Bracket',
    choices: ['3D Printed Bracket', 'Wire Spool', 'Controller', 'Camera'],
    image: makePartSvg('BRACKET', '#f6bd60', '#4e340d', '#fff4e0')
  },
  {
    part: 'Bumper Pad',
    alt: 'Bumper Pad',
    choices: ['Bumper Pad', 'Control Hub', 'Shaft Coupler', 'Air Tank'],
    image: makePartSvg('BUMPER', '#a9def9', '#1f4b63', '#edf8ff')
  },
  {
    part: 'Shaft Coupler',
    alt: 'Shaft Coupler',
    choices: ['Shaft Coupler', 'Speaker', 'Display Screen', 'Drive Train'],
    image: makePartSvg('COUPLER', '#d5bdaf', '#4a352d', '#fff6f3')
  },
  {
    part: 'Hex Shaft',
    alt: 'Hex Shaft',
    choices: ['Hex Shaft', 'Joystick', 'Sensor', 'Belt'],
    image: makePartSvg('SHAFT', '#f7d6e0', '#4d2c36', '#fff4fa')
  },
  {
    part: 'Pillow Block',
    alt: 'Pillow Block',
    choices: ['Pillow Block', 'Power Switch', 'Wire Tie', 'Camera'],
    image: makePartSvg('BLOCK', '#cdb4db', '#3e2b4d', '#f9f2ff')
  },
  {
    part: 'Intake Roller',
    alt: 'Intake Roller',
    choices: ['Intake Roller', 'Rope', 'Springs', 'Display Module'],
    image: makePartSvg('ROLLER', '#90e0ef', '#123f4d', '#ebfdff')
  },
  {
    part: 'Robot Controller',
    alt: 'Robot Controller',
    choices: ['Robot Controller', 'Lift Arm', 'Gearbox', 'Scout Tablet'],
    image: makePartSvg('CTRL', '#e9c46a', '#57411d', '#fff7de')
  }
];

const driverRuleBank = [
  {
    question: 'What is the official FTC season game name for 2026–2027?',
    choices: ['BIOBUZZ', 'RAMP RALLY', 'CIRCUIT QUEST', 'SPARK SURGE'],
    answer: 'BIOBUZZ'
  },
  {
    question: 'During the Autonomous period, what type of control is primarily used?',
    choices: ['Pre-programmed robot actions', 'Manual joystick control', 'Coaching from the crowd', 'Battery charging'],
    answer: 'Pre-programmed robot actions'
  },
  {
    question: 'What is the purpose of Gracious Professionalism?',
    choices: ['To encourage respectful competition and teamwork', 'To allow cheating in matches', 'To skip inspections', 'To increase scoring without rules'],
    answer: 'To encourage respectful competition and teamwork'
  },
  {
    question: 'What is the main purpose of the Driver Station?',
    choices: ['To give drivers control of the robot during the match', 'To decorate the field', 'To hold spare parts only', 'To count scores on the scoreboard'],
    answer: 'To give drivers control of the robot during the match'
  },
  {
    question: 'Which part of a match usually includes the final high-pressure scoring actions?',
    choices: ['Endgame', 'Inspection', 'Setup', 'Opening ceremony'],
    answer: 'Endgame'
  },
  {
    question: 'What should a team ALWAYS do before competing on the field?',
    choices: ['Pass robot inspection and follow rules', 'Charge the battery overnight only', 'Remove all wheels', 'Change alliance numbers randomly'],
    answer: 'Pass robot inspection and follow rules'
  },
  {
    question: 'Which role is usually responsible for moving the robot during the driver-controlled period?',
    choices: ['Driver', 'Referee', 'Event sponsor', 'Audience member'],
    answer: 'Driver'
  },
  {
    question: 'What is the safest practice when handling batteries?',
    choices: ['Follow battery and charging safety procedures', 'Touch exposed wires', 'Store batteries on the field', 'Leave batteries in sunlight'],
    answer: 'Follow battery and charging safety procedures'
  },
  {
    question: 'What is the main goal of a robot inspection?',
    choices: ['To check legal design, safety, and compliance', 'To clean the robot', 'To choose the team mascot', 'To charge batteries'],
    answer: 'To check legal design, safety, and compliance'
  },
  {
    question: 'Why do competitions use match schedules and alliance pairings?',
    choices: ['To organize fair and consistent play', 'To decide which team gets a trophy first', 'To remove all robots from the field', 'To replace referees'],
    answer: 'To organize fair and consistent play'
  },
  {
    question: 'Which of these is a key skill for a Driver?',
    choices: ['Precise control and situational awareness', 'Making the field signs', 'Designing the snack table', 'Painting the pit banner'],
    answer: 'Precise control and situational awareness'
  },
  {
    question: 'What should a team do if they discover a rule clarification or update?',
    choices: ['Check the official competition manual and team updates', 'Ignore it and continue', 'Ask only the audience', 'Use a random guess'],
    answer: 'Check the official competition manual and team updates'
  },
  {
    question: 'What is a common builder responsibility during an FTC build season?',
    choices: ['Constructing the robot and testing mechanisms', 'Writing the event schedule', 'Running the judges table', 'Selling tickets'],
    answer: 'Constructing the robot and testing mechanisms'
  },
  {
    question: 'What does good alliance communication usually help with?',
    choices: ['Coordinated strategy and safer gameplay', 'Skipping robot testing', 'Lowering the team number', 'Removing required inspections'],
    answer: 'Coordinated strategy and safer gameplay'
  },
  {
    question: 'Which skill is most important for successful autonomous code?',
    choices: ['Reliable movement and sensor accuracy', 'Choosing the loudest cheer', 'Decorating the field border', 'Randomly pressing buttons'],
    answer: 'Reliable movement and sensor accuracy'
  },
  {
    question: 'What is one purpose of field elements in FTC?',
    choices: ['To create goals, obstacles, and scoring opportunities', 'To act as seats for spectators', 'To hide the match timer', 'To replace robot hardware'],
    answer: 'To create goals, obstacles, and scoring opportunities'
  },
  {
    question: 'Which of these is a good safety habit before a match?',
    choices: ['Inspect the robot for loose wires and sharp edges', 'Leave the battery unconnected', 'Run the robot without testing', 'Ignore the field perimeter'],
    answer: 'Inspect the robot for loose wires and sharp edges'
  },
  {
    question: 'Why do FTC teams use a drive train?',
    choices: ['To move the robot efficiently around the field', 'To store snacks', 'To replace the brain of the robot', 'To decorate the pit'],
    answer: 'To move the robot efficiently around the field'
  },
  {
    question: 'What is a primary goal of a drivetrain choice?',
    choices: ['Balance speed, traction, maneuverability, and reliability', 'Make the robot loudest', 'Match the pit color', 'Reduce team communication'],
    answer: 'Balance speed, traction, maneuverability, and reliability'
  },
  {
    question: 'During a match, what should a team do if they are unsure of a rule?',
    choices: ['Consult the official manual or event staff', 'Guess and continue', 'Ask the audience to decide', 'Ignore the issue'],
    answer: 'Consult the official manual or event staff'
  },
  {
    question: 'Which action best supports successful robot reliability?',
    choices: ['Testing, tuning, and maintaining hardware', 'Skipping maintenance', 'Running without inspection', 'Changing software only once a year'],
    answer: 'Testing, tuning, and maintaining hardware'
  },
  {
    question: 'Why is calibration important in FTC?',
    choices: ['It helps sensors and robot movement stay accurate', 'It reduces the need for team meetings', 'It changes the field layout', 'It turns off the timer'],
    answer: 'It helps sensors and robot movement stay accurate'
  },
  {
    question: 'What does a match score reflect?',
    choices: ['How well the team achieved game objectives', 'Only the color of the robot', 'How long the pit banner is', 'How loud the crowd is'],
    answer: 'How well the team achieved game objectives'
  },
  {
    question: 'What does a field perimeter help define?',
    choices: ['Where robot play is allowed in the arena', 'Where to park team tools', 'The team pit size', 'The event logo location'],
    answer: 'Where robot play is allowed in the arena'
  },
  {
    question: 'Which action typically improves consistency during competition?',
    choices: ['Repeated practice and routine checks', 'Changing all code before each match', 'Removing all sensors', 'Skipping driver practice'],
    answer: 'Repeated practice and routine checks'
  },
  {
    question: 'What is the best reason to keep the robot organized and labeled?',
    choices: ['Faster troubleshooting and safer operation', 'To win by appearance alone', 'To avoid reading the rules', 'To keep the pit quiet'],
    answer: 'Faster troubleshooting and safer operation'
  },
  {
    question: 'Why do teams use strategic alliance planning?',
    choices: ['To maximize scoring and support in matches', 'To reduce the number of team members', 'To change game rules', 'To avoid robot testing'],
    answer: 'To maximize scoring and support in matches'
  },
  {
    question: 'Which of these is a common FTC engineering goal?',
    choices: ['Build a reliable robot that completes tasks consistently', 'Avoid all testing', 'Ignore scoring goals', 'Use only one part type'],
    answer: 'Build a reliable robot that completes tasks consistently'
  },
  {
    question: 'What is a key benefit of using sensors?',
    choices: ['Improved precision and repeatable positioning', 'Less need for drivers', 'Shorter competition rules', 'Lower battery voltage'],
    answer: 'Improved precision and repeatable positioning'
  },
  {
    question: 'What should a team do when a robot is not functioning as expected?',
    choices: ['Diagnose the issue, test, and troubleshoot methodically', 'Immediately dismantle everything', 'Ignore it for the next match', 'Remove the battery'],
    answer: 'Diagnose the issue, test, and troubleshoot methodically'
  },
  {
    question: 'Which statement best matches FTC competition values?',
    choices: ['Innovation, teamwork, and respect for the rules', 'Only racing without strategy', 'Maximum risk with no safety checks', 'Ignoring score totals'],
    answer: 'Innovation, teamwork, and respect for the rules'
  },
  {
    question: 'What is the role of an alliance captain in many FTC events?',
    choices: ['To help coordinate strategy and communicate with the alliance', 'To inspect every teammate robot', 'To referee matches', 'To run the field reset'],
    answer: 'To help coordinate strategy and communicate with the alliance'
  },
  {
    question: 'What best describes the purpose of an FTC match timer?',
    choices: ['To track autonomous, driver-controlled, and endgame periods', 'To keep the pit clean', 'To control the robot battery', 'To schedule team meals'],
    answer: 'To track autonomous, driver-controlled, and endgame periods'
  },
  {
    question: 'Why should teams document build changes?',
    choices: ['For troubleshooting, repeatability, and improvement', 'To hide them from other teams', 'To avoid using the manual', 'To skip writing a design notebook'],
    answer: 'For troubleshooting, repeatability, and improvement'
  },
  {
    question: 'Which of these is an example of good competition etiquette?',
    choices: ['Respecting opponents, officials, and team members', 'Disrupting other teams on purpose', 'Breaking inspection rules', 'Changing the field yourself'],
    answer: 'Respecting opponents, officials, and team members'
  },
  {
    question: 'What is one reason to practice match resets?',
    choices: ['To reduce wasted time and improve consistency', 'To avoid driving', 'To shorten the game', 'To eliminate strategy'],
    answer: 'To reduce wasted time and improve consistency'
  },
  {
    question: 'What should a team do before making a major drivetrain change?',
    choices: ['Evaluate the tradeoffs and test thoroughly', 'Change it without checking the rules', 'Ignore the current robot design', 'Remove all sensors'],
    answer: 'Evaluate the tradeoffs and test thoroughly'
  },
  {
    question: 'What is an important goal of robot design documentation?',
    choices: ['To explain how and why the robot works', 'To replace all testing', 'To hide fasteners', 'To remove controller settings'],
    answer: 'To explain how and why the robot works'
  },
  {
    question: 'What is the purpose of match practice?',
    choices: ['To improve strategy, coordination, and consistency', 'To avoid all team communication', 'To replace engineering analysis', 'To make the robot smaller'],
    answer: 'To improve strategy, coordination, and consistency'
  },
  {
    question: 'Which of these best describes a high-quality robot design?',
    choices: ['Simple, reliable, and testable', 'Complex with no documentation', 'Randomly assembled', 'Only decorated for appearance'],
    answer: 'Simple, reliable, and testable'
  },
  {
    question: 'Why should teams monitor battery power during a match?',
    choices: ['To avoid performance loss and unexpected failures', 'To reduce the need for practice', 'To stop the match clock', 'To keep the field empty'],
    answer: 'To avoid performance loss and unexpected failures'
  },
  {
    question: 'What is an effective way to improve a team’s robot performance?',
    choices: ['Iterate tests, analyze issues, and refine mechanisms', 'Skip all measurements', 'Build without planning', 'Ignore scoring opportunities'],
    answer: 'Iterate tests, analyze issues, and refine mechanisms'
  },
  {
    question: 'What role do referees and judges play in FTC?',
    choices: ['They enforce rules and evaluate competition standards', 'They build the robot for the team', 'They choose the pit color', 'They replace drivers'],
    answer: 'They enforce rules and evaluate competition standards'
  },
  {
    question: 'Why is communication important between driver, coach, and builder?',
    choices: ['To coordinate strategy and improve during the match', 'To avoid all testing', 'To choose the event music', 'To reduce the number of judges'],
    answer: 'To coordinate strategy and improve during the match'
  },
  {
    question: 'What is the typical pattern of an FTC match?',
    choices: ['Autonomous period, then driver-controlled period, then endgame', 'Only one long practice round', 'Judge interviews only', 'No timer or rules'],
    answer: 'Autonomous period, then driver-controlled period, then endgame'
  },
  {
    question: 'Why do teams often create a build checklist?',
    choices: ['To ensure safety, function, and readiness before events', 'To reduce the team’s goals', 'To avoid score tracking', 'To paint the rover'],
    answer: 'To ensure safety, function, and readiness before events'
  },
  {
    question: 'What is a common reason to add a limit switch or sensor?',
    choices: ['To detect position and prevent mechanical crashes', 'To decorate the robot', 'To reduce robot speed to zero', 'To replace the controller'],
    answer: 'To detect position and prevent mechanical crashes'
  },
  {
    question: 'Which action helps a team learn from competition results?',
    choices: ['Reviewing match footage, data, and mechanical issues', 'Ignoring the scoring sheet', 'Removing all documentation', 'Skipping the next event'],
    answer: 'Reviewing match footage, data, and mechanical issues'
  },
  {
    question: 'What is the most important element of a successful FTC drive team?',
    choices: ['Clear roles, communication, and practice', 'Only having one person on the team', 'Skipping all planning', 'Avoiding every restart'],
    answer: 'Clear roles, communication, and practice'
  },
  {
    question: 'What is one advantage of using modular robot design?',
    choices: ['Easier repair, upgrades, and troubleshooting', 'No need for documentation', 'Lower scoring ability', 'No field interaction'],
    answer: 'Easier repair, upgrades, and troubleshooting'
  },
  {
    question: 'Which is a well-rounded FTC strategy?',
    choices: ['Build, test, refine, practice, and adapt', 'Change only appearance', 'Avoid all measurements', 'Skip engineering analysis'],
    answer: 'Build, test, refine, practice, and adapt'
  },
  {
    question: 'What is the purpose of a team’s game strategy?',
    choices: ['To decide how to score efficiently and reliably', 'To remove judges from the room', 'To avoid reading the game manual', 'To make the robot bigger'],
    answer: 'To decide how to score efficiently and reliably'
  },
  {
    question: 'What should a team do after each match?',
    choices: ['Review performance, fix issues, and improve strategy', 'Leave the robot untouched', 'Disassemble everything', 'Ignore team notes'],
    answer: 'Review performance, fix issues, and improve strategy'
  },
  {
    question: 'Why are motors and drivetrain components often tested together?',
    choices: ['To verify power, speed, and mechanical fit', 'To reduce the need for team meetings', 'To change the competition rules', 'To remove all sensors'],
    answer: 'To verify power, speed, and mechanical fit'
  },
  {
    question: 'What is a strong method for identifying robotics design issues?',
    choices: ['Systematic testing and measurement', 'Guessing from memory', 'Ignoring the robot', 'Skipping documentation'],
    answer: 'Systematic testing and measurement'
  },
  {
    question: 'What is one reason to maintain an organized tool area?',
    choices: ['It reduces mistakes and saves time during build sessions', 'It stops all robot testing', 'It replaces the robot controller', 'It guarantees a first-place trophy'],
    answer: 'It reduces mistakes and saves time during build sessions'
  },
  {
    question: 'Why are competitions designed with both team and event rules?',
    choices: ['To create a fair, safe, and consistent experience', 'To make teams less competitive', 'To replace all engineering', 'To stop robot innovation'],
    answer: 'To create a fair, safe, and consistent experience'
  },
  {
    question: 'What should all FTC teams prioritize during builds?',
    choices: ['Safety, reliability, and rule compliance', 'Appearance over performance', 'No maintenance', 'No practice'],
    answer: 'Safety, reliability, and rule compliance'
  },
  {
    question: 'What is the goal of a driver practice session?',
    choices: ['To improve control, precision, and reaction time', 'To remove the competition timer', 'To design the pit banner', 'To avoid autonomous code'],
    answer: 'To improve control, precision, and reaction time'
  },
  {
    question: 'Which value is most essential for successful FTC teamwork?',
    choices: ['Clear communication and trust', 'Competition without communication', 'Random change requests', 'No testing'],
    answer: 'Clear communication and trust'
  }
];

const state = {
  role: null,
  questions: [],
  currentIndex: 0,
  selectedAnswers: [],
  score: 0
};

const homeScreen = document.getElementById('homeScreen');
const quizScreen = document.getElementById('quizScreen');
const resultsScreen = document.getElementById('resultsScreen');

const progressText = document.getElementById('progressText');
const categoryBadge = document.getElementById('categoryBadge');
const questionText = document.getElementById('questionText');
const imageContainer = document.getElementById('imageContainer');
const choicesContainer = document.getElementById('choices');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const homeBtn = document.getElementById('homeBtn');
const resultsTitle = document.getElementById('resultsTitle');
const scoreSummary = document.getElementById('scoreSummary');
const resultsMessage = document.getElementById('resultsMessage');
const reviewList = document.getElementById('reviewList');
const retryBtn = document.getElementById('retryBtn');
const resultsHomeBtn = document.getElementById('resultsHomeBtn');

document.querySelectorAll('.role-card').forEach((button) => {
  button.addEventListener('click', () => {
    startQuiz(button.dataset.role);
  });
});

homeBtn.addEventListener('click', showHome);
retryBtn.addEventListener('click', () => startQuiz(state.role));
resultsHomeBtn.addEventListener('click', showHome);
nextBtn.addEventListener('click', goNext);
prevBtn.addEventListener('click', goPrevious);

function startQuiz(role) {
  state.role = role;
  state.currentIndex = 0;
  state.selectedAnswers = [];
  state.score = 0;
  const baseQuestions = role === 'builder' ? createBuilderQuiz() : createDriverQuiz();
  state.questions = shuffle(baseQuestions).slice(0, 125);
  showScreen('quiz');
  renderQuestion();
}

function createBuilderQuiz() {
  const builderQuestions = builderParts.flatMap((item) => {
    const questionText = `Which part is shown in this image?`;
    const choices = shuffle([...item.choices]);
    return [{
      type: 'builder',
      question: questionText,
      choices,
      answer: item.part,
      image: item.image,
      alt: item.alt,
      note: `This is a ${item.part}.`
    }];
  });

  return builderQuestions.length >= 125 ? builderQuestions.slice(0, 125) : repeatQuestions(builderQuestions, 125);
}

function createDriverQuiz() {
  const driverQuestions = driverRuleBank.map((item) => ({
    type: 'driver',
    question: item.question,
    choices: shuffle([...item.choices]),
    answer: item.answer,
    image: null,
    alt: null,
    note: item.answer
  }));

  return driverQuestions.length >= 125 ? driverQuestions.slice(0, 125) : repeatQuestions(driverQuestions, 125);
}

function repeatQuestions(source, targetLength) {
  const repeated = [...source];
  while (repeated.length < targetLength) {
    repeated.push(...source);
  }
  return repeated.slice(0, targetLength);
}

function renderQuestion() {
  const currentQuestion = state.questions[state.currentIndex];
  if (!currentQuestion) {
    showResults();
    return;
  }

  categoryBadge.textContent = state.role === 'builder' ? 'Builder' : 'Driver';
  progressText.textContent = `Question ${state.currentIndex + 1} / ${state.questions.length}`;
  questionText.textContent = currentQuestion.question;

  if (currentQuestion.image) {
    imageContainer.classList.remove('hidden');
    imageContainer.innerHTML = `<img src="${currentQuestion.image}" alt="${currentQuestion.alt}" />`;
  } else {
    imageContainer.classList.add('hidden');
    imageContainer.innerHTML = '';
  }

  choicesContainer.innerHTML = '';

  currentQuestion.choices.forEach((choice) => {
    const button = document.createElement('button');
    button.className = 'choice-btn';
    button.type = 'button';
    button.textContent = choice;

    const selectedIndex = state.selectedAnswers[state.currentIndex];
    if (selectedIndex !== undefined && currentQuestion.choices[selectedIndex] === choice) {
      button.classList.add('selected');
    }

    button.addEventListener('click', () => {
      state.selectedAnswers[state.currentIndex] = currentQuestion.choices.indexOf(choice);
      renderQuestion();
    });

    choicesContainer.appendChild(button);
  });

  if (state.selectedAnswers[state.currentIndex] !== undefined) {
    const selectedIndex = state.selectedAnswers[state.currentIndex];
    const selectedChoice = currentQuestion.choices[selectedIndex];
    const answerIndex = currentQuestion.choices.indexOf(currentQuestion.answer);

    Array.from(choicesContainer.children).forEach((button, index) => {
      if (index === answerIndex) {
        button.classList.add('correct');
      }
      if (index === selectedIndex && selectedChoice !== currentQuestion.answer) {
        button.classList.add('wrong');
      }
    });

    nextBtn.textContent = state.currentIndex === state.questions.length - 1 ? 'Finish' : 'Next';
  } else {
    nextBtn.textContent = state.currentIndex === state.questions.length - 1 ? 'Finish' : 'Next';
  }

  prevBtn.disabled = state.currentIndex === 0;
  prevBtn.style.opacity = state.currentIndex === 0 ? '0.5' : '1';
}

function goNext() {
  if (state.selectedAnswers[state.currentIndex] === undefined) {
    state.selectedAnswers[state.currentIndex] = -1;
  }

  if (state.currentIndex < state.questions.length - 1) {
    state.currentIndex += 1;
    renderQuestion();
    return;
  }

  showResults();
}

function goPrevious() {
  if (state.currentIndex > 0) {
    state.currentIndex -= 1;
    renderQuestion();
  }
}

function showResults() {
  let correctCount = 0;
  const reviewEntries = [];

  state.questions.forEach((question, index) => {
    const selectedIndex = state.selectedAnswers[index];
    const selectedChoice = selectedIndex !== undefined && selectedIndex >= 0 ? question.choices[selectedIndex] : null;
    const isCorrect = selectedChoice === question.answer;

    if (isCorrect) {
      correctCount += 1;
    }

    reviewEntries.push({
      question: question.question,
      selectedChoice,
      correctAnswer: question.answer,
      isCorrect
    });
  });

  const percentage = Math.round((correctCount / state.questions.length) * 100);
  scoreSummary.textContent = `${correctCount} / ${state.questions.length}`;

  if (percentage >= 85) {
    resultsTitle.textContent = 'Excellent work!';
    resultsMessage.textContent = `You scored ${percentage}% and clearly know your FTC material.`;
  } else if (percentage >= 60) {
    resultsTitle.textContent = 'Great job!';
    resultsMessage.textContent = `You scored ${percentage}%. A little more study and you’ll be ready for competition.`;
  } else if (percentage >= 40) {
    resultsTitle.textContent = 'Solid effort!';
    resultsMessage.textContent = `You scored ${percentage}%. Keep practicing and review the rules and robot parts.`;
  } else {
    resultsTitle.textContent = 'Keep learning!';
    resultsMessage.textContent = `You scored ${percentage}%. Review the FTC manual and parts guide to improve.`;
  }

  reviewList.innerHTML = reviewEntries
    .slice(0, 10)
    .map((entry) => {
      const status = entry.isCorrect ? 'Correct' : 'Incorrect';
      return `<div class="review-item"><strong>${status}</strong> — ${entry.question}<br><small>Your answer: ${entry.selectedChoice || 'No answer'} • Correct: ${entry.correctAnswer}</small></div>`;
    })
    .join('');

  showScreen('results');
}

function showHome() {
  state.role = null;
  state.questions = [];
  state.currentIndex = 0;
  state.selectedAnswers = [];
  showScreen('home');
}

function showScreen(name) {
  [homeScreen, quizScreen, resultsScreen].forEach((section) => {
    section.classList.remove('active');
  });

  if (name === 'home') {
    homeScreen.classList.add('active');
  } else if (name === 'quiz') {
    quizScreen.classList.add('active');
  } else if (name === 'results') {
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

function makePartSvg(label, bodyColor, accentColor, textColor) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 300" role="img" aria-label="${label}">
      <defs>
        <linearGradient id="g1" x1="0" x2="1">
          <stop offset="0%" stop-color="${bodyColor}" />
          <stop offset="100%" stop-color="${accentColor}" />
        </linearGradient>
      </defs>
      <rect width="520" height="300" fill="#0d1830"/>
      <rect x="40" y="40" width="440" height="220" rx="24" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" />
      <circle cx="260" cy="150" r="72" fill="url(#g1)" opacity="0.9"/>
      <circle cx="260" cy="150" r="39" fill="${textColor}" opacity="0.9"/>
      <rect x="135" y="120" width="250" height="60" rx="14" fill="${accentColor}" opacity="0.55"/>
      <text x="260" y="160" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="32" font-weight="700" fill="${textColor}">${label}</text>
    </svg>
  `;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

showHome();
