(function(root){
  'use strict';
  const MAX_BLOCKS=8;
  const isExtra=key=>/^extra-[1-9]\d{0,5}$/.test(key);
  function keys(slide){const blocks=slide?.blocks || {};return ['main','accent'].filter(key=>Object.hasOwn(blocks,key)).concat(Object.keys(blocks).filter(isExtra).sort((a,b)=>Number(a.slice(6))-Number(b.slice(6))));}
  function entries(slide){return keys(slide).map(key=>[key,slide.blocks[key]]);}
  function role(key,block){return key==='main'?'heading':key==='accent'?'body':block?.role==='hook'?'hook':'text';}
  function font(key,block,pair){const type=role(key,block);return {family:type==='heading'?pair.head:pair.body,weight:type==='heading'?pair.weight:type==='hook'?600:500,italic:type==='body'};}
  function name(key,block){return key==='main'?'Заголовок':key==='accent'?'Пояснение':block?.role==='hook'?'Крючок':`Текст ${key.split('-')[1]}`;}
  function text(slide){return entries(slide).map(([,block])=>block.text||'').filter(value=>value.trim()).join('\n');}
  function nextKey(slide){let n=1;while(slide.blocks[`extra-${n}`])n++;return `extra-${n}`;}
  const api={MAX_BLOCKS,isExtra,keys,entries,role,font,name,text,nextKey};
  if(typeof module==='object'&&module.exports)module.exports=api;else root.CarouselText=api;
})(typeof globalThis!=='undefined'?globalThis:this);
