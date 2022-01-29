import {Link} from 'react-router-dom'

const ProjectItem = ({project, delete_project}) => {
    return(
        <tr>
            <td><Link to={`/projects/${project.id}`}>{project.name}</Link> </td>
            <td>{project.users}</td>
            <td><button onClick={()=>delete_project(project.id)} type='button'>Delete</button></td>
        </tr>
    )
}

const ProjectList = ({projects, delete_project}) => {
    return (
        <div>
            <table>
                <th>
                    name
                </th>
                <th>
                    users
                </th>
                {projects.map((project) => <ProjectItem project={project} delete_project={delete_project}/>)}
            </table>

            <Link to='/projects/create'>Create</Link>
        </div>
    )
}

export default ProjectList;