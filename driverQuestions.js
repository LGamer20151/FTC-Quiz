const driverQuestions = [
  {
    question: 'What is the official FTC 2026–2027 game name?',
    choices: ['BIOBUZZ', 'RAMP RUSH', 'POWER GRID', 'CIRCUIT QUEST'],
    answer: 'BIOBUZZ'
  },
  {
    question: 'Which section of the FTC Competition Manual covers the game rules?',
    choices: ['Section 11', 'Section 2', 'Section 6', 'Section 16'],
    answer: 'Section 11'
  },
  {
    question: 'Which section of the FTC Competition Manual covers robot construction rules?',
    choices: ['Section 12', 'Section 5', 'Section 7', 'Section 13'],
    answer: 'Section 12'
  },
  {
    question: 'What is the usual length of the Autonomous period in FTC matches?',
    choices: ['30 seconds', '10 seconds', '2 minutes', '5 minutes'],
    answer: '30 seconds'
  },
  {
    question: 'What is the usual length of the Driver-Controlled period in FTC matches?',
    choices: ['2 minutes', '45 seconds', '10 minutes', '1 minute'],
    answer: '2 minutes'
  },
  {
    question: 'What happens in the final part of the Driver-Controlled period?',
    choices: ['Endgame scoring actions', 'Pit reset', 'Robot teardown', 'Judging interviews'],
    answer: 'Endgame scoring actions'
  },
  {
    question: 'Which of these is a common FTC driver role?',
    choices: ['Operating the robot during the match', 'Repairing the field', 'Designing the banner', 'Refereeing the match'],
    answer: 'Operating the robot during the match'
  },
  {
    question: 'Which role is usually responsible for communication and match strategy while the robot is driving?',
    choices: ['Coach', 'Audience member', 'Pit manager', 'Judge'],
    answer: 'Coach'
  },
  {
    question: 'What is the purpose of robot inspection?',
    choices: ['Check safety, legality, and rule compliance', 'Choose a team name', 'Decorate the pit', 'Charge the battery'],
    answer: 'Check safety, legality, and rule compliance'
  },
  {
    question: 'Which value should teams follow during competition?',
    choices: ['Gracious Professionalism', 'Quickest possible cheat', 'Ignoring event staff', 'Skipping team updates'],
    answer: 'Gracious Professionalism'
  },
  {
    question: 'What is a Driver Station mainly used for?',
    choices: ['Controlling the robot during a match', 'Storing spare parts', 'Painting the field', 'Checking battery voltage only'],
    answer: 'Controlling the robot during a match'
  },
  {
    question: 'What should a team do if they find a rule clarification or update?',
    choices: ['Check the official competition manual and team updates', 'Ignore it', 'Ask random spectators', 'Delete old notes'],
    answer: 'Check the official competition manual and team updates'
  },
  {
    question: 'What is the main purpose of the FTC Competition Manual?',
    choices: ['To explain the rules, field play, and robot restrictions', 'To replace team strategy', 'To choose the pit color', 'To create a team roster'],
    answer: 'To explain the rules, field play, and robot restrictions'
  },
  {
    question: 'What should a team review before each match?',
    choices: ['Rules, scoring, and robot readiness', 'Only the snack schedule', 'Only pit decorations', 'Only the weather'],
    answer: 'Rules, scoring, and robot readiness'
  },
  {
    question: 'What is the best reason for reliable autonomous programming?',
    choices: ['It helps the robot complete tasks consistently at the start of the match', 'It makes the robot louder', 'It removes all sensors', 'It replaces the driver'],
    answer: 'It helps the robot complete tasks consistently at the start of the match'
  },
  {
    question: 'Which of these is an example of a field element concept in FTC?',
    choices: ['Flowers, hives, polls, and scoring areas', 'Only a table and chair', 'Only a battery charger', 'Only the pit wall'],
    answer: 'Flowers, hives, polls, and scoring areas'
  },
  {
    question: 'Which statement best describes a good driver?',
    choices: ['Calm, alert, and precise while driving the robot', 'Only focuses on shouting', 'Avoids all communication', 'Never checks the field'],
    answer: 'Calm, alert, and precise while driving the robot'
  },
  {
    question: 'What is one reason to use consistent match practice?',
    choices: ['To improve driving skill and team coordination', 'To reduce the competition rules', 'To make the field smaller', 'To remove the timer'],
    answer: 'To improve driving skill and team coordination'
  },
  {
    question: 'What is a common goal of FTC game strategy?',
    choices: ['Score efficiently and reliably while following the rules', 'Ignore the score and field', 'Remove all sensors', 'Build only for appearance'],
    answer: 'Score efficiently and reliably while following the rules'
  },
  {
    question: 'Which type of control is usually used during the tele-operated period?',
    choices: ['Driver input using a controller or Driver Station', 'Preloaded script only', 'No control at all', 'Automatic field reset'],
    answer: 'Driver input using a controller or Driver Station'
  },
  {
    question: 'What should a team do if the robot is behaving unpredictably during a match?',
    choices: ['Diagnose the issue and adjust strategy or robot setup safely', 'Ignore the issue and keep driving', 'Turn off all safety checks', 'Leave the field immediately'],
    answer: 'Diagnose the issue and adjust strategy or robot setup safely'
  },
  {
    question: 'What is the job of the referee during an FTC match?',
    choices: ['Enforce the rules and monitor the match', 'Build the robot', 'Choose the team logo', 'Handle all battery charging'],
    answer: 'Enforce the rules and monitor the match'
  },
  {
    question: 'Why are field elements important in FTC?',
    choices: ['They create specific scoring opportunities and game play objectives', 'They are only decorative', 'They replace robot parts', 'They are not used in scoring'],
    answer: 'They create specific scoring opportunities and game play objectives'
  },
  {
    question: 'What is one of the most effective ways to improve Driver performance?',
    choices: ['Practice driving, communication, and match routines', 'Skip all testing', 'Only practice once a season', 'Never watch the field'],
    answer: 'Practice driving, communication, and match routines'
  },
  {
    question: 'Which of these is a key part of a strong FTC drive team?',
    choices: ['Communication, roles, and consistent practice', 'No strategy and no rules review', 'Random match changes', 'Ignoring penalties'],
    answer: 'Communication, roles, and consistent practice'
  },
  {
    question: 'Why do teams check for loose wiring and hardware before a match?',
    choices: ['To reduce risk of failure and improve safety', 'To eliminate the need for a battery', 'To change the match clock', 'To remove scoring opportunities'],
    answer: 'To reduce risk of failure and improve safety'
  },
  {
    question: 'Which phase usually comes before the Driver-Controlled period?',
    choices: ['Autonomous', 'Endgame', 'Reset', 'Closing ceremony'],
    answer: 'Autonomous'
  },
  {
    question: 'What should a team review when preparing for competition?',
    choices: ['The official game rules, match structure, and field elements', 'Only the team’s snack list', 'Only the colors of the pit banner', 'Only the field camera lens'],
    answer: 'The official game rules, match structure, and field elements'
  },
  {
    question: 'What is the goal of a successful FTC driver strategy?',
    choices: ['Move safely, score efficiently, and stay in control', 'Ignore the field and drive randomly', 'Never use the Driver Station', 'Skip the match timer'],
    answer: 'Move safely, score efficiently, and stay in control'
  },
  {
    question: 'What is a common effect of good team communication during a match?',
    choices: ['Improved coordination and fewer mistakes', 'Longer delays and less strategy', 'No need for practice', 'Lower score totals'],
    answer: 'Improved coordination and fewer mistakes'
  },
  {
    question: 'Which of these best matches the purpose of the FTC Competition Manual?',
    choices: ['To provide official rule guidance for matches and robot design', 'To replace team practice', 'To avoid all robot testing', 'To determine only the pit layout'],
    answer: 'To provide official rule guidance for matches and robot design'
  },
  {
    question: 'Which of these is most important during the Endgame?',
    choices: ['Completing time-sensitive scoring actions safely and accurately', 'Packing away the robot early', 'Leaving the field before the signal', 'Skipping communication'],
    answer: 'Completing time-sensitive scoring actions safely and accurately'
  },
  {
    question: 'According to FTC practice, what should teams do when rules update or change?',
    choices: ['Check the official Team Updates and official manual', 'Ignore all updates', 'Only ask the crowd', 'Wait until the next season'],
    answer: 'Check the official Team Updates and official manual'
  }
];
