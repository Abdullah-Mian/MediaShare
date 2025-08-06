import { usePosts } from "@/context/PostsContext";

const PostCard = ({ post, isOwner }) => {
  const { editPost, deletePost } = usePosts();

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
    <div className="bg-white p-6 rounded-lg shadow-md border hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-3 text-gray-800">{post.title}</h3>
      <p className="text-gray-600 mb-4 leading-relaxed">{post.body || post.content}</p>
      <div className="flex gap-2">
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
  );
};

export default PostCard;
