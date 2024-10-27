import { create } from "zustand";

const usePostStore = create((set) => ({
  posts: [],
  postId: 1, // Initialize the postId counter

  // Create post with unique ID and initialize comments
  createPost: (post) =>
    set((state) => ({
      posts: [{ ...post, id: state.postId, comments: [] }, ...state.posts], // Initialize comments as an empty array
      postId: state.postId + 1, // Increment the postId for the next post
    })),

  deletePost: (id) =>
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== id),
    })),

  setPosts: (posts) => set({ posts }),

  addComment: (postId, comment) =>
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...(post.comments || []), comment], // Ensure to handle existing comments
          };
        }
        return post;
      }),
    })),
}));

export default usePostStore;
