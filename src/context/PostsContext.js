import { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const { currentUser } = useAuth();

  useEffect(() => {
    // const dummyPosts = [
    //   { id: 1, userId: 1, title: "Getting Started with React", body: "React is a powerful JavaScript library for building user interfaces. It allows developers to create reusable UI components and manage application state efficiently." },
    //   { id: 2, userId: 1, title: "Understanding JavaScript Closures", body: "Closures are one of the most important concepts in JavaScript. They allow functions to access variables from their outer scope even after the outer function has returned." },
    //   { id: 3, userId: 1, title: "CSS Grid vs Flexbox", body: "Both CSS Grid and Flexbox are powerful layout systems. Grid is better for two-dimensional layouts while Flexbox excels at one-dimensional layouts." },
    //   { id: 4, userId: 1, title: "Node.js Best Practices", body: "When building Node.js applications, it's important to follow security best practices, use proper error handling, and optimize performance." },
    //   { id: 5, userId: 1, title: "Introduction to TypeScript", body: "TypeScript adds static typing to JavaScript, making it easier to catch errors during development and improve code maintainability." },
    //   { id: 6, userId: 1, title: "Modern Web Development Trends", body: "The web development landscape is constantly evolving with new frameworks, tools, and best practices emerging regularly." },
    //   { id: 7, userId: 1, title: "Database Design Principles", body: "Good database design is crucial for application performance. Understanding normalization, indexing, and relationships is essential." },
    //   { id: 8, userId: 1, title: "API Development with REST", body: "RESTful APIs provide a standardized way for applications to communicate. Following REST principles ensures scalable and maintainable APIs." },
    //   { id: 9, userId: 1, title: "Frontend Performance Optimization", body: "Optimizing frontend performance involves techniques like code splitting, lazy loading, image optimization, and minimizing bundle sizes." },
    //   { id: 10, userId: 1, title: "Version Control with Git", body: "Git is an essential tool for developers. Understanding branching, merging, and collaboration workflows is crucial for team development." }
    // ];

    //  const dummyComments = [
    //   { postId: 1, id: 1, name: "John Doe", email: "john@example.com", body: "Great post!" },
    //   { postId: 1, id: 2, name: "Jane Smith", email: "jane@example.com", body: "Very informative, thanks!" },
    //   { postId: 2, id: 3, name: "Alice Johnson", email: "alice@example.com", body: "I learned a lot from this." },
    //   { postId: 2, id: 4, name: "Bob Brown", email: "bob@example.com", body: "Thanks for sharing!" },
    //   { postId: 3, id: 5, name: "Charlie Davis", email: "charlie@example.com", body: "Interesting perspective." },
    //   { postId: 3, id: 6, name: "Diana Prince", email: "diana@example.com", body: "I completely agree!" },
    //   { postId: 4, id: 7, name: "Eve Adams", email: "eve@example.com", body: "Thanks for the insights!" },
    //   { postId: 4, id: 8, name: "Frank Castle", email: "frank@example.com", body: "I found this very helpful." },
    //   { postId: 5, id: 9, name: "Grace Lee", email: "grace@example.com", body: "This was exactly what I needed." },
    //   { postId: 5, id: 10, name: "Hank Pym", email: "hank@example.com", body: "I appreciate the detailed explanation." },
    //   { postId: 6, id: 11, name: "Ivy Carter", email: "ivy@example.com", body: "This post was very helpful." },
    //   { postId: 6, id: 12, name: "Jack Sparrow", email: "jack@example.com", body: "Aye, this be a great read!" },
    //   { postId: 7, id: 13, name: "Kara Danvers", email: "kara@example.com", body: "I found this very insightful." },
    //   { postId: 7, id: 14, name: "Liam Neeson", email: "liam@example.com", body: "I agree with Kara, this was well written." },
    //   { postId: 8, id: 15, name: "Mia Wong", email: "mia@example.com", body: "This post was very helpful." },
    //   { postId: 8, id: 16, name: "Nina Patel", email: "nina@example.com", body: "I found this post very insightful." },
    //   { postId: 9, id: 17, name: "Oscar Wilde", email: "oscar@example.com", body: "A timeless classic." },
    //   { postId: 9, id: 18, name: "Peter Parker", email: "peter@example.com", body: "With great power comes great responsibility." },
    //   { postId: 10, id: 19, name: "Quinn Fabray", email: "quinn@example.com", body: "I love the character development in this post." }
    // ];
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/posts');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`); 
        }
        const data = await res.json();
        setPosts(data);
        
        // Fetch comments for each post
        fetchCommentsForPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }

      // when API is not available
      // ////////////////////
      // const dummyPostsWithInitializedComments = dummyPosts.map(post => ({
      //   ...post,
      //   comments: []
      // }));
      // setPosts(dummyPostsWithInitializedComments);
      // fetchCommentsForPosts(dummyPostsWithInitializedComments);
      // //////////////////
    };

    const fetchCommentsForPosts = async (postsArray) => {
      try {
        const commentsPromises = postsArray.map(async (post) => {
          const res = await fetch(`/api/posts/${post.id}/comments`);
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          const comments = await res.json();
          return { postId: post.id, comments };
        });

        const fetchedComments = await Promise.all(commentsPromises);

        setPosts(prevPosts => 
          prevPosts.map(post => {
            const postComments = fetchedComments.find(comment => comment.postId === post.id);
            return {
              ...post,
              comments: postComments ? postComments.comments : []
            };
          })
        );
        
      } catch (error) {
        console.error('Error fetching comments:', error);
      }

      // when API is not available
      ///////////////////////////
      // setPosts(prevPosts =>
      //   prevPosts.map(post => {
      //     const postComments = dummyComments.filter(comment => comment.postId === post.id);
      //     return {
      //       ...post,
      //       comments: postComments
      //     };
      //   })
      // );
      ///////////////////////////
    };

    fetchPosts();
  }, []);

  const CreatePost = (newPost) => {
    const post = {
      ...newPost,
      id: Date.now(),
      userId: currentUser.id,
      comments: [] 
    };
    setPosts((prev) => [post, ...prev]);
  };

  const editPost = (id, updatedPost) => {
    setPosts((prev) =>
      prev.map(post =>
        post.id === id ? { ...post, ...updatedPost } : post
      )
    );
  };

  const deletePost = (id) => {
    setPosts((prev) => prev.filter(post => post.id !== id));
  };

  const commentOnPost = (postId, comment) => {
    setPosts((prev) =>
      prev.map(post =>
        post.id === postId ? { ...post, comments: [...post.comments, comment] } : post
      )
    );
  };

  const editComment = (postId, commentId, updatedBody) => {
    setPosts((prev) =>
      prev.map(post =>
        post.id === postId
          ? { ...post,
            comments: post.comments.map(comment =>
              comment.id === commentId ? { ...comment, body: updatedBody } : comment  
            )
          }
          : post
      )
    );
  }
  const deleteComment = (postId, commentId) => {
    setPosts((prev) =>
      prev.map(post =>
        post.id === postId
          ? { ...post, comments: post.comments.filter(comment => comment.id !== commentId) }
          : post
      )
    );
  };

  return (
    <PostContext.Provider value={{ posts, CreatePost, setPosts, editPost, deletePost, commentOnPost, editComment, deleteComment }}>
      {children}
    </PostContext.Provider>
  );
};



export const usePosts = () => useContext(PostContext);
