import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import './app.scss';
import Task from "../Task/Task";



function App() {
   const [value, setValue] = useState('');
   const [search, setSearch] = useState('');

   const [status, setStatus] = useState("all");

   const [tasks, setTasks] = useState([
      {
         id: 1,
         name: "Walk the dog",
         isActive: true,
         isDone: false,
         isImportant: false,
      },
      {
         id: 2,
         name: "Go to the shop",
         isActive: true,
         isDone: false,
         isImportant: false,
      }
   ])

   useEffect(() => {
      let savedTasks = JSON.parse(localStorage.getItem("tasks"));
      console.log("отработал первый useEffect")
      setTasks(savedTasks);
   }, [])

   useEffect(() => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
      console.log("отработал второй useEffect")
   }, [tasks]);

   const addTask = () => {
      setTasks([
         ...tasks, {
            id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
            name: value,
            isActive: true,
            isDone: false,
            isImportant: false,
         }
      ])
      setValue("");
   }
   const importantHandler = (id) => {
      setTasks(tasks.map((task) => {
         if (task.id === id) {
            task.isImportant = !task.isImportant;
            return task;
         }
         else {
            return task
         }
      }));
   }
   const doneHandler = (id) => {
      setTasks(tasks.map((task) => {
         if (task.id === id) {
            task.isDone = !task.isDone;
            return task;
         }
         else {
            return task
         }
      }));
   }
   const removeTask = (id) => {
      setTasks(tasks.filter(task => {
         if (task.id !== id) {
            return task
         }
      }))
   }

   const deleteDoneHandler = () => {
      setTasks(tasks.filter(task => {
         return !task.isDone;
      }))
   }


   return (
      <div className="todo-wrapper">
         <h1 className="title">To Do App</h1>
         <div className="add-field">
            <input className="addtask-input" type="text" value={value} placeholder="task name" onChange={(e) => { setValue(e.target.value) }} />
            <button className="addtask-btn" onClick={addTask}><FaPlus /></button>
         </div>

         <span className="divider"></span>

         <ul className="todo">
            {tasks.length ? tasks.filter(task => {
               return task.name.toLocaleLowerCase().startsWith(search.toLocaleLowerCase())
            }).filter(task => {
               if (status === "important") {
                  return task.isImportant
               }
               else if (status === "done") {
                  return task.isDone;
               }
               else if (status === "all") {
                  return task;
               }

            }).map((task) => {
               return (
                  <Task task={task} removeTask={removeTask} doneHandler={doneHandler} importantHandler={importantHandler} />
               )
            }) : <h2>You don't have any tasks</h2>
            }
         </ul>

         <span className="divider__2"></span>

         <input className="search-input" value={search} type="search" placeholder="search" onChange={(e) => { setSearch(e.target.value) }} />
         <div className="task-filter">
            <div className="task-filter__all">
               <div className="task-filter__all--info">All tasks: {tasks.length}</div>
               <div className="task-filter__all--buttons">
                  <span>Filter:</span>
                  <button className="task-filter__all--buttons__btn" onClick={() => setStatus("important")} style={{ background: status === "important" ? "green" : "" }}><FaStar /></button>
                  <button className="task-filter__all--buttons__btn" onClick={() => setStatus("done")} style={{ background: status === "done" ? "green" : "" }}><FaCheck /></button>
                  <button className="task-filter__all--buttons__btn" onClick={() => setStatus("all")} style={{ background: status === "all" ? "green" : "" }}>all</button>
               </div>
            </div>
            <div className="task-filter__completed">
               <div className="task-filter__completed--info">Completed tasks: {tasks.filter(task => {
                  return task.isDone
               }).length}</div>

               <button className="task-filter__completed--button" onClick={deleteDoneHandler}><FaXmark />  <span>all</span></button>

            </div>
         </div>


      </div>

   );
}

export default App;
