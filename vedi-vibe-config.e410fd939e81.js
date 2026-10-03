// Editable copy, separate from export/editor logic. No private keys in public JS.
// Polls and feedback stay disabled until a verified private collector is connected.
window.VediVibe?.configure({
  pilotMode:true, // Explicitly changed after review; never expires or re-enables ads automatically.
  ads:[
    {id:'oscar-v2',type:'project',productId:'oscar',title:'Карусели — не ваша вторая работа',text:'Передайте подготовку контента Оскару — моему ИИ-агенту.',authorNote:'Ирина Вединеева · Веди Вайб'},
    {id:'consult-v1',type:'project',productId:'consult',title:'Карусель есть. А система?',text:'Разберём, что публиковать, зачем и как перестать начинать с нуля.',authorNote:'Веди Вайб · моя авторская практика'},
    {id:'system-v1',type:'project',productId:'system',title:'Соберу контент-систему под вас',text:'Настрою помощника и процесс под ваш продукт, стиль и площадки.',authorNote:'Ирина Вединеева · Веди Вайб'},
    {id:'audience-v1',type:'poll',questionId:'work-tool-v1',title:'Что собрать для вашей работы?',text:'',options:[{id:'agent',label:'ИИ-агента'},{id:'app',label:'Своё приложение'},{id:'system',label:'Рабочую систему'},{id:'automation',label:'Автоматизацию рутины'},{id:'explore',label:'Пока не знаю'}]}
  ],
  projects:[
    {id:'oscar',title:'Хочу Оскара',url:window.VediVibe.telegramUrl('Ирина, привет! Я из Студии каруселей. Хочу Оскара, чтобы делегировать подготовку каруселей и другого контента. Расскажи, как это может работать для меня.')},
    {id:'consult',title:'Хочу на консультацию',url:window.VediVibe.telegramUrl('Ирина, привет! Я из Студии каруселей. Хочу консультацию по своему контенту: понять, что публиковать, как связать это с продуктом и что можно автоматизировать.')},
    {id:'system',title:'Хочу свою систему',url:window.VediVibe.telegramUrl('Ирина, привет! Я из Студии каруселей. Хочу обсудить индивидуальную контент-систему: помощника и процесс от идей до публикации после моего согласования. Вот моя задача: ')}
  ],
  feedbackEndpoint:'',trackTransport:null
});
