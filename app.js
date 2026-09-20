const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

const BUILT_IN_PHOTOS = [
  { url: './assets/editorial/portrait-sea.webp', name: 'Портрет у моря' },
  { url: './assets/editorial/rocky-coast.webp', name: 'Скалистый берег' },
  { url: './assets/editorial/botanical-shadow.webp', name: 'Ботаническая тень' },
  { url: './assets/editorial/sea-sunset.webp', name: 'Закат у моря' }
];

const FONT_PAIRS = [
  { head: 'Finlandica', body: 'Piazzolla', weight: 700, name: 'Finlandica Headline + Piazzolla', character: 'Современная пресса' },
  { head: 'Prata', body: 'Onest', weight: 400, name: 'Prata + Onest', character: 'Спокойный premium' },
  { head: 'Cormorant Garamond', body: 'Manrope', weight: 700, name: 'Cormorant Garamond + Manrope', character: 'Fashion editorial' },
  { head: 'Literata', body: 'Golos Text', weight: 650, name: 'Literata + Golos Text', character: 'Авторский журнал' },
  { head: 'Piazzolla', body: 'Commissioner', weight: 650, name: 'Piazzolla + Commissioner', character: 'Интеллектуальный и живой' },
  { head: 'Bona Nova', body: 'Onest', weight: 700, name: 'Bona Nova + Onest', character: 'Современная классика' },
  { head: 'Spectral', body: 'Golos Text', weight: 700, name: 'Spectral + Golos Text', character: 'Эссе и экспертность' },
  { head: 'Yeseva One', body: 'Manrope', weight: 400, name: 'Yeseva One + Manrope', character: 'Сильная женственная обложка' },
  { head: 'Orelega One', body: 'Onest', weight: 400, name: 'Orelega One + Onest', character: 'Мягкий акцент' },
  { head: 'Viaoda Libre', body: 'Commissioner', weight: 400, name: 'Viaoda Libre + Commissioner', character: 'Тонкий fashion' },
  { head: 'Shafarik', body: 'Onest', weight: 400, name: 'Shafarik + Onest', character: 'Культурный и необычный' },
  { head: 'Unbounded', body: 'Literata', weight: 650, name: 'Unbounded + Literata', character: 'Энергичный digital editorial' },
  { head: 'Science Gothic', body: 'Literata', weight: 700, name: 'Science Gothic + Literata', character: 'Технологичный журнал' },
  { head: 'Alumni Sans Pinstripe', body: 'Literata', weight: 400, name: 'Alumni Sans Pinstripe + Literata', character: 'Хрупкая высокая типографика' },
  { head: 'Geologica', body: 'Bona Nova', weight: 700, name: 'Geologica + Bona Nova', character: 'Экспертность без канцелярита' },
  { head: 'Sofia Sans Condensed', body: 'Literata', weight: 700, name: 'Sofia Sans Condensed + Literata', character: 'Плотная журнальная обложка' },
  { head: 'Wix Madefor Display', body: 'Cormorant Garamond', weight: 700, name: 'Wix Madefor Display + Cormorant', character: 'Чистый современный fashion' },
  { head: 'Commissioner', body: 'Prata', weight: 700, name: 'Commissioner + Prata', character: 'Уверенный персональный бренд' },
  { head: 'Tektur', body: 'Manrope', weight: 650, name: 'Tektur + Manrope', character: 'Tech и AI' },
  { head: 'Handjet', body: 'Onest', weight: 650, name: 'Handjet + Onest', character: 'Эксперимент и цифра' },
  { head: 'Shantell Sans', body: 'Onest', weight: 650, name: 'Shantell Sans + Onest', character: 'Живой личный голос' },
  { head: 'Caveat', body: 'Commissioner', weight: 650, name: 'Caveat + Commissioner', character: 'Заметка от руки' },
  { head: 'Bad Script', body: 'Manrope', weight: 400, name: 'Bad Script + Manrope', character: 'Личный дневник' },
  { head: 'Climate Crisis', body: 'Onest', weight: 400, name: 'Climate Crisis + Onest', character: 'Редкий акцент' },
  { head: 'Kablammo', body: 'Onest', weight: 400, name: 'Kablammo + Onest', character: 'Игровая энергия' },
  { head: 'Oi', body: 'Onest', weight: 400, name: 'Oi + Onest', character: 'Ударный заголовок' },
  { head: 'Rubik Marker Hatch', body: 'Onest', weight: 400, name: 'Rubik Marker Hatch + Onest', character: 'Маркер и процесс' },
  { head: 'Monomakh', body: 'Commissioner', weight: 400, name: 'Monomakh + Commissioner', character: 'Культурный акцент' }
];

const PALETTES = [
  { name: 'Бумага и вино', colors: ['#f3ecdf', '#8c2f39', '#6a6a5d', '#252a2f'] },
  { name: 'Море и камень', colors: ['#e9ece8', '#547389', '#7d7869', '#17232a'] },
  { name: 'Шафран', colors: ['#f4e6cb', '#c66b33', '#65705f', '#26201d'] },
  { name: 'Чернила', colors: ['#f0f0eb', '#48505c', '#7d242c', '#101313'] }
];

const DEFAULT_SEGMENTS = [
  'Личная свобода начинается с ясности.',
  'Система должна помогать, а не наказывать.',
  'Маленькие шаги меняют всё.',
  'Я выбираю себя каждый день.',
  'Больше жизни в моменте.',
  'И это только начало.',
  'В гармонии с собой.'
];

const SLIDE_RECIPES = ['photo', 'text', 'coast', 'light', 'sea', 'sunset', 'dark'];
const PHOTO_INDEXES = [0, null, 1, 2, 1, 3, 2];
const DRAFT_KEY = 'carousel-studio-1.1-draft';
const loadedFonts = new Set();

const state = {
  segments: [...DEFAULT_SEGMENTS],
  sourceText: DEFAULT_SEGMENTS.join(' '),
  photos: [...BUILT_IN_PHOTOS],
  activeSlide: 0,
  pairIndex: 0,
  liked: [],
  choiceHistory: [],
  selectedPair: 0,
  fontSize: 100,
  brightness: 92,
  shade: 42,
  showGuides: false,
  paletteIndex: 0,
  pointerStart: null
};

function restoreDraft() {
  try {
    const saved = JSON.parse(localStorage.getItem(DRAFT_KEY) || 'null');
    if (!saved) return;
    if (Array.isArray(saved.segments) && saved.segments.length) state.segments = saved.segments.slice(0, 10);
    if (typeof saved.sourceText === 'string') state.sourceText = saved.sourceText;
    if (Array.isArray(saved.liked)) state.liked = saved.liked.filter(index => Number.isInteger(index) && FONT_PAIRS[index]);
    ['pairIndex', 'activeSlide', 'fontSize', 'brightness', 'shade', 'paletteIndex'].forEach(key => {
      if (Number.isFinite(saved[key])) state[key] = saved[key];
    });
  } catch (error) {
    console.warn('Черновик не восстановлен:', error);
  }
}

function saveDraft() {
  const payload = {
    segments: state.segments,
    sourceText: state.sourceText,
    liked: state.liked,
    pairIndex: state.pairIndex,
    activeSlide: state.activeSlide,
    fontSize: state.fontSize,
    brightness: state.brightness,
    shade: state.shade,
    paletteIndex: state.paletteIndex
  };
  localStorage.setItem(DRAFT_KEY, JSON.stringify(payload));
}

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('is-visible'), 2100);
}

function showScreen(name) {
  const map = { tinder: '#screenTinder', split: '#screenSplit', compare: '#screenCompare', editor: '#screenEditor' };
  Object.values(map).forEach(selector => { $(selector).hidden = true; });
  $(map[name]).hidden = false;
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function requestFont(family, weight = 400) {
  const key = `${family}-${weight}`;
  if (loadedFonts.has(key)) return Promise.resolve();
  loadedFonts.add(key);
  return new Promise(resolve => {
    const link = document.createElement('link');
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      resolve();
    };
    const timeout = setTimeout(finish, 2200);
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family).replace(/%20/g, '+')}:ital,wght@0,${weight};1,${weight}&display=swap`;
    link.onload = finish;
    link.onerror = finish;
    document.head.append(link);
  });
}

async function ensurePair(pair) {
  await Promise.all([requestFont(pair.head, pair.weight), requestFont(pair.body, 500)]);
}

function currentPair() { return FONT_PAIRS[state.pairIndex % FONT_PAIRS.length]; }
function currentPalette() { return PALETTES[state.paletteIndex % PALETTES.length]; }
function currentSegment() { return state.segments[state.activeSlide] || ''; }
function recipeAt(index) { return SLIDE_RECIPES[index % SLIDE_RECIPES.length]; }
function photoAt(index) {
  const assigned = PHOTO_INDEXES[index % PHOTO_INDEXES.length];
  if (assigned === null) return null;
  return state.photos[assigned % state.photos.length] || BUILT_IN_PHOTOS[0];
}

function splitHeadline(text) {
  const clean = String(text || '').trim();
  const comma = clean.indexOf(',');
  if (comma > 12 && comma < clean.length - 4) return [clean.slice(0, comma + 1), clean.slice(comma + 1).trim()];
  const words = clean.split(/\s+/);
  if (words.length < 5) return [clean, ''];
  const cut = Math.max(2, Math.ceil(words.length * .58));
  return [words.slice(0, cut).join(' '), words.slice(cut).join(' ')];
}

function setCanvasTypography(canvas, pair) {
  canvas.style.setProperty('--font-head', `"${pair.head}"`);
  canvas.style.setProperty('--font-body', `"${pair.body}"`);
  canvas.style.setProperty('--font-weight', pair.weight);
  canvas.style.setProperty('--font-scale', state.fontSize / 100);
}

function applyCanvasVisual(photoElement, shadeElement, index) {
  const recipe = recipeAt(index);
  const palette = currentPalette();
  const photo = photoAt(index);
  const isText = recipe === 'text';
  photoElement.style.backgroundImage = isText || !photo ? 'none' : `url("${photo.url}")`;
  photoElement.style.backgroundColor = isText ? palette.colors[1] : palette.colors[3];
  photoElement.style.filter = `brightness(${state.brightness / 100})`;
  shadeElement.style.background = isText ? 'rgba(0,0,0,.08)' : `linear-gradient(180deg, rgba(4,6,6,.14) 0%, rgba(4,6,6,.04) 34%, rgba(4,6,6,${Math.max(.28, state.shade / 100)}) 100%)`;
}

function renderProgress() {
  $('#pairProgress').textContent = `${state.pairIndex + 1} из ${FONT_PAIRS.length}`;
  const chunkStart = Math.floor(state.pairIndex / 4) * 4;
  $('#progressDots').innerHTML = Array.from({ length: 8 }, (_, i) => {
    const absolute = chunkStart + i;
    const className = absolute === state.pairIndex ? 'is-current' : absolute < state.pairIndex ? 'is-done' : '';
    return `<i class="${className}"></i>`;
  }).join('');
}

function thumbMarkup(index, mini = false) {
  const recipe = recipeAt(index);
  const photo = photoAt(index);
  const palette = currentPalette();
  const background = recipe === 'text' ? palette.colors[1] : recipe === 'light' ? palette.colors[0] : photo ? `url(&quot;${photo.url}&quot;)` : palette.colors[3];
  if (mini) return `<i style="background-image:${background.startsWith('url') ? background : 'none'};background-color:${background.startsWith('url') ? palette.colors[3] : background}"></i>`;
  const classes = ['slide-thumb', state.activeSlide === index ? 'is-active' : '', recipe === 'text' ? 'is-text' : '', recipe === 'light' ? 'is-light' : ''].filter(Boolean).join(' ');
  const style = background.startsWith('url') ? `background-image:${background}` : `background-color:${background}`;
  return `<button class="${classes}" data-slide="${index}" type="button" style="${style}" aria-label="Карточка ${index + 1}"><span>${index + 1}</span><b>${state.segments[index]}</b></button>`;
}

function renderStoryboards() {
  $('#cardCount').textContent = `${state.segments.length} ${cardWord(state.segments.length)}`;
  $('#miniStoryboard').innerHTML = state.segments.map((_, index) => thumbMarkup(index, true)).join('');
  $('#slideFilmstrip').innerHTML = state.segments.map((_, index) => thumbMarkup(index)).join('');
  $$('#slideFilmstrip [data-slide]').forEach(button => button.addEventListener('click', () => {
    state.activeSlide = Number(button.dataset.slide);
    renderTinder();
  }));
}

function renderPalettes() {
  $('#paletteSwatches').innerHTML = PALETTES.map((palette, index) => `<button class="palette-swatch ${index === state.paletteIndex ? 'is-active' : ''}" data-palette="${index}" type="button" aria-label="Палитра ${palette.name}" style="background:${palette.colors[1]}"></button>`).join('');
  $$('#paletteSwatches [data-palette]').forEach(button => button.addEventListener('click', () => {
    state.paletteIndex = Number(button.dataset.palette);
    renderTinder();
    saveDraft();
  }));
}

async function renderTinder() {
  const pair = currentPair();
  const requestedIndex = state.pairIndex;
  ensurePair(pair).then(() => {
    if (state.pairIndex === requestedIndex) setCanvasTypography($('#tinderCanvas'), pair);
  });
  renderProgress();
  renderStoryboards();
  renderPalettes();
  const canvas = $('#tinderCanvas');
  setCanvasTypography(canvas, pair);
  applyCanvasVisual($('#canvasPhoto'), $('#canvasShade'), state.activeSlide);
  const [main, accent] = splitHeadline(currentSegment());
  $('#headlineMain').textContent = main;
  $('#headlineAccent').textContent = accent;
  $('#headlineAccent').hidden = !accent;
  $('#canvasIndex').textContent = `${String(state.activeSlide + 1).padStart(2, '0')} / ${String(state.segments.length).padStart(2, '0')}`;
  $('#pairName').textContent = pair.name;
  $('#pairCharacter').textContent = pair.character;
  $('#fontSizeRange').value = state.fontSize;
  $('#brightnessRange').value = state.brightness;
  $('#guideToggle').checked = state.showGuides;
  $('#safeGuides').hidden = !state.showGuides;
  $('#likedCount').textContent = state.liked.length;
  $('#compareSelected').disabled = state.liked.length === 0;
  $('#undoChoice').disabled = state.choiceHistory.length === 0;
  canvas.style.transform = '';
  canvas.style.opacity = '';
  $('.stamp-no').style.opacity = 0;
  $('.stamp-yes').style.opacity = 0;
}

function cardWord(number) {
  if (number % 10 === 1 && number % 100 !== 11) return 'карточка';
  if ([2, 3, 4].includes(number % 10) && ![12, 13, 14].includes(number % 100)) return 'карточки';
  return 'карточек';
}

function chooseFont(liked) {
  const index = state.pairIndex;
  state.choiceHistory.push({ index, liked });
  if (liked && !state.liked.includes(index)) state.liked.push(index);
  state.pairIndex = (state.pairIndex + 1) % FONT_PAIRS.length;
  renderTinder();
  saveDraft();
}

function undoChoice() {
  const last = state.choiceHistory.pop();
  if (!last) return;
  state.pairIndex = last.index;
  if (last.liked) state.liked = state.liked.filter(index => index !== last.index);
  renderTinder();
  saveDraft();
}

function updateSwipe(delta) {
  const card = $('#tinderCanvas');
  const limited = Math.max(-150, Math.min(150, delta));
  card.style.transform = `translateX(${limited}px) rotate(${limited / 28}deg)`;
  $('.stamp-no').style.opacity = Math.max(0, -limited / 90);
  $('.stamp-yes').style.opacity = Math.max(0, limited / 90);
}

function segmentText(text) {
  const clean = String(text || '').replace(/\r/g, '').trim();
  if (!clean) return [''];
  const forced = clean.split(/\n\s*---\s*\n/).map(part => part.trim()).filter(Boolean);
  if (forced.length > 1) return forced.slice(0, 10);
  const segmenter = typeof Intl.Segmenter === 'function' ? new Intl.Segmenter('ru', { granularity: 'sentence' }) : null;
  const sentences = segmenter ? [...segmenter.segment(clean)].map(item => item.segment.trim()).filter(Boolean) : clean.split(/(?<=[.!?…])\s+/).filter(Boolean);
  const desired = Math.min(10, Math.max(1, Math.ceil(clean.length / 78)));
  const target = Math.ceil(clean.length / desired);
  const chunks = [];
  let current = '';
  sentences.forEach(sentence => {
    const candidate = current ? `${current} ${sentence}` : sentence;
    if (current && candidate.length > target && chunks.length < 9) {
      chunks.push(current);
      current = sentence;
    } else current = candidate;
  });
  if (current) chunks.push(current);
  return chunks.slice(0, 10);
}

function renderSplit() {
  $('#sourceText').value = state.sourceText;
  $('#segmentCount').textContent = `${state.segments.length} ${cardWord(state.segments.length)}`;
  const dense = state.segments.some(text => text.length > 120);
  $('#densityStatus').textContent = dense ? 'Есть плотные карточки' : 'Плотность нормальная';
  $('#segmentList').innerHTML = state.segments.map((text, index) => `
    <article class="segment-card" data-segment="${index}">
      <span class="segment-number">${index + 1}</span>
      <textarea aria-label="Текст карточки ${index + 1}" maxlength="420">${escapeHtml(text)}</textarea>
      <div class="segment-controls">
        <button type="button" data-action="split"><span class="material-symbols-rounded" aria-hidden="true">call_split</span>Разделить</button>
        ${index ? '<button type="button" data-action="merge"><span class="material-symbols-rounded" aria-hidden="true">merge</span>Объединить выше</button>' : ''}
        ${index ? '<button type="button" data-action="up"><span class="material-symbols-rounded" aria-hidden="true">arrow_upward</span></button>' : ''}
        ${index < state.segments.length - 1 ? '<button type="button" data-action="down"><span class="material-symbols-rounded" aria-hidden="true">arrow_downward</span></button>' : ''}
        ${state.segments.length > 1 ? '<button type="button" data-action="remove"><span class="material-symbols-rounded" aria-hidden="true">delete</span></button>' : ''}
      </div>
    </article>`).join('');
  $$('.segment-card').forEach(card => {
    const index = Number(card.dataset.segment);
    card.querySelector('textarea').addEventListener('input', event => {
      state.segments[index] = event.target.value;
      state.sourceText = state.segments.join(' ');
      saveDraft();
    });
    card.querySelectorAll('[data-action]').forEach(button => button.addEventListener('click', () => mutateSegment(index, button.dataset.action)));
  });
  $('#photoStrip').innerHTML = state.photos.map(photo => `<img src="${photo.url}" alt="${escapeHtml(photo.name)}">`).join('');
}

function mutateSegment(index, action) {
  if (action === 'split') {
    if (state.segments.length >= 10) return showToast('В карусели может быть максимум 10 карточек');
    const text = state.segments[index];
    let point = text.lastIndexOf(' ', Math.ceil(text.length / 2));
    if (point < 8) point = text.indexOf(' ', Math.ceil(text.length / 2));
    if (point < 1) return showToast('Добавьте больше текста, чтобы разделить карточку');
    state.segments.splice(index, 1, text.slice(0, point).trim(), text.slice(point).trim());
  }
  if (action === 'merge' && index > 0) state.segments.splice(index - 1, 2, `${state.segments[index - 1]} ${state.segments[index]}`.trim());
  if (action === 'up' && index > 0) [state.segments[index - 1], state.segments[index]] = [state.segments[index], state.segments[index - 1]];
  if (action === 'down' && index < state.segments.length - 1) [state.segments[index + 1], state.segments[index]] = [state.segments[index], state.segments[index + 1]];
  if (action === 'remove' && state.segments.length > 1) state.segments.splice(index, 1);
  state.activeSlide = Math.min(state.activeSlide, state.segments.length - 1);
  state.sourceText = state.segments.join(' ');
  renderSplit();
  saveDraft();
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
}

async function renderCompare() {
  const indexes = state.liked.length ? state.liked : [state.pairIndex];
  $('#finalistGrid').innerHTML = indexes.map(index => {
    const pair = FONT_PAIRS[index];
    return `<button class="finalist-card" data-pair="${index}" type="button"><span class="finalist-preview" style="background-image:url('${BUILT_IN_PHOTOS[0].url}')"><h2 style="font-family:'${pair.head}',serif;font-weight:${pair.weight}">Система должна помогать, а не наказывать.</h2></span><span class="finalist-name">${pair.name}</span></button>`;
  }).join('');
  await Promise.all(indexes.map(index => ensurePair(FONT_PAIRS[index])));
  $$('.finalist-card').forEach(button => button.addEventListener('click', () => {
    state.selectedPair = Number(button.dataset.pair);
    state.activeSlide = 0;
    renderEditor();
    showScreen('editor');
  }));
}

async function renderEditor() {
  const pair = FONT_PAIRS[state.selectedPair] || currentPair();
  await ensurePair(pair);
  setCanvasTypography($('#editorCanvas'), pair);
  applyCanvasVisual($('#editorPhoto'), $('#editorShade'), state.activeSlide);
  const [main, accent] = splitHeadline(currentSegment());
  $('#editorHeadline').innerHTML = `<span>${escapeHtml(main)}</span>${accent ? `<em>${escapeHtml(accent)}</em>` : ''}`;
  $('#editorIndex').textContent = `${String(state.activeSlide + 1).padStart(2, '0')} / ${String(state.segments.length).padStart(2, '0')}`;
  $('#editorBody').textContent = pair.name;
  $('#editorText').value = currentSegment();
  $('#editorFontSize').value = state.fontSize;
  $('#editorBrightness').value = state.brightness;
  $('#editorShadeRange').value = state.shade;
  $('#editorFilmstrip').innerHTML = state.segments.map((_, index) => thumbMarkup(index)).join('');
  $$('#editorFilmstrip [data-slide]').forEach(button => button.addEventListener('click', () => {
    state.activeSlide = Number(button.dataset.slide);
    renderEditor();
  }));
}

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = url;
  });
}

function drawImageCover(ctx, image, width, height) {
  const scale = Math.max(width / image.width, height / image.height);
  const drawWidth = image.width * scale;
  const drawHeight = image.height * scale;
  ctx.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
}

function wrapLines(ctx, text, maxWidth) {
  const words = String(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let line = '';
  words.forEach(word => {
    const test = line ? `${line} ${word}` : word;
    if (line && ctx.measureText(test).width > maxWidth) { lines.push(line); line = word; } else line = test;
  });
  if (line) lines.push(line);
  return lines;
}

async function renderSlideCanvas(index) {
  const width = 1080, height = 1350;
  const canvas = document.createElement('canvas');
  canvas.width = width; canvas.height = height;
  const ctx = canvas.getContext('2d');
  const palette = currentPalette();
  const recipe = recipeAt(index);
  const photo = photoAt(index);
  const pair = FONT_PAIRS[state.selectedPair] || currentPair();
  await ensurePair(pair);
  await document.fonts.ready;

  ctx.fillStyle = recipe === 'text' ? palette.colors[1] : palette.colors[3];
  ctx.fillRect(0, 0, width, height);
  if (recipe !== 'text' && photo) {
    const image = await loadImage(photo.url);
    ctx.save(); ctx.filter = `brightness(${state.brightness / 100})`; drawImageCover(ctx, image, width, height); ctx.restore();
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(4,6,6,.14)'); gradient.addColorStop(.35, 'rgba(4,6,6,.04)'); gradient.addColorStop(1, `rgba(4,6,6,${Math.max(.28, state.shade / 100)})`);
    ctx.fillStyle = gradient; ctx.fillRect(0, 0, width, height);
  }

  const light = recipe === 'light';
  ctx.fillStyle = light ? palette.colors[3] : '#ffffff';
  ctx.textBaseline = 'top';
  ctx.font = '500 25px "Onest"';
  ctx.letterSpacing = '5px';
  ctx.fillText('ТЕХНОЛОГИИ ДЛЯ ЛЮДЕЙ', 76, 74);
  ctx.textAlign = 'right'; ctx.fillText(`${String(index + 1).padStart(2, '0')} / ${String(state.segments.length).padStart(2, '0')}`, width - 76, 74); ctx.textAlign = 'left';

  const [main, accent] = splitHeadline(state.segments[index]);
  const baseSize = Math.max(70, Math.min(126, (118 - Math.max(0, main.length - 32) * 1.15) * state.fontSize / 100));
  let y = 720;
  ctx.font = `${pair.weight} ${baseSize}px "${pair.head}"`;
  ctx.letterSpacing = '-3px';
  wrapLines(ctx, main, width - 152).slice(0, 4).forEach(line => { ctx.fillText(line, 76, y); y += baseSize * .9; });
  if (accent) {
    const accentSize = Math.max(62, baseSize * .86);
    ctx.font = `italic 500 ${accentSize}px "${pair.body}"`;
    wrapLines(ctx, accent, width - 152).slice(0, 3).forEach(line => { ctx.fillText(line, 76, y + 5); y += accentSize * .94; });
  }
  ctx.fillRect(76, Math.min(y + 28, 1225), 74, 2);
  ctx.font = '500 22px "Onest"'; ctx.letterSpacing = '5px';
  ctx.fillText(pair.name.toUpperCase(), 76, Math.min(y + 58, 1260));
  return canvas;
}

function canvasBlob(canvas) { return new Promise(resolve => canvas.toBlob(resolve, 'image/png')); }
function downloadBlob(blob, filename) {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob); link.download = filename; link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 1500);
}

async function downloadCurrent() {
  try {
    showToast('Собираю PNG…');
    const canvas = await renderSlideCanvas(state.activeSlide);
    downloadBlob(await canvasBlob(canvas), `carousel-${state.activeSlide + 1}.png`);
  } catch (error) { console.error(error); showToast('Не удалось собрать карточку'); }
}

async function downloadAll() {
  try {
    showToast('Собираю всю карусель…');
    if (!window.JSZip) throw new Error('JSZip unavailable');
    const zip = new JSZip();
    for (let index = 0; index < state.segments.length; index += 1) {
      const canvas = await renderSlideCanvas(index);
      zip.file(`carousel-${String(index + 1).padStart(2, '0')}.png`, await canvasBlob(canvas));
    }
    downloadBlob(await zip.generateAsync({ type: 'blob' }), 'carousel-studio.zip');
    showToast('Карусель готова');
  } catch (error) { console.error(error); showToast('Не удалось собрать ZIP'); }
}

$('#openSplit').addEventListener('click', () => { renderSplit(); showScreen('split'); });
$('#editSplit').addEventListener('click', () => { renderSplit(); showScreen('split'); });
$('#backToTinder').addEventListener('click', () => { renderTinder(); showScreen('tinder'); });
$('#confirmSplit').addEventListener('click', () => { state.sourceText = state.segments.join(' '); saveDraft(); renderTinder(); showScreen('tinder'); });
$('#autoSplit').addEventListener('click', () => { state.sourceText = $('#sourceText').value; state.segments = segmentText(state.sourceText); state.activeSlide = 0; renderSplit(); saveDraft(); });
$('#sourceText').addEventListener('input', event => { state.sourceText = event.target.value; });
$('#addTextCard').addEventListener('click', () => { if (state.segments.length >= 10) return showToast('Максимум 10 карточек'); state.segments.push('Новая мысль'); renderSplit(); saveDraft(); });
$('#uploadPhotos').addEventListener('click', () => $('#photoInput').click());
$('#photoInput').addEventListener('change', event => {
  const files = [...event.target.files].slice(0, Math.max(0, 10 - state.photos.length));
  files.forEach(file => state.photos.push({ url: URL.createObjectURL(file), name: file.name, local: true }));
  renderSplit();
});

$('#rejectFont').addEventListener('click', () => chooseFont(false));
$('#likeFont').addEventListener('click', () => chooseFont(true));
$('#undoChoice').addEventListener('click', undoChoice);
$('#compareSelected').addEventListener('click', async () => { await renderCompare(); showScreen('compare'); });
$('#backFromCompare').addEventListener('click', () => { renderTinder(); showScreen('tinder'); });
$('#backToCompare').addEventListener('click', async () => { await renderCompare(); showScreen('compare'); });

$('#fontSizeRange').addEventListener('input', event => { state.fontSize = Number(event.target.value); renderTinder(); saveDraft(); });
$('#brightnessRange').addEventListener('input', event => { state.brightness = Number(event.target.value); renderTinder(); saveDraft(); });
$('#guideToggle').addEventListener('change', event => { state.showGuides = event.target.checked; $('#safeGuides').hidden = !state.showGuides; });
$('#fontInfo').addEventListener('click', () => { const pair = currentPair(); $('#dialogPairName').textContent = pair.name; $('#dialogPairText').textContent = `${pair.character}. Оба шрифта перед включением в релиз проходят проверку кириллицы, лицензии и PNG-экспорта.`; $('#infoDialog').showModal(); });
$('#closeInfo').addEventListener('click', () => $('#infoDialog').close());
$('#customPaletteButton').addEventListener('click', () => $('#paletteDialog').showModal());
$('#closePalette').addEventListener('click', () => $('#paletteDialog').close());
$('#applyCustomPalette').addEventListener('click', () => {
  PALETTES.push({ name: 'Моя палитра', colors: [$('#customLight').value, $('#customAccent').value, $('#customMuted').value, $('#customDark').value] });
  state.paletteIndex = PALETTES.length - 1;
  $('#paletteDialog').close(); renderTinder(); saveDraft();
});

const tinderCanvas = $('#tinderCanvas');
tinderCanvas.addEventListener('pointerdown', event => { state.pointerStart = event.clientX; tinderCanvas.setPointerCapture(event.pointerId); });
tinderCanvas.addEventListener('pointermove', event => { if (state.pointerStart === null) return; updateSwipe(event.clientX - state.pointerStart); });
tinderCanvas.addEventListener('pointerup', event => { if (state.pointerStart === null) return; const delta = event.clientX - state.pointerStart; state.pointerStart = null; if (Math.abs(delta) > 72) chooseFont(delta > 0); else renderTinder(); });
tinderCanvas.addEventListener('pointercancel', () => { state.pointerStart = null; renderTinder(); });
tinderCanvas.addEventListener('keydown', event => { if (event.key === 'ArrowLeft') chooseFont(false); if (event.key === 'ArrowRight') chooseFont(true); });

$('#editorText').addEventListener('input', event => { state.segments[state.activeSlide] = event.target.value; state.sourceText = state.segments.join(' '); renderEditor(); saveDraft(); });
$('#editorFontSize').addEventListener('input', event => { state.fontSize = Number(event.target.value); renderEditor(); saveDraft(); });
$('#editorBrightness').addEventListener('input', event => { state.brightness = Number(event.target.value); renderEditor(); saveDraft(); });
$('#editorShadeRange').addEventListener('input', event => { state.shade = Number(event.target.value); renderEditor(); saveDraft(); });
$('#downloadCurrent').addEventListener('click', downloadCurrent);
$('#downloadAll').addEventListener('click', downloadAll);
$('#downloadAllSecondary').addEventListener('click', downloadAll);

window.addEventListener('beforeunload', () => state.photos.filter(photo => photo.local).forEach(photo => URL.revokeObjectURL(photo.url)));
if ('serviceWorker' in navigator && location.protocol !== 'file:') navigator.serviceWorker.register('./sw.js').catch(error => console.warn('Service worker:', error));

restoreDraft();
renderTinder();
