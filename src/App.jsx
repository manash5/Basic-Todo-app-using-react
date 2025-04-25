import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { IoIosSave } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

function App() {
  const [count, setCount] = useState(0)
  const[todo, setTodo] = useState("") // input text 
  const[todos, setTodos] = useState([]) // array holds all todo ]
  const[showFinished, setShowFinished] = useState(true); 

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      // Reset all editing states
      todos = todos.map(todo => ({ ...todo, isEditing: false }));
      setTodos(todos); 
    }
  }, [])

  useEffect(() => {
    if (todos.length > 0) {
    localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]); 

  const toggleFinished = (e)=>{
    setShowFinished(!showFinished)

  }


  const handleEvent = (id)=>{
    console.log("edit button was clicked")
    let newTodos = todos.map(item=>{
      if(item.id === id){
        if (item.isEditing){
          return {...item, isEditing: false}; // Save clicked 
        } else{
          return {...item, isEditing: true}; // edit clicked
        }
      }
      return item; 
    }); 
    setTodos(newTodos); 
  }


  const handleEditChange = (e, id) => {
    console.log("handleEditChange")
    let newTodos = todos.map(item => {
      if (item.id === id) {
        return { ...item, todo: e.target.value };
      }
      return item;
    });
    setTodos(newTodos);
  };
  

  const handleDelete = (e, id)=>{
    let newTodos = todos.filter(item=>{
      return item.id!== id; 
    })
    setTodos(newTodos)
  }

  const handleAdd = ()=>{
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false, isEditing: false}])
    setTodo(""); 
  }

  const handleChange = (e)=>{
    setTodo(e.target.value)
    
  }

  const handleCheckbox=(e)=>{
    let id = e.target.name; 
    let index = todos.findIndex(item=>{
      return item.id === id; 
    })
    console.log(id); 
    let newTodos = [...todos];  
    newTodos[index].isCompleted = !newTodos[index].isCompleted; 
    setTodos(newTodos); 
  }

  return (
    <>
      <Navbar/>
      <div className="mx-5 container bg-cyan-100 md:mx-auto my-5 p-5 rounded-xl min-h-[80vh] md:w-1/2 w-fit">
      <h1 className='font-bold text-center text-xl'>iTask - Manage your todos at one place</h1>
        <div className="addTodo p-3 flex flex-col gap-4">
          <h2 className = 'text-lg font-bold my-2'> Add your todo</h2>
          <input onChange={handleChange} type = 'text' value = {todo} className='bg-white md:w-full '/>
          <button onClick ={handleAdd} disabled= {todo.length<=3} className='bg-cyan-950  hover:bg-cyan-800 p-2 py-1 text-sm font-bold text-white rounded-md '>Save</button>
        </div>
        <input onChange = {toggleFinished} className = 'm-3' type = 'checkbox' checked ={showFinished}/> Show Finished 
        <hr className='my-4'></hr>
        <h2 className='text-lg font-bold p-3'>Your Todos</h2>
        <div className="todos ">
          {todos.length ===0 && <div className='p-3'>No todos to display</div>}
          {todos.map(item=>{
          return (showFinished || !item.isCompleted) &&<div key = {item.id} className="todo flex justify-between bg-cyan-50 p-3 rounded-xl my-3">
            <div className='flex justify-between gap-4'>
            <input onChange = {handleCheckbox} type = 'checkbox' checked = {item.isCompleted} name = {item.id} id = ''/>
            {item.isEditing ? (
              <input
                type="text"
                value={item.todo}
                onChange={(e) => handleEditChange(e, item.id)}
                className="border-0 px-1 bg-cyan-50 outline-none focus:outline-none md:w-auto"
              />
            ) : (
              <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
            )}
            </div>
            <div className="btns flex gap-2">
              <button onClick={()=>{handleEvent(item.id)}} className='bg-cyan-950  hover:bg-cyan-800 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'>{item.isEditing?<IoIosSave />: <FaEdit />}</button>
              <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-cyan-950  hover:bg-cyan-800 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><MdDelete /></button>
            </div>
          </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
