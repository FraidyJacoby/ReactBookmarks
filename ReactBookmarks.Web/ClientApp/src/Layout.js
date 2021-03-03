import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (
            <AuthContext.Consumer>
                {value => {
                    const { user } = value;
                    const isLoggedIn = !!user;
                    return (
                        <>
                            <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
                                <div className="container-fluid">
                                    <div className="collapse navbar-collapse">
                                        <ul className="navbar-nav me-auto mb-2 mb-md-0">
                                            <li className="nav-item active">
                                                <Link className="nav-link" to="/">Home</Link>
                                            </li>
                                            {!isLoggedIn && <li><Link className="nav-link" to="/Signup">Sign Up</Link></li>}
                                            {!isLoggedIn && <li><Link className="nav-link" to="/Login">Log In</Link></li>}
                                            {isLoggedIn && <li><Link className="nav-link" to="/MyBookmarks">My Bookmarks</Link></li>}
                                            {isLoggedIn && <li><Link className="nav-link" to="/Logout">Log out</Link></li>}
                                        </ul>
                                    </div>
                                </div>
                            </nav>

                            <div className="container">
                                {this.props.children}
                            </div>
                        </>
                    )
                }}
            </AuthContext.Consumer>
        );
    }
}
