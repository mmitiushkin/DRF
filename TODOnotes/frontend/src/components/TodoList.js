
const TodoItem = ({todo}) => {
    return(
        <tr>
            <td>{todo.text}</td>
            <td>{todo.user}</td>
        </tr>
    )
}

const TodoList = ({todos}) => {
    return (
        <table>
            <th>
                text
            </th>
            <th>
                user
            </th>
            {todos.map((todo) => <TodoItem todo={todo} />)}
        </table>
    )
}

export default TodoList;