// import {useState, useEffect} from 'react';
// import { collection } from 'firebase/firestore';
// import { onSnapshot, orderBy, query } from 'firebase/firestore';
// import Post from './Post';
// import { db } from '../firebase';




// function Posts(user) {

//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//    onSnapshot(query(collection(db, "posts"), orderBy("timestamp", "desc")), (snapshot) => {
//       setPosts(snapshot.docs);
//     })
   
//   }, [db]);
//   return (
//         <div>
//            {posts.map((post) => (
//             <Post key={post.id}
//             id={post.id}
//             uid={post.data().uid}
//             img={post.data().image}
//             caption={post.data().captionRef}
         
//             />
//            ))}
//         </div>
 
    
//   )
// }

// export default Posts





// import { useState, useEffect } from 'react';
// import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
// import Post from './Post';
// import { db } from '../firebase';

// function Posts({ user }) { // Adjusted to destructure user prop if needed

//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const unsubscribe = onSnapshot(
//       query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
//       (snapshot) => {
//         setPosts(snapshot.docs);
//       },
//       (error) => {
//         console.error("Error fetching posts: ", error);
//       }
//     );

//     return () => unsubscribe(); // Cleanup subscription on unmount
//   }, [db]);

//   return (
//     <div>
//       {posts.map((post) => (
//         <Post
//           key={post.id}
//           id={post.id}
//           uid={post.data().uid}
//           img={post.data().image}
//           caption={post.data().captionRef}
//         />
//       ))}
//     </div>
//   );
// }

// export default Posts;
import { useState, useEffect } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import Post from './Post';

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  return (
    <div className="h-full max-h-screen overflow-y-auto p-4">
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          uid={post.data().uid}
          img={post.data().image}
          caption={post.data().captionRef}
        />
      ))}
    </div>
  );
}

export default Posts;






// import { useState, useEffect } from 'react';
// import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
// import { db } from '../firebase';
// import Post from './Post';

// function Posts() {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const unsubscribe = onSnapshot(
//       query(collection(db, "posts"), orderBy("timestamp", "desc")),
//       (snapshot) => {
//         setPosts(snapshot.docs);
//       }
//     );

//     return () => unsubscribe(); // Cleanup on unmount
//   }, []);

//   return (
//     <div className="h-full max-h-screen overflow-y-auto p-4">
//       {posts.map((post) => (
//         <Post
//           key={post.id}
//           id={post.id}
//           uid={post.data().uid}
//           img={post.data().image}
//           caption={post.data().captionRef}
//         />
//       ))}
//     </div>
//   );
// }

// export default Posts;