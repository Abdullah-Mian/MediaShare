import React from 'react';
const  PostCard = ({ post, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-3 text-gray-800">{post.title}</h3>
      <p className="text-gray-600 mb-4 leading-relaxed">{post.body || post.content}</p>
      <div className="flex gap-2">
        <button 
          // onClick={() => onEdit && onEdit(post.id)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Edit
        </button>
        <button 
          // onClick={() => onDelete && onDelete(post.id)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PostCard;
