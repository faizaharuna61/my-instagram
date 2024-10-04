import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import Story from './Story';
import { faker } from '@faker-js/faker';

export default function Stories() {
  const [suggestions, setSuggestions] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Generating fake user data
    const users = [...Array(20)].map((_, i) => ({
      id: i,
      name: faker.name.fullName(),
      username: faker.internet.userName(),
      avatar: faker.image.avatar(),
      gender: faker.name.gender(),
      age: faker.datatype.number({ min: 18, max: 65 }),
    }));
    setSuggestions(users);
  }, []);

  useEffect(() => {
    // Auth state change listener
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <div className="flex space-x-4 p-4 bg-white mt-4 border-b border-gray-200 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500">
      {/* Display the current user's story if available */}
      {user && (
        <Story
          key={user.uid}
          img={user.photoURL || faker.image.avatar()} // Fallback to fake avatar if no photoURL
          username={user.displayName || 'Unknown'}
        />
      )}

      {/* Display other user stories */}
      {suggestions.map((profile) => (
        <Story
          key={profile.id}
          img={profile.avatar}
          username={profile.username}
        />
      ))}
    </div>
  );
}
