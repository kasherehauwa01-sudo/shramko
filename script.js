const meals = [
  ['Яичный ролл с зеленью и сыром','Куриное бедро с булгуром','Минтай на овощной подушке'],
  ['Овсяноблин с паштетом из тунца','Рубленые котлеты из индейки с гречкой','Тёплый салат с куриной печенью и яблоком'],
  ['Шакшука','Буррито в лаваше','Горбуша под сырно-сметанной шапкой'],
  ['Овсянка с томатами','Суп-пюре из чечевицы и салат табуле','Кальмары в сметанно-чесночном соусе'],
  ['Ленивая овсянка в банке','Плов из булгура с индейкой','Куриные оладьи с брокколи'],
  ['Скрамбл на тосте с красной рыбой','Картофель с минтаем в томате','Салат с нутом и пекинской капустой'],
  ['Драники с яйцом пашот','Рыбные котлеты с бурым рисом','Куриные голени с фасолью в томате'],
  ['ПП-сэндвич с курицей','Ёжики из индейки с тушёной капустой','Салат с тунцом и стручковой фасолью'],
  ['Овсяная каша с арахисовой пастой','Паста-салат «Птитим» с индейкой','Салат с индейкой и перепелиными яйцами'],
  ['Белковый завтрак с авокадо','Суп с фрикадельками из индейки','Фаршированный болгарский перец'],
  ['Омлет с грибами','Куриная печень в сливках с ячневой крупой','Печень с овощами'],
  ['Тост с печёночным паштетом','Паста Болоньезе','Тёплый салат из баклажанов с курицей'],
  ['Яичный конвертик','Греча по-купечески','Гречка по-купечески с овощами'],
  ['Пшённая каша с тыквой','Скумбрия с кускусом','Скумбрия с овощным салатом'],
  ['Белковый завтрак','Котлеты из говядины с перловкой','Котлеты с битыми огурцами'],
  ['Овсяноблин с творожным сыром','Голень индейки с рисом','Минтай в средиземноморском соусе'],
  ['Тост с авокадо','Курица карри с булгуром','Печёночные оладьи с гречкой'],
  ['Печёночные оладьи с гречкой','Стейк из капусты под фаршем','Стейк из капусты'],
  ['Авокадо, яйцо и сыр на тосте','Фунчоза с фаршем','Фунчоза с овощным салатом'],
  ['Овсяная каша на воде с ягодами','Куриные сердечки с булгуром','Сердечки с овощным салатом']
];
const rules = [
  ['💧 Тёплая вода с утра','Начинайте день со стакана тёплой воды. Питьевой режим — основа основ.'],
  ['🍳 Завтрак — белок и жиры','Такой завтрак даёт долгое насыщение и правильно запускает организм.'],
  ['🥩 Ужин — белок и клетчатка','Никаких углеводов вечером. Только белок и овощи.'],
  ['🥦 Клетчатка в каждый приём','Добавляйте овощи к завтраку, обеду и ужину.'],
  ['🍬 Сахар и фрукты — под контролем','Ограничьте сахар и количество фруктов в рационе.'],
  ['⏰ Углеводы и молочка — до 16:00','Молочные продукты, фрукты и углеводы оставляйте на первую половину дня.'],
  ['🌙 Отбой до 23:00','Сон — часть протокола восстановления.'],
  ['🏃 Двигайтесь каждый день','Зарядка, тренировка или больше шагов — обязательная часть протокола.']
];
const vitamins = [
  ['Витаминный комплекс «Ритмы здоровья»','🌅 Утренняя + вечерняя капсула','Две формулы поддерживают энергию днём и восполняют минералы вечером.','https://ru.siberianhealth.com/ru/shop/catalog/product/500048/?referral=2687535825'],
  ['Витамин D3 MAX','☀️ 6 капель во время завтрака','Витамин D₃ на основе МСТ-масла для удобного усвоения.','https://ru.siberianhealth.com/ru/shop/catalog/product/501644/?referral=2687535825'],
  ['Омега-3 Ультра','🐟 2 капсулы во время завтрака','Полиненасыщенные жирные кислоты поддерживают клеточные мембраны.','https://ru.siberianhealth.com/ru/shop/catalog/product/500484/?referral=2687535825'],
  ['ЭПАМ 1000','🌿 10 капель 2 раза в день во время еды','Растительный комплекс с пихтой, родиолой и элеутерококком.','https://ru.siberianhealth.com/ru/shop/catalog/product/400264/?referral=2687535825'],
  ['КЛАДОВИТ Магний хелат глицинат','🌙 3 капсулы перед сном','Хелатная форма магния для поддержки нервной системы и сна.','https://www.wildberries.ru/catalog/379816496/detail.aspx?size=552622697']
];
const content = document.querySelector('#content');
const storageKey = 'shamko_v4';
let checked = new Set(JSON.parse(localStorage.getItem(storageKey) || '[]'));

function header(icon, title, subtitle, color = '') {
  return `<div class="section-head"><span class="badge" ${color ? `style="background:${color}"` : ''}>${icon}</span><div><h2>${title}</h2><p>${subtitle}</p></div></div>`;
}

function renderRules() {
  content.innerHTML = `${header('📋','Основные правила','8 принципов НЕмарафона','#c9714a')}<div class="banner"><strong>🌟 Прежде чем начать</strong>Соблюдайте эти правила каждый день наравне с меню — тогда система сработает по-настоящему.</div>${rules.map(rule => `<article class="info-card rule"><h3>${rule[0]}</h3><p>${rule[1]}</p></article>`).join('')}`;
}

function renderWeek(week) {
  const start = week === 1 ? 0 : week === 2 ? 7 : 14;
  const end = week === 3 ? 20 : start + 7;
  content.innerHTML = header(week,`${['Первая','Вторая','Третья'][week-1]} неделя`,`Дни ${start+1}–${end}`) + meals.slice(start,end).map((dayMeals,index) => {
    const day = start + index + 1;
    const items = dayMeals.map((name,type) => {
      const key = `${day}-${type}`;
      const done = checked.has(key);
      return `<div class="meal${done?' checked':''}" data-key="${key}"><span class="type" style="color:${['#e8a735','#7a9e7e','#c9714a'][type]}">${['ЗАВТРАК','ОБЕД','УЖИН'][type]}</span><h3>${name}</h3><button type="button">${done?'✓ Съедено':'○ Отметить съеденным'}</button></div>`;
    }).join('');
    const complete = dayMeals.every((_,type) => checked.has(`${day}-${type}`));
    return `<article class="day${day===start+1?' open':''}${complete?' done':''}" data-day="${day}"><button class="day-head" type="button"><span><small>${String(day).padStart(2,'0')}</small>День ${day}${day===20?' 🎉':''}</span><i>▾</i></button><div class="day-body">${items}<div class="done-note">✓ День завершён — отлично!</div></div></article>`;
  }).join('');
}

function renderVitamins() {
  content.innerHTML = `${header('💊','Витамины и добавки','Рекомендации Юлии Шамко','#6b8cae')}<div class="banner" style="border-color:#6b8cae;background:#eef3f8"><strong>Зачем это нужно?</strong>Перед приёмом добавок проконсультируйтесь с врачом и учитывайте результаты анализов.</div>${vitamins.map((item,index)=>`<article class="info-card vitamin"><h3><small>${index+1}.</small> ${item[0]}</h3><span class="dose">${item[1]}</span><p>${item[2]}</p><a href="${item[3]}" target="_blank" rel="noopener noreferrer">＋ Купить</a></article>`).join('')}`;
}

function updateProgress() {
  const count = checked.size;
  document.querySelector('#progress-label').textContent = `${count} из 60 приёмов пищи`;
  document.querySelector('#progress-fill').style.width = `${count / 60 * 100}%`;
  localStorage.setItem(storageKey, JSON.stringify([...checked]));
}

function show(view) {
  document.querySelectorAll('.tab').forEach(tab => tab.classList.toggle('active', tab.dataset.view === view));
  if (view === 'rules') renderRules(); else if (view === 'vitamins') renderVitamins(); else renderWeek(Number(view.at(-1)));
}

document.querySelector('.tabs').addEventListener('click', event => { const tab=event.target.closest('.tab'); if(tab) show(tab.dataset.view); });
content.addEventListener('click', event => {
  const head=event.target.closest('.day-head'); if(head){head.closest('.day').classList.toggle('open');return;}
  const button=event.target.closest('.meal button'); if(!button)return;
  const meal=button.closest('.meal'); checked.has(meal.dataset.key)?checked.delete(meal.dataset.key):checked.add(meal.dataset.key);
  const view=document.querySelector('.tab.active').dataset.view; updateProgress(); show(view);
  if(checked.size===60) document.querySelector('#celebration').classList.add('show');
});
document.querySelector('#close-celebration').addEventListener('click',()=>document.querySelector('#celebration').classList.remove('show'));
show('rules'); updateProgress();
