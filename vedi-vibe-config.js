// Editable copy, separate from export/editor logic. No private keys in public JS.
// Polls and feedback stay disabled until a verified private collector is connected.
window.VediVibe?.configure({
  ads:[
    {id:'oscar-v1',type:'project',productId:'oscar',title:'Сегодня — Оскар',text:'Пока собирается ваша карусель — покажу ещё одну штуку, которую я собираю. Оскар — мой AI-агент для работы с контентом. Студия помогает собрать одну карусель. Оскар работает с самим контент-процессом.'},
    {id:'audience-v1',type:'poll',questionId:'work-tool-v1',title:'Вопрос от Веди Вайб',text:'Какую штуку вы бы больше всего хотели собрать под свою работу?',options:[{id:'agent',label:'AI-агента, который делает часть работы за меня'},{id:'app',label:'Своё приложение'},{id:'system',label:'Рабочую систему'},{id:'automation',label:'Автоматизацию бесячей рутины'},{id:'explore',label:'Пока не знаю — хочу посмотреть, что возможно'}]},
    {id:'sponsor-v1',type:'ironic',title:'Спонсор вашей бесплатной карусели',text:'Да, сервис бесплатный. Поэтому здесь я рекламирую свою привычку собирать инструменты вместо того, чтобы бесконечно делать всё руками. Так, собственно, и появился Веди Вайб.'}
  ],
  projects:[{id:'oscar',title:'Спросить Ирину про Оскара',url:window.VediVibe.telegramUrl('Ирина, привет! Я из Студии каруселей. Хочу узнать про Оскара — вашего AI-агента для контента.')}],
  feedbackEndpoint:'',trackTransport:null
});
