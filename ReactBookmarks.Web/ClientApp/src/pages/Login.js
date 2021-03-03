import React from 'react';
import { Link } from 'react-router-dom';
import produce from 'immer';
import axios from 'axios';
import { AuthContext } from '../AuthContext';

class Login extends React.Component {

    state = {
        user: {
            email: '',
            password: ''
        },
        isValidLogin: true
    }

    onTextChange = e => {
        const nextState = produce(this.state, draft => {
            draft.user[e.target.name] = e.target.value;
        })
        this.setState(nextState);
    }

    onFormSubmit = async (e, setUser) => {
        e.preventDefault();
        const { data } = await axios.post('api/account/login', this.state.user);
        if (!data) {
            this.setState({ isValidLogin: false, user: { email: '', password: '' } });
        }
        else {
            setUser(data);
            this.props.history.push('/');
        }
    }

    render() {
        const { onTextChange, onFormSubmit } = this;
        const { email, password } = this.state.user;
        const { isValidLogin } = this.state;

        return (
            <AuthContext.Consumer>
                {value => {
                    const { setUser } = value;
                    return (
                        <div className="row">
                            <div className="col-md-6 col-md-offset-3 well">
                                <h2>Log in</h2>
                                {!isValidLogin && <span className="text-danger">Invalid login, please enter correct login.</span>}
                                <form onSubmit={e => onFormSubmit(e, setUser)}>
                                    <input onChange={onTextChange} type="text" name="email" value={email}
                                        placeholder="Email" className="form-control" />
                                    <br />
                                    <input onChange={onTextChange} type="password" name="password" value={password}
                                        placeholder="Password" className="form-control" />
                                    <br />
                                    <button className="btn btn-primary">Login</button>
                                </form>
                                <Link to="/signup">Sign up for a new account</Link>
                            </div>
                        </div>
                        )
                }}
            </AuthContext.Consumer>
            );
    }
}

export default Login;