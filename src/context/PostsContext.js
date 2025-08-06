import { createContext, useState, useContext, useEffect } from 'react';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

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

    const fetchPosts = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setPosts(data.slice(0, 10));
        console.log('Fetched posts from API:', data.slice(0, 10));
      } catch (error) {
        console.error('Error fetching posts:', error);
        // console.log('Using dummy posts as fallback');
        // setPosts(dummyPosts);
      }
    };

    fetchPosts();
  }, []);


  const addPost = (newPost) => {
    const post = {
      ...newPost,
      id: Date.now(),
      userId: 1
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

  return (
    <PostContext.Provider value={{ posts, addPost, setPosts, editPost, deletePost }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => useContext(PostContext);
