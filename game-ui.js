(() => {
  const STORAGE_KEY = 'ftcQuizGameV1';
  const DOUBLE_POINTS_COST = 200;
  const DOUBLE_POINTS_DURATION = 15 * 60 * 1000;
  let state = readState();
  let awardedQuestions = new Set();
  let previousQuestion = '';

  function readState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      if (saved && typeof saved === 'object' && saved.players && typeof saved.players === 'object') return saved;
    } catch (error) {
      // Use a clean local profile if stored data is malformed.
    }
    return { activePlayer: 'player', players: { player: { name: 'Player', points: 0, totalEarned: 0, doublePointsUntil: 0 } } };
  }

  function getPlayer() {
    const key = state.activePlayer || 'player';
    if (!state.players[key]) state.players[key] = { name: key === 'player' ? 'Player' : key, points: 0, totalEarned: 0, doublePointsUntil: 0 };
    return state.players[key];
  }

  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (error) { /* Keep current session usable without storage. */ }
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
    if (document.querySelector('.game-toolbar')) return;
    const toolbar = document.createElement('div');
    toolbar.className = 'game-toolbar';
    toolbar.innerHTML = '<div class="game-points" aria-live="polite"><span aria-hidden="true">⭐</span> <span id="gamePoints">0</span> pts</div><div class="game-tools"><button class="secondary-btn game-shop-button" id="openGameShop" type="button">🛒 Shop</button><button class="secondary-btn" id="openLeaderboard" type="button">🏆 Leaderboard</button></div>';
    document.body.insertBefore(toolbar, document.body.firstChild);

    const dialog = document.createElement('dialog');
    dialog.id = 'gameDialog';
    dialog.className = 'game-dialog';
    dialog.innerHTML = '<div class="game-dialog-header"><div><p class="eyebrow">FTC Quiz</p><h2 id="gameDialogTitle">Shop</h2></div><button class="secondary-btn game-close" type="button" aria-label="Close">✕</button></div><p class="game-balance">Your balance: <strong id="gameDialogBalance">0 points</strong></p><section id="shopPanel"><article class="shop-item"><div><h3>2× Points · 15 minutes</h3><p>Earn 40 points instead of 20 for each correct answer while active.</p></div><button class="primary-btn" id="buyDoublePoints" type="button">Buy · 200 points</button></article><p id="shopMessage" class="game-message" aria-live="polite"></p><label class="player-label" for="playerName">Player name <span>(this browser only)</span></label><div class="player-form"><input id="playerName" maxlength="24" autocomplete="nickname" placeholder="Enter a player name"><button class="secondary-btn" id="savePlayerName" type="button">Save name</button></div></section><section id="leaderboardPanel" class="hidden"><h3>Leaderboard</h3><p class="game-note">Scores are stored in this browser, not shared between devices.</p><ol id="leaderboardList" class="leaderboard-list"></ol></section>';
    document.body.appendChild(dialog);

    document.getElementById('openGameShop').addEventListener('click', () => openDialog('shop'));
    document.getElementById('openLeaderboard').addEventListener('click', () => openDialog('leaderboard'));
    dialog.querySelector('.game-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
    document.getElementById('buyDoublePoints').addEventListener('click', buyBoost);
    document.getElementById('savePlayerName').addEventListener('click', savePlayerName);
    document.getElementById('playerName').addEventListener('keydown', event => { if (event.key === 'Enter') savePlayerName(); });
  }

  function openDialog(view) {
    const dialog = document.getElementById('gameDialog');
    const leaderboard = view === 'leaderboard';
    document.getElementById('gameDialogTitle').textContent = leaderboard ? 'Leaderboard' : 'Shop';
    document.getElementById('shopPanel').classList.toggle('hidden', leaderboard);
    document.getElementById('leaderboardPanel').classList.toggle('hidden', !leaderboard);
    document.getElementById('shopMessage').textContent = '';
    render();
    if (!dialog.open) dialog.showModal();
  }

  function render() {
    const player = getPlayer();
    const points = document.getElementById('gamePoints');
    if (!points) return;
    points.textContent = (Number(player.points) || 0).toLocaleString();
    document.getElementById('gameDialogBalance').textContent = `${(Number(player.points) || 0).toLocaleString()} points`;
    document.getElementById('playerName').value = player.name || 'Player';
    const active = Number(player.doublePointsUntil) > Date.now();
    const buyButton = document.getElementById('buyDoublePoints');
    buyButton.disabled = (Number(player.points) || 0) < DOUBLE_POINTS_COST;
    buyButton.textContent = active ? `Extend · ${formatTime(player.doublePointsUntil - Date.now())}` : 'Buy · 200 points';
    document.querySelector('.game-shop-button').textContent = active ? `🛒 Shop · 2× ${formatTime(player.doublePointsUntil - Date.now())}` : '🛒 Shop';

    const list = document.getElementById('leaderboardList');
    list.replaceChildren();
    const players = Object.values(state.players).sort((a, b) => (Number(b.totalEarned) || 0) - (Number(a.totalEarned) || 0)).slice(0, 10);
    if (!players.length || players.every(entry => !(Number(entry.totalEarned) > 0))) {
      const empty = document.createElement('li');
      empty.textContent = 'No points yet — play a quiz to join the board!';
      list.appendChild(empty);
      return;
    }
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

  function formatTime(ms) {
    const seconds = Math.max(0, Math.ceil(ms / 1000));
    return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
  }

  function savePlayerName() {
    const name = document.getElementById('playerName').value.trim().replace(/\s+/g, ' ').slice(0, 24) || 'Player';
    const key = name.toLowerCase();
    if (!state.players[key]) state.players[key] = { name, points: 0, totalEarned: 0, doublePointsUntil: 0 };
    state.players[key].name = name;
    state.activePlayer = key;
    save();
    document.getElementById('shopMessage').textContent = `Playing as ${name}.`;
    render();
  }

  function buyBoost() {
    const player = getPlayer();
    if ((Number(player.points) || 0) < DOUBLE_POINTS_COST) return;
    player.points -= DOUBLE_POINTS_COST;
    player.doublePointsUntil = Math.max(Date.now(), Number(player.doublePointsUntil) || 0) + DOUBLE_POINTS_DURATION;
    save();
    document.getElementById('shopMessage').textContent = '2× points is active for 15 minutes!';
    render();
  }

  function awardPoints(questionId) {
    if (!questionId || awardedQuestions.has(questionId)) return;
    awardedQuestions.add(questionId);
    const player = getPlayer();
    const amount = Number(player.doublePointsUntil) > Date.now() ? 40 : 20;
    player.points = (Number(player.points) || 0) + amount;
    player.totalEarned = (Number(player.totalEarned) || 0) + amount;
    save();
    render();
    const feedback = document.getElementById('answerFeedback');
    if (feedback && !feedback.textContent.includes('pts earned')) feedback.textContent += ` +${amount} pts earned!`;
  }

  function watchAnswers() {
    const feedback = document.getElementById('answerFeedback');
    const progress = document.getElementById('progressText');
    if (!feedback || !progress) return;
    new MutationObserver(() => {
      const questionId = progress.textContent.trim();
      const answer = feedback.textContent.trim();
      if (questionId && answer.startsWith('Correct!')) awardPoints(questionId);
    }).observe(feedback, { childList: true, characterData: true, subtree: true });
    document.getElementById('startButton')?.addEventListener('click', () => { awardedQuestions = new Set(); previousQuestion = ''; });
    document.getElementById('retryButton')?.addEventListener('click', () => { awardedQuestions = new Set(); previousQuestion = ''; });
  }

  addStyles();
  buildToolbar();
  watchAnswers();
  render();
  window.addEventListener('storage', event => {
    if (event.key === STORAGE_KEY) { state = readState(); render(); }
  });
})();
