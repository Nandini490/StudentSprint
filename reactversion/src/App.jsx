import TaskCard from "./TaskCard.jsx"
import {useState} from 'react'

function App(){
  const [tasks,setTasks]=useState(
    [
    {
        title:"React",
        duration:90,
        priority:"high",
        completed:false,
        description: "Learn React props and state",
    },
    {
      title:"JavaScript",
      duration:60,
      priority:"medium",
      completed:false,
      description:"Practice Description",
    }
    
  ]
  )
  function deleteTask(indexToDelete){
    const newTasks=tasks.filter((task,index)=>index!=indexToDelete);
    setTasks(newTasks);
  
  }
  
  return <><h1>Student Sprint</h1>
  {tasks.map((task, index) => (
  <TaskCard
    key={index}
    title={task.title}
    duration={task.duration}
    priority={task.priority}
    description={task.description}
    index={index}
    deleteTask={deleteTask}

  />
))}
  
  </>
  

}
export default App;