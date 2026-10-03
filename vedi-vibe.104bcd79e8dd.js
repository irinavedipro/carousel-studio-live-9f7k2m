(function (root) {
  'use strict';

  const STORE_KEY = 'vedi-vibe:ad-rotation:v1';
  const FEEDBACK_KEY = 'vedi-vibe:feedback-cooldown:v1';
  const RUNS_KEY = 'vedi-vibe:shown-runs:v1';
  const FEEDBACK_SKIP_MS = 7 * 24 * 60 * 60 * 1000;
  const FEEDBACK_SENT_MS = 30 * 24 * 60 * 60 * 1000;
  const EVENT_FIELDS = {
    ad_shown: ['adId', 'type'], ad_skipped: ['adId', 'type'], ad_finished: ['adId', 'type', 'reason'], poll_answered: ['questionId', 'answerId'],
    project_clicked: ['adId', 'productId'], feedback_submitted: ['rating'], feedback_skipped: [], task_cta_clicked: ['placement']
  };
  const SAFE_VALUE = /^[a-zA-Z0-9_.-]{1,80}$/;
  const readyTargets = new WeakSet();
  const defaults = {
    ads: [
      { id: 'studio', type: 'project', title: 'Студия каруселей', text: 'Эту бесплатную студию создали в проекте «Веди Вайб», чтобы вы могли собрать карусель из своих фото и текста.' },
      { id: 'oscar', type: 'project', productId: 'oscar', title: 'Мысль есть. Поста ещё нет?', text: 'ИИ-агент Оскар поможет превратить голосовое или заметки в черновик поста.' },
      { id: 'poll-v1', type: 'poll', questionId: 'audience-needs-v1', title: 'Вопрос Веди Вайб', text: 'Что сейчас полезнее для вашего блога?', options: [{ id: 'ideas', label: 'Идеи для публикаций' }, { id: 'design', label: 'Оформление' }, { id: 'regularity', label: 'Регулярность' }] },
      { id: 'ironic-v1', type: 'ironic', title: 'Минутка Веди Вайб', text: 'План был «быстро сделать карусель». План, как обычно, добавил к себе ещё три слайда.' }
    ], projects: [{ id: 'oscar', title: 'Спросить Ирину про Оскара', url: 'telegram:oscar' }], feedbackEndpoint: '', trackTransport: null
  };
  let config = Object.assign({}, defaults);
  const active = new Set();

  function safeStorage() {
    try { return root.localStorage; } catch (_) { return null; }
  }
  function readJson(key, fallback) {
    try { const storage = safeStorage(); return storage ? JSON.parse(storage.getItem(key) || 'null') || fallback : fallback; } catch (_) { return fallback; }
  }
  function writeJson(key, value) {
    try { const storage = safeStorage(); if (storage) storage.setItem(key, JSON.stringify(value)); } catch (_) { /* Storage is optional. */ }
  }
  function validAds(ads) {
    const types = new Set(['project', 'poll', 'ironic']);
    return Array.isArray(ads) ? ads.filter(ad => ad && SAFE_VALUE.test(String(ad.id || '')) && types.has(ad.type) && typeof ad.title === 'string' && typeof ad.text === 'string') : [];
  }
  function configure(options) {
    options = options || {};
    config = Object.assign({}, config, options);
    if (Object.prototype.hasOwnProperty.call(options, 'ads')) config.ads = validAds(options.ads);
    if (Object.prototype.hasOwnProperty.call(options, 'projects')) config.projects = Array.isArray(options.projects) ? options.projects.filter(p => p && SAFE_VALUE.test(String(p.id || '')) && (p.url === 'telegram:oscar' || /^https:\/\//.test(p.url || ''))).map(p => ({ id: String(p.id), title: String(p.title || 'Проект'), url: p.url })) : [];
    if (Object.prototype.hasOwnProperty.call(options, 'feedbackEndpoint')) config.feedbackEndpoint = /^https:\/\//.test(options.feedbackEndpoint || '') ? options.feedbackEndpoint : '';
    return api;
  }
  function track(event, payload) {
    if (config.pilotMode) return false;
    if (!Object.prototype.hasOwnProperty.call(EVENT_FIELDS, event) || typeof config.trackTransport !== 'function') return false;
    const clean = {};
    (EVENT_FIELDS[event] || []).forEach(key => {
      const value = payload && payload[key];
      if (typeof value === 'number' && Number.isFinite(value)) clean[key] = value;
      else if (typeof value === 'string' && SAFE_VALUE.test(value)) clean[key] = value;
    });
    try {
      const sent = config.trackTransport(event, clean);
      if (sent && typeof sent.catch === 'function') sent.catch(() => {});
      return true;
    } catch (_) { return false; }
  }
  function selectAd() {
    const ads = config.ads.filter(ad => ad.type !== 'poll' || (typeof config.trackTransport === 'function' && SAFE_VALUE.test(ad.questionId || '') && Array.isArray(ad.options) && ad.options.every(option => option && SAFE_VALUE.test(option.id || '') && typeof option.label === 'string')));
    if (!ads.length) return null;
    const state = readJson(STORE_KEY, { pool: [], last: '' });
    let pool = Array.isArray(state.pool) ? state.pool.filter(id => ads.some(ad => ad.id === id)) : [];
    if (!pool.length) {
      pool = ads.map(ad => ad.id);
      for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
      if (pool.length > 1 && pool[pool.length - 1] === state.last) [pool[0], pool[pool.length - 1]] = [pool[pool.length - 1], pool[0]];
    }
    const id = pool.pop();
    writeJson(STORE_KEY, { pool, last: id });
    return ads.find(ad => ad.id === id);
  }
  function el(tag, className, text) {
    const node = root.document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }
  function ensureStyles() {
    if (root.document.getElementById('vedi-vibe-styles')) return;
    const style = el('style'); style.id = 'vedi-vibe-styles';
    style.textContent = '.vv-wrap{margin:14px 0;padding:18px;border:1px solid var(--line);border-radius:18px;color:var(--text);background:var(--surface);font:inherit}.vv-kicker{margin:0 0 8px;color:var(--muted);font-size:.72rem;letter-spacing:.12em;text-transform:uppercase}.vv-wrap h3{margin:0 0 8px;font-size:1.25rem}.vv-wrap p{line-height:1.5}.vv-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}.vv-button{min-height:44px;padding:10px 15px;border:1px solid var(--line-strong);border-radius:12px;color:var(--text);background:var(--surface-2);font:inherit;cursor:pointer}.vv-button-primary{color:var(--paper);background:var(--accent);border-color:var(--accent)}.vv-card{padding:14px;border:1px solid var(--line);border-radius:14px;background:var(--surface-2)}.vv-projects,.vv-feedback{margin-top:16px;padding-top:14px;border-top:1px solid var(--line)}.vv-rating{display:flex;gap:6px;margin:10px 0}.vv-rating button{min-width:42px}.vv-wrap textarea{box-sizing:border-box;width:100%;min-height:84px;padding:10px;border:1px solid var(--line-strong);border-radius:10px;color:var(--text);background:var(--bg);font:inherit}.vv-status{min-height:1.4em;color:var(--muted);font-size:.9rem}.vv-link{color:var(--paper)}';
    (root.document.head || root.document.documentElement).appendChild(style);
  }
  function spiral(ready = false) {
    const mark = el('img', 'vv-spiral' + (ready ? ' is-ready' : ''));
    mark.src = './assets/vedi-spiral.svg'; mark.alt = ''; mark.setAttribute('aria-hidden', 'true');
    return mark;
  }
  function signature(text) {
    const label = el('p', 'vv-kicker vv-signature');
    label.append(spiral(), el('span', '', text));
    return label;
  }
  function adMarkup(ad, options = {}) {
    const panel = el('section', 'vv-wrap vv-ad'); panel.setAttribute('aria-label', 'Рекламная пауза Веди Вайб');
    panel.append(signature('Рекламная пауза · Веди Вайб'), el('h3', '', ad.title));
    if (ad.productId === 'oscar') {
      const image = el('img', 'vv-ad-visual');
      image.src = './assets/oscar-avatar.png';
      image.alt = 'Оскар: голосовая мысль превращается в материал для публикации';
      image.width = 640; image.height = 360;
      image.addEventListener('error', () => image.remove(), { once: true });
      panel.appendChild(image);
    }
    if (ad.productId === 'consult') {
      const author = el('div', 'vv-author-visual');
      const image = el('img', 'vv-author-portrait');
      image.src = './assets/irina-microphone.jpg'; image.alt = 'Ирина Вединеева с микрофоном';
      image.width = 112; image.height = 112;
      image.addEventListener('error', () => image.remove(), { once: true });
      const caption = el('div');
      caption.append(el('strong', '', 'Ирина Вединеева'), el('span', '', 'Создатель Студии каруселей'));
      author.append(image, caption); panel.appendChild(author);
    }
    if (ad.productId === 'system') {
      const flow = el('ol', 'vv-system-visual'); flow.setAttribute('aria-label', 'Процесс работы контент-системы');
      ['Ваши идеи', 'ИИ-помощник', 'Согласование', 'Публикация'].forEach((name, i) => {
        const step = el('li'); step.append(el('span', '', String(i + 1).padStart(2, '0')), el('strong', '', name)); flow.appendChild(step);
      });
      panel.appendChild(flow);
    }
    if (ad.type === 'ironic') {
      const visual=el('div','vv-sponsor-visual');
      const before=el('div','vv-routine');
      const tasks=el('span','vv-task-stack');tasks.setAttribute('aria-hidden','true');
      for(let i=0;i<3;i++)tasks.appendChild(el('i'));
      before.append(tasks,el('span','','Снова вручную'));
      const arrow=el('span','vv-transform-arrow','→');arrow.setAttribute('aria-hidden','true');
      const after=el('div','vv-tool');after.append(spiral(),el('span','','Свой инструмент'));
      visual.append(before,arrow,after);panel.appendChild(visual);
    }
    if(ad.text)panel.appendChild(el('p', '', ad.text));
    if(ad.authorNote)panel.appendChild(el('p', 'vv-author-note', ad.authorNote));
    if (ad.type === 'poll' && Array.isArray(ad.options)) {
      const label = el('p', 'vv-poll-status', options.preview ? 'Просмотр: ответ никуда не отправляется' : 'Выберите один вариант'); label.setAttribute('role','status');panel.appendChild(label);
      let answered=false;
      ad.options.slice(0, 5).forEach(option => { const b = el('button', 'vv-button vv-poll-option', option.label); b.type = 'button';b.setAttribute('aria-pressed','false'); b.addEventListener('click', () => {
        if(answered || (!options.preview && typeof config.trackTransport !== 'function'))return;
        if(options.preview || track('poll_answered', { questionId: ad.questionId, answerId: option.id })) {
          answered=true;b.setAttribute('data-picked','true');b.setAttribute('aria-pressed','true');
          panel.querySelectorAll('.vv-poll-option').forEach(x=>{if(x!==b)x.disabled=true;});
          label.textContent=options.preview ? 'Так выглядит выбор. Ответ не отправлен.' : 'Выбрано. Можно перейти к карусели.';
        }
      }); panel.appendChild(b); });
    }
    if(ad.type==='ironic' && ad.taskCta){
      const a=el('a','vv-link','У меня есть задача →');
      a.href=telegramUrl('Ирина, привет! Я из Студии каруселей. Хочу попробовать решить свою задачу с помощью цифрового инструмента: ');
      a.target='_blank';a.rel='noopener noreferrer';
      if(!options.preview)a.addEventListener('click',()=>track('task_cta_clicked',{placement:'ad'}));
      panel.appendChild(a);
    }
    if (ad.type === 'project') {
      const p = ad.productId ? config.projects.find(x => x.id === ad.productId) : null;
      if (p) { const a = el('a', 'vv-link', p.title + ' →'); a.href = p.url === 'telegram:oscar' ? telegramUrl('Ирина, расскажи, пожалуйста, об Оскаре и кому он может быть полезен.') : p.url; a.target = '_blank'; a.rel = 'noopener noreferrer'; a.addEventListener('click', () => track('project_clicked', { adId: ad.id, productId: p.id })); panel.appendChild(a); }
    }
    return panel;
  }
  function showAdBreak(promise, runKey, options) {
    options = options || {};
    const work = Promise.resolve(promise);
    if (config.pilotMode) return work;
    if (!root.document || !root.document.createElement) return work;
    const key = typeof runKey === 'string' && SAFE_VALUE.test(runKey) ? runKey : '';
    const runHash = key ? hashKey(key) : '';
    const shownRuns = readJson(RUNS_KEY, []);
    if (runHash && Array.isArray(shownRuns) && shownRuns.includes(runHash)) return work;
    if (runHash) writeJson(RUNS_KEY, [...(Array.isArray(shownRuns) ? shownRuns : []), runHash].slice(-40));
    ensureStyles();
    const host = options.container || root.document.getElementById('saveDialog') || root.document.body;
    const ad = selectAd();
    const wrap = el('div', 'vv-break');
    let resolveDecision;
    const decision = new Promise(resolve => { resolveDecision = resolve; });
    let finished = false;
    const cleanup = () => {
      host.removeEventListener('cancel', cancel);
      host.removeEventListener('close', cancel);
      wrap.remove(); active.delete(cancel);
    };
    const cancel = () => { if (finished) return; finished = true; cleanup(); resolveDecision('cancel'); };
    active.add(cancel);
    host.addEventListener('cancel', cancel);
    host.addEventListener('close', cancel);
    if (ad) {
      wrap.appendChild(adMarkup(ad));
      track('ad_shown', { adId: ad.id, type: ad.type });
    }
    const actions = el('div', 'vv-actions');
    const skip = el('button', 'vv-button vv-button-primary', 'Пропустить рекламу →'); skip.type = 'button';
    actions.append(skip); wrap.appendChild(actions);
    host.appendChild(wrap);
    skip.addEventListener('click', () => { if (finished) return; finished = true; track('ad_skipped', { adId: ad && ad.id, type: ad && ad.type }); track('ad_finished', { adId: ad && ad.id, type: ad && ad.type, reason: 'user_skip' }); cleanup(); resolveDecision('skip'); });
    // Make the ad and the always-available skip paint before resolving potentially cached output.
    const painted = new Promise(resolve => (root.requestAnimationFrame || (cb => root.setTimeout(cb, 0)))(resolve));
    work.then(() => { if (finished) return; wrap.querySelector('.vv-spiral')?.classList.add('is-ready'); }, () => cancel()).catch(() => {});
    return painted.then(() => decision).then(() => work).finally(cleanup);
  }
  function hashKey(value) {
    let hash = 2166136261;
    for (let i = 0; i < value.length; i++) { hash ^= value.charCodeAt(i); hash = Math.imul(hash, 16777619); }
    return (hash >>> 0).toString(36);
  }
  function cancelActive() { Array.from(active).forEach(cancel => cancel()); }
  function telegramUrl(text) { return 'https://t.me/vedi_irina?text=' + encodeURIComponent(text || 'Здравствуйте! У меня есть задача.'); }
  function showResult(container, blobs, options) {
    options = options || {}; ensureStyles();
    const rootNode = typeof container === 'string' ? root.document.querySelector(container) : container;
    if (!rootNode) throw new Error('VediVibe.showResult: container not found');
    const panel = el('section', 'vv-wrap vv-result'); panel.setAttribute('aria-label', 'Результат Веди Вайб');
    if (config.pilotMode) {
      panel.append(signature('Веди Вайб'), el('h3', '', 'Сделано Ириной Вединеевой'), el('p', '', 'Я создала эту Студию, потому что сама собираю карусели. Что получилось удобно, а что стоит поправить?'));
      const feedback = el('a', 'vv-button vv-button-primary', 'Написать Ирине →');
      feedback.href = telegramUrl('Ирина, привет! Попробовал(а) Студию каруселей. Вот мои впечатления: ');
      feedback.target = '_blank'; feedback.rel = 'noopener noreferrer'; panel.appendChild(feedback);
      panel.appendChild(el('p', 'vv-author-note', 'Откроется Телеграм. Сообщение отправляете вы сами.'));
      rootNode.appendChild(panel); readyTargets.add(rootNode); readyTargets.add(panel);
      if (blobs && typeof options.onReady === 'function') options.onReady(blobs);
      return panel;
    }
    panel.append(signature('Студия каруселей · Веди Вайб'), el('h3', '', 'Готово. Дальше — ваш ход.'), el('p', '', 'Карусель собрана для вас. Скачайте изображения выше, а если есть задача — расскажите о ней Ирине.'));
    const author = el('p', '', 'Создано Ириной · Веди Вайб'); panel.appendChild(author);
    const task = el('a', 'vv-button vv-button-primary', 'У меня есть задача →'); task.href = telegramUrl(options.taskText); task.target = '_blank'; task.rel = 'noopener noreferrer'; task.addEventListener('click', () => track('task_cta_clicked', { placement: 'result' })); panel.appendChild(task);
    const projects = config.projects;
    if (projects.length) { const section = el('div', 'vv-projects'); section.appendChild(el('p', '', 'Другие проекты')); projects.forEach(p => { const a = el('a', 'vv-link', p.title + ' →'); a.href = p.url === 'telegram:oscar' ? telegramUrl('Ирина, расскажи, пожалуйста, об Оскаре и кому он может быть полезен.') : p.url; a.target = '_blank'; a.rel = 'noopener noreferrer'; section.appendChild(a); }); panel.appendChild(section); }
    rootNode.appendChild(panel);
    readyTargets.add(rootNode); readyTargets.add(panel);
    if (blobs && typeof options.onReady === 'function') options.onReady(blobs);
    return panel;
  }
  function offerFeedback(container, runKey) {
    if (config.pilotMode) return null;
    const until = Number(readJson(FEEDBACK_KEY, 0));
    if (Date.now() < until || !config.feedbackEndpoint || !/^https:\/\//.test(config.feedbackEndpoint)) return null;
    const node = typeof container === 'string' ? root.document.querySelector(container) : container;
    if (!node || !readyTargets.has(node)) return null;
    ensureStyles(); const box = el('section', 'vv-feedback'); box.append(el('h3', '', 'Ну как?'), el('p', '', 'Оцените Студию каруселей — это поможет понять, что оставить, а что улучшить. Не пишите в отзыве контакты или личные данные.'));
    const status = el('p', 'vv-status', ''); status.setAttribute('role', 'status');
    const prompt = el('p', '', '');
    const rating = el('div', 'vv-rating'); let score = 0;
    for (let n = 1; n <= 5; n++) { const b = el('button', 'vv-button', '☆'); b.type = 'button'; b.setAttribute('aria-label', 'Оценка ' + n + ' из 5'); b.addEventListener('click', () => { score = n; rating.querySelectorAll('button').forEach((x, i) => {x.setAttribute('aria-pressed', String(i + 1 === score));x.textContent=i<score ? '★' : '☆';}); prompt.textContent = score <= 3 ? 'Что помешало получить нормальный результат?' : 'Что особенно понравилось или оказалось полезным?'; area.placeholder = score <= 3 ? 'Расскажите, что помешало или чего не хватило.' : 'Расскажите, что было полезно.'; }); rating.appendChild(b); }
    const area = el('textarea'); area.maxLength = 1200; area.setAttribute('aria-label', 'Отзыв (необязательно)'); area.placeholder = 'Если хотите, добавьте пару слов.';
    const actions = el('div', 'vv-actions'); const send = el('button', 'vv-button vv-button-primary', 'Отправить отзыв'); send.type = 'button'; const skip = el('button', 'vv-button', 'Пропустить'); skip.type = 'button';
    skip.addEventListener('click', () => { writeJson(FEEDBACK_KEY, Date.now() + FEEDBACK_SKIP_MS); track('feedback_skipped', {}); box.remove(); });
    send.addEventListener('click', async () => {
      if (!score) { status.textContent = 'Сначала выберите оценку от 1 до 5. Текст писать необязательно.'; return; }
      send.disabled = true; status.textContent = 'Отправляю отзыв…';
      try {
        const response = await root.fetch(config.feedbackEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ rating: score, text: area.value.slice(0, 1200), runKey: SAFE_VALUE.test(String(runKey || '')) ? String(runKey) : undefined }) });
        if (!response.ok) throw new Error('Feedback endpoint returned ' + response.status);
        writeJson(FEEDBACK_KEY, Date.now() + FEEDBACK_SENT_MS); track('feedback_submitted', { rating: score }); status.textContent = 'Спасибо, отзыв отправлен.'; send.hidden = true;
      } catch (_) { send.disabled = false; status.textContent = 'Не получилось отправить отзыв. Он не сохранён. Попробуйте позже или пропустите.'; }
    });
    actions.append(send, skip); box.append(rating, prompt, area, actions, status); node.appendChild(box); return box;
  }
  // Local design pages reuse the real renderer without changing rotation or sending events.
  function previewAd(type, container) {
    const ad=config.ads.find(item=>item.type===type);
    if(!ad || !container)return null;
    ensureStyles();const panel=adMarkup(ad,{preview:true});container.appendChild(panel);return panel;
  }
  const api = { configure, showAdBreak, showResult, offerFeedback, track, telegramUrl, cancelActive, spiral, previewAd, isPilotMode: () => Boolean(config.pilotMode) };
  root.VediVibe = api;
})(typeof window !== 'undefined' ? window : globalThis);
