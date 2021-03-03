import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './Layout';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import MyBookmarks from './pages/MyBookmarks';
import AddBookmark from './pages/AddBookmark';
import { AuthContextComponent } from './AuthContext';
import Logout from './pages/Logout';

export default class App extends Component {
  static displayName = App.name;

  render () {
      return (
        <AuthContextComponent>
            <Layout>
                <Route exact path='/' component={Home} />
                <Route exact path='/signup' component={Signup} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/logout' component={Logout} />
                <Route exact path='/mybookmarks' component={MyBookmarks} />
                <Route exact path='/addbookmark' component={AddBookmark} />
             </Layout>
          </AuthContextComponent>
    );
  }
}
