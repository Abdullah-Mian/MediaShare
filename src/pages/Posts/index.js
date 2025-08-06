import { useAuth } from "@/context/AuthContext";
import { usePosts } from "@/context/PostsContext";
import PostCard from "@/Components/postCard";
import { useEffect } from "react";

export default function Posts() {
    const { currentUser ,users } = useAuth();
    const { posts,  } = usePosts();

    // useEffect(() => {
    //     const fetchPosts = async () => {
    //         try {
    //             const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    //             const data = await res.json();
    //             setPosts(data.slice(0, 10));
    //             console.log('Fetched posts from API:', data.slice(0, 20));
    //         } catch (error) {
    //             console.error('Error fetching posts:', error);
    //         }
    //     };

    //     if (!posts || posts.length === 10) {
    //         fetchPosts();
    //     }
    // }, [posts.length === 10]);

    console.log('users:', users);
    return (
        <div className="container mx-auto p-4 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-center">Welcome back {currentUser.name}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {posts && posts.length > 0 ? (
                    posts.map(post => (
                        <PostCard
                            key={post.id}
                            post={post}
                        />
                    ))
                ) : (
                    <div className="col-span-full flex justify-center items-center py-12">
                        <p className="text-gray-500 text-lg">Loading posts...</p>
                    </div>
                )}
            </div>
        </div>
    );
}
