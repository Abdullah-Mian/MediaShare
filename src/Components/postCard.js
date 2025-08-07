import { usePosts } from "@/context/PostsContext";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

const PostCard = ({ post, isOwner }) => {
  const { editPost, deletePost } = usePosts();
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

  return (
    <div className="bg-white rounded-lg shadow-md border hover:shadow-lg transition-all duration-300">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3 text-gray-800">{post.title}</h3>
        <p className="text-gray-600 mb-4 leading-relaxed">{post.body || post.content}</p>
        
        <div className="flex gap-2 mb-4">
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

          {/* Expandable Comments Container */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              showComments ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="px-6 pb-4">
              <div className="max-h-54 overflow-y-auto space-y-3">
                {post.comments.map(comment => (
                  <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-medium text-sm text-gray-800 mb-1">{comment.name}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{comment.body}</p>
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
