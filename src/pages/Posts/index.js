import { useAuth } from "@/context/AuthContext";
// import PostCard from '@/Components/postCard';

export default function PostCard() {
    const { currentUser } = useAuth();  
    return (
        <div>
            <h1 className="text-2xl font-bold">Welcome, {currentUser ? currentUser.name : "Guest"}!</h1>
            <h1>Posts</h1>
        </div>
    );
}
