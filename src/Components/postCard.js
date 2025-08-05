import React, { useState } from 'react';

const PostCard = ({ post, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(post?.title || '');
  const [editContent, setEditContent] = useState(post?.content || '');

  const handleSave = () => {
    onEdit(post.id, { title: editTitle, content: editContent });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(post.title);
    setEditContent(post.content);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="post-card editing">
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          placeholder="Post title"
          className="edit-title"
        />
        <textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          placeholder="Post content"
          className="edit-content"
        />
        <div className="edit-actions">
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className="post-card">
      <h3 className="post-title">{post.title}</h3>
      <p className="post-content">{post.content}</p>
      <div className="post-actions">
        <button onClick={() => setIsEditing(true)}>Edit</button>
        <button onClick={() => onDelete(post.id)}>Delete</button>
      </div>
    </div>
  );
};

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const createPost = () => {
    if (newTitle.trim() && newContent.trim()) {
      const newPost = {
        id: Date.now(),
        title: newTitle,
        content: newContent
      };
      setPosts([...posts, newPost]);
      setNewTitle('');
      setNewContent('');
      setIsCreating(false);
    }
  };

  const editPost = (id, updatedPost) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, ...updatedPost } : post
    ));
  };

  const deletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  return (
    <div className="posts-page">
      <div className="posts-header">
        <h2>Posts</h2>
        <button onClick={() => setIsCreating(true)}>Create New Post</button>
      </div>

      {isCreating && (
        <div className="create-post">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Post title"
            className="create-title"
          />
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Post content"
            className="create-content"
          />
          <div className="create-actions">
            <button onClick={createPost}>Create Post</button>
            <button onClick={() => setIsCreating(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="posts-list">
        {posts.map(post => (
          <PostCard
            key={post.id}
            post={post}
            onEdit={editPost}
            onDelete={deletePost}
          />
        ))}
        {posts.length === 0 && !isCreating && (
          <p>No posts yet. Create your first post!</p>
        )}
      </div>
    </div>
  );
};

export default PostCard;
export { PostsPage };
