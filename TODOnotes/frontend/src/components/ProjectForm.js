import React from 'react'

class ProjectForm extends React.Component {
    constructor(prop) {
        super(prop)
        this.state = {
            'name': '',
            'users': []
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleUsersChange(event) {
        if (!event.target.selectedOptions) {
            return;
        }

        let users = []
        for (let i=0; i<event.target.selectedOptions.length; i++) {
            users.push(parseInt(event.target.selectedOptions.item(i).value));
            console.log(users);
        }

        this.setState({
            'users': users
        })
    }

    handleSubmit(event) {
        this.props.create_project(this.state.name, this.state.users)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)} >

                <div className="form-group">
                    <label for="name">name</label>
                    <input type="text" className="form-control" name="name" placeholder="name" value={this.state.name}
                        onChange={(event) => this.handleChange(event)}/>
                </div>

                <div className="form-group">
                    <label for="users">users</label>
                    <select multiple name="users" onChange={(event) => this.handleUsersChange(event)}>
                        {this.props.users.map((user) => <option value={user.id}>{user.username}</option>)}
                    </select>
                </div>

                <input type="submit" className="btn btn-primary" value="Create" />
            </form>
        )
    }
}

export default ProjectForm;
