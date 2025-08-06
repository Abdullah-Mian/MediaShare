import { usePosts } from "@/context/PostsContext"
import { useRouter } from "next/router";
export default function CreatePost () {
    const { CreatePost } = usePosts();
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.title.value, e.target.content.value);
        const title = e.target.title.value;
        const content = e.target.content.value;
        CreatePost({ title, content });
        e.target.reset();
        router.push('/Posts');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Content
                        </label>
                        <textarea
                            name="content"
                            id="content"
                            rows="4"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                    <button type="submit" className="w-full mt-4 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200">
                        Publish Post
                    </button>
                </form>
            </div>
        </div>
    )
}