import { usePosts } from "@/context/PostsContext";
import { useAuth } from "@/context/AuthContext";
import CommentCard from "@/Components/commentCard";

const PostCard = ({ post, isOwner }) => {
  const { editPost, deletePost, commentOnPost } = usePosts();
  const { currentUser } = useAuth();

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
        <CommentCard post={post} />
      )}
    </div>
  );
};

export default PostCard;
