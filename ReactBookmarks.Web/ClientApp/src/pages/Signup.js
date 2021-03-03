import React from 'react';
import produce from 'immer';
import axios from 'axios';

class Signup extends React.Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    }

    onTextChange = e => {
        const nextState = produce(this.state, draft => {
            draft[e.target.name] = e.target.value;
        })

        this.setState(nextState);
    }

    onFormSubmit = async e => {
        e.preventDefault();
        await axios.post('api/account/signup', this.state);
        this.props.history.push('/');
    }

    render() {
        const { onTextChange, onFormSubmit } = this;
        const { firstName, lastName, email, password } = this.state;
        return (
            <div className="container">
                <form onSubmit={onFormSubmit} >
                    <div className="row">
                        <div className="col-md-6 well" style={{ marginLeft:100 }}>
                            <div className="form-group">
                                <input type="text" onChange={onTextChange} value={firstName} className="form-control" placeholder="First Name" name="firstName" />
                            </div>
                            <div className="form-group">
                                <input type="text" onChange={onTextChange} value={lastName} className="form-control" placeholder="Last Name" name="lastName" />
                            </div>
                            <div className="form-group">
                                <input type="email" onChange={onTextChange} value={email} className="form-control" aria-describedby="emailHelp" placeholder="Email"name="email" />
                            </div>
                            <div className="form-group">
                                <input type="password" onChange={onTextChange} value={password} className="form-control" placeholder="Password" name="password" />
                            </div>
                            <button type="submit" className="btn btn-outline-primary">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
            );
    }
}

export default Signup;