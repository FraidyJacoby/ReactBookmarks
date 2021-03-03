import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TableRow from '../components/TableRow';
import { produce } from 'immer';

class MyBookmarks extends React.Component {

    state = {
        bookmarks: [],
        editIds: []
    }

    componentDidMount = async () => {
        this.getBookmarks();
    }

    getBookmarks = async () => {
        const { data } = await axios.get('/api/bookmark/getbookmarks');
        this.setState({ bookmarks: data });
    }

    onEditClick = bookmarkId => {
        const editIds = [...this.state.editIds, bookmarkId];
        this.setState({ editIds });
    }

    onUpdateClick = async bookmarkId => {
        const vm = {
            bookmarkId,
            newTitle: this.state.bookmarks.find(b => b.id === bookmarkId).title
        }
        await axios.post('/api/bookmark/updatebookmark', vm);
        const newEditIds = this.state.editIds.filter(i => i !== bookmarkId);
        this.setState({ editIds: newEditIds });
    }

    onDeleteClick = async bookmarkId => {
        await axios.post('/api/bookmark/deletebookmark', { bookmarkId });
        this.getBookmarks();
    }

    onTitleChange = (e, bookmarkId) => {
        const nextState = produce(this.state, draft => {
            const bookmark = draft.bookmarks.find(b => b.id === bookmarkId);
            bookmark.title = e.target.value;
        })
        this.setState(nextState);
    }

    render() {
        const { bookmarks, editIds } = this.state;
        const { onEditClick, onDeleteClick, onUpdateClick, onTitleChange } = this;
        return (
            <>
                <Link to={'/addbookmark'} style={{ textDecoration: "none", marginBottom: 15 }} className="btn btn-warning">Add Bookmark</Link>
                <br />
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>URL</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookmarks.map(b => <TableRow
                            key={b.id}
                            bookmark={b}
                            editMode={editIds.includes(b.id)}
                            onTitleChange={e => onTitleChange(e, b.id)}
                            onUpdateClick={() => onUpdateClick(b.id)}
                            onEditClick={() => onEditClick(b.id)}
                            onDeleteClick={() => onDeleteClick(b.id)} />)}
                    </tbody>
                </table>
            </>
        )
    }
}

export default MyBookmarks;