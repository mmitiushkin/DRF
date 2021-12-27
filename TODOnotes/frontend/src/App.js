import React from 'react'
import {HashRouter, BrowserRouter, Route, Routes, Link, Navigate} from 'react-router-dom'
import UserList from './components/UserList.js'
import ProjectList from './components/ProjectList.js'
import TodoList from './components/TodoList.js'
import ProjectTodos from './components/ProjectTodos.js'
import axios from 'axios'


const NotFound = () => {
    return (
        <div>Page not found</div>
    )
}


class App extends React.Component {
    constructor(prop) {
        super(prop)
        this.state = {
            'users': [],
            'projects': [],
            'todos': []
        }
    }

    componentDidMount() {
        axios
        .get('http://127.0.0.1:8000/api/users/')
        .then((response) => {
            const users = response.data.results
            console.log(users)
            this.setState({
                'users': users
            });
        })
        .catch((error) => console.log(error));

        axios
        .get('http://127.0.0.1:8000/api/projects/')
        .then(response => {
            const projects = response.data.results
            this.setState({
                'projects': projects
            })
        })
        .catch(error => console.log(error));

        axios
        .get('http://127.0.0.1:8000/api/TODOs/')
        .then(response => {
            const todos = response.data.results
            console.log(todos)
            this.setState({
                'todos': todos
            })
        })
        .catch(error => console.log(error));
    }



    render () {
        return (
            <div>
                <BrowserRouter>
                    <nav>
                        <ul>
                            <li><Link to="/">Users</Link> </li>
                            <li><Link to="/projects">Projects</Link></li>
                            <li><Link to="/todos">TODOs</Link></li>
                        </ul>
                    </nav>
                    <Routes>
                        <Route exact path='/' element={<UserList users={this.state.users} /> } />
                        <Route exact path='/projects' element={<ProjectList projects={this.state.projects} /> } />
                        <Route path='/todos' element={<TodoList todos={this.state.todos} /> } />
                        <Route path="/users" element={<Navigate to="/"/>} />
                        <Route path='/projects/:id' element={<ProjectTodos todos={this.state.todos} /> } />

                        <Route path="*" element={<NotFound /> } />
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
