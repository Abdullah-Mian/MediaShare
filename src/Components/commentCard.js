import { useAuth } from "@/context/AuthContext";
import {usePosts} from "@/context/PostsContext";
import { useState } from "react";

export default function CommentCard({ post }) {
    const { currentUser } = useAuth();
    const { editComment, deleteComment } = usePosts();
    const [showComments, setShowComments] = useState(false);


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
                className={`overflow-hidden transition-all duration-300 ease-in-out ${showComments ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
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
    )
}