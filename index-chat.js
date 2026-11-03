(() => {
  const feed = document.getElementById('aiChatFeed');
  if (!feed) return;

  const input = document.getElementById('aiQuestionInput');
  const button = document.getElementById('aiAskButton');

  function addMessage(role, text) {
    const row = document.createElement('div');
    row.className = `chat-message ${role}`;
    row.textContent = text;
    feed.appendChild(row);
    feed.scrollTop = feed.scrollHeight;
  }

  function replyFor(question) {
    const q = question.toLowerCase();

    if (/(what is ftc|ftc)/i.test(question)) {
      return 'FTC stands for FIRST Tech Challenge. It is a robotics league where teams design, build, and program robots to complete game missions.';
    }

    if (/(score|points|how many points|correct answer)/i.test(q)) {
      return 'Every correct answer in this quiz is worth 20 points. You can also buy a 2x points boost from the shop for 15 minutes.';
    }

    if (/(shop|store|2x|double points|buy)/i.test(q)) {
      return 'Open the Shop button in the top-right corner. The 2x Points boost costs 200 points and doubles your earned points for 15 minutes.';
    }

    if (/(leaderboard|rank|top|scoreboard)/i.test(q)) {
      return 'Use the Leaderboard button in the top-right. Your score is tracked locally in this browser so you can compete against your own team progress.';
    }

    if (/(driver|driving|autonomous|teleop|match flow)/i.test(q)) {
      return 'A strong driver plan is to stay calm, drive safely, and communicate with your team. In FTC, match flow matters: routine, field awareness, and safe robot handling usually beat rushing.';
    }

    if (/(builder|part|robot part|bom|starterbot|andymark|wheel|servo)/i.test(q)) {
      return 'Builder mode is for identifying robot parts and kit items. Look for clear shapes, hardware type, and the part family like wheel, screw, spacer, or servo.';
    }

    if (/(how to win|strategy|tips)/i.test(q)) {
      return 'Good FTC strategy starts with consistent driving, reliable mechanisms, quick resets, and good communication. Practice fundamentals before trying flashy plays.';
    }

    if (/(match|game|rules)/i.test(q)) {
      return 'Always check the official FTC Competition Manual for season-specific rules. This quiz is for practice, but the official manual is the real rule source.';
    }

    return 'I can help with FTC basics, driver strategy, builder parts, scoring, the shop, and leaderboard tips. Try asking: “How do I earn more points?” or “What is FTC?”';
  }

  function handleAsk() {
    const value = input.value.trim();
    if (!value) return;
    addMessage('user', value);
    input.value = '';
    setTimeout(() => {
      addMessage('bot', replyFor(value));
    }, 250);
  }

  button.addEventListener('click', handleAsk);
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      handleAsk();
    }
  });

  addMessage('bot', 'Ask me anything about FTC rules, driver tips, builder parts, scoring, or the shop!');
})();























































































































































































































































































n

n

n

n

n

n

n

n

n

n

n

n

n

n

a


































































n

n

n

n

n

n

n

n

n
n
n
n
n
n
n
n
n
n
n

n

n

n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n














































n

n

n

n

n

n

n

n

n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
n
"}]} ,