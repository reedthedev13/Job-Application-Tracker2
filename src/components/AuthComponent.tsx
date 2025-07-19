import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { signOut } from "firebase/auth";

const provider = new GoogleAuthProvider();

const AuthComponent = () => {
  const [user, loading] = useAuthState(auth);

  const signIn = async () => {
    await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    await signOut(auth);
  };

  if (loading) return <div>Loading...</div>;

  return user ? (
    <div className="flex items-center space-x-4">
      <img
        src={user.photoURL ?? undefined}
        alt="Profile"
        className="w-10 h-10 rounded-full"
      />
      <span>{user.displayName}</span>
      <button
        onClick={logout}
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  ) : (
    <button
      onClick={signIn}
      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Login with Google
    </button>
  );
};

export default AuthComponent;