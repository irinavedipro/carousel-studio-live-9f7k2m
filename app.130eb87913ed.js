const $ = (selector,root=document) => root.querySelector(selector);
const $$ = (selector,root=document) => [...root.querySelectorAll(selector)];

const ICON_GLYPHS = {
  add: '+', add_photo_alternate: '▣+', arrow_back: '←', arrow_forward: '→', auto_awesome: '✦',
  chevron_right: '›', close: '×', content_copy: '▣', delete: '⌫', favorite: '♥',
  format_align_left: '≡', format_align_center: '≡', format_align_right: '≡', image: '▣', info: 'ⓘ',
  ios_share: '↥', palette: '◉', text_fields: 'Tt', undo: '↶', call_split: '⑂', merge: '↥',
  arrow_upward: '↑', arrow_downward: '↓'
};
function hydrateIcons(root=document) { $$('.material-symbols-rounded',root).forEach(icon => { const name=icon.textContent.trim(); if(ICON_GLYPHS[name]) icon.textContent=ICON_GLYPHS[name]; icon.setAttribute('aria-hidden','true'); }); }
hydrateIcons();

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
  { name: 'Чернила', colors: ['#f0f0eb', '#48505c', '#7d242c', '#101313'] },
  { name: 'Пыльная роза', colors: ['#f6e7e3', '#b46f72', '#8b7770', '#35282b'] },
  { name: 'Олива', colors: ['#eee8d8', '#7a8060', '#b08b57', '#252820'] },
  { name: 'Кобальт', colors: ['#f1eee4', '#315a9b', '#d06c4e', '#172136'] },
  { name: 'Слива', colors: ['#f4e8ee', '#7f4667', '#ba8c72', '#281d29'] },
  { name: 'Терракота', colors: ['#f4e6d7', '#b85f43', '#788071', '#30241f'] },
  { name: 'Мята', colors: ['#edf4eb', '#5f8f7a', '#d4a85e', '#19302b'] },
  { name: 'Лимон и графит', colors: ['#f3efce', '#d2c333', '#80847c', '#202322'] },
  { name: 'Ночной синий', colors: ['#e7edf4', '#4f6a96', '#b68a6b', '#151d2b'] }
];

const COMPOSITIONS = [
  { id:'editorial', name:'Журнал', main:{x:8,y:56,width:84,size:112,align:'left'}, accent:{x:8,y:74,width:84,size:88,align:'left'} },
  { id:'center', name:'По центру', main:{x:10,y:38,width:80,size:104,align:'center'}, accent:{x:14,y:61,width:72,size:76,align:'center'} },
  { id:'bottom', name:'Снизу', main:{x:8,y:67,width:84,size:96,align:'left'}, accent:{x:8,y:82,width:84,size:68,align:'left'} },
  { id:'quote', name:'Цитата', main:{x:12,y:29,width:76,size:82,align:'center'}, accent:{x:18,y:69,width:64,size:62,align:'center'} },
  { id:'poster', name:'Плакат', main:{x:5,y:45,width:90,size:132,align:'left'}, accent:{x:52,y:78,width:42,size:54,align:'right'} },
  { id:'minimal', name:'Минимал', main:{x:10,y:18,width:72,size:72,align:'left'}, accent:{x:10,y:82,width:70,size:52,align:'left'} }
];

const DEMO_TEXT = 'Личная свобода начинается с ясности. Система должна помогать, а не наказывать. Маленькие шаги меняют всё. Я выбираю себя каждый день. Больше жизни в моменте. И это только начало. В гармонии с собой.';
const DRAFT_KEY = 'carousel-studio-1.2-draft';
const loadedFonts = new Map();
let demoSnapshot;
let slideSeed = 1;
let saveUrls = [];

const state = {
  sourceText: '',
  originalInputText: '',
  preparedText: false,
  builtPreparedText: false,
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
state.screen = 'start';
let draftTimer;
let pendingDraft;
let draftActive=false;
let draftWrite = Promise.resolve();
const draftDatabase = new Promise((resolve, reject) => {
  const request = indexedDB.open('carousel-studio', 1);
  request.onupgradeneeded = () => request.result.createObjectStore('drafts');
  request.onsuccess = () => resolve(request.result);
  request.onerror = () => reject(request.error);
});
draftDatabase.catch(() => {});

function activePhotos() { return state.isDemo ? BUILT_IN_PHOTOS : state.photos; }
function currentPair() { return FONT_PAIRS[state.pairIndex % FONT_PAIRS.length]; }
function chosenPair() { return FONT_PAIRS[state.selectedPair ?? state.pairIndex] || FONT_PAIRS[0]; }
function currentPalette() { return PALETTES[state.paletteIndex % PALETTES.length]; }
function currentSlide() { return state.slides[state.activeSlide] || null; }
function stripTerminalPeriod(text) { return String(text || '').replace(/\s*\.\s*$/u, '').trim(); }
function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char])); }
function cardWord(number) { if (number % 10 === 1 && number % 100 !== 11) return 'карточка'; if ([2,3,4].includes(number % 10) && ![12,13,14].includes(number % 100)) return 'карточки'; return 'карточек'; }

function splitHeadline(text, prepared = false) {
  const clean = String(text || '').trim();
  const explicit = clean.split(/\n+/).map(part => part.trim()).filter(Boolean);
  if (explicit.length > 1) return [stripTerminalPeriod(explicit[0]), explicit.slice(1).join('\n')];
  if (prepared) return [stripTerminalPeriod(clean), ''];
  const comma = clean.indexOf(',');
  if (comma > 10 && comma < clean.length - 4) return [clean.slice(0, comma + 1), clean.slice(comma + 1).trim()];
  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length < 5) return [stripTerminalPeriod(clean), ''];
  const cut = Math.max(2, Math.ceil(words.length * .58));
  return [words.slice(0, cut).join(' '), words.slice(cut).join(' ')];
}

function makeSlide(text, photoIndex = null, prepared = state.preparedText) {
  const [main, accent] = splitHeadline(text, prepared);
  return {
    id: `slide-${Date.now()}-${slideSeed++}`,
    originalText: String(text || '').trim(),
    prepared,
    photoIndex,
    layout: 'editorial',
    backgroundColor: null,
    brightness: 92,
    shade: 46,
    blocks: {
      main: { text: main, x: 8, y: 56, width: 84, size: 112, color: '#ffffff', align: 'left' },
      accent: { text: accent, x: 8, y: 74, width: 84, size: 88, color: '#ffffff', align: 'left' }
    }
  };
}

function segmentText(text, prepared = false) {
  const clean = String(text || '').replace(/\r/g, '').trim();
  if (!clean) return [];
  const forced = clean.split(/\n\s*---\s*\n/).map(part => part.trim()).filter(Boolean);
  if (prepared) return forced.length > 1 ? forced : clean.split(/\n\s*\n/).map(part=>part.trim()).filter(Boolean);
  if (forced.length > 1) return forced.length <= 10 ? forced : [...forced.slice(0,9), forced.slice(9).join('\n\n')];
  const paragraphs = clean.split(/\n{2,}/).map(part => part.trim()).filter(Boolean);
  const segmenter = typeof Intl.Segmenter === 'function' ? new Intl.Segmenter('ru', { granularity: 'sentence' }) : null;
  const sentences = segmenter ? [...segmenter.segment(clean)].map(item => item.segment.trim()).filter(Boolean) : clean.match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map(item => item.trim()) || [clean];
  const units=(paragraphs.length>1 ? paragraphs : sentences).flatMap(part=>{
    if(part.length<=180)return [part];
    const chunks=[];let chunk='';
    for(const token of part.match(/\S+\s*/gu) || []){
      if(chunk && chunk.length+token.length>180){chunks.push(chunk.trim());chunk='';}
      chunk+=token;
    }
    if(chunk.trim())chunks.push(chunk.trim());return chunks;
  });
  if(units.length<=10)return units;
  return Array.from({length:10},(_,i)=>units.slice(Math.floor(i*units.length/10),Math.floor((i+1)*units.length/10)).join('\n\n'));
}

function createSlides(parts) {
  const photos = activePhotos();
  state.slides = parts.slice(0,10).map((part, index) => makeSlide(part, state.textOnly || index >= photos.length ? null : (state.coverPhotoIndex + index) % photos.length));
  state.activeSlide = 0;
}

function applyTextToSlide(slide, text) {
  slide.originalText = String(text || '').trim();
  const [main, accent] = splitHeadline(slide.originalText, slide.prepared);
  slide.blocks.main.text = main;
  slide.blocks.accent.text = accent;
}

function saveDraft() {
  if (state.isDemo) return;
  draftActive=true;
  $('#draftStatus').textContent = 'Сохраняю черновик…';
  clearTimeout(draftTimer);
  draftTimer = setTimeout(flushDraft, 300);
}

function draftPayload() {
  return { version: 2, sourceText: state.sourceText, originalInputText:state.originalInputText, preparedText:state.preparedText, builtPreparedText:state.builtPreparedText, textOnly: state.textOnly, slides: structuredClone(state.slides), photos: state.photos.map(photo => ({ name: photo.name, blob: photo.blob })), coverPhotoIndex: state.coverPhotoIndex, activeSlide: state.activeSlide, pairIndex: state.pairIndex, liked: [...state.liked], choiceHistory: structuredClone(state.choiceHistory), selectedPair: state.selectedPair, paletteIndex: state.paletteIndex, customPalettes: PALETTES.slice(12), screen: state.screen };
}

function flushDraft() {
  clearTimeout(draftTimer);
  if (state.isDemo || !draftActive) return draftWrite;
  const payload = draftPayload();
  draftWrite = draftWrite.catch(() => {}).then(async () => {
    const db = await draftDatabase;
    await new Promise((resolve,reject) => {
      const tx = db.transaction('drafts','readwrite');
      tx.objectStore('drafts').put(payload,'current');
      tx.oncomplete = resolve; tx.onerror = () => reject(tx.error);
    });
    $('#draftStatus').textContent = 'Черновик сохранён на этом устройстве';
  }).catch(() => { $('#draftStatus').textContent = 'Автосохранение недоступно в этом браузере'; });
  return draftWrite;
}

async function readDraft() {
  try {
    const db = await draftDatabase;
    pendingDraft = await new Promise((resolve,reject) => {
      const request = db.transaction('drafts').objectStore('drafts').get('current');
      request.onsuccess = () => resolve(request.result); request.onerror = () => reject(request.error);
    });
    if (!draftActive && pendingDraft?.version === 2 && (pendingDraft.sourceText || pendingDraft.photos?.length)) $('#resumeDraft').hidden = false;
  } catch { $('#draftStatus').textContent = 'Автосохранение недоступно в этом браузере'; }
}

function resumeDraft() {
  if (!pendingDraft) return;
  draftActive=true;
  const saved = pendingDraft;
  PALETTES.splice(12,PALETTES.length-12,...(saved.customPalettes || []));
  Object.assign(state, saved, { isDemo:false, photos:(saved.photos || []).filter(photo => photo.blob).map(photo => ({...photo,url:URL.createObjectURL(photo.blob),local:true})), selectedBlock:'main', drag:null, pointerStart:null, replaceSlide:null });
  state.slides.forEach(slide=>{if(slide.photoOverride?.blob)slide.photoOverride.url=URL.createObjectURL(slide.photoOverride.blob);});
  const screen = state.slides.length && ['split','tinder','compare','editor'].includes(saved.screen) ? saved.screen : 'start';
  $('#resumeDraft').hidden = true;
  renderStart(); renderSplit(); renderTinder(); showScreen(screen);
  if (screen === 'compare') renderCompare();
  if (screen === 'editor') renderEditor();
  $('#draftStatus').textContent = 'Черновик восстановлен';
  showToast('Черновик и фотографии восстановлены');
}

function showToast(message) {
  const toast = $('#toast');
  const canvas=state.screen==='editor' ? $('#editorCanvas') : state.screen==='tinder' ? $('#tinderCanvas') : null;
  toast.style.top=canvas ? `${Math.max(12,canvas.getBoundingClientRect().top+12)}px` : '';
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
  state.screen = name;
  window.scrollTo({ top: 0, behavior: 'auto' });
  $(map[name]).querySelector('h1')?.focus({preventScroll:true});
}

function requestFont(family, weight = 400) {
  const key = `${family}-${weight}`;
  if (loadedFonts.has(key)) return loadedFonts.get(key);
  const ready=Promise.all([document.fonts.load(`${weight} 48px "${family}"`,'История'),document.fonts.load(`italic ${weight} 48px "${family}"`,'История')]);
  loadedFonts.set(key,ready);
  return ready;
}

async function ensurePair(pair) { await Promise.all([requestFont(pair.head, pair.weight), requestFont(pair.body, 500)]); }

function setCanvasTypography(canvas, pair) {
  canvas.style.setProperty('--font-head', `"${pair.head}"`);
  canvas.style.setProperty('--font-body', `"${pair.body}"`);
  canvas.style.setProperty('--font-weight', pair.weight);
  $$('.canvas-meta',canvas).forEach(meta=>meta.style.fontSize=`${22/1080*(canvas.clientWidth || 320)}px`);
}

function photoForSlide(slide) {
  if (slide?.photoOverride) return slide.photoOverride;
  if (!slide || slide.photoIndex === null) return null;
  const photos = activePhotos();
  return photos.length ? photos[slide.photoIndex % photos.length] : null;
}

function applyPhoto(photoElement, shadeElement, slide, index=state.activeSlide) {
  const photo = photoForSlide(slide);
  const palette = currentPalette();
  photoElement.style.backgroundImage = photo ? `url("${photo.url}")` : 'none';
  photoElement.style.backgroundColor = photo ? palette.colors[3] : (slide?.backgroundColor || palette.colors[(index + 1) % palette.colors.length]);
  photoElement.style.filter = photo ? `brightness(${(slide?.brightness ?? 92) / 100})` : 'none';
  shadeElement.style.background = photo ? `linear-gradient(180deg,rgba(4,6,6,.12),rgba(4,6,6,.04) 34%,rgba(4,6,6,${(slide?.shade ?? 46)/100}))` : 'none';
}

function updateStartValidation() {
  const hasText = state.sourceText.trim().length > 0;
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
    renderSplit(); saveDraft();
  }));
}

function renderStart() {
  $('#sourceText').value = state.sourceText;
  $('#preparedTextToggle').checked = state.preparedText;
  $('#textOnlyToggle').checked = state.textOnly;
  $('#startPhotoCount').textContent = `${state.photos.length} / 10`;
  renderPhotoChips($('#startPhotoStrip'));
  const canvas = $('#startPreviewCanvas');
  const photo = state.textOnly ? null : state.photos[state.coverPhotoIndex] || null;
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
  const noPhotos=activePhotos().length===0;
  $('#photoStrip').hidden=noPhotos;
  $('.source-panel .field-heading strong').textContent=noPhotos ? 'Карточки без фотографий' : 'Ваши фотографии';
  $('.source-panel .field-heading span').textContent=noPhotos ? 'Фото можно добавить сейчас или в редакторе' : 'Нажмите, чтобы выбрать обложку';
  $('#segmentCount').textContent = `${state.slides.length} ${cardWord(state.slides.length)}`;
  $('#densityStatus').textContent = 'Вместимость проверим в вашем стиле';
  $('#splitModeHint').textContent = state.preparedText ? 'Сохранили вашу разбивку. Первая строка — заголовок, остальные — пояснение.' : 'Это техническая разбивка, не AI-редактура. Проверьте переходы между мыслями; ваши слова не переписаны.';
  $('#segmentList').innerHTML = state.slides.map((slide,index) => `<article class="segment-card" data-index="${index}"><span class="segment-number">${index + 1}</span><textarea aria-label="Текст карточки ${index + 1}">${escapeHtml(slide.originalText)}</textarea><div class="segment-controls"><button data-action="toggle-photo" type="button">${photoForSlide(slide) ? 'Сделать без фото' : 'Добавить фото'}</button><button data-action="split" type="button"><span class="material-symbols-rounded">call_split</span>Разделить</button>${index ? '<button data-action="merge" type="button"><span class="material-symbols-rounded">merge</span>Объединить выше</button><button data-action="up" type="button" aria-label="Выше"><span class="material-symbols-rounded">arrow_upward</span></button>' : ''}${index < state.slides.length - 1 ? '<button data-action="down" type="button" aria-label="Ниже"><span class="material-symbols-rounded">arrow_downward</span></button>' : ''}<button data-action="remove" type="button" aria-label="Удалить"><span class="material-symbols-rounded">delete</span></button></div></article>`).join('');
  hydrateIcons($('#segmentList'));
  renderPalettes($('#splitPalettes'));
  $('#splitPaletteName').textContent = currentPalette().name;
  const sample = $('#splitPalettePreview');
  sample.style.background = currentPalette().colors[3];
  sample.style.color = currentPalette().colors[0];
  sample.textContent = state.slides[0]?.blocks.main.text || 'Ваша история';
  $$('.segment-card').forEach(card => {
    const index = Number(card.dataset.index);
    card.querySelector('textarea').addEventListener('input', event => { applyTextToSlide(state.slides[index], event.target.value); syncSourceText(); saveDraft(); });
    card.querySelectorAll('[data-action]').forEach(button => button.addEventListener('click', () => editSlideStructure(index, button.dataset.action)));
  });
}

function editSlideStructure(index, action) {
  if (action === 'split' && state.slides.length >= 10) return showToast('Уже 10 карточек. Сначала объедините или удалите одну');
  if (action === 'toggle-photo') {
    const photos=activePhotos();
    state.slides[index].photoIndex = photoForSlide(state.slides[index]) ? null : (photos.length ? index % photos.length : null);
    delete state.slides[index].photoOverride;
    if (!photos.length) showToast('Фото можно добавить в редакторе → Фото');
  }
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
  syncSourceText();
  state.activeSlide = Math.min(state.activeSlide,state.slides.length - 1);
  renderSplit(); saveDraft();
}

function thumbMarkup(slide,index,mini = false) {
  const photo = photoForSlide(slide);
  const palette = currentPalette();
  const background = photo ? `background-image:url(&quot;${photo.url}&quot;)` : `background-color:${slide.backgroundColor || palette.colors[(index + 1) % palette.colors.length]}`;
  if (mini) return `<i style="${background}"></i>`;
  return `<button class="slide-thumb ${index === state.activeSlide ? 'is-active' : ''} ${photo ? '' : 'is-text'}" data-slide="${index}" type="button" style="${background}" aria-label="Карточка ${index + 1}"><span>${index + 1}</span><b>${escapeHtml(slide.blocks.main.text)}</b></button>`;
}

function renderProgress() {
  $('#pairProgress').textContent = `${state.pairIndex + 1} из ${FONT_PAIRS.length}`;
  const chunkStart = Math.floor(state.pairIndex / 4) * 4;
  $('#progressDots').innerHTML = Array.from({length:8},(_,i) => { const absolute = chunkStart + i; const className = absolute === state.pairIndex ? 'is-current' : absolute < state.pairIndex ? 'is-done' : ''; return `<i class="${className}"></i>`; }).join('');
}

function renderPalettes(target = $('#paletteSwatches')) {
  target.innerHTML = PALETTES.map((palette,index) => `<button class="palette-swatch ${index === state.paletteIndex ? 'is-active' : ''}" aria-pressed="${index === state.paletteIndex}" data-palette="${index}" type="button" title="${escapeHtml(palette.name)}" aria-label="Палитра ${escapeHtml(palette.name)}" style="background:conic-gradient(${palette.colors.join(',')})"></button>`).join('');
  $$('[data-palette]',target).forEach(button => button.addEventListener('click', () => {
    state.paletteIndex = Number(button.dataset.palette);
    const colors=currentPalette().colors;
    state.slides.forEach(slide=>{ slide.blocks.main.color=colors[0]; slide.blocks.accent.color=colors[1]; if(slide.photoIndex===null) slide.backgroundColor=colors[3]; });
    renderSplit(); renderTinder(); renderEditor(); saveDraft();
  }));
}

const textMeasure = document.createElement('canvas').getContext('2d');
function syncSourceText() { state.sourceText=state.slides.map(slide=>slide.originalText).join('\n\n'); }

let pendingParts=null;
function acceptParts(parts) {
  createSlides(parts);
  state.builtPreparedText=state.preparedText;
  state.pairIndex=0;state.liked=[];state.choiceHistory=[];state.selectedPair=null;
  renderSplit();showScreen('split');saveDraft();
}
function proposeParts() {
  const parts=segmentText(state.sourceText,state.preparedText);
  if(!parts.length)return showToast('Добавьте текст');
  state.originalInputText=state.sourceText;
  if(parts.length>10){
    pendingParts=parts;
    $('#textLimitMessage').textContent=`Получилось ${parts.length} ${cardWord(parts.length)}. Лимит — 10. Можно исправить текст или явно объединить хвост. Ничего не удалено.`;
    $('#textLimitDialog').showModal();saveDraft();return;
  }
  acceptParts(parts);
}

function blockGeometry(block,key,pair) {
  textMeasure.font=`${key==='accent'?'italic ':''}${key==='main'?pair.weight:500} ${block.size}px "${key==='main'?pair.head:pair.body}"`;
  const lines=wrapManualLines(textMeasure,block.text,block.width/100*1080);
  return {bottom:block.y/100*1350+lines.length*block.size*1.1,top:block.y/100*1350,left:block.x,right:block.x+block.width};
}
function slideTextIssues(slide,pair=chosenPair()) {
  const issues=[], boxes={};
  for(const key of ['main','accent']){
    const block=slide.blocks[key];if(!block.text.trim())continue;
    boxes[key]=blockGeometry(block,key,pair);
    if(boxes[key].bottom>1350*.94 || boxes[key].top<1350*.08 || boxes[key].left<4 || boxes[key].right>96)issues.push(key);
  }
  if(boxes.main && boxes.accent && boxes.main.top<boxes.accent.bottom && boxes.accent.top<boxes.main.bottom && boxes.main.left<boxes.accent.right && boxes.accent.left<boxes.main.right)issues.push('overlap');
  return issues;
}
function updateTextFitStatus() {
  if($('#screenEditor').hidden || !currentSlide())return;
  const issues=slideTextIssues(currentSlide());
  $('#textFitStatus').textContent=issues.length ? 'Текст не помещается или перекрывается · исправить' : 'Разделить / объединить текст';
  $('#textFitStatus').classList.toggle('has-issues',issues.length>0);
  $('#splitEditorText').disabled=state.slides.length>=10;
  $('#mergeEditorText').disabled=state.activeSlide>=state.slides.length-1;
}
function openTextFitDialog(message) {
  commitBlockText();updateTextFitStatus();
  $('#textFitMessage').textContent=message || 'Выберите нужный текстовый блок на карточке. Можно разделить его, объединить карточки или вручную изменить размер и положение.';
  $('#textFitDialog').showModal();
}

// A separate control beside the scene, never part of the exported image.
const fitStatus=document.createElement('button');
fitStatus.id='textFitStatus';fitStatus.type='button';fitStatus.className='text-fit-status';
$('.editor-canvas-zone').append(fitStatus);
fitStatus.addEventListener('click',()=>openTextFitDialog());
function fittedSlide(slide,pair) {
  const result = structuredClone(slide);
  if (slide.userStyled) return result;
  ['main','accent'].forEach(key => {
    const block = result.blocks[key];
    const bottom = key === 'main' && result.blocks.accent.text ? result.blocks.accent.y - 2 : 93;
    const height = Math.max(80,(bottom-block.y)/100*1350);
    for (let size=block.size;size>=48;size-=2) {
      block.size=size;
      textMeasure.font = `${key === 'accent' ? 'italic ' : ''}${key === 'main' ? pair.weight : 500} ${size}px "${key === 'main' ? pair.head : pair.body}"`;
      if (wrapManualLines(textMeasure,block.text,block.width/100*1080).length * size * 1.1 <= height) break;
    }
  });
  return result;
}

function stylePreviewBlock(element,block,canvasWidth) {
  element.style.cssText = `left:${block.x}%;top:${block.y}%;width:${block.width}%;font-size:${block.size/1080*canvasWidth}px;color:${block.color};text-align:${block.align}`;
}

function renderPreview(canvas,photoElement,shadeElement,mainElement,accentElement,slide,pair,index=0) {
  setCanvasTypography(canvas,pair);
  applyPhoto(photoElement,shadeElement,slide,index);
  const fitted = fittedSlide(slide,pair);
  ['main','accent'].forEach((key,i) => {
    const element=i ? accentElement : mainElement;
    element.textContent=fitted.blocks[key].text;
    element.hidden=!fitted.blocks[key].text;
    stylePreviewBlock(element,fitted.blocks[key],canvas.clientWidth || 320);
  });
}

function renderTinder() {
  const slide = state.slides[0];
  if (!slide) return;
  const pair = currentPair();
  const requestedIndex = state.pairIndex;
  ensurePair(pair).then(() => { if (state.pairIndex === requestedIndex) renderPreview($('#tinderCanvas'),$('#canvasPhoto'),$('#canvasShade'),$('#headlineMain'),$('#headlineAccent'),slide,pair); });
  renderProgress();
  renderPreview($('#tinderCanvas'),$('#canvasPhoto'),$('#canvasShade'),$('#headlineMain'),$('#headlineAccent'),slide,pair);
  const palette=currentPalette();
  $('#tinderPaletteName').textContent=palette.name;
  $('#tinderCanvas').style.borderColor=palette.colors[1];
  const textLength=(slide.blocks.main.text+slide.blocks.accent.text).length;
  $('#canvasHeadline').style.setProperty('--font-scale', textLength>260 ? .32 : textLength>200 ? .39 : textLength>150 ? .48 : textLength>110 ? .58 : textLength>78 ? .7 : textLength>52 ? .84 : 1);
  $('#canvasIndex').textContent = `01 / ${String(state.slides.length).padStart(2,'0')}`;
  $('#pairName').textContent = pair.name;
  $('#pairCharacter').textContent = pair.character;
  $('#cardCount').textContent = `${state.slides.length} ${cardWord(state.slides.length)}`;
  $('#miniStoryboard').innerHTML = state.slides.map((item,index) => thumbMarkup(item,index,true)).join('');
  renderPalettes();
  $('#likedCount').textContent = state.liked.length;
  $('#compareSelected').textContent = state.liked.length === 1 ? 'Дальше · 1 стиль' : `Сравнить ${state.liked.length} стиля`;
  $('#tinderNext').hidden = state.liked.length === 0;
  $('#undoChoice').disabled = state.choiceHistory.length === 0;
  const canvas = $('#tinderCanvas');
  canvas.style.transform = ''; canvas.style.opacity = '';
  $('.stamp-no').style.opacity = 0; $('.stamp-yes').style.opacity = 0;
}

function chooseFont(liked) {
  const index = state.pairIndex;
  state.choiceHistory.push({index,liked,added:liked && !state.liked.includes(index)});
  if (liked && !state.liked.includes(index)) state.liked.push(index);
  state.pairIndex = (state.pairIndex + 1) % FONT_PAIRS.length;
  renderTinder(); saveDraft();
  if (liked) showToast(`Стиль сохранён · всего ${state.liked.length}`);
}

function undoChoice() {
  const last = state.choiceHistory.pop();
  if (!last) return;
  state.pairIndex = last.index;
  if (last.added) state.liked = state.liked.filter(index => index !== last.index);
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
  $('#compareHeading').textContent = indexes.length === 1 ? 'Ваш выбранный стиль' : 'Выберите один стиль';
  $('#finalistGrid').classList.toggle('single-finalist',indexes.length === 1);
  if (indexes.length === 1 && state.selectedPair === null) state.selectedPair=indexes[0];
  $('#finalistGrid').innerHTML = indexes.map(index => {
    const pair = FONT_PAIRS[index];
    return `<button class="finalist-card ${state.selectedPair === index ? 'is-selected' : ''}" data-pair="${index}" aria-pressed="${state.selectedPair === index}" type="button"><span class="finalist-preview"><span class="canvas-photo"></span><span class="canvas-shade"></span><h2 class="preview-block block-main"></h2><em class="preview-block block-accent"></em></span><span class="finalist-name"><span>${escapeHtml(pair.name)}</span><b>${state.selectedPair === index ? 'Выбрано' : 'Выбрать'}</b></span></button>`;
  }).join('');
  await Promise.all(indexes.map(index => ensurePair(FONT_PAIRS[index])));
  $$('.finalist-card').forEach(button => {
    const index=Number(button.dataset.pair), surface=$('.finalist-preview',button);
    renderPreview(surface,$('.canvas-photo',button),$('.canvas-shade',button),$('h2',button),$('em',button),slide,FONT_PAIRS[index]);
    button.addEventListener('click', () => { state.selectedPair = index; renderCompare(); saveDraft(); });
  });
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
  element.style.fontSize = `${block.size / 1080 * canvasWidth}px`;
  element.style.color = block.color;
  element.style.textAlign = block.align;
}

function renderEditor() {
  if ($('#screenEditor').hidden) return;
  const slide = currentSlide();
  if (!slide) return;
  const pair = chosenPair();
  ensurePair(pair).then(() => {setCanvasTypography($('#editorCanvas'),pair);updateTextFitStatus();});
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
  renderCompositions();
  renderSelectedBlockControls();
  $('#deleteCard').disabled = state.slides.length <= 1;
  $('#removePhoto').disabled = !photoForSlide(slide);
  $('#editorBrightness').disabled=$('#editorShadeRange').disabled=!photoForSlide(slide);
  $('#editorBrightness').closest('label').hidden=$('#editorShadeRange').closest('label').hidden=!photoForSlide(slide);
  $('#removePhoto').hidden=!photoForSlide(slide);
  $('#replacePhoto').textContent = photoForSlide(slide) ? 'Заменить' : 'Добавить фото';
  $('#addEditorCard').disabled = $('#duplicateCard').disabled = state.slides.length >= 10;
  const colors=currentPalette().colors;
  $('#blockPaletteColors').innerHTML=colors.map(color=>`<button type="button" aria-label="Цвет ${color}" style="background:${color}" data-block-color="${color}"></button>`).join('');
  $$('[data-block-color]').forEach(button=>button.addEventListener('click',()=>{ slide.blocks[state.selectedBlock].color=button.dataset.blockColor; slide.userStyled=true; renderEditor(); saveDraft(); }));
  $('#backgroundColors').hidden=Boolean(photoForSlide(slide));
  $('#backgroundColors').innerHTML='<span>Фон карточки</span>'+colors.map(color=>`<button type="button" aria-label="Фон ${color}" style="background:${color}" data-background-color="${color}"></button>`).join('');
  $$('[data-background-color]').forEach(button=>button.addEventListener('click',()=>{
    slide.backgroundColor=button.dataset.backgroundColor;
    const hex=slide.backgroundColor.slice(1), rgb=[0,2,4].map(i=>parseInt(hex.slice(i,i+2),16)/255);
    const light=rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722>.5;
    slide.blocks.main.color=light ? colors[3] : colors[0];
    if(slide.blocks.accent.color===slide.backgroundColor)slide.blocks.accent.color=slide.blocks.main.color;
    renderEditor();saveDraft();
  }));
  updateTextFitStatus();
}

function renderCompositions() {
  const slide=currentSlide();
  if(!slide)return;
  $('#compositionOptions').innerHTML=COMPOSITIONS.map(item=>`<button class="composition-chip ${slide.layout===item.id?'is-active':''}" data-composition="${item.id}" type="button">${item.name}</button>`).join('');
  $$('[data-composition]',$('#compositionOptions')).forEach(button=>button.addEventListener('click',()=>applyComposition(button.dataset.composition)));
}

function applyComposition(id) {
  const slide=currentSlide(); const preset=COMPOSITIONS.find(item=>item.id===id);
  if(!slide||!preset)return;
  slide.layout=id;
  ['main','accent'].forEach(key=>Object.assign(slide.blocks[key],preset[key]));
  slide.userStyled=false;
  Object.assign(slide,fittedSlide(slide,chosenPair()));
  slide.userStyled=true;
  renderEditor(); saveDraft();
}

function renderSelectedBlockControls() {
  const slide = currentSlide();
  if (!slide) return;
  const block = slide.blocks[state.selectedBlock];
  $('#selectedBlockName').textContent = state.selectedBlock === 'main' ? 'Основной текст' : 'Акцентный текст';
  $('#blockSize').value = block.size;
  $('#blockColor').value = block.color;
  $('#blockSizeValue').textContent=block.size;
  $$('.align-control button').forEach(button => button.classList.toggle('is-active',button.dataset.align === block.align));
}

function commitBlockText() {
  const slide = currentSlide();
  if (!slide) return;
  ['main','accent'].forEach(key => { const element = $(`#${key}Block`); if (element) slide.blocks[key].text = key === 'main' ? stripTerminalPeriod(element.innerText) : element.innerText.trim(); });
  slide.originalText = [slide.blocks.main.text,slide.blocks.accent.text].filter(Boolean).join('\n');
  syncSourceText();
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
  currentSlide().userStyled=true;
  block.x = Math.max(4,Math.min(96 - block.width,state.drag.baseX + dx));
  const height=event.currentTarget.getBoundingClientRect().height/canvas.height*100;
  block.y = Math.max(8,Math.min(Math.max(8,94-height),state.drag.baseY + dy));
  applyBlockStyle(event.currentTarget,block);
  $('#dragTip').classList.add('is-hidden');
}

function endBlockDrag(event) {
  if (!state.drag || state.drag.pointerId !== event.pointerId) return;
  if (!state.drag.moved) event.currentTarget.focus();
  state.drag = null;
  updateTextFitStatus();
  saveDraft();
}

function editorPanel(name) {
  $$('.dock-tab').forEach(button => button.classList.toggle('is-active',button.dataset.panel === name));
  $('#textPanel').hidden = name !== 'text'; $('#photoPanel').hidden = name !== 'photo'; $('#stylePanel').hidden = name !== 'style';
}

function rgbHex(r,g,b) { return `#${[r,g,b].map(value=>Math.max(0,Math.min(255,value)).toString(16).padStart(2,'0')).join('')}`; }

async function extractPalette(file) {
  const url=URL.createObjectURL(file);
  try {
    const image=await new Promise((resolve,reject)=>{ const item=new Image(); item.onload=()=>resolve(item); item.onerror=reject; item.src=url; });
    const canvas=document.createElement('canvas'); canvas.width=64; canvas.height=64;
    const context=canvas.getContext('2d',{willReadFrequently:true}); context.drawImage(image,0,0,64,64);
    const buckets=new Map(); const data=context.getImageData(0,0,64,64).data;
    for(let i=0;i<data.length;i+=20){ if(data[i+3]<180)continue; const r=Math.round(data[i]/32)*32,g=Math.round(data[i+1]/32)*32,b=Math.round(data[i+2]/32)*32; const key=`${r},${g},${b}`; buckets.set(key,(buckets.get(key)||0)+1); }
    const picked=[];
    [...buckets.entries()].sort((a,b)=>b[1]-a[1]).forEach(([key])=>{ const color=key.split(',').map(Number); if(picked.length<8&&picked.every(other=>Math.hypot(color[0]-other[0],color[1]-other[1],color[2]-other[2])>74))picked.push(color); });
    while(picked.length<4)picked.push([[242,236,223],[150,51,68],[106,106,93],[37,42,47]][picked.length]);
    const lum=color=>.2126*color[0]+.7152*color[1]+.0722*color[2];
    const saturation=color=>Math.max(...color)-Math.min(...color);
    const sorted=[...picked].sort((a,b)=>lum(a)-lum(b)); const dark=sorted[0],light=sorted.at(-1);
    const middle=sorted.slice(1,-1); const accent=[...middle].sort((a,b)=>saturation(b)-saturation(a))[0]||sorted[1]; const muted=middle.find(item=>item!==accent)||sorted[Math.floor(sorted.length/2)];
    return [light,accent,muted,dark].map(color=>rgbHex(...color));
  } finally { URL.revokeObjectURL(url); }
}

async function importPaletteFile(file) {
  if(!file)return;
  showToast('Извлекаю цвета…');
  const colors=await extractPalette(file);
  PALETTES.push({name:'Из Pinterest',colors}); state.paletteIndex=PALETTES.length-1;
  ['customLight','customAccent','customMuted','customDark'].forEach((id,index)=>{$(`#${id}`).value=colors[index];});
  state.slides.forEach(slide=>{slide.blocks.main.color=colors[0];slide.blocks.accent.color=colors[1];if(slide.photoIndex===null)slide.backgroundColor=colors[3];});
  if($('#paletteDialog').open)$('#paletteDialog').close();
  renderSplit(); renderTinder(); renderEditor(); saveDraft(); showToast('Палитра из изображения готова');
}

function addEditorCard() {
  if (state.slides.length >= 10) return showToast('Максимум 10 карточек');
  commitBlockText();
  state.slides.splice(state.activeSlide + 1,0,makeSlide('Новая карточка',null));
  state.activeSlide += 1; state.selectedBlock = 'main';syncSourceText(); renderEditor(); saveDraft();
}

function duplicateEditorCard() {
  if (state.slides.length >= 10) return showToast('Максимум 10 карточек');
  commitBlockText();
  const copy = structuredClone(currentSlide());
  copy.id = `slide-${Date.now()}-${slideSeed++}`;
  state.slides.splice(state.activeSlide + 1,0,copy); state.activeSlide += 1;syncSourceText(); renderEditor(); saveDraft();
}

function deleteEditorCard() {
  if (state.slides.length <= 1) return;
  state.slides.splice(state.activeSlide,1); state.activeSlide = Math.max(0,state.activeSlide - 1);syncSourceText(); renderEditor(); saveDraft();
}

function loadImage(url) { return new Promise((resolve,reject) => { const image = new Image(); image.onload = () => resolve(image); image.onerror = reject; image.src = url; }); }
function drawImageCover(ctx,image,width,height) { const scale = Math.max(width/image.width,height/image.height); const drawWidth=image.width*scale, drawHeight=image.height*scale; ctx.drawImage(image,(width-drawWidth)/2,(height-drawHeight)/2,drawWidth,drawHeight); }

function wrapManualLines(ctx,text,maxWidth) {
  const result = [];
  String(text || '').split('\n').forEach(manual => {
    const words = manual.trim().split(/\s+/).filter(Boolean);
    if (!words.length) { result.push(''); return; }
    let line = '';
    words.forEach(word => {
      const test = line ? `${line} ${word}` : word;
      if (line && ctx.measureText(test).width > maxWidth) { result.push(line); line = ''; }
      if (ctx.measureText(word).width > maxWidth) {
        for (const char of word) { if(line && ctx.measureText(line+char).width>maxWidth){result.push(line);line='';} line+=char; }
      } else line = line ? `${line} ${word}` : word;
    });
    if (line) result.push(line);
  });
  return result;
}

function drawBlock(ctx,block,family,weight,italic=false) {
  const x = block.x / 100 * 1080, y = block.y / 100 * 1350, width = block.width / 100 * 1080;
  ctx.fillStyle = block.color;
  ctx.textBaseline = 'alphabetic';
  ctx.textAlign = block.align;
  ctx.font = `${italic ? 'italic ' : ''}${weight} ${block.size}px "${family}"`;
  const anchor = block.align === 'center' ? x + width/2 : block.align === 'right' ? x + width : x;
  const metrics=ctx.measureText('Mg');
  const ascent=metrics.fontBoundingBoxAscent || block.size*.8, descent=metrics.fontBoundingBoxDescent || block.size*.2;
  const baseline=(block.size*1.1-ascent-descent)/2+ascent;
  wrapManualLines(ctx,block.text,width).forEach((line,index) => ctx.fillText(line,anchor,y+baseline+index*block.size*1.1));
}

async function renderSlideCanvas(index) {
  const slide = state.slides[index];
  const pair = chosenPair();
  await ensurePair(pair);
  if (document.fonts?.ready) await Promise.race([document.fonts.ready,new Promise(resolve => setTimeout(resolve,2200))]);
  const canvas = document.createElement('canvas'); canvas.width=1080; canvas.height=1350;
  const ctx = canvas.getContext('2d');
  const palette = currentPalette();
  ctx.fillStyle = slide.backgroundColor || palette.colors[(index + 1) % palette.colors.length]; ctx.fillRect(0,0,1080,1350);
  const photo = photoForSlide(slide);
  if (photo) { const image = await loadImage(photo.url); ctx.save(); ctx.filter = `brightness(${slide.brightness}%)`; drawImageCover(ctx,image,1080,1350); ctx.restore(); const shade = ctx.createLinearGradient(0,0,0,1350); shade.addColorStop(0,'rgba(4,6,6,.12)'); shade.addColorStop(.34,'rgba(4,6,6,.04)'); shade.addColorStop(1,`rgba(4,6,6,${slide.shade/100})`); ctx.fillStyle=shade; ctx.fillRect(0,0,1080,1350); }
  const meta={x:72/1080*100,y:72/1350*100,width:936/1080*100,size:22,color:'rgba(255,255,255,.84)',align:'left',text:'ВАША ИСТОРИЯ'};
  drawBlock(ctx,meta,'Onest',500);drawBlock(ctx,{...meta,align:'right',text:`${String(index+1).padStart(2,'0')} / ${String(state.slides.length).padStart(2,'0')}`},'Onest',500);
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
    const blobs = preparedBlobs || await prepareAllBlobs();
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
  if (exportBusy) return;
  exportBusy=true;
  ['shareCarousel','prepareIndividual','downloadZip'].forEach(id=>$('#'+id).disabled=true);
  try { preparedBlobs=preparedBlobs || await prepareAllBlobs();renderSaveLinks(preparedBlobs); } catch (error) { console.error(error); $('#saveStatus').textContent='Не удалось подготовить изображения. Попробуйте ещё раз.'; }
  finally{exportBusy=false;['shareCarousel','prepareIndividual','downloadZip'].forEach(id=>$('#'+id).disabled=false);}
}

function downloadBlob(blob,filename) { const link=document.createElement('a'); link.href=URL.createObjectURL(blob); link.download=filename; link.click(); setTimeout(()=>URL.revokeObjectURL(link.href),1800); }

async function downloadZip() {
  if (guardDemoExport()) return;
  try {
    if (!window.JSZip) throw new Error('JSZip unavailable');
    const blobs=preparedBlobs || await prepareAllBlobs(); const zip=new JSZip();
    blobs.forEach((blob,index)=>zip.file(`carousel-${String(index+1).padStart(2,'0')}.png`,blob));
    downloadBlob(await zip.generateAsync({type:'blob'}),'carousel-studio.zip');
    $('#saveStatus').textContent='Браузер начал загрузку ZIP. Ищите файл carousel-studio.zip в «Загрузки» или «Файлы».';
  } catch (error) { console.error(error); $('#saveStatus').textContent='Не удалось начать загрузку ZIP.'; }
}

let preparedBlobs=null;
let exportBusy=false;
async function openSaveDialog() {
  if(exportBusy)return;
  await ensurePair(chosenPair());
  commitBlockText();
  const index=state.slides.findIndex(slide=>slideTextIssues(slide).length);
  if(!state.isDemo && index>=0){state.activeSlide=index;renderEditor();openTextFitDialog(`На карточке ${index+1} текст выходит за поля или блоки перекрываются. Исправьте это перед сохранением — PNG иначе обрежет текст.`);return;}
  commitBlockText(); revokeSaveUrls(); $('#saveLinks').innerHTML='';
  $('#saveStatus').textContent = state.isDemo ? 'Это демонстрация. Чтобы сохранить карусель, загрузите свои фотографии на первом экране.' : `Будет подготовлено ${state.slides.length} PNG 1080 × 1350.`;
  $('#shareCarousel').disabled=state.isDemo; $('#prepareIndividual').disabled=state.isDemo; $('#downloadZip').disabled=state.isDemo;
  $('#saveDialog').showModal();
  preparedBlobs=null;
  if(!state.isDemo)prepareIndividual();
}

function pickPhotos(replace=null){state.replaceSlide=replace;$('#photoInput').multiple=replace===null;$('#photoInput').click();}
$('#uploadPhotos').addEventListener('click',()=>pickPhotos());
$('#addMorePhotos').addEventListener('click',()=>pickPhotos());
$('#replacePhoto').addEventListener('click',()=>pickPhotos(state.activeSlide));
$('#removePhoto').addEventListener('click',()=>{ const slide=currentSlide(); if(!slide)return; slide.photoIndex=null; delete slide.photoOverride; slide.backgroundColor=currentPalette().colors[3]; renderEditor(); saveDraft(); showToast('Карточка теперь без фото'); });
$('#photoInput').addEventListener('cancel',()=>{state.replaceSlide=null;});
$('#photoInput').addEventListener('change',async event => {
  const replace=state.replaceSlide; state.replaceSlide=null;
  const selected=[...event.target.files]; event.target.value='';
  const limit=replace===null ? Math.max(0,10-state.photos.length) : 1;
  const files=selected.slice(0,limit), decoded=[];
  for(const file of files){
    const photo={url:URL.createObjectURL(file),name:file.name,blob:file,local:true};
    try{await loadImage(photo.url);decoded.push(photo);}catch{URL.revokeObjectURL(photo.url);showToast(`Не удалось открыть ${file.name}. Попробуйте JPG или PNG`);}
  }
  if(decoded.length){
    state.isDemo=false; state.textOnly=false;
    if(replace!==null && state.slides[replace])state.slides[replace].photoOverride=decoded[0];
    else state.photos.push(...decoded);
  }
  if(selected.length>limit)showToast(limit ? `Добавлено ${decoded.length} фото. Максимум 10` : 'Уже выбрано 10 фото. Заменить снимок можно в редакторе');
  renderStart(); renderSplit(); renderEditor(); saveDraft();
});
$('#sourceText').addEventListener('input',event => { state.sourceText=event.target.value; renderStart(); saveDraft(); });
$('#preparedTextToggle').addEventListener('change',event=>{state.preparedText=event.target.checked;saveDraft();});
$('#textOnlyToggle').addEventListener('change',event => { state.textOnly=event.target.checked; renderStart(); saveDraft(); });
$('#startProject').addEventListener('click',()=>{
  state.isDemo=false;
  const normalize=text=>text.replace(/\r/g,'').trim();
  if(!state.slides.length || state.preparedText!==Boolean(state.builtPreparedText) || normalize(state.sourceText)!==normalize(state.slides.map(slide=>slide.originalText).join('\n\n')))return proposeParts();
  renderSplit(); showScreen('split'); saveDraft();
});
$('#openDemo').addEventListener('click',()=>{ demoSnapshot={...state};state.isDemo=true; state.textOnly=false; state.sourceText=DEMO_TEXT; state.coverPhotoIndex=0;state.liked=[];state.selectedPair=null;state.pairIndex=0;state.choiceHistory=[];createSlides(segmentText(DEMO_TEXT)); renderSplit(); showScreen('split'); });
$('#backToStart').addEventListener('click',()=>{ if(state.isDemo && demoSnapshot)Object.assign(state,demoSnapshot);renderStart(); showScreen('start'); });
$('#autoSplit').addEventListener('click',()=>{if(confirm('Заменить текущую разбивку? Расположение и оформление карточек будут сброшены.'))proposeParts();});
$('#returnToText').addEventListener('click',()=>{$('#textLimitDialog').close();pendingParts=null;renderStart();showScreen('start');$('#sourceText').focus();});
$('#combineTextTail').addEventListener('click',()=>{if(!pendingParts)return;const parts=[...pendingParts.slice(0,9),pendingParts.slice(9).join('\n\n')];pendingParts=null;$('#textLimitDialog').close();acceptParts(parts);});
$('#addTextCard').addEventListener('click',()=>{ if(state.slides.length>=10)return showToast('Максимум 10 карточек'); state.slides.push(makeSlide('Новая карточка',null)); renderSplit(); saveDraft(); });
const goToTinder=()=>{ if(!state.slides.length)return showToast('Добавьте текст'); showScreen('tinder');renderTinder(); saveDraft(); };
$('#confirmSplit').addEventListener('click',goToTinder);
$('#confirmSplitBottom').addEventListener('click',goToTinder);
$('#openSplit').addEventListener('click',()=>{ renderSplit(); showScreen('split'); });
$('#editSplit').addEventListener('click',()=>{ renderSplit(); showScreen('split'); });
$('#rejectFont').addEventListener('click',()=>chooseFont(false));
$('#likeFont').addEventListener('click',()=>chooseFont(true));
$('#undoChoice').addEventListener('click',undoChoice);
$('#compareSelected').addEventListener('click',async()=>{ showScreen('compare');await renderCompare();saveDraft(); });
$('#backFromCompare').addEventListener('click',()=>{ renderTinder(); showScreen('tinder'); });
$('#openEditor').addEventListener('click',async()=>{await ensurePair(chosenPair()); state.slides=state.slides.map(slide=>fittedSlide(slide,chosenPair()));state.selectedBlock='main'; showScreen('editor'); renderEditor(); saveDraft(); });
$('#backToCompare').addEventListener('click',async()=>{ commitBlockText(); showScreen('compare');await renderCompare();saveDraft(); });
$('#fontInfo').addEventListener('click',()=>{ const pair=currentPair(); $('#dialogPairName').textContent=pair.name; $('#dialogPairText').textContent=`${pair.character}. Кириллица и PNG-экспорт проверяются до публикации.`; $('#infoDialog').showModal(); });
$('#closeInfo').addEventListener('click',()=>$('#infoDialog').close());
$('#customPaletteButton').addEventListener('click',()=>$('#paletteDialog').showModal());
$('#editorCustomPalette').addEventListener('click',()=>$('#paletteDialog').showModal());
$('#importPaletteImage').addEventListener('click',()=>$('#paletteImageInput').click());
$('#importPaletteFromDialog').addEventListener('click',()=>$('#paletteImageInput').click());
$('#paletteImageInput').addEventListener('change',async event=>{ const [file]=event.target.files; try{await importPaletteFile(file);}catch(error){console.error(error);showToast('Не получилось прочитать изображение');} event.target.value=''; });
$('#closePalette').addEventListener('click',()=>$('#paletteDialog').close());
$('#applyCustomPalette').addEventListener('click',()=>{ const colors=[$('#customLight').value,$('#customAccent').value,$('#customMuted').value,$('#customDark').value]; PALETTES.push({name:'Моя палитра',colors}); state.paletteIndex=PALETTES.length-1; state.slides.forEach(slide=>{slide.blocks.main.color=colors[0];slide.blocks.accent.color=colors[1];if(slide.photoIndex===null)slide.backgroundColor=colors[3];}); $('#paletteDialog').close(); renderSplit(); renderTinder(); renderEditor(); saveDraft(); });

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
  element.addEventListener('input',()=>{ const slide=currentSlide();slide.userStyled=true; slide.blocks[key].text=element.innerText; slide.originalText=[slide.blocks.main.text,slide.blocks.accent.text].filter(Boolean).join('\n');syncSourceText(); saveDraft(); renderEditorFilmstrip();updateTextFitStatus(); });
  element.addEventListener('blur',()=>{ if(key==='main')element.textContent=stripTerminalPeriod(element.innerText); commitBlockText();updateTextFitStatus(); });
});
$('#blockSize').addEventListener('input',event=>{ currentSlide().userStyled=true;currentSlide().blocks[state.selectedBlock].size=Number(event.target.value);$('#blockSizeValue').textContent=event.target.value;applyBlockStyle($(`#${state.selectedBlock}Block`),currentSlide().blocks[state.selectedBlock]);updateTextFitStatus(); saveDraft(); });
$('#blockColor').addEventListener('input',event=>{ currentSlide().blocks[state.selectedBlock].color=event.target.value; applyBlockStyle($(`#${state.selectedBlock}Block`),currentSlide().blocks[state.selectedBlock]); saveDraft(); });
$$('.align-control button').forEach(button=>button.addEventListener('click',()=>{ currentSlide().blocks[state.selectedBlock].align=button.dataset.align; renderEditor(); saveDraft(); }));
$$('.dock-tab').forEach(button=>button.addEventListener('click',()=>editorPanel(button.dataset.panel)));
$('#editorBrightness').addEventListener('input',event=>{ currentSlide().brightness=Number(event.target.value); applyPhoto($('#editorPhoto'),$('#editorShade'),currentSlide()); saveDraft(); });
$('#editorShadeRange').addEventListener('input',event=>{ currentSlide().shade=Number(event.target.value); applyPhoto($('#editorPhoto'),$('#editorShade'),currentSlide()); saveDraft(); });
$('#editorGuideToggle').addEventListener('change',event=>{ state.showGuides=event.target.checked; $('#editorGuides').hidden=!state.showGuides; });
$('#addEditorCard').addEventListener('click',addEditorCard);
$('#duplicateCard').addEventListener('click',duplicateEditorCard);
$('#deleteCard').addEventListener('click',deleteEditorCard);
window.addEventListener('resize',()=>{ if(!$('#screenEditor').hidden)renderEditor();if(!$('#screenTinder').hidden)renderTinder();if(!$('#screenCompare').hidden)renderCompare(); });

$('#openSave').addEventListener('click',openSaveDialog);
$('#closeSave').addEventListener('click',()=>{ $('#saveDialog').close(); revokeSaveUrls(); });
$('#shareCarousel').addEventListener('click',shareCarousel);
$('#prepareIndividual').addEventListener('click',prepareIndividual);
$('#downloadZip').addEventListener('click',downloadZip);
$('#closeTextFit').addEventListener('click',()=>$('#textFitDialog').close());
$('#editTextManually').addEventListener('click',()=>{$('#textFitDialog').close();$(`#${state.selectedBlock}Block`).focus();});
$('#fitEditorText').addEventListener('click',()=>{
  const slide=currentSlide(), preset=COMPOSITIONS.find(item=>item.id===slide.layout)||COMPOSITIONS[0];
  ['main','accent'].forEach(key=>Object.assign(slide.blocks[key],preset[key]));
  slide.userStyled=false;Object.assign(slide,fittedSlide(slide,chosenPair()));slide.userStyled=true;
  $('#textFitDialog').close();renderEditor();saveDraft();
  showToast(slideTextIssues(slide).length ? 'Текста всё ещё много. Разделите или исправьте его' : 'Проверьте новое расположение на карточке');
});
$('#splitEditorText').addEventListener('click',()=>{
  if(state.slides.length>=10)return;
  commitBlockText();
  const slide=currentSlide(), block=slide.blocks[state.selectedBlock];
  const tokens=[...block.text.matchAll(/\S+/gu)];
  if(tokens.length<2)return showToast('В выбранном блоке нечего разделять');
  const cut=tokens[Math.ceil(tokens.length/2)].index;
  const tail=block.text.slice(cut).trim();block.text=block.text.slice(0,cut).trim();slide.userStyled=true;
  slide.originalText=[slide.blocks.main.text,slide.blocks.accent.text].filter(Boolean).join('\n');
  const next=structuredClone(slide);next.id=`slide-${Date.now()}-${slideSeed++}`;
  next.photoIndex=null;delete next.photoOverride;next.blocks.main.text=tail;next.blocks.accent.text='';next.originalText=tail;
  next.backgroundColor=currentPalette().colors[3];
  state.slides.splice(state.activeSlide+1,0,next);syncSourceText();$('#textFitDialog').close();renderEditor();saveDraft();
  showToast('Часть текста перенесена на следующую карточку без фото');
});
$('#mergeEditorText').addEventListener('click',()=>{
  if(state.activeSlide>=state.slides.length-1)return;
  commitBlockText();const slide=currentSlide(),next=state.slides[state.activeSlide+1];
  const text=[next.blocks.main.text,next.blocks.accent.text].filter(Boolean).join('\n');
  slide.blocks.accent.text=[slide.blocks.accent.text,text].filter(Boolean).join('\n\n');slide.userStyled=true;
  slide.originalText=[slide.blocks.main.text,slide.blocks.accent.text].filter(Boolean).join('\n');
  state.slides.splice(state.activeSlide+1,1);syncSourceText();$('#textFitDialog').close();renderEditor();saveDraft();
  showToast('Карточки объединены. Проверьте вместимость текста');
});

window.addEventListener('beforeunload',()=>{ state.photos.forEach(photo=>{if(photo.local)URL.revokeObjectURL(photo.url);}); revokeSaveUrls(); });
if('serviceWorker' in navigator && location.protocol!=='file:')navigator.serviceWorker.register('./sw.js').catch(error=>console.warn('Service worker:',error));

renderStart();
showScreen('start');
readDraft();
$('#resumeProject').addEventListener('click',resumeDraft);
$('#newProject').addEventListener('click',()=>{$('#resumeDraft').hidden=true; pendingDraft=null;showToast('Начните новую карусель — новый черновик заменит предыдущий');});
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden' && !state.isDemo)flushDraft();});
