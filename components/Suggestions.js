// import { collection, onSnapshot, query, where } from 'firebase/firestore';
// import React, { useEffect, useState } from 'react';
// import { db } from '../firebase';
// import { Suggestion } from "./Suggestion";
// import PropTypes from 'prop-types';

// export const Suggestions = ({ user }) => {
//   const [suggestions, setSuggestions] = useState([]);
//   const uid = user?.uid;

//   useEffect(() => {
//     if (uid) {
//       const q = query(collection(db, "users"), where("id", "!=", uid));
//       const unsubscribe = onSnapshot(q, (snapshot) => {
//         const users = snapshot.docs.map((doc) => doc.data());
//         const randomUsers = getRandomUsers(users, 5);
//         setSuggestions(randomUsers);
//       }, (error) => {
//         console.error("Error fetching suggestions:", error);
//       });

//       return () => unsubscribe(); // Cleanup listener on unmount
//     }
//   }, [uid]);

//   const getRandomUsers = (users, limit) => {
//     const shuffledUsers = users.sort(() => 0.5 - Math.random());
//     return shuffledUsers.slice(0, limit);
//   };

//   return (
//     <div className='mt-4 ml-10'>
//       <div className='flex justify-between text-sm mb-5'>
//         <h3 className='text-sm font-bold text-gray-400'>Suggestions for you</h3>
//         <button className='text-gray-600 font-semibold'>See all</button>
//       </div>

//       {suggestions.map(profile => (
//         <div key={profile.id}>
//           <Suggestion uid={uid} id={profile.id} img={profile.profileImg} username={profile.username} />
//         </div>
//       ))}
//     </div>
//   );
// };

// // Adding prop types for validation
// Suggestions.propTypes = {
//   user: PropTypes.shape({
//     uid: PropTypes.string.isRequired
//   })
// };

// export default Suggestions;




import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { Suggestion } from './Suggestion';
import PropTypes from 'prop-types';

export const Suggestions = ({ user }) => {
  const [suggestions, setSuggestions] = useState([]);
  const uid = user?.uid;

  useEffect(() => {
    if (uid) {
      const q = query(collection(db, 'users'), where('id', '!=', uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const randomUsers = getRandomUsers(users, 5);
        setSuggestions(randomUsers);
      }, (error) => {
        console.error('Error fetching suggestions:', error);
      });

      return () => unsubscribe(); // Cleanup listener on unmount
    }
  }, [uid]);

  const getRandomUsers = (users, limit) => {
    const shuffledUsers = users.sort(() => 0.5 - Math.random());
    return shuffledUsers.slice(0, limit);
  };

  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between text-sm mb-5">
        <h3 className="text-sm font-bold text-gray-400">Suggestions for you</h3>
        <button className="text-gray-600 font-semibold">See all</button>
      </div>

      {suggestions.map(profile => (
        <div key={profile.id}>
          <Suggestion uid={uid} id={profile.id} img={profile.profileImg} username={profile.username} />
        </div>
      ))}
    </div>
  );
};

// Adding prop types for validation
Suggestions.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }),
};

export default Suggestions;







