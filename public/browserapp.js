const TasksDOM=document.querySelector('.tasks');
const LoadingDOM=document.querySelector('.Loading-text');
const Task_InputDOM=document.querySelector('.task-input');
const SubmitBtnDOM=document.querySelector('.submit-btn');
const formalert_DOM=document.querySelector('.form-alert');
const formDOM=document.querySelector('.task-form');

formalert_DOM.style.visibility='hidden';
formalert_DOM.innerHTML='task can not be empty';

//show all tasks.
const showTasks=async()=>{
  LoadingDOM.style.visibility='visible';
  try {
      const {data}=await axios.get('/api/tasks');
     
      if(data.length<1)
      {
        TasksDOM.innerHTML='<h5>no tasks found in your list</h5>';
        LoadingDOM.style.visibility='hidden';
        return;
      }
      else
      {
        let i=0;
        LoadingDOM.style.visibility='hidden';
        for( i=0;i<data.length;i++){
         let div=document.createElement('div');
         TasksDOM.append(div);
         div.innerHTML=`<div class="single-task">
        <h5>
         <span>
         <i class="fa-solid fa-circle-check"></i>
         </span>
         
         ${data[i].name}
        
        <!--edit link-->
        <a href="task.html?id=${data[i]._id}">
        <span class="task-link">
        <i class="fas fa-edit"></i>
        </span>
        </a>

        <!--delete-->

        
        <button type="button" class="delete-btn" id="${data[i]._id}">
        <i class="fas fa-trash"></i>
        </button>
        
        </h5>
        </div><br>`
      }
      }
  } catch (error) {
      console.log(error)
  }
}

showTasks();

//delete
TasksDOM.addEventListener('click',async(e)=>{
    const e1= e.target.parentElement;
    
    if(e1.parentElement.classList.contains('delete-btn') )
    {
       
       LoadingDOM.style.visibility='visible';
       const id=e1.parentElement.id;
       try{

       await axios.delete(`/api/tasks/${id}`)
        TasksDOM.innerHTML='';
       showTasks();
    }
   
   catch (error) {
   console.log(error) 
  }
  LoadingDOM.style.visibility='hidden';
}
})

//form
formDOM.addEventListener('submit',async(e)=>{
  e.preventDefault();
  formalert_DOM.style.visibility='hidden';
  const task_name=Task_InputDOM.value;
  if(!task_name)
  {
    formalert_DOM.style.visibility='visible';

  }
  else{
  try {
    await axios.post('/api/tasks',{name:task_name});
    TasksDOM.innerHTML='';
    showTasks();
  } catch (error) {
    console.log(error);
  }
}

})