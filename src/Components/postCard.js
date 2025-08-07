import { usePosts } from "@/context/PostsContext";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

const PostCard = ({ post, isOwner }) => {
  const { editPost, deletePost, commentOnPost, editComment, deleteComment } = usePosts();
  const { currentUser } = useAuth();
  const [showComments, setShowComments] = useState(false);

  const handelDelete = () => {
    if (confirm("Are you sure you want to delete this post?")) {
      deletePost(post.id);
    }
  };

  const handelEdit = () => {
    const updatedPost = {
      title: prompt("Enter new title", post.title),
      content: prompt("Enter new content", post.body || post.content)
    };
    if (updatedPost.title && updatedPost.content) {
      editPost(post.id, updatedPost);
    }
  };

  const handelComment = () => {
    const comment = {
      name: currentUser.name,
      email: currentUser.email,
      id: Date.now(),
      postId: post.id,
      body: prompt("Enter your comment")
    };
    if (comment.body) {
      commentOnPost(post.id, comment);
    }
  };

  const handleEditComment = (commentId, currentBody) => {
    const newBody = prompt("Edit your comment", currentBody);
    if (newBody && newBody !== currentBody) {
      editComment(post.id, commentId, newBody);
    }
  };

  const handleDeleteComment = (commentId) => {
    if (confirm("Are you sure you want to delete this comment?")) {
      deleteComment(post.id, commentId);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border hover:shadow-lg transition-all duration-300">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3 text-gray-800">{post.title}</h3>
        <p className="text-gray-600 mb-4 leading-relaxed">{post.body || post.content}</p>
        
        <div className="flex gap-2 mb-4">
          {currentUser && (
            <button 
              onClick={handelComment}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
            >
              Add Comment
            </button>
          )}
          {isOwner && (
            <>
              <button 
                onClick={handelEdit}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Edit
              </button>
              <button 
                onClick={handelDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      {post.comments && post.comments.length > 0 && (
        <div className="border-t border-gray-200">
          <button
            onClick={() => setShowComments(!showComments)}
            className="w-full px-6 py-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
          >
            <span>View Comments ({post.comments.length})</span>
            <svg
              className={`w-5 h-5 transform transition-transform duration-200 ${showComments ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              showComments ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="px-6 pb-4">
              <div className="max-h-54 overflow-y-auto space-y-3">
                {post.comments.map(comment => (
                  <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium text-sm text-gray-800 mb-1">{comment.name}</p>
                        <p className="text-xs text-gray-600 leading-relaxed">{comment.body}</p>
                      </div>
                      {currentUser && comment.email === currentUser.email && (
                        <div className="flex gap-2 ml-2">
                          <button
                            onClick={() => handleEditComment(comment.id, comment.body)}
                            className="text-blue-500 hover:text-blue-700 transition-colors"
                            title="Edit comment"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                            title="Delete comment"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
