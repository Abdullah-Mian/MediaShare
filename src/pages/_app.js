import "@/styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { PostProvider } from "@/context/PostsContext";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <PostProvider>
        <Component {...pageProps} />
      </PostProvider>
    </AuthProvider>
  );
}
