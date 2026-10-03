// Editable copy, separate from export/editor logic. No private keys in public JS.
// Polls and feedback stay disabled until a verified private collector is connected.
window.VediVibe?.configure({
  ads:[
    {id:'oscar-v1',type:'project',productId:'oscar',title:'Мысль есть. Поста ещё нет?',text:'ИИ-агент Оскар поможет превратить голосовое или заметки в черновик поста.'},
    {id:'audience-v1',type:'poll',questionId:'work-tool-v1',title:'Что собрать для вашей работы?',text:'',options:[{id:'agent',label:'ИИ-агента'},{id:'app',label:'Своё приложение'},{id:'system',label:'Рабочую систему'},{id:'automation',label:'Автоматизацию рутины'},{id:'explore',label:'Пока не знаю'}]},
    {id:'sponsor-v1',type:'ironic',title:'Спонсор карусели — моё «а можно проще?»',text:'Я Ирина. Собираю инструменты, чтобы меньше делать руками. Есть своя бесячая задача?',taskCta:true}
  ],
  projects:[{id:'oscar',title:'Спросить про Оскара',url:window.VediVibe.telegramUrl('Ирина, привет! Я из Студии каруселей. Хочу узнать про Оскара — ИИ-агента, который помогает готовить публикации из мыслей и заметок.')}],
  feedbackEndpoint:'',trackTransport:null
});
