const mealCards = [...document.querySelectorAll('.meal-card')];
const checkboxes = [...document.querySelectorAll('.meal-check input')];
const progressValue = document.querySelector('#progress-value');
const progressRing = document.querySelector('.progress-ring');
const caloriesValue = document.querySelector('#calories-value');
const caloriesBar = document.querySelector('#calories-bar');

// Пересчитываем прогресс и калории после каждой отметки пользователя.
function updateProgress() {
  const completed = checkboxes.filter((checkbox) => checkbox.checked).length;
  const percent = Math.round((completed / checkboxes.length) * 100);
  const calories = mealCards.reduce((sum, card, index) => sum + (checkboxes[index].checked ? Number(card.querySelector('.nutrients span').textContent.match(/\d+/)[0]) : 0), 0);

  mealCards.forEach((card, index) => card.classList.toggle('meal-card--done', checkboxes[index].checked));
  progressValue.textContent = `${percent}%`;
  progressRing.style.background = `conic-gradient(var(--purple) ${percent}%, #eeeaf1 0)`;
  caloriesValue.textContent = calories.toLocaleString('ru-RU');
  caloriesBar.style.width = `${Math.min(100, Math.round((calories / 1700) * 100))}%`;
  localStorage.setItem('mealPlanChecks', JSON.stringify(checkboxes.map((checkbox) => checkbox.checked)));
}

const savedChecks = JSON.parse(localStorage.getItem('mealPlanChecks') || 'null');
if (Array.isArray(savedChecks) && savedChecks.length === checkboxes.length) {
  checkboxes.forEach((checkbox, index) => { checkbox.checked = Boolean(savedChecks[index]); });
}
checkboxes.forEach((checkbox) => checkbox.addEventListener('change', updateProgress));
document.querySelector('#reset-plan').addEventListener('click', () => {
  checkboxes.forEach((checkbox) => { checkbox.checked = false; });
  updateProgress();
});

document.querySelectorAll('.day').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelector('.day--active').classList.remove('day--active');
    button.classList.add('day--active');
  });
});

// Стаканы можно отмечать по порядку; выбранное количество сохраняется в браузере.
const glasses = [...document.querySelectorAll('.glass')];
const waterValue = document.querySelector('#water-value');
const savedWater = Number(localStorage.getItem('mealPlanWater'));
function setWater(amount) {
  glasses.forEach((glass, index) => glass.classList.toggle('filled', index < amount));
  waterValue.textContent = amount;
  localStorage.setItem('mealPlanWater', amount);
}
if (savedWater >= 0 && savedWater <= glasses.length) setWater(savedWater);
glasses.forEach((glass, index) => glass.addEventListener('click', () => setWater(index + 1)));
updateProgress();
