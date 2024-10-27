import { create } from "zustand";

const useAuthStore = create((set) => ({
    // Safely get and parse 'user-info' from localStorage
    user: (() => {
        try {
            const userInfo = localStorage.getItem("user-info");
            return userInfo ? JSON.parse(userInfo) : null;
        } catch (error) {
            console.error("Error parsing user-info from localStorage", error);
            return null;
        }
    })(),

    login: (user) => {
        try {
            // Corrected this line to use setItem
            localStorage.setItem("user-info", JSON.stringify(user));
            set({ user });
        } catch (error) {
            console.error("Error saving user-info to localStorage", error);
        }
    },

    logout: () => {
        try {
            localStorage.removeItem("user-info");
            set({ user: null });
        } catch (error) {
            console.error("Error removing user-info from localStorage", error);
        }
    },

    setUser: (user) => {
        try {
            localStorage.setItem("user-info", JSON.stringify(user));
            set({ user });
        } catch (error) {
            console.error("Error setting user-info to localStorage", error);
        }
    },
}));

export default useAuthStore;
