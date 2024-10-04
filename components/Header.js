import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MagnifyingGlassIcon, PaperAirplaneIcon, GlobeAltIcon, PlusCircleIcon, HeartIcon, HomeIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import Modal from "./Modal";
import SearchPanel from "./SearchPanel";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app, db } from "../firebase";
import { collection, onSnapshot, query } from "firebase/firestore";

export default function Header() {
  const auth = getAuth(app);
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchPanelOpen, setSearchPanelOpen] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [open, setOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/auth/signin");
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    setSearchPanelOpen(query !== "");
  };

  const searchUsers = () => {
    const filtered = users.filter(user =>
      user.data().username.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  useEffect(() => {
    searchUsers();
  }, [searchQuery, users]);

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, "users")), (snapshot) => {
      setUsers(snapshot.docs);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user || null);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <header className="shadow-sm bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto px-4 py-2">
        <div
          onClick={() => router.push("/")}
          className="relative w-24 h-10 cursor-pointer hidden lg:inline-flex"
        >
          <Image
            src="/instagram_logo.png"
            alt="Instagram Logo"
            style={{ objectFit: 'contain' }}
            fill
          />
        </div>
        <div className="max-w-xs flex-grow relative mt-1">
          <MagnifyingGlassIcon className="absolute inset-y-0 pl-3 text-gray-500 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search"
            className="w-full pl-10 bg-gray-50 border border-gray-300 rounded-md text-sm focus:ring-black focus:border-black"
          />
        </div>
        <div className="flex items-center space-x-4">
          <HomeIcon
            onClick={() => router.push("/")}
            className="navBtn"
          />
          <GlobeAltIcon
            onClick={() => router.push("/explore")}
            className="navBtn"
          />
          {user ? (
            <>
              <div className="relative">
                <PaperAirplaneIcon className="navBtn rotate-45" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-xs flex items-center justify-center rounded-full">
                  3
                </span>
              </div>
              <PlusCircleIcon
                onClick={() => setOpen(true)}
                className="navBtn"
              />
              <HeartIcon className="navBtn" />
              <img
                onClick={() => router.push("/profile")}
                src={user.photoURL || "/default-avatar.png"}
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer object-cover"
              />
              <button onClick={handleSignOut} className="text-blue-500 hover:text-blue-700 transition-colors">
                Sign Out
              </button>
            </>
          ) : (
            <button onClick={() => router.push("/auth/signin")} className="text-blue-500 hover:text-blue-700 transition-colors">
              Sign In
            </button>
          )}
        </div>
      </div>
      <SearchPanel isVisible={searchPanelOpen} onClose={() => setSearchPanelOpen(false)} users={filteredUsers} />
      <Modal isVisible={open} onClose={() => setOpen(false)} user={user} />
    </header>
  );
}
