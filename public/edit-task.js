const formDOM=document.querySelector('.single-task-form');
const task_idDOM=document.querySelector('.edit-task-id');
const inputTask_DOM=document.querySelector('.task-edit-name');
const CompletedDOM=document.querySelector('.task-edit-completed');
const formAlertDOM=document.querySelector('.form-alert');

const params = window.location.search  //gets parameters in url
const task_id= new URLSearchParams(params).get('id')  //gets id of requested element from url


const showSingleTask=async()=>{
  try {
      
      const {data}=await axios.get(`/api/tasks/${task_id}`);
      task_idDOM.innerHTML=task_id;
      inputTask_DOM.value=data.name;
      
      const completed=data.completed;
     // console.log(`complete status=${completed}`)
      if(completed)
      {
          CompletedDOM.checked='true';
          
      }
      

  } catch (error) {
      console.log(error);
  }
}

showSingleTask();

formDOM.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const taskname=inputTask_DOM.value;
    let complete="false";
    if(CompletedDOM.checked)
    {
        complete="true";
        alert("task completed");
    }
    else{
        alert("task not completed")
    }
    try {
        await axios.patch(`/api/tasks/${task_id}`,{
            name:taskname,
            completed:complete
        })
        showSingleTask();
    } catch (error) {
        console.log(error);
    }
})