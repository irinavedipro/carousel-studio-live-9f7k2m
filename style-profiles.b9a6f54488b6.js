(function(root) {
  'use strict';
  const FORMAT = 'vedi-vibe.carousel-style';
  const VERSION = 1;
  const MAX_FILE_BYTES = 128 * 1024;
  const keys = ['main', 'accent'];
  const fail = message => { throw new Error(message); };
  const object = value => value && typeof value === 'object' && !Array.isArray(value);
  function label(value, max, fallback) {
    if (value === undefined && fallback) return fallback;
    if (typeof value !== 'string' || !value.trim() || value.length > max) fail('В файле стиля некорректное название.');
    return value.trim();
  }
  function number(value, min, max) {
    if (typeof value !== 'number' || !Number.isFinite(value) || value < min || value > max) fail('В файле стиля недопустимый размер или положение текста.');
    return value;
  }
  function color(value) {
    if (typeof value !== 'string' || !/^#[a-f0-9]{6}$/i.test(value)) fail('В файле стиля некорректный цвет.');
    return value.toLowerCase();
  }
  function block(value) {
    if (!object(value)) fail('В файле стиля не хватает настроек текста.');
    const result = {
      x:number(value.x,0,96), y:number(value.y,0,100), width:number(value.width,4,96),
      size:number(value.size,24,140), color:color(value.color),
      align:value.align, manualColor:value.manualColor === true
    };
    if (result.x + result.width > 100 || !['left','center','right'].includes(result.align)) fail('В файле стиля некорректное выравнивание или ширина текста.');
    // Only design settings are returned: text, filenames, URLs and user content never survive sanitizing.
    return result;
  }
  function template(value, options) {
    if (!object(value) || !object(value.blocks)) fail('В файле стиля не хватает макетов.');
    if (Object.keys(value.blocks).some(key => !keys.includes(key))) fail('Этот стиль содержит дополнительные блоки, которые текущая версия пока не поддерживает. Сохраните файл для новой версии.');
    if (!(options.layouts || []).includes(value.layout)) fail('Этот макет пока не поддерживается студией.');
    const backgroundMode = value.backgroundMode === undefined ? (value.backgroundColor === null ? 'photo' : 'color') : value.backgroundMode;
    if (!['photo','color'].includes(backgroundMode)) fail('В файле стиля некорректный тип фона.');
    return {
      layout:value.layout, backgroundMode, brightness:number(value.brightness,55,125), shade:number(value.shade,0,80),
      backgroundColor:value.backgroundColor === null ? null : color(value.backgroundColor),
      blocks:{main:block(value.blocks.main), accent:block(value.blocks.accent)}
    };
  }
  function validate(input, options) {
    if (!object(input) || input.format !== FORMAT) fail('Это не файл стиля Студии каруселей. Выберите файл, скачанный кнопкой «Скачать стиль».');
    if (input.version !== VERSION) fail('Эта версия файла стиля пока не поддерживается. Ваш текущий стиль не изменён.');
    if (!object(input.fonts) || !object(input.palette) || !object(input.templates)) fail('Файл стиля неполный. Текущая карусель не изменена.');
    const fonts = {
      head:label(input.fonts.head,80), body:label(input.fonts.body,80), weight:number(input.fonts.weight,100,900)
    };
    if (!(options.fontPairs || []).some(pair => pair.head === fonts.head && pair.body === fonts.body && pair.weight === fonts.weight)) fail('Шрифтовая пара из этого файла пока недоступна в студии. Текущий стиль не изменён.');
    if (!Array.isArray(input.palette.colors) || input.palette.colors.length !== 4) fail('В палитре стиля должно быть четыре цвета.');
    return {
      format:FORMAT, version:VERSION, name:label(input.name,80), fonts,
      palette:{name:label(input.palette.name,80,'Моя палитра'), colors:input.palette.colors.map(color)},
      templates:{cover:template(input.templates.cover,options), photo:template(input.templates.photo,options), solid:template(input.templates.solid,options)}
    };
  }
  function parse(text, options) {
    if (typeof text !== 'string' || text.length > MAX_FILE_BYTES) fail('Файл слишком большой. Нужен небольшой JSON-файл только с оформлением.');
    let input;
    try { input = JSON.parse(text.replace(/^\uFEFF/,'')); }
    catch { fail('Не удалось прочитать файл. Выберите JSON-файл, скачанный из студии.'); }
    return validate(input, options);
  }
  const api = {FORMAT, VERSION, MAX_FILE_BYTES, validate, parse, serialize:(profile,options)=>JSON.stringify(validate(profile,options),null,2)};
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CarouselStyle = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
