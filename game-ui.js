(() => {
  const STORAGE_KEY = 'ftcQuizGameV1';
  const DOUBLE_POINTS_COST = 200;
  const DOUBLE_POINTS_DURATION = 15 * 60 * 1000;
  const readState = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      return saved && typeof saved === 'object' && saved.players && typeof saved.players === 'object'
        ? saved
        : { activePlayer: 'player', players: { player: { name: 'Player', points: 0, totalEarned: 0, doublePointsUntil: 0 } } };
    } catch (error) {
      return { activePlayer: 'player', players: { player: { name: 'Player', points: 0, totalEarned: 0, doublePointsUntil: 0 } } };
    }
  };
  let state = readState();
  let earnedQuestions = new Set();
  let lastQuestion = '';

  function normalizedName(name) {
    return name.trim().replace(/\s+/g, ' ').slice(0, 24);
  }

  function playerKey(name) {
    return normalizedName(name).toLocaleLowerCase() || 'player';
  }

  function getPlayer() {
    const key = state.activePlayer || 'player';
    if (!state.players[key]) state.players[key] = { name: key === 'player' ? 'Player' : key, points: 0, totalEarned: 0, doublePointsUntil: 0 };
    const player = state.players[key];
    player.points = Math.max(0, Number(player.points) || 0);
    player.totalEarned = Math.max(0, Number(player.totalEarned) || 0);
    player.doublePointsUntil = Math.max(0, Number(player.doublePointsUntil) || 0);
    return player;
  }

  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (error) { /* Continue with this page's in-memory state. */ }
  }

  function addStyles() {
    if (document.getElementById('gameUiStyles')) return;
    const link = document.createElement('link');
    link.id = 'gameUiStyles';
    link.rel = 'stylesheet';
    link.href = 'game-ui.css';
    document.head.appendChild(link);
  }

  function buildToolbar() {
    const toolbar = document.createElement('div');
    toolbar.className = 'game-toolbar';
    toolbar.innerHTML = '<div class="game-points" aria-live="polite"><span aria-hidden="true">⭐</span> <span id="gamePoints">0</span> pts</div><div class="game-tools"><button class="secondary-btn game-shop-button" id="openGameShop" type="button">🛒 Shop</button><button class="secondary-btn game-leaderboard-button" id="openLeaderboard" type="button">🏆 Leaderboard</button></div>';
    document.body.insertBefore(toolbar, document.body.firstChild);

    const dialog = document.createElement('dialog');
    dialog.id = 'gameDialog';
    dialog.className = 'game-dialog';
    dialog.innerHTML = '<div class="game-dialog-header"><div><p class="eyebrow" id="gameDialogEyebrow">FTC Quiz</p><h2 id="gameDialogTitle">Shop</h2></div><button class="secondary-btn game-close" type="button" aria-label="Close">✕</button></div><p class="game-balance">Your balance: <strong id="gameDialogBalance">0 points</strong></p><section id="shopPanel"><article class="shop-item"><div><h3>2× Points · 15 minutes</h3><p>Earn 40 points instead of 20 for each correct answer while active.</p></div><button class="primary-btn" id="buyDoublePoints" type="button">Buy · 200 points</button></article><p id="shopMessage" class="game-message" aria-live="polite"></p><label class="player-label" for="playerName">Player name <span>(used for this browser's leaderboard)</span></label><div class="player-form"><input id="playerName" maxlength="24" autocomplete="nickname" placeholder="Enter a player name"><button class="secondary-btn" id="savePlayerName" type="button">Save name</button></div></section><section id="leaderboardPanel" class="hidden"><h3>Leaderboard</h3><p class="game-note">Scores are saved in this browser only; they are not shared across devices.</p><ol id="leaderboardList" class="leaderboard-list"></ol></section></dialog>';
    document.body.appendChild(dialog);

    document.getElementById('openGameShop').addEventListener('click', () => openDialog('shop'));
    document.getElementById('openLeaderboard').addEventListener('click', () => openDialog('leaderboard'));
    dialog.querySelector('.game-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
    dialog.addEventListener('close', () => {
      document.getElementById('shopPanel').classList.remove('hidden');
      document.getElementById('leaderboardPanel').classList.add('hidden');
    });
    document.getElementById('buyDoublePoints').addEventListener('click', buyDoublePoints);
    document.getElementById('savePlayerName').addEventListener('click', savePlayerName);
    document.getElementById('playerName').addEventListener('keydown', event => {
      if (event.key === 'Enter') savePlayerName();
    });
    render();
  }

  function openDialog(view) {
    const dialog = document.getElementById('gameDialog');
    const isLeaderboard = view === 'leaderboard';
    document.getElementById('gameDialogTitle').textContent = isLeaderboard ? 'Leaderboard' : 'Shop';
    document.getElementById('shopPanel').classList.toggle('hidden', isLeaderboard);
    document.getElementById('leaderboardPanel').classList.toggle('hidden', !isLeaderboard);
    document.getElementById('shopMessage').textContent = '';
    render();
    if (!dialog.open) dialog.showModal();
  }

  function render() {
    const player = getPlayer();
    const points = document.getElementById('gamePoints');
    if (!points) return;
    points.textContent = player.points.toLocaleString();
    document.getElementById('gameDialogBalance').textContent = `${player.points.toLocaleString()} points`;
    document.getElementById('playerName').value = player.name;
    const buyButton = document.getElementById('buyDoublePoints');
    const active = player.doublePointsUntil > Date.now();
    buyButton.disabled = player.points < DOUBLE_POINTS_COST;
    buyButton.textContent = active ? `Extend · ${Math.ceil((player.doublePointsUntil - Date.now()) / 60000)} min` : 'Buy · 200 points';
    document.querySelector('.game-shop-button').textContent = active ? `🛒 Shop · 2× ${formatTime(player.doublePointsUntil - Date.now())}` : '🛒 Shop';
    const list = document.getElementById('leaderboardList');
    list.replaceChildren();
    const players = Object.values(state.players).sort((a, b) => (Number(b.totalEarned) || 0) - (Number(a.totalEarned) || 0)).slice(0, 10);
    if (!players.length || players.every(entry => !(Number(entry.totalEarned) > 0))) {
      const empty = document.createElement('li');
      empty.textContent = 'No scores yet — answer questions to join the board!';
      list.appendChild(empty);
    } else {
      players.forEach((entry, index) => {
        const row = document.createElement('li');
        const name = document.createElement('span');
        name.textContent = `${index + 1}. ${entry.name || 'Player'}`;
        const score = document.createElement('strong');
        score.textContent = `${(Number(entry.totalEarned) || 0).toLocaleString()} pts`;
        row.append(name, score);
        list.appendChild(row);
      });
    }
  }

  function formatTime(milliseconds) {
    const totalSeconds = Math.ceil(milliseconds / 1000);
    return `${Math.floor(totalSeconds / 60)}:${String(totalSeconds % 60).padStart(2, '0')}`;
  }

  function savePlayerName() {
    const name = normalizedName(document.getElementById('playerName').value) || 'Player';
    const key = playerKey(name);
    if (!state.players[key]) state.players[key] = { name, points: 0, totalEarned: 0, doublePointsUntil: 0 };
    state.players[key].name = name;
    state.activePlayer = key;
    saveState();
    document.getElementById('shopMessage').textContent = `Playing as ${name}.`;
    render();
  }

  function buyDoublePoints() {
    const player = getPlayer();
    if (player.points < DOUBLE_POINTS_COST) return;
    player.points -= DOUBLE_POINTS_COST;
    player.doublePointsUntil = Math.max(Date.now(), player.doublePointsUntil) + DOUBLE_POINTS_DURATION;
    saveState();
    document.getElementById('shopMessage').textContent = '2× points is active for 15 minutes!';
    render();
  }

  function awardPoints(questionId) {
    if (!questionId || earnedQuestions.has(questionId)) return;
    earnedQuestions.add(questionId);
    const player = getPlayer();
    const amount = player.doublePointsUntil > Date.now() ? 40 : 20;
    player.points += amount;
    player.totalEarned += amount;
    saveState();
    render();
    const feedback = document.getElementById('answerFeedback');
    if (feedback && !feedback.textContent.includes('pts earned')) feedback.textContent += ` +${amount} pts earned!`;
  }

  function resetQuizRewards() {
    earnedQuestions = new Set();
    lastQuestion = '';
  }

  function watchQuizAnswers() {
    const feedback = document.getElementById('answerFeedback');
    const progress = document.getElementById('progressText');
    if (!feedback || !progress) return;
    const observer = new MutationObserver(() => {
      const currentQuestion = progress.textContent.trim();
      const answerText = feedback.textContent.trim();
      if (!currentQuestion) return;
      if (currentQuestion !== lastQuestion) lastQuestion = currentQuestion;
      if (answerText.startsWith('Correct!') && !answerText.startsWith('Not quite')) awardPoints(currentQuestion);
    });
    observer.observe(feedback, { childList: true, characterData: true, subtree: true });
    document.getElementById('startButton')?.addEventListener('click', resetQuizRewards);
    document.getElementById('retryButton')?.addEventListener('click', resetQuizRewards);
  }

  addStyles();
  buildToolbar();
  watchQuizAnswers();
  window.addEventListener('storage', event => {
    if (event.key === STORAGE_KEY) {
      state = readState();
      render();
    }
  });
})();
