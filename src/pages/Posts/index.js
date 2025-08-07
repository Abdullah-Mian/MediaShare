import { useAuth } from "@/context/AuthContext";
import { usePosts } from "@/context/PostsContext";
import PostCard from "@/Components/postCard";
import { useRouter } from "next/router";

export default function Posts() {
    const { currentUser, setCurrentUser } = useAuth();
    const { posts } = usePosts();
    const router = useRouter();


    console.log("Current user:", currentUser);
    console.log("Posts:", posts);

    const handleLogin = () => {
        router.push("/login");
    };

    const handleLogout = () => {
        console.log("User logged out");
        setCurrentUser(null);
        router.push("/");
    };

    return (
        <div className="min-h-screen">
            <nav className="shadow-lg border-b border-gray-200">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            MediaShare
                        </h1>
                        <div className="flex items-center space-x-4">
                            {currentUser && (
                                <button onClick={() => router.push('/Posts/create-post')}
                                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out">
                                    Create Post
                                </button>
                            )}
                            <button
                                onClick={currentUser ? handleLogout : handleLogin}
                                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
                            >
                                {currentUser ? "Logout" : "Login"}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {posts && posts.length > 0 ? (
                        posts.map(post => (
                            <div key={post.id} className="transform hover:scale-105 transition-transform duration-300">
                                <PostCard post={post} isOwner={currentUser?.id === post.userId} />
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full flex justify-center items-center py-20">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
                                <p className="text-gray-600 text-lg font-medium">Loading posts...</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
