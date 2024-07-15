/* eslint-disable react/prop-types */
import { TODO } from "../App";

export default function Todo( {todo, dispatchFn} ) {
    return (
        <div className="flex gap-x-4 bg-[#F2F2F2] py-3 px-6 rounded-sm items-center group">
            <input type="checkbox"
                   onChange={() => {dispatchFn({type: TODO["TOGGLE-TODO"], payload: {id: todo.id} })}}
                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            </input>
            <p className={todo.isCompleted ? 'line-through' : ''}>{ todo.title}</p>
            <button onClick={() => dispatchFn({type: TODO['DELETE-TODO'], payload: {id: todo.id}})}>
                <i className="fa fa-trash invisible group-hover:visible" aria-hidden="true"></i>
            </button>
        </div>
    )
}