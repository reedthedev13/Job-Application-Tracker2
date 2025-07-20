import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Auth from "./components/AuthComponent";
import Dashboard from "./components/Dashboard";

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1b1b1f] text-[#fefefe] flex items-center justify-center">
        <div className="text-lg animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1b1b1f] text-[#fefefe]">
      <header className="sticky top-0 z-10 backdrop-blur bg-[#2b2b31]/90 border-b border-[#3d3d42] shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Job Application Tracker
          </h1>
          <Auth />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {user ? (
          <Dashboard />
        ) : (
          <div className="text-center mt-20">
            <h2 className="text-xl font-semibold mb-2">Welcome 👋</h2>
            <p className="text-[#a6a6a6]">Please log in to continue.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
