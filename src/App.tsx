import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Auth from "./components/AuthComponent";
import Dashboard from "./components/Dashboard";

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) return (
    <div className="min-h-screen bg-[#1e1b17] text-[#fefae0] flex items-center justify-center">
      Loading...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#1e1b17] text-[#fefae0]">
      <header className="p-4 bg-[#d5bdaf] text-[#1e1b17] flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold tracking-wide">Job Application Tracker</h1>
        <Auth />
      </header>

      <main className="p-4">
        {user ? (
          <Dashboard />
        ) : (
          <div className="text-center text-lg mt-10">
            Please log in to continue.
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
