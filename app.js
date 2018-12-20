//Defining the variables
const form =document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn =document.querySelector('.clear-tasks');
const filter = document.querySelector("#filter"); 
const taskInput = document.querySelector('#task');

//For loading all the event listener we make a single fuction
loadEventListeners();

//Defining the loadEventListeners fucntion
function loadEventListeners()
{
    //DOM reload Event
    document.addEventListener('DOMContentLoaded',getTasks);
    //Add task list
    form.addEventListener('submit',addTask);
    //Remove task from the list 
    taskList.addEventListener('click',removeTask);
    //Clear the tasklist
    clearBtn.addEventListener('click',clearTasks);
    //filter the tasklist
    filter.addEventListener('keyup', filterTasks);
}

//Getting tasks from ls
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks')=== null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    } 

    tasks.forEach(function(task){
        /// what should happen after clicking submit button for that we make a creat li tag
    const li = document.createElement('li'); 
    //For every list item added we need to give a class to it.
        li.className= 'collection-item';
    // after the class we need to store the task in the li tag
        li.appendChild(document.createTextNode(task));
    //Create new link tag which can delete the task from the task list
         const link= document.createElement('a');
        //adding class to the delete link
        link.className=' delete-item secondary-content';
        //Add icon html
        link.innerHTML= '<i class="fa fa-remove"> </i>';
        //Appending link to li
        li.appendChild(link);
        //Append li to ul
         taskList.appendChild(li);

    }); 
     
}

//Add task function defination
 function addTask(e){

    if(taskInput.value=== ''){
        alert('Add a task'); 
         
    }
/// what should happen after clicking submit button for that we make a creat li tag
    const li = document.createElement('li'); 
//For every list item added we need to give a class to it.
    li.className= 'collection-item';
// after the class we need to store the task in the li tag
    li.appendChild(document.createTextNode(taskInput.value));
//Create new link tag which can delete the task from the task list
     const link= document.createElement('a');
    //adding class to the delete link
    link.className=' delete-item secondary-content';
    //Add icon html
    link.innerHTML= '<i class="fa fa-remove"> </i>';
    //Appending link to li
    li.appendChild(link);
    //Append li to ul
     taskList.appendChild(li);
     //Store in LS
     storeTaskInlocalStorage(taskInput.value );
     //After everything is done clear the input box
     taskInput.value= ''; 

    e.preventDefault();

 }

 //Add to local storage
function storeTaskInlocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')=== null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

 //Remove function
 function removeTask(e)
 {
     if (e.target.parentElement.classList.contains('delete-item'))
     {
         if(confirm('Are you sure?'))
         {
             e.target.parentElement.parentElement.remove();
             //Remove from LS 
             removeTaskFromLocalStorage(e.target.parentElement.parentElemen);
         }
     }
 }

 function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  
    tasks.forEach(function(task, index){
      if(taskItem.textContent === task){
        tasks.splice(index, 1);
      }
    });
  
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

 //Clear tasks function
 function clearTasks()
 {
    while(taskList.firstChild)
    {
        taskList.removeChild(taskList.firstChild);
    }
    clearTasksFromLocalStorage();
 }

 // Clear Tasks from LS
 function clearTasksFromLocalStorage() {
    localStorage.clear();
  }

 //Filter Tasks
 function filterTasks(e)
 {
      const text = e.target.value.toLowerCase();

      document.querySelectorAll('.collection-item').forEach
      ( function(task)
      { 
          const item = task.firstChild.textContent;
          if(item.toLowerCase().indexof(text) !=-1){
              task.style.display ='block';
          }
          else{
            task.style.display ='none';

          }

      });
 }