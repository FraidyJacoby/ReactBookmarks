import React from 'react';
import produce from 'immer';
import axios from 'axios';

class AddBookmark extends React.Component {

    state = {
        title: '',
        url: ''
    }

    onTextChange = e => {
        const nextState = produce(this.state, draft => {
            draft[e.target.name] = e.target.value;
        })
        this.setState(nextState);
    }

    onFormSubmit = async e => {
        e.preventDefault();
        await axios.post('/api/bookmark/addbookmark', this.state);
        this.props.history.push('/mybookmarks');
    }

    render() {
        const { onFormSubmit, onTextChange } = this;
        const { title, url } = this.state;
        return (
            <div>
                <span>Add a bookmark!</span>
                <form onSubmit={onFormSubmit}>
                    <input type="text" onChange={onTextChange} placeholder="Title" name="title" className="form-control" value={title} />
                    <input type="text" onChange={onTextChange} placeholder="Url" name="url" className="form-control" value={url} />
                    <button className="btn btn-outline-danger">Add Bookmark</button>
                </form>
            </div>
            );
    }
}

export default AddBookmark;