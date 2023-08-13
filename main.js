const cron = require('node-cron');

var tasks = [
  {nombre:'Tarea 1',scheduled:'*/5 * * * * *',taskRef:null},
  {nombre:'Tarea 2',scheduled:'*/10 * * * * *',taskRef:null},
  {nombre:'Tarea 3',scheduled:'*/2 * * * * *',taskRef:null}
]




function scheduleTasks(nombre,scheduled){
  console.log('Agendando',nombre,scheduled)
  var task = cron.schedule(scheduled, () => {
    console.log(`Running taks ${nombre}`);
  });
  return task;
}

function stopTask(task) {
  if (task) {
    task.stop();
    console.log('Tarea detenida');
  } else {
    console.log('Tarea no encontrada');
  }
}

function main(){
  tasks.forEach((task) => {
    task.taskRef = scheduleTasks(task.nombre, task.scheduled);
  });


  
  
  setTimeout(() => {
    const taskToStop = tasks.find((task) => task.nombre === 'Tarea 3');
    stopTask(taskToStop.taskRef);
    // puedo llamar esta funcion para detener la tarea cuando sea necesario
  }, 10000); // Detiene "Tarea 3" después de 10 segundos

}

main()