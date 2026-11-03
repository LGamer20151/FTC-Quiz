const homeScreen = document.getElementById('homeScreen');
const selectionScreen = document.getElementById('selectionScreen');
const selectionTitle = document.getElementById('selectionTitle');
const selectionMessage = document.getElementById('selectionMessage');
const backHomeButton = document.getElementById('backHomeButton');

// The homepage is the starting screen. Quiz modes will be implemented in later steps.
document.querySelectorAll('[data-role]').forEach((button) => {
  button.addEventListener('click', () => {
    const role = button.dataset.role;
    selectionTitle.textContent = `${role === 'builder' ? 'Builder' : 'Driver'} quiz coming soon`;
    selectionMessage.textContent = role === 'driver'
      ? 'The Driver quiz will be added using the 2026–2027 FTC Competition Manual.'
      : 'The Builder quiz and robot-part images will be added later.';
    homeScreen.classList.remove('active');
    selectionScreen.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

backHomeButton.addEventListener('click', () => {
  selectionScreen.classList.remove('active');
  homeScreen.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
