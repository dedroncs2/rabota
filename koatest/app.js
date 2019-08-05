const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');
const koaBody = require('koa-body');
const db = require(__dirname + '/models/index.js')


const app = new Koa();
const router = new Router();

app.use(cors());
app.use(router.routes());




// router.get('task','/tasks/:id', ctx => {
//   ctx.body = tasks[ctx.params.id];
// });

router.get('/tasks', async (ctx,next)=>{
  let todos = await db.Todos.findAll(
    {where:{},order:[['id','DESC']]},
    {raw: true},
    );
  ctx.body =todos;
  // try{
  //   ctx.body = tasks;
  // }
  // catch (err) {
  //   console.error('err',err);
  //   ctx.status=500;
  //   ctx.body= 'FeelsBadMan';
  // }
});
router.post('/tasks', koaBody(), async (ctx)=>{
  await db.Todos.create(ctx.request.body);
  ctx.body="add task ok";
  // try{
  //   let task = ctx.request.body;
  //   task.id = ++id;
  //   tasks.push(task);
  //   ctx.body = task;
  //   console.log(task)
  // }
  // catch (err) {
  //   console.error('err',err);
  //   ctx.status=500;
  //   ctx.body= 'FeelsBadMan';
  // }
});
router.del('/tasks',koaBody(),async (ctx, next) => {
  await db.Todos.destroy({
    where:{
      done: true
    }
  });
  ctx.body="delete all done"
  // try{
  //   tasks=tasks.filter(function (task) {
  //     return task.done==false;
  //   });
  //   ctx.body="del done";
  // }
  // catch (err) {
  //   console.error('err',err);
  //   ctx.status=500;
  //   ctx.body= 'FeelsBadMan';
  // }
});

router.post('/tasks/:id', koaBody(), async (ctx)=>{
  await db.Todos.update({
    text: ctx.request.body.text,
    done: ctx.request.body.done,
  },{
    where:{id: ctx.request.body.id}
  });
  ctx.body ="update done";
  // try{
  //   console.log(ctx.request.body)
  //   for (var i=0;i < tasks.length;i++){
  //     if(tasks[i].id==ctx.params.id){
  //       tasks[i]= ctx.request.body;
  //       ctx.body=tasks[i];
  //       console.log(tasks[i])
  //       break;
  //     }
  //     else {
  //       ctx.body="(((";
  //     }
  //   }
  // }
  // catch (err) {
  //   console.error('err',err);
  //   ctx.status=500;
  //   ctx.body= 123;
  // }
});

router.delete('/tasks/:id', koaBody(), async (ctx)=>{
  await db.Todos.destroy(
    {where: {id: ctx.params.id}}
  );
  ctx.body= "delete id done";
  // try{
  //   console.log(ctx.request.body)
  //   for (var i=0;i < tasks.length;i++){
  //     if(tasks[i].id==ctx.params.id){
  //       tasks.splice(i,1);
  //       ctx.body="ok";
  //       console.log(tasks[i])
  //       break;
  //     }
  //     else {
  //       ctx.body="(((";
  //     }
  //   }
  // }
  // catch (err) {
  //   console.error('err',err);
  //   ctx.status=500;
  //   ctx.body= 123;
  // }
});

app.listen(3001);