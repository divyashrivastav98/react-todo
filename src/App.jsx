import { useReducer, useRef } from 'react'
import './App.css'
import Todo from './components/Todo'

const initialTodoState = {
  todoList: [],
  count: 0
}

export const TODO = {
  'ADD-TODO': 'add-todo',
  'TOGGLE-TODO': 'toggle-todo',
  'DELETE-TODO': 'delete-todo'
}

function todoReducer(state, action) {
  if (action.type === TODO['ADD-TODO']) {
    const todo = {
      id: Date.now(),
      title: action.payload.todo,
      isCompleted: false
    } 

    return { 
      todoList: [...state.todoList, todo],
      count: state.count++
    }
  } else if (action.type === TODO['TOGGLE-TODO']) {
      let isTodoCompleted;
      const updatedTodoList = state.todoList.map(todo => {
        if (todo.id === action.payload.id) {
          isTodoCompleted = !todo.isCompleted;
          return {...todo, isCompleted: !todo.isCompleted}
        }
        return todo;
      });

      return {
       todoList: updatedTodoList,
       count: isTodoCompleted ? state.count-- : state.count++
      }
  } else if (action.type === TODO['DELETE-TODO']) {
    let isTodoCompleted;
    const selectedTodoIndex = state.todoList.findIndex(t => t.id === action.payload.id);
    if (selectedTodoIndex > -1) {
      isTodoCompleted = state.todoList[selectedTodoIndex].isCompleted;
      state.todoList.splice(selectedTodoIndex, 1);
    }

    return {
      todoList: state.todoList,
      count: isTodoCompleted ? state.count : state.count--
    }
  }
  return state;
}

function App() {

  const [todos, dispatch] = useReducer(todoReducer, initialTodoState )
  const todo = useRef('');

  function addTodoHandler(e) {
    e.preventDefault();
    dispatch({ type: TODO['ADD-TODO'], payload: {todo: todo.current.value} });
    todo.current.value = '';
  }

  return (
    <div className='flex flex-col items-center justify-center gap-5 p-5 bg-white'>
      <div>
        <h1 className='text-2xl font-bold'>Todo App</h1>

      </div>
      <form className='flex gap-x-4'>
          <input type="text" ref={todo} className='border-2 border-zinc-400'></input>
          <button type="submit"
                  className='bg-purple-700 text-white py-1.5 px-4 text-3xl font-extrabold' 
                  onClick={(e) => addTodoHandler(e)}
                  title='Add Todo'>
                    +
          </button>
      </form>
      <ul className='flex flex-col gap-y-3'>
        {todos.todoList.map(todo => {
          return <li key={todo.id}><Todo todo={todo} dispatchFn={dispatch}></Todo></li>
        })}
      </ul>
      <p>You have {todos.count} tasks to complete.</p>
    </div>  
  )
}

export default App
