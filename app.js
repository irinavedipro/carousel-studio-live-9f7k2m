const FALLBACK_FONT_PAIRS = [
  { name: 'Ясный голос', head: 'Manrope', body: 'PT Sans', headWeight: 800 },
  { name: 'Тихая роскошь', head: 'Prata', body: 'Manrope', headWeight: 400 },
  { name: 'Новая смелость', head: 'Unbounded', body: 'PT Sans', headWeight: 600 },
  { name: 'Редакционный', head: 'Cormorant Garamond', body: 'Manrope', headWeight: 700 },
  { name: 'Сильный ритм', head: 'Oswald', body: 'PT Sans', headWeight: 600 },
  { name: 'Тёплый характер', head: 'Yeseva One', body: 'PT Sans', headWeight: 400 },
  { name: 'Живой эксперт', head: 'Rubik', body: 'PT Serif', headWeight: 700 },
  { name: 'Умная классика', head: 'PT Serif', body: 'Manrope', headWeight: 700 },
  { name: 'Современная сцена', head: 'Montserrat', body: 'PT Sans', headWeight: 700 },
  { name: 'Мягкая энергия', head: 'Comfortaa', body: 'Manrope', headWeight: 700 },
  { name: 'Контраст мысли', head: 'Manrope', body: 'Cormorant Garamond', headWeight: 800 },
  { name: 'Авторская колонка', head: 'Prata', body: 'PT Sans', headWeight: 400 }
];

let fontPairs = [...FALLBACK_FONT_PAIRS];
const loadedFontKeys = new Set();

function closestWeight(weights, preferred = 700) {
  const usable = (weights || []).filter(weight => weight >= 300 && weight <= 900);
  if (!usable.length) return 400;
  return usable.reduce((best, weight) => Math.abs(weight - preferred) < Math.abs(best - preferred) ? weight : best, usable[0]);
}

function interleaveCategories(catalog) {
  const order = ['Serif', 'Sans Serif', 'Display', 'Handwriting', 'Monospace'];
  const groups = new Map(order.map(category => [category, []]));
  catalog.forEach(item => {
    const group = groups.get(item.category) || groups.get('Sans Serif');
    group.push(item);
  });
  const result = [];
  let remaining = true;
  while (remaining) {
    remaining = false;
    order.forEach(category => {
      const item = groups.get(category).shift();
      if (item) {
        result.push(item);
        remaining = true;
      }
    });
  }
  return result;
}

function buildFontPairs(catalog) {
  return interleaveCategories(catalog).map(font => {
    const isNeutralSans = font.category === 'Sans Serif' || font.category === 'Monospace';
    let body = isNeutralSans ? 'Literata' : 'Onest';
    if (body === font.family) body = body === 'Onest' ? 'Literata' : 'Onest';
    const preferred = font.category === 'Handwriting' || font.category === 'Display' ? 500 : 700;
    return {
      name: `${font.family} × ${body}`,
      head: font.family,
      body,
      headWeight: closestWeight(font.weights, preferred),
      category: font.category
    };
  });
}

function requestGoogleFont(family, weight) {
  const key = `${family}-${weight}`;
  if (loadedFontKeys.has(key)) return Promise.resolve();
  loadedFontKeys.add(key);
  return new Promise(resolve => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family).replace(/%20/g, '+')}:wght@${weight}&display=swap`;
    link.onload = resolve;
    link.onerror = resolve;
    document.head.append(link);
  });
}

async function ensurePairLoaded(pair) {
  await Promise.all([
    requestGoogleFont(pair.head, pair.headWeight || 400),
    requestGoogleFont(pair.body, 400)
  ]);
}

async function loadFontCatalog() {
  try {
    const response = await fetch('./fonts-cyrillic.json', { cache: 'no-cache' });
    if (!response.ok) throw new Error(`Font catalog: ${response.status}`);
    const catalog = await response.json();
    if (!Array.isArray(catalog) || catalog.length < 20) throw new Error('Font catalog is incomplete');
    fontPairs = buildFontPairs(catalog);
    $('#pairCounter').textContent = `1 / ${fontPairs.length}`;
    await Promise.all(fontPairs.slice(0, 2).map(ensurePairLoaded));
  } catch (error) {
    console.warn('Using fallback font catalog:', error);
  }
}

const PALETTES = [
  {
    id: 'electric', name: 'Электрик',
    colors: { dark: '#111118', light: '#F6F7F2', accent: '#6657FF', extra: '#B6FF66' }
  },
  {
    id: 'cherry', name: 'Вишнёвый свет',
    colors: { dark: '#2B0B1D', light: '#FFF7EE', accent: '#E83E72', extra: '#FFB7C9' }
  },
  {
    id: 'ocean', name: 'Глубина',
    colors: { dark: '#071D2C', light: '#F5FBFA', accent: '#12B9C0', extra: '#F4DB6B' }
  },
  {
    id: 'signal', name: 'Сигнал',
    colors: { dark: '#151515', light: '#FFF8F0', accent: '#FF5B35', extra: '#4D7CFF' }
  }
];

const CUSTOM_PALETTE = {
  id: 'custom', name: 'Моя палитра',
  colors: { dark: '#111118', light: '#F6F7F2', accent: '#6657FF', extra: '#B6FF66' }
};

const DEFAULT_SLIDES = [
  { headline: 'Ваш голос уже имеет значение', body: 'Начните с того, что действительно важно именно вам.', recipe: 'photo' },
  { headline: 'Что мешает быть заметнее?', body: 'Не отсутствие идей. Чаще — отсутствие своей визуальной системы.', recipe: 'accent' },
  { headline: '01. Выберите главное', body: 'Один ясный тезис сильнее пяти мыслей, которые спорят друг с другом.', recipe: 'paper' },
  { headline: 'Дайте мысли пространство', body: 'Контраст, воздух и ритм помогают прочитать главное с первого взгляда.', recipe: 'photoAccent' },
  { headline: 'Сохраните то, что откликнулось', body: 'Ваш стиль начинается с решений, которые хочется повторять.', recipe: 'dark' }
];

const state = {
  photos: [],
  setupPhotoIndex: 0,
  setupBrightness: 90,
  headline: 'Ваш голос уже имеет значение',
  subtitle: 'Соберите визуальный стиль, который действительно похож на вас.',
  pairIndex: 0,
  liked: [],
  chosenPair: null,
  slides: [],
  activeSlide: 0,
  palette: PALETTES[0],
  customPalette: CUSTOM_PALETTE,
  customPaletteAdded: false
};

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

const stages = {
  setup: $('#stageSetup'),
  tinder: $('#stageTinder'),
  finalists: $('#stageFinalists'),
  carousel: $('#stageCarousel')
};

let toastTimer;
function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2800);
}

function moveToStage(name, step) {
  Object.entries(stages).forEach(([key, node]) => {
    node.hidden = key !== name;
    node.classList.toggle('is-active', key === name);
  });
  $('#progressText').textContent = `${step} из 4`;
  $('#progressBar').style.width = `${step * 25}%`;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function brightnessLabel(value) {
  const n = Number(value);
  if (n < 83) return 'Темнее';
  if (n > 106) return 'Светлее';
  return 'Без изменений';
}

function photoBackground(index = 0) {
  const photo = state.photos[index];
  return photo ? `url("${photo.url}")` : '';
}

function renderSetup() {
  const image = $('#setupImage');
  const photo = state.photos[state.setupPhotoIndex];
  image.classList.toggle('placeholder', !photo);
  image.style.backgroundImage = photo ? photoBackground(state.setupPhotoIndex) : '';
  image.style.filter = `brightness(${state.setupBrightness / 100})`;
  $('#setupHeadline').textContent = state.headline || 'Ваш голос уже имеет значение';
  $('#setupSubtitle').textContent = state.subtitle || 'Соберите визуальный стиль, который действительно похож на вас.';
  $('#setupBrightnessValue').textContent = brightnessLabel(state.setupBrightness);
  $('#startTinder').disabled = state.photos.length < 3;
  $('#photoHint').textContent = state.photos.length
    ? `${state.photos.length} ${state.photos.length === 3 ? 'фотографии' : 'фотографий'} выбрано. Можно заменить набор.`
    : 'Пока можно посмотреть пример на готовом фоне.';
  renderPhotoThumbs();
}

function renderPhotoThumbs() {
  const container = $('#photoThumbs');
  container.replaceChildren();
  state.photos.forEach((photo, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `thumb${index === state.setupPhotoIndex ? ' is-active' : ''}`;
    button.setAttribute('aria-label', `Показать фотографию ${index + 1}`);
    const img = document.createElement('img');
    img.src = photo.url;
    img.alt = '';
    button.append(img);
    button.addEventListener('click', () => {
      state.setupPhotoIndex = index;
      renderSetup();
    });
    container.append(button);
  });
}

function setFontPairOnCard(card, pair) {
  const headline = card.querySelector('h2');
  const body = card.querySelector('.poster-content p');
  headline.style.fontFamily = `"${pair.head}", serif`;
  headline.style.fontWeight = pair.headWeight;
  body.style.fontFamily = `"${pair.body}", sans-serif`;
}

function renderTinder() {
  const pair = fontPairs[state.pairIndex];
  ensurePairLoaded(pair).then(() => {
    if (fontPairs[state.pairIndex] === pair) setFontPairOnCard($('#tinderCard'), pair);
  });
  const card = $('#tinderCard');
  $('#tinderImage').style.backgroundImage = photoBackground(state.setupPhotoIndex);
  $('#tinderImage').style.filter = `brightness(${state.setupBrightness / 100})`;
  $('#tinderHeadline').textContent = state.headline;
  $('#tinderSubtitle').textContent = state.subtitle;
  $('#pairName').textContent = pair.name;
  $('#pairCounter').textContent = `${state.pairIndex + 1} / ${fontPairs.length}`;
  $('#finishTinder').hidden = state.liked.length === 0;
  $('#finishTinder').textContent = state.liked.length === 1
    ? 'Готово · выбрать понравившийся'
    : `Готово · выбрать из ${state.liked.length} понравившихся`;
  setFontPairOnCard(card, pair);
  card.style.transform = '';
  card.style.opacity = '1';
  $('.stamp-no').style.opacity = '0';
  $('.stamp-yes').style.opacity = '0';
}

let swipeStartX = null;
let swipeDeltaX = 0;
let swipeBusy = false;

function updateSwipeVisual(delta) {
  const card = $('#tinderCard');
  const limited = Math.max(-140, Math.min(140, delta));
  card.style.transform = `translateX(${limited}px) rotate(${limited / 22}deg)`;
  $('.stamp-no').style.opacity = `${Math.max(0, -limited / 90)}`;
  $('.stamp-yes').style.opacity = `${Math.max(0, limited / 90)}`;
}

function chooseFont(liked) {
  if (swipeBusy) return;
  swipeBusy = true;
  const card = $('#tinderCard');
  if (liked) state.liked.push(state.pairIndex);
  card.style.transform = `translateX(${liked ? 520 : -520}px) rotate(${liked ? 14 : -14}deg)`;
  card.style.opacity = '0';
  setTimeout(() => {
    state.pairIndex += 1;
    if (state.pairIndex >= fontPairs.length) {
      showFinalists();
    } else {
      renderTinder();
    }
    swipeBusy = false;
  }, 230);
}

function showFinalists() {
  moveToStage('finalists', 3);
  const grid = $('#finalistGrid');
  const empty = $('#emptyFinalists');
  grid.replaceChildren();
  const uniqueLiked = [...new Set(state.liked)];
  if (!uniqueLiked.length) {
    grid.hidden = true;
    empty.hidden = false;
    return;
  }
  grid.hidden = false;
  empty.hidden = true;
  $('#finalistsDescription').textContent = uniqueLiked.length === 1
    ? 'Вы нашли одну пару. Нажмите на неё, чтобы собрать карусель.'
    : `Вы отметили ${uniqueLiked.length}. Выберите одну пару для всей карусели.`;

  uniqueLiked.forEach(index => {
    const pair = fontPairs[index];
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'finalist';
    const visual = document.createElement('div');
    visual.className = 'finalist-visual';
    visual.style.backgroundImage = photoBackground(state.setupPhotoIndex);
    visual.style.filter = `brightness(${state.setupBrightness / 100})`;
    const title = document.createElement('h2');
    title.textContent = state.headline;
    title.style.fontFamily = `"${pair.head}", serif`;
    title.style.fontWeight = pair.headWeight;
    const body = document.createElement('p');
    body.textContent = state.subtitle;
    body.style.fontFamily = `"${pair.body}", sans-serif`;
    const name = document.createElement('div');
    name.className = 'finalist-name';
    name.textContent = pair.name;
    visual.append(title, body);
    button.append(visual, name);
    button.addEventListener('click', () => selectPair(index));
    grid.append(button);
  });
}

function selectPair(index) {
  state.chosenPair = fontPairs[index];
  ensurePairLoaded(state.chosenPair);
  if (!state.slides.length) {
    state.slides = DEFAULT_SLIDES.map((slide, slideIndex) => ({
      ...slide,
      photoIndex: slideIndex % state.photos.length,
      brightness: state.setupBrightness,
      shade: slide.recipe === 'photo' || slide.recipe === 'photoAccent' ? 42 : 0,
      headlineSize: 100,
      offsetX: 0,
      offsetY: 0,
      headlineColor: null,
      bodyColor: null
    }));
    state.slides[0].headline = state.headline;
    state.slides[0].body = state.subtitle;
  }
  state.activeSlide = 0;
  $('#chosenPairBadge').textContent = state.chosenPair.name;
  renderPaletteOptions();
  renderCarousel();
  moveToStage('carousel', 4);
}

function renderPaletteOptions() {
  const row = $('#paletteRow');
  row.replaceChildren();
  const availablePalettes = state.customPaletteAdded ? [...PALETTES, state.customPalette] : PALETTES;
  availablePalettes.forEach(palette => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `palette-card${palette.id === state.palette.id ? ' is-active' : ''}`;
    button.setAttribute('aria-label', `Выбрать палитру ${palette.name}`);
    const series = document.createElement('span');
    series.className = 'palette-series';
    const order = ['dark', 'accent', 'light', 'extra', 'dark'];
    order.forEach(key => {
      const swatch = document.createElement('i');
      swatch.style.background = palette.colors[key];
      series.append(swatch);
    });
    const label = document.createElement('b');
    label.textContent = palette.name;
    button.append(series, label);
    button.addEventListener('click', () => {
      state.palette = palette;
      renderPaletteOptions();
      renderCarousel();
    });
    row.append(button);
  });
}

function recipeAppearance(slide) {
  const c = state.palette.colors;
  switch (slide.recipe) {
    case 'accent': return { bg: c.accent, text: readableText(c.accent), body: readableText(c.accent), accent: c.extra, image: false };
    case 'paper': return { bg: c.light, text: c.dark, body: c.dark, accent: c.accent, image: false };
    case 'dark': return { bg: c.dark, text: c.light, body: c.light, accent: c.extra, image: false };
    case 'photoAccent': return { bg: c.dark, text: c.extra, body: c.light, accent: c.extra, image: true };
    default: return { bg: c.dark, text: c.light, body: c.light, accent: c.extra, image: true };
  }
}

function readableText(hex) {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 150 ? '#111118' : '#FFFFFF';
}

function positionLabel(value, axis) {
  const number = Number(value);
  if (Math.abs(number) < 3) return axis === 'x' ? 'По центру' : 'На месте';
  if (axis === 'x') return number < 0 ? 'Левее' : 'Правее';
  return number < 0 ? 'Выше' : 'Ниже';
}

function headlineRem(slide) {
  const length = slide.headline.trim().length;
  const base = length > 62 ? 2.15 : length > 38 ? 2.7 : 3.45;
  return base * ((slide.headlineSize || 100) / 100);
}

function applyCarouselTextPosition(slide) {
  const poster = $('#carouselPoster');
  const content = $('#carouselPoster .poster-content');
  const x = (slide.offsetX || 0) * poster.clientWidth / 100;
  const y = (slide.offsetY || 0) * poster.clientHeight / 100;
  content.style.transform = `translate(${x}px, ${y}px)`;
}

function renderCarousel() {
  const slide = state.slides[state.activeSlide];
  if (!slide) return;
  const appearance = recipeAppearance(slide);
  const image = $('#carouselImage');
  const shade = $('#carouselShade');
  const content = $('#carouselPoster .poster-content');
  image.style.backgroundImage = appearance.image ? photoBackground(slide.photoIndex) : 'none';
  image.style.backgroundColor = appearance.bg;
  image.style.filter = `brightness(${slide.brightness / 100})`;
  shade.style.display = appearance.image ? 'block' : 'none';
  shade.style.background = `linear-gradient(to top, rgba(7,7,12,${slide.shade / 100}) 4%, rgba(7,7,12,${Math.max(0, slide.shade / 240)}) 72%, transparent 100%)`;
  content.style.color = appearance.text;
  $('#carouselKicker').style.color = appearance.text;
  $('#carouselKicker').style.borderColor = `${appearance.text}55`;
  $('#carouselHeadline').textContent = slide.headline;
  $('#carouselHeadline').style.color = slide.headlineColor || appearance.text;
  $('#carouselHeadline').style.fontFamily = `"${state.chosenPair.head}", serif`;
  $('#carouselHeadline').style.fontWeight = state.chosenPair.headWeight;
  $('#carouselHeadline').style.fontSize = `${headlineRem(slide)}rem`;
  $('#carouselBody').textContent = slide.body;
  $('#carouselBody').style.color = slide.bodyColor || appearance.body;
  $('#carouselBody').style.fontFamily = `"${state.chosenPair.body}", sans-serif`;
  $('#carouselIndex').textContent = `${String(state.activeSlide + 1).padStart(2, '0')} / 05`;
  $('#carouselIndex').style.color = appearance.text;
  $('#activeSlideNumber').textContent = state.activeSlide + 1;
  $('#slideHeadlineInput').value = slide.headline;
  $('#slideBodyInput').value = slide.body;
  $('#slideBrightness').value = slide.brightness;
  $('#slideBrightnessValue').textContent = brightnessLabel(slide.brightness);
  $('#slideShade').value = slide.shade;
  $('#slideShadeValue').textContent = `${slide.shade}%`;
  $('#headlineSize').value = slide.headlineSize || 100;
  $('#headlineSizeValue').textContent = `${slide.headlineSize || 100}%`;
  $('#textHorizontal').value = slide.offsetX || 0;
  $('#textHorizontalValue').textContent = positionLabel(slide.offsetX || 0, 'x');
  $('#textVertical').value = slide.offsetY || 0;
  $('#textVerticalValue').textContent = positionLabel(slide.offsetY || 0, 'y');
  $('#headlineColor').value = slide.headlineColor || appearance.text;
  $('#bodyColor').value = slide.bodyColor || appearance.body;
  applyCarouselTextPosition(slide);
  renderSlideStrip();
  renderCarouselPhotoPicker();
}

function renderSlideStrip() {
  const strip = $('#slideStrip');
  strip.replaceChildren();
  state.slides.forEach((slide, index) => {
    const appearance = recipeAppearance(slide);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `slide-thumb${index === state.activeSlide ? ' is-active' : ''}`;
    button.dataset.index = index + 1;
    button.setAttribute('aria-label', `Открыть карточку ${index + 1}`);
    button.style.backgroundColor = appearance.bg;
    button.style.backgroundImage = appearance.image ? photoBackground(slide.photoIndex) : 'none';
    button.style.filter = `brightness(${appearance.image ? slide.brightness / 100 : 1})`;
    button.addEventListener('click', () => {
      state.activeSlide = index;
      renderCarousel();
    });
    strip.append(button);
  });
}

function renderCarouselPhotoPicker() {
  const picker = $('#carouselPhotoPicker');
  const slide = state.slides[state.activeSlide];
  picker.replaceChildren();
  state.photos.forEach((photo, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `thumb${index === slide.photoIndex ? ' is-active' : ''}`;
    button.setAttribute('aria-label', `Использовать фотографию ${index + 1}`);
    const img = document.createElement('img');
    img.src = photo.url;
    img.alt = '';
    button.append(img);
    button.addEventListener('click', () => {
      slide.photoIndex = index;
      renderCarousel();
    });
    picker.append(button);
  });
}

function hexToRgba(hex, alpha) {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
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
  const w = image.width * scale;
  const h = image.height * scale;
  ctx.drawImage(image, (width - w) / 2, (height - h) / 2, w, h);
}

function wrapLines(ctx, text, maxWidth, maxLines) {
  const words = String(text).trim().split(/\s+/).filter(Boolean);
  const lines = [];
  let current = '';
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width <= maxWidth || !current) {
      current = test;
    } else {
      lines.push(current);
      current = word;
      if (lines.length === maxLines - 1) break;
    }
  }
  if (current && lines.length < maxLines) lines.push(current);
  if (lines.length === maxLines && words.join(' ').length > lines.join(' ').length) {
    while (ctx.measureText(`${lines[maxLines - 1]}…`).width > maxWidth && lines[maxLines - 1].length > 3) {
      lines[maxLines - 1] = lines[maxLines - 1].slice(0, -1);
    }
    lines[maxLines - 1] += '…';
  }
  return lines;
}

async function renderSlideCanvas(slide, index) {
  await ensurePairLoaded(state.chosenPair);
  await document.fonts.ready;
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext('2d');
  const appearance = recipeAppearance(slide);
  ctx.fillStyle = appearance.bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (appearance.image) {
    const photo = state.photos[slide.photoIndex];
    const image = await loadImage(photo.url);
    ctx.save();
    ctx.filter = `brightness(${slide.brightness}%)`;
    drawImageCover(ctx, image, canvas.width, canvas.height);
    ctx.restore();
    const gradient = ctx.createLinearGradient(0, canvas.height, 0, 180);
    gradient.addColorStop(0, `rgba(7,7,12,${slide.shade / 100})`);
    gradient.addColorStop(0.68, `rgba(7,7,12,${Math.max(0, slide.shade / 260)})`);
    gradient.addColorStop(1, 'rgba(7,7,12,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else if (slide.recipe === 'paper') {
    ctx.fillStyle = appearance.accent;
    ctx.fillRect(72, 72, 18, 220);
  } else if (slide.recipe === 'dark') {
    ctx.fillStyle = appearance.accent;
    ctx.beginPath();
    ctx.arc(940, 155, 210, 0, Math.PI * 2);
    ctx.fill();
  }

  const left = Math.max(40, Math.min(360, 90 + (slide.offsetX || 0) * 10.8));
  const maxWidth = Math.max(560, Math.min(900, canvas.width - left - 60));
  ctx.textBaseline = 'top';

  const defaultHeadlineSize = slide.headline.length > 62 ? 70 : slide.headline.length > 38 ? 82 : 96;
  const headlineSize = defaultHeadlineSize * ((slide.headlineSize || 100) / 100);
  ctx.font = `${state.chosenPair.headWeight} ${headlineSize}px "${state.chosenPair.head}"`;
  const titleLines = wrapLines(ctx, slide.headline, maxWidth, 5);
  const titleHeight = titleLines.length * headlineSize * 0.98;

  ctx.font = `500 34px "${state.chosenPair.body}"`;
  const bodyLines = wrapLines(ctx, slide.body, Math.min(820, maxWidth), 4);
  const bodyHeight = bodyLines.length * 48;
  const totalHeight = 34 + 44 + titleHeight + 38 + bodyHeight + 50 + 22;
  const baseTop = 1250 - totalHeight + (slide.offsetY || 0) * 13.5;
  let y = Math.max(60, Math.min(1260 - totalHeight, baseTop));

  ctx.font = `700 24px Manrope`;
  ctx.fillStyle = appearance.accent;
  ctx.fillText('ЛИЧНЫЙ СТИЛЬ', left, y);
  y += 78;

  ctx.fillStyle = slide.headlineColor || appearance.text;
  ctx.font = `${state.chosenPair.headWeight} ${headlineSize}px "${state.chosenPair.head}"`;
  titleLines.forEach(line => {
    ctx.fillText(line, left, y);
    y += headlineSize * 0.98;
  });

  ctx.fillStyle = slide.bodyColor || appearance.body;
  ctx.font = `500 34px "${state.chosenPair.body}"`;
  y += 38;
  bodyLines.forEach(line => {
    ctx.fillText(line, left, y);
    y += 48;
  });

  ctx.fillStyle = hexToRgba(appearance.text, 0.62);
  ctx.font = '700 22px Manrope';
  y += 50;
  ctx.fillText(`${String(index + 1).padStart(2, '0')} / 05`, left, y);
  return canvas;
}

function canvasToBlob(canvas) {
  return new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
}

function downloadBlob(blob, filename) {
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

async function downloadCurrentSlide() {
  const button = $('#downloadCurrent');
  const original = button.textContent;
  button.disabled = true;
  button.textContent = 'Готовим PNG…';
  try {
    const canvas = await renderSlideCanvas(state.slides[state.activeSlide], state.activeSlide);
    const blob = await canvasToBlob(canvas);
    downloadBlob(blob, `carousel-${state.activeSlide + 1}.png`);
    showToast('Карточка готова');
  } catch (error) {
    console.error(error);
    showToast('Не удалось сохранить карточку. Попробуйте другое фото.');
  } finally {
    button.disabled = false;
    button.textContent = original;
  }
}

async function downloadAllSlides() {
  const button = $('#downloadAll');
  const original = button.innerHTML;
  button.disabled = true;
  button.textContent = 'Собираем 1 из 5…';
  try {
    if (!window.JSZip) throw new Error('JSZip is unavailable');
    const zip = new window.JSZip();
    for (let index = 0; index < state.slides.length; index += 1) {
      button.textContent = `Собираем ${index + 1} из 5…`;
      const canvas = await renderSlideCanvas(state.slides[index], index);
      const blob = await canvasToBlob(canvas);
      zip.file(`${String(index + 1).padStart(2, '0')}-carousel.png`, blob);
    }
    const archive = await zip.generateAsync({ type: 'blob' });
    downloadBlob(archive, 'my-carousel.zip');
    showToast('Карусель готова — пять PNG в архиве');
  } catch (error) {
    console.error(error);
    showToast('Не удалось собрать архив. Скачайте карточки по одной.');
  } finally {
    button.disabled = false;
    button.innerHTML = original;
  }
}

$('#uploadButton').addEventListener('click', () => $('#photoInput').click());
$('#photoInput').addEventListener('change', event => {
  const files = [...event.target.files].filter(file => file.type.startsWith('image/')).slice(0, 5);
  state.photos.forEach(photo => URL.revokeObjectURL(photo.url));
  state.photos = files.map(file => ({ file, name: file.name, url: URL.createObjectURL(file) }));
  state.setupPhotoIndex = 0;
  if (event.target.files.length > 5) showToast('Для первой версии используем первые пять фотографий');
  if (files.length < 3) showToast('Добавьте минимум три фотографии');
  renderSetup();
});

$('#headlineInput').addEventListener('input', event => { state.headline = event.target.value; renderSetup(); });
$('#subtitleInput').addEventListener('input', event => { state.subtitle = event.target.value; renderSetup(); });
$('#setupBrightness').addEventListener('input', event => { state.setupBrightness = Number(event.target.value); renderSetup(); });

const catalogReady = loadFontCatalog();

$('#startTinder').addEventListener('click', async () => {
  await catalogReady;
  state.pairIndex = 0;
  state.liked = [];
  renderTinder();
  moveToStage('tinder', 2);
  setTimeout(() => $('#tinderCard').focus(), 50);
});

$('#rejectFont').addEventListener('click', () => chooseFont(false));
$('#likeFont').addEventListener('click', () => chooseFont(true));
$('#finishTinder').addEventListener('click', showFinalists);
$('#backToSetup').addEventListener('click', () => {
  swipeStartX = null;
  swipeDeltaX = 0;
  swipeBusy = false;
  updateSwipeVisual(0);
  renderSetup();
  moveToStage('setup', 1);
  setTimeout(() => $('#startTinder').focus(), 50);
});
$('#backToFinalists').addEventListener('click', () => {
  showFinalists();
  setTimeout(() => $('.finalist')?.focus(), 50);
});
$('#retryTinder').addEventListener('click', () => {
  state.pairIndex = 0;
  state.liked = [];
  renderTinder();
  moveToStage('tinder', 2);
});

const tinderCard = $('#tinderCard');
tinderCard.addEventListener('pointerdown', event => {
  if (swipeBusy) return;
  swipeStartX = event.clientX;
  swipeDeltaX = 0;
  tinderCard.setPointerCapture(event.pointerId);
});
tinderCard.addEventListener('pointermove', event => {
  if (swipeStartX === null || swipeBusy) return;
  swipeDeltaX = event.clientX - swipeStartX;
  updateSwipeVisual(swipeDeltaX);
});
tinderCard.addEventListener('pointerup', () => {
  if (swipeStartX === null || swipeBusy) return;
  const decision = Math.abs(swipeDeltaX) >= 68 ? swipeDeltaX > 0 : null;
  swipeStartX = null;
  if (decision === null) updateSwipeVisual(0);
  else chooseFont(decision);
});
tinderCard.addEventListener('pointercancel', () => {
  swipeStartX = null;
  updateSwipeVisual(0);
});
tinderCard.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') { event.preventDefault(); chooseFont(false); }
  if (event.key === 'ArrowRight') { event.preventDefault(); chooseFont(true); }
});

$('#slideHeadlineInput').addEventListener('input', event => {
  state.slides[state.activeSlide].headline = event.target.value;
  renderCarousel();
});
$('#slideBodyInput').addEventListener('input', event => {
  state.slides[state.activeSlide].body = event.target.value;
  renderCarousel();
});
$('#headlineSize').addEventListener('input', event => {
  state.slides[state.activeSlide].headlineSize = Number(event.target.value);
  renderCarousel();
});
$('#textHorizontal').addEventListener('input', event => {
  state.slides[state.activeSlide].offsetX = Number(event.target.value);
  renderCarousel();
});
$('#textVertical').addEventListener('input', event => {
  state.slides[state.activeSlide].offsetY = Number(event.target.value);
  renderCarousel();
});
$('#headlineColor').addEventListener('input', event => {
  state.slides[state.activeSlide].headlineColor = event.target.value;
  renderCarousel();
});
$('#bodyColor').addEventListener('input', event => {
  state.slides[state.activeSlide].bodyColor = event.target.value;
  renderCarousel();
});
$('#resetTextColors').addEventListener('click', () => {
  state.slides[state.activeSlide].headlineColor = null;
  state.slides[state.activeSlide].bodyColor = null;
  renderCarousel();
});
$('#slideBrightness').addEventListener('input', event => {
  state.slides[state.activeSlide].brightness = Number(event.target.value);
  renderCarousel();
});
$('#slideShade').addEventListener('input', event => {
  state.slides[state.activeSlide].shade = Number(event.target.value);
  renderCarousel();
});

$('#applyCustomPalette').addEventListener('click', () => {
  state.customPalette = {
    id: 'custom',
    name: 'Моя палитра',
    colors: {
      dark: $('#customDark').value,
      light: $('#customLight').value,
      accent: $('#customAccent').value,
      extra: $('#customExtra').value
    }
  };
  state.customPaletteAdded = true;
  state.palette = state.customPalette;
  renderPaletteOptions();
  renderCarousel();
  showToast('Своя палитра применена ко всей карусели');
});

const carouselContent = $('#carouselPoster .poster-content');
let textDrag = null;
carouselContent.addEventListener('pointerdown', event => {
  const slide = state.slides[state.activeSlide];
  if (!slide) return;
  textDrag = {
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    offsetX: slide.offsetX || 0,
    offsetY: slide.offsetY || 0
  };
  carouselContent.classList.add('is-dragging');
  carouselContent.setPointerCapture(event.pointerId);
});
carouselContent.addEventListener('pointermove', event => {
  if (!textDrag || textDrag.pointerId !== event.pointerId) return;
  const slide = state.slides[state.activeSlide];
  const rect = $('#carouselPoster').getBoundingClientRect();
  slide.offsetX = Math.max(-25, Math.min(25, textDrag.offsetX + (event.clientX - textDrag.startX) / rect.width * 100));
  slide.offsetY = Math.max(-45, Math.min(20, textDrag.offsetY + (event.clientY - textDrag.startY) / rect.height * 100));
  $('#textHorizontal').value = slide.offsetX;
  $('#textHorizontalValue').textContent = positionLabel(slide.offsetX, 'x');
  $('#textVertical').value = slide.offsetY;
  $('#textVerticalValue').textContent = positionLabel(slide.offsetY, 'y');
  applyCarouselTextPosition(slide);
});
function endTextDrag(event) {
  if (!textDrag || (event && textDrag.pointerId !== event.pointerId)) return;
  textDrag = null;
  carouselContent.classList.remove('is-dragging');
}
carouselContent.addEventListener('pointerup', endTextDrag);
carouselContent.addEventListener('pointercancel', endTextDrag);
$('#downloadCurrent').addEventListener('click', downloadCurrentSlide);
$('#downloadAll').addEventListener('click', downloadAllSlides);

$$('[data-action="home"]').forEach(button => button.addEventListener('click', () => moveToStage('setup', 1)));

window.addEventListener('beforeunload', () => state.photos.forEach(photo => URL.revokeObjectURL(photo.url)));

if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  navigator.serviceWorker.register('./sw.js').catch(error => console.warn('Service worker:', error));
}

renderSetup();
