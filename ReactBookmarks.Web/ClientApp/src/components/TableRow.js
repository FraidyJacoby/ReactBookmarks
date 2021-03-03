import React from 'react';

const TableRow = ({ bookmark, editMode, onUpdateClick, onEditClick, onDeleteClick, onTitleChange }) => {

    const { title, url } = bookmark;

    return (
        <tr>
            <td>
                {editMode && <input type="text" value={title} onChange={onTitleChange} />}
                {!editMode && title}
            </td>
            <td><a href={url} target="_blank" rel="noopener noreferrer">{url}</a></td>
            <td>
                {editMode && <button onClick={onUpdateClick} className="btn btn-success">Update</button>}
                {!editMode && <button onClick={onEditClick} className="btn btn-info">Edit</button>}
                <button onClick={onDeleteClick} className="btn btn-dark" style={{ marginLeft: 5 }}>Delete</button>
            </td>
        </tr>
    );
    
}

export default TableRow;