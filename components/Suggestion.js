// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { addDoc, collection, deleteDoc, doc, onSnapshot, query, setDoc, where } from 'firebase/firestore';
// import { auth, db } from '../firebase';
// import { onAuthStateChanged } from 'firebase/auth';

// export const Suggestion = ({ uid, id, img, username }) => {
//   const [hasFollowed, setHasFollowed] = useState(false);
//   const [followers, setFollowers] = useState([]);
//   const [user, setUser] = useState(null);
//   const [userDocID, setUserDocID] = useState(null);
//   const [docID, setDocID] = useState(null);

//   const getDocID = async (id) => {
//     const q = query(collection(db, 'users'), where('id', '==', id));
//     const snapshot = await onSnapshot(q);
//     if (!snapshot.empty) {
//       setDocID(snapshot.docs[0].id);
//     }
//   };

//   useEffect(() => {
//     const q = query(collection(db, 'users'), where('id', '==', uid));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       if (!snapshot.empty) {
//         setUserDocID(snapshot.docs[0].id);
//       }
//     });

//     return () => unsubscribe(); // Cleanup listener
//   }, [uid]);

//   useEffect(() => {
//     if (docID) {
//       const q = query(collection(db, 'users', docID, 'followers'));
//       const unsubscribe = onSnapshot(q, (snapshot) => {
//         setFollowers(snapshot.docs);
//       });

//       return () => unsubscribe(); // Cleanup listener
//     }
//   }, [docID]);

//   useEffect(() => {
//     setHasFollowed(followers.some((follow) => follow.id === uid));
//   }, [followers, uid]);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setUser(user);
//     });

//     return () => unsubscribe(); // Cleanup listener
//   }, []);

//   const followUser = async () => {
//     if (hasFollowed) {
//       await deleteDoc(doc(db, 'users', userDocID, 'following', id));
//       await deleteDoc(doc(db, 'users', docID, 'followers', uid));
//     } else {
//       await setDoc(doc(db, 'users', docID, 'followers', uid), {
//         username: user.displayName,
//       });

//       await setDoc(doc(db, 'users', userDocID, 'following', id), {
//         username: username,
//       });
//     }
//   };

//   return (
//     <div className='flex items-center justify-between mt-3'>
//       <img src={img} className='w-10 h-10 rounded-full border p-[2px]' alt={`${username}'s avatar`} />
//       <div>
//         <h2 className='font-semibold text-sm'>{username}</h2>
//         <h3 className='text-xs text-gray-400'>Based on people you know</h3>
//       </div>
//       <button className='text-blue-400 text-sm font-bold w-16' onClick={followUser}>
//         {hasFollowed ? 'Following' : 'Follow'}
//       </button>
//     </div>
//   );
// };

// // Adding prop types for validation
// Suggestion.propTypes = {
//   uid: PropTypes.string.isRequired,
//   id: PropTypes.string.isRequired,
//   img: PropTypes.string.isRequired,
//   username: PropTypes.string.isRequired
// };

// export default Suggestion;




import React, { useState, useEffect } from 'react';
import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const Suggestion = ({ id, uid, img, username }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const checkFollowing = async () => {
      try {
        // Check if the user is already following
        const docRef = doc(db, 'users', id, 'followers', uid);
        const docSnap = await getDoc(docRef);
        setIsFollowing(docSnap.exists());
      } catch (error) {
        console.error("Error checking following status:", error);
      }
    };

    if (id && uid) {
      checkFollowing();
    }
  }, [id, uid]);

  const handleFollow = async () => {
    if (!uid || !id) {
      console.error("Missing uid or id");
      return;
    }

    try {
      if (isFollowing) {
        // Unfollow user
        await deleteDoc(doc(db, 'users', id, 'followers', uid));
        setIsFollowing(false);
      } else {
        // Follow user
        await setDoc(doc(db, 'users', id, 'followers', uid), {
          username: username,
        });
        setIsFollowing(true);
      }
    } catch (error) {
      console.error("Error following/unfollowing user:", error);
    }
  };

  return (
    <div className="flex items-center justify-between mt-3">
      <img
        className="w-10 h-10 rounded-full border p-[2px]"
        src={img}
        alt={username}
      />
      <div className="flex-1 ml-4">
        <h2 className="font-semibold text-sm">{username}</h2>
        <h3 className="text-xs text-gray-400">Suggested for you</h3>
      </div>
      <button
        className="text-blue-400 text-sm font-bold"
        onClick={handleFollow}
      >
        {isFollowing ? 'Unfollow' : 'Follow'}
      </button>
    </div>
  );
};

export default Suggestion;

