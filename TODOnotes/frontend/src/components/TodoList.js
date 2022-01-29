import {Link} from 'react-router-dom'

const TodoItem = ({todo, delete_todo}) => {
    return(
        <tr>
            <td>{todo.id}</td>
            <td>{todo.text}</td>
            <td>{todo.user}</td>
            <td><button onClick={()=>delete_todo(todo.id)} type='button'>Delete</button></td>
        </tr>
    )
}

const TodoList = ({todos, delete_todo}) => {
    return (
        <div>
            <table>
                <th>
                    id
                </th>
                <th>
                    text
                </th>
                <th>
                    user
                </th>
                {todos.map((todo) => <TodoItem todo={todo} delete_todo={delete_todo}/>)}
            </table>
            <Link to='/todos/create'>Create</Link>
        </div>
    )
}

export default TodoList;