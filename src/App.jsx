import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import PageLayout from "./Layouts/PageLayouts/PageLayouts";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { AuthProvider } from "./hooks/useAuth.jsx"; // Import AuthProvider
import { useAuth } from "./hooks/useAuth.jsx"; // Import the useAuth hook

function App() {
    return (
        <AuthProvider> {/* Wrap the app in AuthProvider */}
            <InnerApp />
        </AuthProvider>
    );
}

const InnerApp = () => {
    const { currentUser: authUser } = useAuth(); // Get currentUser from useAuth

    return (
        <PageLayout>
            <Routes>
                <Route path='/' element={authUser ? <HomePage /> : <Navigate to='/auth' />} />
                <Route path='/auth' element={!authUser ? <AuthPage /> : <Navigate to='/' />} />
                <Route path='/:username' element={<ProfilePage />} />
            </Routes>
        </PageLayout>
    );
}

export default App;
