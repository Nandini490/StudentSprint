import { useState } from "react";
function TaskCard(props){
    function completeFunction(){
        setCompleted(true);
    }
    function undoFunction(){
        setCompleted(false);
    }
    
    const [completed,setCompleted]=useState(false);
    
     
    return  <>
   
    <div style={{textDecoration:completed?'line-through':'none'}} >
        <p >Title:{props.title} <br />Duration:{props.duration} minutes <br />priority:{props.priority==="high"?"High Priority Task":props.priority.toUpperCase()} <br />
        Description:{props.description} </p>
    </div>
    <br />
    <p>
        {completed?<button onClick={undoFunction}  >Undo</button> : <button onClick={completeFunction}>Complete</button> }  
        
        <button onClick={()=>props.deleteTask(props.index)}>Delete</button>
    </p>

    
   

    </> 

}

export default TaskCard;
