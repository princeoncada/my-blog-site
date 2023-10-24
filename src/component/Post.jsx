import React, { useState } from 'react';
import '../style/Post.css';

const Post = ({ post, onEdit, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedPost, setEditedPost] = useState({ ...post });

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedPost({ ...post });
    };

    const handleSaveEdit = () => {
        onEdit(post.id, editedPost)
        setIsEditing(false);
    };

    const handleDeleteClick = () => {
        onDelete(post.id);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedPost((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div className="post">
            {isEditing ? (
                <div className="post-edit">
                    <input
                        type="text"
                        name="title"
                        value={editedPost.title}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="author"
                        value={editedPost.author}
                        onChange={handleInputChange}
                    />
                    <input
                        type="date"
                        name="date"
                        value={editedPost.date}
                        onChange={handleInputChange}
                    />
                    <textarea
                        name="content"
                        value={editedPost.content}
                        onChange={handleInputChange}
                    />
                    <div className="button-container">
                        <button onClick={handleSaveEdit} className="green">Save</button>
                        <button onClick={handleCancelEdit} className="red">Cancel</button>
                    </div>
                </div>
            ) : (
                <div className="post-details">
                    <h2>{editedPost.title}</h2>
                    <p>By {editedPost.author} on {editedPost.date}</p>
                    <p>{editedPost.content}</p>
                    <div className="button-container">
                        <button onClick={handleEditClick} className="green">Edit</button>
                        <button onClick={handleDeleteClick} className="red">Delete</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Post;
