import {useParams} from 'react-router-dom'


const TodoItem = ({todo}) => {
    return(
        <tr>
            <td>{todo.project}</td>
            <td>{todo.text}</td>
            <td>{todo.user}</td>
        </tr>
    )
}

const ProjectTodos = ({todos}) => {
    let { id } = useParams();
    let filteredTodos = todos.filter((todo) => todo.project == parseInt(id))

    return (
        <table>
            <th>
                text
            </th>
            <th>
                user
            </th>
            {filteredTodos.map((todo) => <TodoItem todo={todo} />)}
        </table>
    )
}

export default ProjectTodos;