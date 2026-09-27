// No model calls: instructions are copied/downloaded explicitly by the user.
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const dialog = $('writingHelpDialog');
  let contentPromise;
  const paths = [
    './assets/writing-carousels/CHATGPT_PROMPT.acb331a0ca48.txt',
    './assets/writing-carousels/SKILL.84035a04d393.md',
    './assets/writing-carousels/STUDIO_OUTPUT.9c654bcb8c0f.txt'
  ];
  function content() {
    if (!contentPromise) {
      contentPromise = Promise.all(paths.map(async path => {
        const response = await fetch(path);
        if (!response.ok) throw new Error('Instruction unavailable');
        return response.text();
      })).then(([prompt, skill, adapter]) => {
        if (!prompt.startsWith('Ты помогаешь') || !/^---\r?\nname:/.test(skill) || !adapter.startsWith('Дополнение')) throw new Error('Unexpected instruction');
        return {prompt, skill, adapter};
      }).catch(error => { contentPromise = null; throw error; });
    }
    return contentPromise;
  }
  function message(text) { $('writingHelpStatus').textContent = text; }
  async function action(button, task) {
    button.disabled = true;
    try { await task(await content()); }
    catch { message('Не удалось загрузить инструкцию. Материалы карусели не изменились. Проверьте соединение и попробуйте ещё раз.'); }
    finally { button.disabled = false; }
  }
  function download(blob, filename) {
    const url = URL.createObjectURL(blob), link = document.createElement('a');
    link.href = url; link.download = filename; document.body.append(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 60000);
    message(`Запрос на скачивание «${filename}» отправлен. Проверьте «Загрузки» или «Файлы».`);
  }
  const studioPrompt = data => data.prompt.trimEnd() + '\n\n' + data.adapter;
  $('openWritingHelp').addEventListener('click', () => {
    message(''); $('manualPromptWrap').hidden = true; dialog.showModal();
    // Fetch while the reader is looking at the steps, before copy/download clicks.
    content().catch(() => { if (dialog.open) message('Инструкция пока недоступна. Проверьте соединение и попробуйте кнопку ещё раз.'); });
  });
  $('closeWritingHelp').addEventListener('click', () => dialog.close());
  $('copyWritingPrompt').addEventListener('click', event => action(event.currentTarget, async data => {
    const text = studioPrompt(data);
    $('manualWritingPrompt').value = text;
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(text);
      message('Промпт скопирован. Вставьте его в свой ChatGPT или Claude и добавьте исходный материал.');
    } catch {
      $('manualPromptWrap').hidden = false; $('manualWritingPrompt').focus(); $('manualWritingPrompt').select();
      message('Автокопирование недоступно. Выделен полный промпт — скопируйте его вручную или скачайте TXT.');
    }
  }));
  $('downloadWritingPrompt').addEventListener('click', event => action(event.currentTarget, data => {
    download(new Blob([studioPrompt(data)], {type:'text/plain;charset=utf-8'}), 'промпт-для-студии.txt');
  }));
  $('downloadWritingSkill').addEventListener('click', event => action(event.currentTarget, async data => {
    if (!window.JSZip) { message('ZIP недоступен. Скачайте исходный SKILL.md и промпт отдельно.'); return; }
    const zip = new JSZip(), folder = zip.folder('carousel-story-writer');
    folder.file('SKILL.md', data.skill.trimEnd() + '\n\n## Studio output contract — integration addition\n\n' + data.adapter);
    folder.file('SOURCE-SKILL.md', data.skill);
    folder.file('README.txt', 'Навык каруселей: кандидат v0.3, 27.09.2026. Автор: Ирина, Веди Вайб.\nSKILL.md — исходный навык с явно помеченным дополнением для текущей Studio. SOURCE-SKILL.md — неизменённый исходный текст.\nНавык — папка инструкций для AI-инструментов с поддержкой Skills, например Codex или Claude. Установка зависит от вашего инструмента.\nВ Claude: Customize → Skills → + → Create skill → Upload a skill. Загрузите ZIP и включите навык.\nВ Codex: распакуйте папку carousel-story-writer в .agents/skills своего проекта, либо попросите своего агента помочь установить навык. Не перезаписывайте одноимённый навык без проверки.\nОфициальные инструкции: https://learn.chatgpt.com/docs/build-skills и https://support.claude.com/en/articles/12512180-use-skills-in-claude .\nЕсли не пользуетесь навыками, скопируйте промпт в обычный AI-чат — установка не нужна.\nДобавьте собственный материал и попросите готовый текст для Studio. Личные документы, профиль голоса Ирины и примеры из её Notion не включены.\nПроверяйте факты и визуальную вместимость: навык не гарантирует результат модели.\n');
    download(await zip.generateAsync({type:'blob'}), 'carousel-story-writer-studio.zip');
  }));
  $('downloadOriginalSkill').addEventListener('click', event => action(event.currentTarget, data => {
    download(new Blob([data.skill], {type:'text/markdown;charset=utf-8'}), 'SKILL.md');
  }));
  $('returnWithPreparedText').addEventListener('click', () => {
    const toggle = $('preparedTextToggle');
    if (!toggle.checked) { toggle.checked = true; toggle.dispatchEvent(new Event('change', {bubbles:true})); }
    dialog.close(); $('sourceText').focus();
  });
})();
