import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";

const useLogout = () => {
	const [signOut, isLoggingOut, error] = useSignOut(auth);
	const showToast = useShowToast();
	const logoutUser = useAuthStore((state) => state.logout);

	const handleLogout = async () => {
		try {
			const success = await signOut();
			if (success) {
				localStorage.removeItem("user-info");
				logoutUser();
				showToast("Success", "Logged out successfully", "success");
			} else {
				showToast("Error", "Failed to log out. Please try again.", "error");
			}
		} catch (error) {
			showToast("Error", error.message || "An error occurred during logout", "error");
		}
	};

	return { handleLogout, isLoggingOut, error };
};

export default useLogout;
