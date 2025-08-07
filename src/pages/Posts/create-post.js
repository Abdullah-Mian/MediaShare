import { usePosts } from "@/context/PostsContext"
import { useRouter } from "next/router";
import { useState } from "react";

export default function CreatePost() {
    const { CreatePost } = usePosts();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const title = e.target.title.value;
        const content = e.target.content.value;
        
        CreatePost({ title, body: content });
        
        setTimeout(() => {
            setIsSubmitting(false);
            router.push('/Posts');
        }, 1000);
    };

    const handleCancel = () => {
        router.push('/Posts');
    };

    return (
        <div className="h-screen from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full h-full max-h-screen flex flex-col">
                <div className="rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex-1 flex flex-col">
                    <form onSubmit={handleSubmit} className="p-6 flex-1 flex flex-col overflow-hidden">
                        <div className="flex-1 overflow-y-auto space-y-6">
                            <div>
                                <label htmlFor="title" className="block text-lg font-semibold text-800 mb-3">
                                    Post Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    required
                                    placeholder="Enter an engaging title for your post..."
                                    className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none"
                                />
                            </div>

                            <div>
                                <label htmlFor="content" className="block text-lg font-semibold text-800 mb-3">
                                    Post Content
                                </label>
                                <textarea
                                    name="content"
                                    id="content"
                                    rows="10"
                                    required
                                    placeholder="Share your thoughts, ideas, or stories here..."
                                    className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none resize-none flex-1 min-h-[200px]"
                                />
                                <div className=" mt-2">
                                    <span className="text-sm text-500">Express yourself freely</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4 border-t border-gray-100 mt-4">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="flex-1 py-3 px-6 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Publishing...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                        Publish Post
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}