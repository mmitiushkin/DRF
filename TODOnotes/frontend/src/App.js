import React from 'react'
import {HashRouter, BrowserRouter, Route, Routes, Link, Navigate, useLocation} from 'react-router-dom'
import UserList from './components/UserList.js'
import ProjectList from './components/ProjectList.js'
import TodoList from './components/TodoList.js'
import ProjectTodos from './components/ProjectTodos.js'
import LoginForm from './components/LoginForm.js'
import axios from 'axios'


const NotFound = () => {
    let location = useLocation()
    return (
        <div>Page {location.pathname} not found</div>
    )
}


class App extends React.Component {
    constructor(prop) {
        super(prop)
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
            'token': ''
        }
    }

    get_token(login, password) {
        axios
        .post('http://127.0.0.1:8000/api-token-auth/', {"username": login, "password": password})
        .then(response => {
            const token = response.data.token
            console.log(token)
            localStorage.setItem('token', token)
            this.setState({
                'token': token
            }, this.get_data)
        })
        .catch(error => console.log(error))
    }

    logout() {
        localStorage.setItem('token', '')
        this.setState({
            'token': ''
        }, this.get_data)
    }

    componentDidMount() {
        let token = localStorage.getItem('token')
        this.setState({
            'token': token
        }, this.get_data)
    }

    is_auth() {
        return !!this.state.token
    }

    get_headers() {
        if (this.is_auth()) {
            return {
                'Authorization': 'Token ' + this.state.token
            }
        }
        return {}
    }

    get_data() {
        let headers = this.get_headers()
        axios
        .get('http://127.0.0.1:8000/api/users/', {headers})
        .then((response) => {
            const users = response.data.results
            this.setState({
                'users': users
            });
        })
        .catch(error => {
            this.setState({
                'users': []
            })
            console.log(error)
        })

        axios
        .get('http://127.0.0.1:8000/api/projects/', {headers})
        .then(response => {
            const projects = response.data.results
            this.setState({
                'projects': projects
            })
        })
        .catch(error => {
            this.setState({
                'projects': []
            })
            console.log(error)
        })

        axios
        .get('http://127.0.0.1:8000/api/TODOs/', {headers})
        .then(response => {
            const todos = response.data.results
            this.setState({
                'todos': todos
            })
        })
        .catch(error => {
            this.setState({
                'todos': []
            })
            console.log(error)
        })
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
                            <li>{ this.is_auth() ? <button onClick={() => this.logout()}> Logout </button> : <Link to="/login">Login</Link> }</li>
                        </ul>
                    </nav>
                    <Routes>
                        <Route exact path='/' element={<UserList users={this.state.users} /> } />
                        <Route exact path='/projects' element={<ProjectList projects={this.state.projects} /> } />
                        <Route exact path='/login' element={<LoginForm get_token={(login, password) => this.get_token(login, password)}/> } />
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
