import React from 'react'

class TodoForm extends React.Component {
    constructor(prop) {
        super(prop)
        this.state = {
            'project': 0,
            'user': 0,
            'text': ''
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        this.props.create_todo(this.state.project, this.state.user, this.state.text)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)} >

                <div className="form-group">
                    <label for="project">project</label>
                    <input type="number" className="form-control" name="project" placeholder="project" value={this.state.project}
                        onChange={(event) => this.handleChange(event)}/>
                </div>

                <div className="form-group">
                    <label for="user">user</label>
                    <input type="number" className="form-control" name="user" value={this.state.user} onChange={(event)=>this.handleChange(event)} />
                </div>

                <div className="form-group">
                    <label for="text">text</label>
                    <input type="text" className="form-control" name="text" placeholder="text" value={this.state.text}
                        onChange={(event) => this.handleChange(event)}/>
                </div>

                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        )
    }
}

export default TodoForm;
