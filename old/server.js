import  { setTimeout  } from 'node:timers/promises'
import PQueue from 'p-queue';

async function task(id){
  console.log("starting...", id)
  await setTimeout(1000 + Math.random() * 10000);
  console.log("task done", id)

}

const links = Array(100).fill(0).map((_, i) => i)


async function master() {
  const queue = new PQueue({
    concurrency: 3,
  });

  const tasks = links.map((link) => queue.add(() => task(link)));
  await Promise.all(tasks);
  console.log('All Done');
}

master()

// console.log(chunks)

//Promise.all(tasks).then(() => console.log('TODAS AS TASKS PRONTAS'));