const $ = selector => document.querySelector(selector);
const $$ = (selector,root=document) => [...root.querySelectorAll(selector)];

const ICON_GLYPHS = {
  add: '+', add_photo_alternate: '▣+', arrow_back: '←', arrow_forward: '→', auto_awesome: '✦',
  chevron_right: '›', close: '×', content_copy: '▣', delete: '⌫', favorite: '♥',
  format_align_left: '≡', format_align_center: '≡', format_align_right: '≡', image: '▣', info: 'ⓘ',
  ios_share: '↥', palette: '◉', text_fields: 'Tt', undo: '↶'
};
$$('.material-symbols-rounded').forEach(icon => {
  icon.textContent = ICON_GLYPHS[icon.textContent.trim()] || '•';
  icon.setAttribute('aria-hidden', 'true');
});

const BUILT_IN_PHOTOS = [
  { url: './assets/editorial/portrait-sea.webp', name: 'Портрет у моря' },
  { url: './assets/editorial/rocky-coast.webp', name: 'Скалистый берег' },
  { url: './assets/editorial/botanical-shadow.webp', name: 'Ботаническая тень' },
  { url: './assets/editorial/sea-sunset.webp', name: 'Закат у моря' }
];

const FONT_PAIRS = [
  { head: 'Finlandica', body: 'Piazzolla', weight: 700, name: 'Finlandica + Piazzolla', character: 'Современная пресса' },
  { head: 'Prata', body: 'Onest', weight: 400, name: 'Prata + Onest', character: 'Спокойный premium' },
  { head: 'Cormorant Garamond', body: 'Manrope', weight: 700, name: 'Cormorant + Manrope', character: 'Fashion editorial' },
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
  { head: 'Alumni Sans Pinstripe', body: 'Literata', weight: 400, name: 'Alumni Sans + Literata', character: 'Хрупкая высокая типографика' },
  { head: 'Geologica', body: 'Bona Nova', weight: 700, name: 'Geologica + Bona Nova', character: 'Экспертность без канцелярита' },
  { head: 'Sofia Sans Condensed', body: 'Literata', weight: 700, name: 'Sofia Sans + Literata', character: 'Плотная журнальная обложка' },
  { head: 'Wix Madefor Display', body: 'Cormorant Garamond', weight: 700, name: 'Wix Madefor + Cormorant', character: 'Чистый современный fashion' },
  { head: 'Commissioner', body: 'Prata', weight: 700, name: 'Commissioner + Prata', character: 'Уверенный персональный бренд' },
  { head: 'Tektur', body: 'Manrope', weight: 650, name: 'Tektur + Manrope', character: 'Tech и AI' },
  { head: 'Handjet', body: 'Onest', weight: 650, name: 'Handjet + Onest', character: 'Эксперимент и цифра' },
  { head: 'Shantell Sans', body: 'Onest', weight: 650, name: 'Shantell Sans + Onest', character: 'Живой личный голос' },
  { head: 'Caveat', body: 'Commissioner', weight: 650, name: 'Caveat + Commissioner', character: 'Заметка от руки' },
  { head: 'Bad Script', body: 'Manrope', weight: 400, name: 'Bad Script + Manrope', character: 'Личный дневник' },
  { head: 'Climate Crisis', body: 'Onest', weight: 400, name: 'Climate Crisis + Onest', character: 'Редкий акцент' },
  { head: 'Kablammo', body: 'Onest', weight: 400, name: 'Kablammo + Onest', character: 'Игровая энергия' },
  { head: 'Oi', body: 'Onest', weight: 400, name: 'Oi + Onest', character: 'Ударный заголовок' },
  { head: 'Rubik Marker Hatch', body: 'Onest', weight: 400, name: 'Rubik Marker + Onest', character: 'Маркер и процесс' },
  { head: 'Monomakh', body: 'Commissioner', weight: 400, name: 'Monomakh + Commissioner', character: 'Культурный акцент' }
];

const PALETTES = [
  { name: 'Бумага и вино', colors: ['#f3ecdf', '#963344', '#6a6a5d', '#252a2f'] },
  { name: 'Море и камень', colors: ['#e9ece8', '#547389', '#7d7869', '#17232a'] },
  { name: 'Шафран', colors: ['#f4e6cb', '#c66b33', '#65705f', '#26201d'] },
  { name: 'Чернила', colors: ['#f0f0eb', '#48505c', '#7d242c', '#101313'] }
];

const DEMO_TEXT = 'Личная свобода начинается с ясности. Система должна помогать, а не наказывать. Маленькие шаги меняют всё. Я выбираю себя каждый день. Больше жизни в моменте. И это только начало. В гармонии с собой.';
const DRAFT_KEY = 'carousel-studio-1.2-draft';
const loadedFonts = new Set();
let slideSeed = 1;
let saveUrls = [];

const state = {
  sourceText: '',
  photos: [],
  coverPhotoIndex: 0,
  textOnly: false,
  isDemo: false,
  slides: [],
  activeSlide: 0,
  pairIndex: 0,
  liked: [],
  choiceHistory: [],
  selectedPair: null,
  paletteIndex: 0,
  selectedBlock: 'main',
  showGuides: true,
  pointerStart: null,
  drag: null,
  replaceSlide: null
};

function activePhotos() { return state.isDemo ? BUILT_IN_PHOTOS : state.photos; }
function currentPair() { return FONT_PAIRS[state.pairIndex % FONT_PAIRS.length]; }
function chosenPair() { return FONT_PAIRS[state.selectedPair ?? state.pairIndex] || FONT_PAIRS[0]; }
function currentPalette() { return PALETTES[state.paletteIndex % PALETTES.length]; }
function currentSlide() { return state.slides[state.activeSlide] || null; }
function stripTerminalPeriod(text) { return String(text || '').replace(/\s*\.\s*$/u, '').trim(); }
function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char])); }
function cardWord(number) { if (number % 10 === 1 && number % 100 !== 11) return 'карточка'; if ([2,3,4].includes(number % 10) && ![12,13,14].includes(number % 100)) return 'карточки'; return 'карточек'; }

function splitHeadline(text) {
  const clean = stripTerminalPeriod(text);
  const explicit = clean.split(/\n+/).map(part => part.trim()).filter(Boolean);
  if (explicit.length > 1) return [explicit[0], explicit.slice(1).join('\n')];
  const comma = clean.indexOf(',');
  if (comma > 10 && comma < clean.length - 4) return [clean.slice(0, comma + 1), clean.slice(comma + 1).trim()];
  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length < 5) return [clean, ''];
  const cut = Math.max(2, Math.ceil(words.length * .58));
  return [words.slice(0, cut).join(' '), words.slice(cut).join(' ')];
}

function makeSlide(text, photoIndex = null) {
  const [main, accent] = splitHeadline(text);
  return {
    id: `slide-${Date.now()}-${slideSeed++}`,
    originalText: String(text || '').trim(),
    photoIndex,
    brightness: 92,
    shade: 46,
    blocks: {
      main: { text: main, x: 8, y: 56, width: 84, size: 112, color: '#ffffff', align: 'left' },
      accent: { text: accent, x: 8, y: 74, width: 84, size: 88, color: '#ffffff', align: 'left' }
    }
  };
}

function segmentText(text) {
  const clean = String(text || '').replace(/\r/g, '').trim();
  if (!clean) return [];
  const forced = clean.split(/\n\s*---\s*\n/).map(part => part.trim()).filter(Boolean);
  if (forced.length > 1) return forced.slice(0, 10);
  const paragraphs = clean.split(/\n{2,}/).map(part => part.trim()).filter(Boolean);
  if (paragraphs.length > 1 && paragraphs.length <= 10) return paragraphs;
  const segmenter = typeof Intl.Segmenter === 'function' ? new Intl.Segmenter('ru', { granularity: 'sentence' }) : null;
  const sentences = segmenter ? [...segmenter.segment(clean)].map(item => item.segment.trim()).filter(Boolean) : clean.match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map(item => item.trim()) || [clean];
  if (sentences.length <= 10) return sentences;
  const result = [];
  const target = Math.ceil(sentences.length / 10);
  for (let index = 0; index < sentences.length; index += target) result.push(sentences.slice(index, index + target).join(' '));
  return result.slice(0, 10);
}

function createSlides(parts) {
  const photos = activePhotos();
  state.slides = parts.slice(0,10).map((part, index) => makeSlide(part, state.textOnly ? null : photos.length ? (state.coverPhotoIndex + index) % photos.length : null));
  state.activeSlide = 0;
}

function applyTextToSlide(slide, text) {
  slide.originalText = String(text || '').trim();
  const [main, accent] = splitHeadline(slide.originalText);
  slide.blocks.main.text = main;
  slide.blocks.accent.text = accent;
}

function saveDraft() {
  const payload = { sourceText: state.sourceText, textOnly: state.textOnly, isDemo: state.isDemo, slides: state.slides, pairIndex: state.pairIndex, liked: state.liked, selectedPair: state.selectedPair, paletteIndex: state.paletteIndex };
  localStorage.setItem(DRAFT_KEY, JSON.stringify(payload));
}

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('is-visible'), 2400);
}

function showScreen(name) {
  const map = { start: '#screenStart', split: '#screenSplit', tinder: '#screenTinder', compare: '#screenCompare', editor: '#screenEditor' };
  Object.values(map).forEach(selector => { $(selector).hidden = true; });
  $(map[name]).hidden = false;
  document.body.classList.toggle('editor-mode', name === 'editor');
  window.scrollTo({ top: 0, behavior: 'auto' });
}

function requestFont(family, weight = 400) {
  const key = `${family}-${weight}`;
  if (loadedFonts.has(key)) return Promise.resolve();
  loadedFonts.add(key);
  return new Promise(resolve => {
    const link = document.createElement('link');
    let settled = false;
    const finish = () => { if (settled) return; settled = true; clearTimeout(timer); resolve(); };
    const timer = setTimeout(finish, 2200);
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family).replace(/%20/g,'+')}:ital,wght@0,${weight};1,${weight}&display=swap`;
    link.onload = finish;
    link.onerror = finish;
    document.head.append(link);
  });
}

async function ensurePair(pair) { await Promise.all([requestFont(pair.head, pair.weight), requestFont(pair.body, 500)]); }

function setCanvasTypography(canvas, pair) {
  canvas.style.setProperty('--font-head', `"${pair.head}"`);
  canvas.style.setProperty('--font-body', `"${pair.body}"`);
  canvas.style.setProperty('--font-weight', pair.weight);
}

function photoForSlide(slide) {
  if (!slide || slide.photoIndex === null || state.textOnly) return null;
  const photos = activePhotos();
  return photos.length ? photos[slide.photoIndex % photos.length] : null;
}

function applyPhoto(photoElement, shadeElement, slide) {
  const photo = photoForSlide(slide);
  const palette = currentPalette();
  photoElement.style.backgroundImage = photo ? `url("${photo.url}")` : 'none';
  photoElement.style.backgroundColor = photo ? palette.colors[3] : palette.colors[(state.activeSlide + 1) % palette.colors.length];
  photoElement.style.filter = `brightness(${(slide?.brightness ?? 92) / 100})`;
  shadeElement.style.background = photo ? `linear-gradient(180deg,rgba(4,6,6,.12),rgba(4,6,6,.04) 34%,rgba(4,6,6,${Math.max(.18,(slide?.shade ?? 46)/100)}))` : 'rgba(0,0,0,.08)';
}

function updateStartValidation() {
  const hasText = state.sourceText.trim().length >= 8;
  const hasVisual = state.photos.length > 0 || state.textOnly;
  $('#startProject').disabled = !(hasText && hasVisual);
  $('#startHint').textContent = !hasText ? 'Добавьте текст' : !hasVisual ? 'Добавьте фото или выберите режим без фото' : 'Можно продолжать';
}

function renderPhotoChips(target, selectable = true) {
  const photos = activePhotos();
  target.innerHTML = photos.map((photo,index) => `<button class="photo-chip ${index === state.coverPhotoIndex ? 'is-cover' : ''}" data-photo="${index}" type="button" aria-label="${index === state.coverPhotoIndex ? 'Обложка: ' : 'Выбрать обложкой: '}${escapeHtml(photo.name)}"><img src="${photo.url}" alt="${escapeHtml(photo.name)}">${index === state.coverPhotoIndex ? '<span>обложка</span>' : ''}</button>`).join('');
  if (!selectable) return;
  $$('[data-photo]', target).forEach(button => button.addEventListener('click', () => {
    state.coverPhotoIndex = Number(button.dataset.photo);
    if (state.slides[0]) state.slides[0].photoIndex = state.coverPhotoIndex;
    renderStart();
    renderSplit();
  }));
}

function renderStart() {
  $('#sourceText').value = state.sourceText;
  $('#textOnlyToggle').checked = state.textOnly;
  $('#startPhotoCount').textContent = `${state.photos.length} / 10`;
  renderPhotoChips($('#startPhotoStrip'));
  const canvas = $('#startPreviewCanvas');
  const photo = state.photos[state.coverPhotoIndex] || null;
  const hasContent = Boolean(photo || state.textOnly) && state.sourceText.trim().length > 0;
  canvas.classList.toggle('has-content', hasContent);
  $('.preview-copy').hidden = !hasContent;
  $('#startPreviewPhoto').style.backgroundImage = photo ? `url("${photo.url}")` : 'none';
  $('#startPreviewPhoto').style.backgroundColor = currentPalette().colors[1];
  $('#startPreviewText').textContent = stripTerminalPeriod(state.sourceText.split(/[.!?]/)[0] || state.sourceText);
  updateStartValidation();
}

function renderSplit() {
  renderPhotoChips($('#photoStrip'));
  $('#segmentCount').textContent = `${state.slides.length} ${cardWord(state.slides.length)}`;
  const maxLength = Math.max(0,...state.slides.map(slide => slide.originalText.length));
  $('#densityStatus').textContent = maxLength > 180 ? 'Есть плотный текст' : 'Плотность нормальная';
  $('#segmentList').innerHTML = state.slides.map((slide,index) => `<article class="segment-card" data-index="${index}"><span class="segment-number">${index + 1}</span><textarea aria-label="Текст карточки ${index + 1}">${escapeHtml(stripTerminalPeriod(slide.originalText))}</textarea><div class="segment-controls"><button data-action="split" type="button"><span class="material-symbols-rounded">call_split</span>Разделить</button>${index ? '<button data-action="merge" type="button"><span class="material-symbols-rounded">merge</span>Объединить выше</button><button data-action="up" type="button" aria-label="Выше"><span class="material-symbols-rounded">arrow_upward</span></button>' : ''}${index < state.slides.length - 1 ? '<button data-action="down" type="button" aria-label="Ниже"><span class="material-symbols-rounded">arrow_downward</span></button>' : ''}<button data-action="remove" type="button" aria-label="Удалить"><span class="material-symbols-rounded">delete</span></button></div></article>`).join('');
  $$('.segment-card').forEach(card => {
    const index = Number(card.dataset.index);
    card.querySelector('textarea').addEventListener('input', event => { applyTextToSlide(state.slides[index], event.target.value); state.sourceText = state.slides.map(slide => slide.originalText).join(' '); saveDraft(); });
    card.querySelectorAll('[data-action]').forEach(button => button.addEventListener('click', () => editSlideStructure(index, button.dataset.action)));
  });
}

function editSlideStructure(index, action) {
  if (action === 'split' && state.slides.length < 10) {
    const text = state.slides[index].originalText;
    const words = text.split(/\s+/);
    if (words.length < 2) return showToast('В этой карточке нечего разделять');
    const cut = Math.ceil(words.length / 2);
    const first = makeSlide(words.slice(0,cut).join(' '), state.slides[index].photoIndex);
    const second = makeSlide(words.slice(cut).join(' '), null);
    state.slides.splice(index,1,first,second);
  }
  if (action === 'merge' && index > 0) {
    const merged = `${state.slides[index - 1].originalText} ${state.slides[index].originalText}`.trim();
    state.slides.splice(index - 1,2,makeSlide(merged,state.slides[index - 1].photoIndex));
  }
  if (action === 'up' && index > 0) [state.slides[index - 1],state.slides[index]] = [state.slides[index],state.slides[index - 1]];
  if (action === 'down' && index < state.slides.length - 1) [state.slides[index + 1],state.slides[index]] = [state.slides[index],state.slides[index + 1]];
  if (action === 'remove' && state.slides.length > 1) state.slides.splice(index,1);
  state.sourceText = state.slides.map(slide => slide.originalText).join(' ');
  state.activeSlide = Math.min(state.activeSlide,state.slides.length - 1);
  renderSplit(); saveDraft();
}

function thumbMarkup(slide,index,mini = false) {
  const photo = photoForSlide(slide);
  const palette = currentPalette();
  const background = photo ? `background-image:url(&quot;${photo.url}&quot;)` : `background-color:${palette.colors[(index + 1) % palette.colors.length]}`;
  if (mini) return `<i style="${background}"></i>`;
  return `<button class="slide-thumb ${index === state.activeSlide ? 'is-active' : ''} ${photo ? '' : 'is-text'}" data-slide="${index}" type="button" style="${background}" aria-label="Карточка ${index + 1}"><span>${index + 1}</span><b>${escapeHtml(slide.blocks.main.text)}</b></button>`;
}

function renderProgress() {
  $('#pairProgress').textContent = `${state.pairIndex + 1} из ${FONT_PAIRS.length}`;
  const chunkStart = Math.floor(state.pairIndex / 4) * 4;
  $('#progressDots').innerHTML = Array.from({length:8},(_,i) => { const absolute = chunkStart + i; const className = absolute === state.pairIndex ? 'is-current' : absolute < state.pairIndex ? 'is-done' : ''; return `<i class="${className}"></i>`; }).join('');
}

function renderPalettes(target = $('#paletteSwatches')) {
  target.innerHTML = PALETTES.map((palette,index) => `<button class="palette-swatch ${index === state.paletteIndex ? 'is-active' : ''}" data-palette="${index}" type="button" aria-label="Палитра ${palette.name}" style="background:${palette.colors[1]}"></button>`).join('');
  $$('[data-palette]',target).forEach(button => button.addEventListener('click', () => { state.paletteIndex = Number(button.dataset.palette); renderTinder(); renderEditor(); saveDraft(); }));
}

function renderTinder() {
  const slide = state.slides[0];
  if (!slide) return;
  const pair = currentPair();
  const requestedIndex = state.pairIndex;
  ensurePair(pair).then(() => { if (state.pairIndex === requestedIndex) setCanvasTypography($('#tinderCanvas'),pair); });
  renderProgress();
  setCanvasTypography($('#tinderCanvas'),pair);
  applyPhoto($('#canvasPhoto'),$('#canvasShade'),slide);
  $('#headlineMain').textContent = slide.blocks.main.text;
  $('#headlineAccent').textContent = slide.blocks.accent.text;
  $('#headlineAccent').hidden = !slide.blocks.accent.text;
  $('#canvasIndex').textContent = `01 / ${String(state.slides.length).padStart(2,'0')}`;
  $('#pairName').textContent = pair.name;
  $('#pairCharacter').textContent = pair.character;
  $('#cardCount').textContent = `${state.slides.length} ${cardWord(state.slides.length)}`;
  $('#miniStoryboard').innerHTML = state.slides.map((item,index) => thumbMarkup(item,index,true)).join('');
  renderPalettes();
  $('#likedCount').textContent = state.liked.length;
  $('#tinderNext').hidden = state.liked.length === 0;
  $('#undoChoice').disabled = state.choiceHistory.length === 0;
  const canvas = $('#tinderCanvas');
  canvas.style.transform = ''; canvas.style.opacity = '';
  $('.stamp-no').style.opacity = 0; $('.stamp-yes').style.opacity = 0;
}

function chooseFont(liked) {
  const index = state.pairIndex;
  state.choiceHistory.push({index,liked});
  if (liked && !state.liked.includes(index)) state.liked.push(index);
  state.pairIndex = (state.pairIndex + 1) % FONT_PAIRS.length;
  renderTinder(); saveDraft();
  if (liked) showToast(`Стиль сохранён · всего ${state.liked.length}`);
}

function undoChoice() {
  const last = state.choiceHistory.pop();
  if (!last) return;
  state.pairIndex = last.index;
  if (last.liked) state.liked = state.liked.filter(index => index !== last.index);
  renderTinder(); saveDraft();
}

function updateSwipe(delta) {
  const card = $('#tinderCanvas');
  const limited = Math.max(-150,Math.min(150,delta));
  card.style.transform = `translateX(${limited}px) rotate(${limited/28}deg)`;
  $('.stamp-no').style.opacity = Math.max(0,-limited/90);
  $('.stamp-yes').style.opacity = Math.max(0,limited/90);
}

async function renderCompare() {
  const indexes = state.liked.length ? state.liked : [state.pairIndex];
  const slide = state.slides[0];
  const photo = photoForSlide(slide);
  $('#finalistGrid').innerHTML = indexes.map(index => {
    const pair = FONT_PAIRS[index];
    const background = photo ? `background-image:url('${photo.url}')` : `background:${currentPalette().colors[1]}`;
    return `<button class="finalist-card ${state.selectedPair === index ? 'is-selected' : ''}" data-pair="${index}" type="button"><span class="finalist-preview" style="${background}"><h2 style="font-family:'${pair.head}',serif;font-weight:${pair.weight}">${escapeHtml(slide.blocks.main.text)}</h2><em style="font-family:'${pair.body}',serif">${escapeHtml(slide.blocks.accent.text)}</em></span><span class="finalist-name"><span>${escapeHtml(pair.name)}</span><b>${state.selectedPair === index ? 'Выбрано' : 'Выбрать'}</b></span></button>`;
  }).join('');
  await Promise.all(indexes.map(index => ensurePair(FONT_PAIRS[index])));
  $$('.finalist-card').forEach(button => button.addEventListener('click', () => { state.selectedPair = Number(button.dataset.pair); renderCompare(); $('#compareFooter').hidden = false; $('#selectedStyleName').textContent = FONT_PAIRS[state.selectedPair].name; saveDraft(); }));
  $('#compareFooter').hidden = state.selectedPair === null;
  if (state.selectedPair !== null) $('#selectedStyleName').textContent = FONT_PAIRS[state.selectedPair].name;
}

function renderEditorFilmstrip() {
  $('#editorFilmstrip').innerHTML = state.slides.map((slide,index) => thumbMarkup(slide,index)).join('');
  $$('#editorFilmstrip [data-slide]').forEach(button => button.addEventListener('click', () => { commitBlockText(); state.activeSlide = Number(button.dataset.slide); renderEditor(); }));
}

function applyBlockStyle(element,block) {
  const canvasWidth = $('#editorCanvas').clientWidth || 360;
  element.style.left = `${block.x}%`;
  element.style.top = `${block.y}%`;
  element.style.width = `${block.width}%`;
  element.style.fontSize = `${Math.max(14,block.size / 1080 * canvasWidth)}px`;
  element.style.color = block.color;
  element.style.textAlign = block.align;
}

function renderEditor() {
  if ($('#screenEditor').hidden) return;
  const slide = currentSlide();
  if (!slide) return;
  const pair = chosenPair();
  ensurePair(pair).then(() => setCanvasTypography($('#editorCanvas'),pair));
  setCanvasTypography($('#editorCanvas'),pair);
  applyPhoto($('#editorPhoto'),$('#editorShade'),slide);
  $('#editorIndex').textContent = `${String(state.activeSlide + 1).padStart(2,'0')} / ${String(state.slides.length).padStart(2,'0')}`;
  ['main','accent'].forEach(key => {
    const element = $(`#${key}Block`);
    const block = slide.blocks[key];
    if (document.activeElement !== element) element.textContent = block.text;
    element.dataset.placeholder = key === 'main' ? 'Основной текст' : 'Добавить акцент';
    element.classList.toggle('is-selected',state.selectedBlock === key);
    applyBlockStyle(element,block);
  });
  $('#editorBrightness').value = slide.brightness;
  $('#editorShadeRange').value = slide.shade;
  $('#editorGuideToggle').checked = state.showGuides;
  $('#editorGuides').hidden = !state.showGuides;
  renderEditorFilmstrip();
  renderPalettes($('#editorPalettes'));
  renderSelectedBlockControls();
  $('#deleteCard').disabled = state.slides.length <= 1;
}

function renderSelectedBlockControls() {
  const slide = currentSlide();
  if (!slide) return;
  const block = slide.blocks[state.selectedBlock];
  $('#selectedBlockName').textContent = state.selectedBlock === 'main' ? 'Основной текст' : 'Акцентный текст';
  $('#blockSize').value = block.size;
  $('#blockColor').value = block.color;
  $$('.align-control button').forEach(button => button.classList.toggle('is-active',button.dataset.align === block.align));
}

function commitBlockText() {
  const slide = currentSlide();
  if (!slide) return;
  ['main','accent'].forEach(key => { const element = $(`#${key}Block`); if (element) slide.blocks[key].text = stripTerminalPeriod(element.innerText.replace(/\n{3,}/g,'\n\n')); });
  slide.originalText = [slide.blocks.main.text,slide.blocks.accent.text].filter(Boolean).join(' ');
  state.sourceText = state.slides.map(item => item.originalText).join(' ');
  saveDraft();
}

function selectEditorBlock(key) {
  state.selectedBlock = key;
  $$('.dock-tab').forEach(button => button.classList.toggle('is-active',button.dataset.panel === 'text'));
  $('#textPanel').hidden = false; $('#photoPanel').hidden = true; $('#stylePanel').hidden = true;
  renderEditor();
}

function startBlockDrag(event) {
  const key = event.currentTarget.dataset.block;
  selectEditorBlock(key);
  const block = currentSlide().blocks[key];
  state.drag = { key, startX:event.clientX, startY:event.clientY, baseX:block.x, baseY:block.y, moved:false, pointerId:event.pointerId };
  event.currentTarget.setPointerCapture(event.pointerId);
}

function moveBlock(event) {
  if (!state.drag || state.drag.pointerId !== event.pointerId) return;
  const canvas = $('#editorCanvas').getBoundingClientRect();
  const dx = (event.clientX - state.drag.startX) / canvas.width * 100;
  const dy = (event.clientY - state.drag.startY) / canvas.height * 100;
  if (Math.abs(dx) + Math.abs(dy) < 1.4 && !state.drag.moved) return;
  state.drag.moved = true;
  event.preventDefault();
  const block = currentSlide().blocks[state.drag.key];
  block.x = Math.max(4,Math.min(96 - block.width,state.drag.baseX + dx));
  block.y = Math.max(8,Math.min(90,state.drag.baseY + dy));
  applyBlockStyle(event.currentTarget,block);
  $('#dragTip').classList.add('is-hidden');
}

function endBlockDrag(event) {
  if (!state.drag || state.drag.pointerId !== event.pointerId) return;
  if (!state.drag.moved) event.currentTarget.focus();
  state.drag = null;
  saveDraft();
}

function editorPanel(name) {
  $$('.dock-tab').forEach(button => button.classList.toggle('is-active',button.dataset.panel === name));
  $('#textPanel').hidden = name !== 'text'; $('#photoPanel').hidden = name !== 'photo'; $('#stylePanel').hidden = name !== 'style';
}

function addEditorCard() {
  if (state.slides.length >= 10) return showToast('Максимум 10 карточек');
  state.slides.splice(state.activeSlide + 1,0,makeSlide('Новая карточка',null));
  state.activeSlide += 1; state.selectedBlock = 'main'; renderEditor(); saveDraft();
}

function duplicateEditorCard() {
  if (state.slides.length >= 10) return showToast('Максимум 10 карточек');
  commitBlockText();
  const copy = structuredClone(currentSlide());
  copy.id = `slide-${Date.now()}-${slideSeed++}`;
  state.slides.splice(state.activeSlide + 1,0,copy); state.activeSlide += 1; renderEditor(); saveDraft();
}

function deleteEditorCard() {
  if (state.slides.length <= 1) return;
  state.slides.splice(state.activeSlide,1); state.activeSlide = Math.max(0,state.activeSlide - 1); renderEditor(); saveDraft();
}

function loadImage(url) { return new Promise((resolve,reject) => { const image = new Image(); image.onload = () => resolve(image); image.onerror = reject; image.src = url; }); }
function drawImageCover(ctx,image,width,height) { const scale = Math.max(width/image.width,height/image.height); const drawWidth=image.width*scale, drawHeight=image.height*scale; ctx.drawImage(image,(width-drawWidth)/2,(height-drawHeight)/2,drawWidth,drawHeight); }

function wrapManualLines(ctx,text,maxWidth) {
  const result = [];
  String(text || '').split('\n').forEach(manual => {
    const words = manual.trim().split(/\s+/).filter(Boolean);
    if (!words.length) { result.push(''); return; }
    let line = '';
    words.forEach(word => { const test = line ? `${line} ${word}` : word; if (line && ctx.measureText(test).width > maxWidth) { result.push(line); line = word; } else line = test; });
    if (line) result.push(line);
  });
  return result;
}

function drawBlock(ctx,block,family,weight,italic=false) {
  const x = block.x / 100 * 1080, y = block.y / 100 * 1350, width = block.width / 100 * 1080;
  ctx.fillStyle = block.color;
  ctx.textBaseline = 'top';
  ctx.textAlign = block.align;
  ctx.font = `${italic ? 'italic ' : ''}${weight} ${block.size}px "${family}"`;
  const anchor = block.align === 'center' ? x + width/2 : block.align === 'right' ? x + width : x;
  wrapManualLines(ctx,stripTerminalPeriod(block.text),width).slice(0,6).forEach((line,index) => ctx.fillText(line,anchor,y + index * block.size * .92));
}

async function renderSlideCanvas(index) {
  const slide = state.slides[index];
  const pair = chosenPair();
  await ensurePair(pair);
  if (document.fonts?.ready) await Promise.race([document.fonts.ready,new Promise(resolve => setTimeout(resolve,2200))]);
  const canvas = document.createElement('canvas'); canvas.width=1080; canvas.height=1350;
  const ctx = canvas.getContext('2d');
  const palette = currentPalette();
  ctx.fillStyle = palette.colors[(index + 1) % palette.colors.length]; ctx.fillRect(0,0,1080,1350);
  const photo = photoForSlide(slide);
  if (photo) { const image = await loadImage(photo.url); ctx.save(); ctx.filter = `brightness(${slide.brightness}%)`; drawImageCover(ctx,image,1080,1350); ctx.restore(); const shade = ctx.createLinearGradient(0,0,0,1350); shade.addColorStop(0,'rgba(4,6,6,.10)'); shade.addColorStop(.38,'rgba(4,6,6,.03)'); shade.addColorStop(1,`rgba(4,6,6,${Math.max(.18,slide.shade/100)})`); ctx.fillStyle=shade; ctx.fillRect(0,0,1080,1350); }
  ctx.fillStyle='rgba(255,255,255,.84)'; ctx.font='500 22px "Onest"'; ctx.textAlign='left'; ctx.fillText('ВАША ИСТОРИЯ',72,72); ctx.textAlign='right'; ctx.fillText(`${String(index+1).padStart(2,'0')} / ${String(state.slides.length).padStart(2,'0')}`,1008,72);
  drawBlock(ctx,slide.blocks.main,pair.head,pair.weight,false);
  drawBlock(ctx,slide.blocks.accent,pair.body,500,true);
  return canvas;
}

function canvasBlob(canvas) { return new Promise(resolve => canvas.toBlob(resolve,'image/png')); }
function revokeSaveUrls() { saveUrls.forEach(url => URL.revokeObjectURL(url)); saveUrls=[]; }

async function prepareAllBlobs() {
  const blobs=[];
  for (let index=0; index<state.slides.length; index += 1) { $('#saveStatus').textContent = `Подготавливаю ${index+1} из ${state.slides.length}…`; blobs.push(await canvasBlob(await renderSlideCanvas(index))); }
  return blobs;
}

function guardDemoExport() {
  if (!state.isDemo) return false;
  $('#saveStatus').textContent = 'Это демонстрация с чужими фотографиями. Вернитесь в начало и загрузите свои — демо нельзя экспортировать.';
  return true;
}

async function shareCarousel() {
  if (guardDemoExport()) return;
  try {
    const blobs = await prepareAllBlobs();
    const files = blobs.map((blob,index) => new File([blob],`carousel-${String(index+1).padStart(2,'0')}.png`,{type:'image/png'}));
    if (!navigator.share || !navigator.canShare?.({files})) { $('#saveStatus').textContent = 'Этот браузер не умеет передавать несколько изображений. Ниже можно сохранить карточки по одной.'; renderSaveLinks(blobs); return; }
    $('#saveStatus').textContent = 'Открываю системное меню…';
    await navigator.share({files,title:'Моя карусель'});
    $('#saveStatus').textContent = 'Системное меню закрыто. Если вы выбрали сохранение, изображения находятся в выбранном приложении.';
  } catch (error) {
    if (error?.name === 'AbortError') $('#saveStatus').textContent = 'Сохранение отменено. Можно выбрать другой способ ниже.';
    else { console.error(error); $('#saveStatus').textContent = 'Не удалось открыть системное меню. Сохраните карточки по одной.'; }
  }
}

function renderSaveLinks(blobs) {
  revokeSaveUrls();
  $('#saveLinks').innerHTML = blobs.map((blob,index) => { const url=URL.createObjectURL(blob); saveUrls.push(url); return `<a class="save-link" href="${url}" download="carousel-${String(index+1).padStart(2,'0')}.png"><span>Карточка ${index+1}</span><b>Скачать PNG</b></a>`; }).join('');
  $('#saveStatus').textContent = 'Карточки подготовлены. Нажимайте «Скачать PNG» — браузер сохранит их в «Загрузки» или «Файлы».';
}

async function prepareIndividual() {
  if (guardDemoExport()) return;
  try { renderSaveLinks(await prepareAllBlobs()); } catch (error) { console.error(error); $('#saveStatus').textContent='Не удалось подготовить изображения.'; }
}

function downloadBlob(blob,filename) { const link=document.createElement('a'); link.href=URL.createObjectURL(blob); link.download=filename; link.click(); setTimeout(()=>URL.revokeObjectURL(link.href),1800); }

async function downloadZip() {
  if (guardDemoExport()) return;
  try {
    if (!window.JSZip) throw new Error('JSZip unavailable');
    const blobs=await prepareAllBlobs(); const zip=new JSZip();
    blobs.forEach((blob,index)=>zip.file(`carousel-${String(index+1).padStart(2,'0')}.png`,blob));
    downloadBlob(await zip.generateAsync({type:'blob'}),'carousel-studio.zip');
    $('#saveStatus').textContent='Браузер начал загрузку ZIP. Ищите файл carousel-studio.zip в «Загрузки» или «Файлы».';
  } catch (error) { console.error(error); $('#saveStatus').textContent='Не удалось начать загрузку ZIP.'; }
}

function openSaveDialog() {
  commitBlockText(); revokeSaveUrls(); $('#saveLinks').innerHTML='';
  $('#saveStatus').textContent = state.isDemo ? 'Это демонстрация. Чтобы сохранить карусель, загрузите свои фотографии на первом экране.' : `Будет подготовлено ${state.slides.length} PNG 1080 × 1350.`;
  $('#shareCarousel').disabled=state.isDemo; $('#prepareIndividual').disabled=state.isDemo; $('#downloadZip').disabled=state.isDemo;
  $('#saveDialog').showModal();
}

$('#uploadPhotos').addEventListener('click',()=>$('#photoInput').click());
$('#addMorePhotos').addEventListener('click',()=>$('#photoInput').click());
$('#replacePhoto').addEventListener('click',()=>{ state.replaceSlide=state.activeSlide; $('#photoInput').click(); });
$('#photoInput').addEventListener('change',event => {
  const files=[...event.target.files].slice(0,Math.max(0,10-state.photos.length));
  files.forEach(file => state.photos.push({url:URL.createObjectURL(file),name:file.name,local:true}));
  if (files.length) {
    state.isDemo=false; state.textOnly=false;
    if (state.replaceSlide !== null && state.slides[state.replaceSlide]) state.slides[state.replaceSlide].photoIndex=state.photos.length-files.length;
  }
  state.replaceSlide=null;
  renderStart(); renderSplit(); event.target.value='';
});
$('#sourceText').addEventListener('input',event => { state.sourceText=event.target.value; renderStart(); });
$('#textOnlyToggle').addEventListener('change',event => { state.textOnly=event.target.checked; renderStart(); });
$('#startProject').addEventListener('click',()=>{ createSlides(segmentText(state.sourceText)); renderSplit(); showScreen('split'); saveDraft(); });
$('#openDemo').addEventListener('click',()=>{ state.isDemo=true; state.textOnly=false; state.sourceText=DEMO_TEXT; state.coverPhotoIndex=0; createSlides(segmentText(DEMO_TEXT)); renderSplit(); showScreen('split'); });
$('#backToStart').addEventListener('click',()=>{ renderStart(); showScreen('start'); });
$('#autoSplit').addEventListener('click',()=>{ createSlides(segmentText(state.sourceText)); renderSplit(); saveDraft(); });
$('#addTextCard').addEventListener('click',()=>{ if(state.slides.length>=10)return showToast('Максимум 10 карточек'); state.slides.push(makeSlide('Новая карточка',null)); renderSplit(); saveDraft(); });
$('#confirmSplit').addEventListener('click',()=>{ if(!state.slides.length)return showToast('Добавьте текст'); state.pairIndex=0; state.liked=[]; state.choiceHistory=[]; state.selectedPair=null; renderTinder(); showScreen('tinder'); saveDraft(); });
$('#openSplit').addEventListener('click',()=>{ renderSplit(); showScreen('split'); });
$('#editSplit').addEventListener('click',()=>{ renderSplit(); showScreen('split'); });
$('#rejectFont').addEventListener('click',()=>chooseFont(false));
$('#likeFont').addEventListener('click',()=>chooseFont(true));
$('#undoChoice').addEventListener('click',undoChoice);
$('#compareSelected').addEventListener('click',async()=>{ await renderCompare(); showScreen('compare'); });
$('#backFromCompare').addEventListener('click',()=>{ renderTinder(); showScreen('tinder'); });
$('#openEditor').addEventListener('click',()=>{ state.activeSlide=0; state.selectedBlock='main'; showScreen('editor'); renderEditor(); });
$('#backToCompare').addEventListener('click',async()=>{ commitBlockText(); await renderCompare(); showScreen('compare'); });
$('#fontInfo').addEventListener('click',()=>{ const pair=currentPair(); $('#dialogPairName').textContent=pair.name; $('#dialogPairText').textContent=`${pair.character}. Кириллица и PNG-экспорт проверяются до публикации.`; $('#infoDialog').showModal(); });
$('#closeInfo').addEventListener('click',()=>$('#infoDialog').close());
$('#customPaletteButton').addEventListener('click',()=>$('#paletteDialog').showModal());
$('#editorCustomPalette').addEventListener('click',()=>$('#paletteDialog').showModal());
$('#closePalette').addEventListener('click',()=>$('#paletteDialog').close());
$('#applyCustomPalette').addEventListener('click',()=>{ PALETTES.push({name:'Моя палитра',colors:[$('#customLight').value,$('#customAccent').value,$('#customMuted').value,$('#customDark').value]}); state.paletteIndex=PALETTES.length-1; $('#paletteDialog').close(); renderTinder(); renderEditor(); saveDraft(); });

const tinderCanvas=$('#tinderCanvas');
tinderCanvas.addEventListener('pointerdown',event=>{ state.pointerStart=event.clientX; tinderCanvas.setPointerCapture(event.pointerId); });
tinderCanvas.addEventListener('pointermove',event=>{ if(state.pointerStart===null)return; updateSwipe(event.clientX-state.pointerStart); });
tinderCanvas.addEventListener('pointerup',event=>{ if(state.pointerStart===null)return; const delta=event.clientX-state.pointerStart; state.pointerStart=null; if(Math.abs(delta)>72)chooseFont(delta>0); else renderTinder(); });
tinderCanvas.addEventListener('pointercancel',()=>{ state.pointerStart=null; renderTinder(); });
tinderCanvas.addEventListener('keydown',event=>{ if(event.key==='ArrowLeft')chooseFont(false); if(event.key==='ArrowRight')chooseFont(true); });

['main','accent'].forEach(key=>{
  const element=$(`#${key}Block`);
  element.addEventListener('pointerdown',startBlockDrag);
  element.addEventListener('pointermove',moveBlock);
  element.addEventListener('pointerup',endBlockDrag);
  element.addEventListener('pointercancel',()=>{state.drag=null;});
  element.addEventListener('focus',()=>selectEditorBlock(key));
  element.addEventListener('input',()=>{ const slide=currentSlide(); slide.blocks[key].text=element.innerText; slide.originalText=[slide.blocks.main.text,slide.blocks.accent.text].filter(Boolean).join(' '); saveDraft(); renderEditorFilmstrip(); });
  element.addEventListener('blur',()=>{ element.textContent=stripTerminalPeriod(element.innerText); commitBlockText(); });
});
$('#blockSize').addEventListener('input',event=>{ currentSlide().blocks[state.selectedBlock].size=Number(event.target.value); applyBlockStyle($(`#${state.selectedBlock}Block`),currentSlide().blocks[state.selectedBlock]); saveDraft(); });
$('#blockColor').addEventListener('input',event=>{ currentSlide().blocks[state.selectedBlock].color=event.target.value; applyBlockStyle($(`#${state.selectedBlock}Block`),currentSlide().blocks[state.selectedBlock]); saveDraft(); });
$$('.align-control button').forEach(button=>button.addEventListener('click',()=>{ currentSlide().blocks[state.selectedBlock].align=button.dataset.align; renderEditor(); saveDraft(); }));
$$('.dock-tab').forEach(button=>button.addEventListener('click',()=>editorPanel(button.dataset.panel)));
$('#editorBrightness').addEventListener('input',event=>{ currentSlide().brightness=Number(event.target.value); applyPhoto($('#editorPhoto'),$('#editorShade'),currentSlide()); saveDraft(); });
$('#editorShadeRange').addEventListener('input',event=>{ currentSlide().shade=Number(event.target.value); applyPhoto($('#editorPhoto'),$('#editorShade'),currentSlide()); saveDraft(); });
$('#editorGuideToggle').addEventListener('change',event=>{ state.showGuides=event.target.checked; $('#editorGuides').hidden=!state.showGuides; });
$('#addEditorCard').addEventListener('click',addEditorCard);
$('#duplicateCard').addEventListener('click',duplicateEditorCard);
$('#deleteCard').addEventListener('click',deleteEditorCard);
window.addEventListener('resize',()=>{ if(!$('#screenEditor').hidden)renderEditor(); });

$('#openSave').addEventListener('click',openSaveDialog);
$('#closeSave').addEventListener('click',()=>{ $('#saveDialog').close(); revokeSaveUrls(); });
$('#shareCarousel').addEventListener('click',shareCarousel);
$('#prepareIndividual').addEventListener('click',prepareIndividual);
$('#downloadZip').addEventListener('click',downloadZip);

window.addEventListener('beforeunload',()=>{ state.photos.forEach(photo=>{if(photo.local)URL.revokeObjectURL(photo.url);}); revokeSaveUrls(); });
if('serviceWorker' in navigator && location.protocol!=='file:')navigator.serviceWorker.register('./sw.js').catch(error=>console.warn('Service worker:',error));

renderStart();
showScreen('start');
