import React, { useState, useEffect } from "react";
import Stories from "./Stories";
import Posts from "./Posts";
import Miniprofile from "./Miniprofile";
import { Suggestions } from "./Suggestions";
import { app } from "../firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/router";

export default function Feed() {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        router.push("/");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth, router]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/login"); // Redirect to login after sign-out
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <main
        className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mx-auto ${
          !user ? "md:max-w-3xl" : "md:max-w-3xl xl:max-w-6xl"
        }`}
      >
        {/* Main Content Section */}
        <section className={`col-span-2 ${user ? "" : "mx-auto"}`}>
          <Stories />
          <Posts />
        </section>

        {/* Sidebar Section */}
        {user && (
          <section className="hidden xl:inline-grid md:col-span-1">
            <div className="fixed top-20 right-0 px-4">
              <Miniprofile user={user} />
              <Suggestions user={user} />
              <button
                onClick={handleSignOut}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-150"
              >
                Sign Out
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

