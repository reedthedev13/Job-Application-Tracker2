import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Auth from "./components/AuthComponent";
import Dashboard from "./components/Dashboard";

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1b1b1f] to-[#23232a] text-[#fefefe] flex items-center justify-center font-sans">
        <div className="text-lg animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#18181b] text-[#f3f4f6] font-sans">
  <header className="sticky top-0 z-10 backdrop-blur bg-gradient-to-r from-[#23272f]/90 to-[#18181b]/90 border-b border-[#23272f] shadow-lg">
    <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
  <span className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#6366f1] to-[#06b6d4] flex items-center justify-center shadow-md">
    <svg
      className="w-6 h-6 text-white"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <rect x="3" y="7" width="18" height="13" rx="3" fill="currentColor" opacity="0.15"/>
      <path
        d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2M3 7h18M3 7v10a3 3 0 003 3h12a3 3 0 003-3V7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
  <h1 className="text-2xl md:text-3xl font-extrabold tracking-tighter drop-shadow-sm raleway">
    Job Application Tracker
  </h1>
</div>
      <div className="transition-all duration-200 hover:scale-105">
        <Auth />
      </div>
    </div>
  </header>

      <main className="max-w-6xl mx-auto px-6 py-10 flex justify-center">
        <div className="w-full md:w-4/5 lg:w-3/4 bg-[#23272f]/80 rounded-2xl shadow-xl p-8 transition-all duration-200">
          {user ? (
            <Dashboard />
          ) : (
            <div className="text-center mt-20">
              <h2 className="text-2xl font-bold mb-2 raleway">Welcome 👋</h2>
              <p className="text-[#a6a6a6] raleway">Please log in to continue.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;