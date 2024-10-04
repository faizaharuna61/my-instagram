"use client";
import { CameraIcon } from "@heroicons/react/24/outline";
import { addDoc, collection, serverTimestamp, updateDoc, doc } from "@firebase/firestore";
import React, { useRef, useState } from "react";
import { ref, getDownloadURL, uploadString } from "@firebase/storage";
import { db, storage } from "../firebase";

const Modal = ({ isVisible, onClose, user }) => {
  if (!isVisible) return null;

  const filePickerRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const captionRef = useRef(null);

  const uploadPost = async () => {
    if (loading) return;

    setLoading(true);

    try {
      // Create a post and add to Firestore 'posts' collection
      const docRef = await addDoc(collection(db, "posts"), {
        uid: user.uid,
        caption: captionRef.current.value,
        timestamp: serverTimestamp(),
      });

      // Upload the image to Firebase Storage
      const imageRef = ref(storage, `posts/${docRef.id}/image`);
      await uploadString(imageRef, selectedFile, "data_url");

      // Get the download URL and update the post document
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(doc(db, "posts", docRef.id), {
        image: downloadURL,
      });

      // Close the modal and reset state
      onClose();
      setSelectedFile(null);
    } catch (error) {
      console.error("Error uploading post:", error);
    } finally {
      setLoading(false);
    }
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];

    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => setSelectedFile(reader.result);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[400px] bg-white rounded-lg p-4 flex flex-col">
        <button
          className="text-gray-800 text-xl place-self-end"
          onClick={onClose}
          aria-label="Close Modal"
        >
          &times;
        </button>
        <div>
          {selectedFile ? (
            <img
              src={selectedFile}
              className="w-full object-cover max-h-96 cursor-pointer"
              onClick={() => setSelectedFile(null)}
              alt="Selected preview"
            />
          ) : (
            <div
              onClick={() => filePickerRef.current.click()}
              className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer"
            >
              <CameraIcon
                className="h-6 w-6 text-red-600"
                aria-hidden="true"
              />
            </div>
          )}

          <div className="mt-5 text-center">
            <h2 className="text-xl font-semibold">Upload a Photo</h2>

            <input
              ref={filePickerRef}
              type="file"
              hidden
              onChange={addImageToPost}
              aria-label="Upload image"
            />

            <input
              className="border-none focus:ring-0 w-full text-center mt-2"
              type="text"
              ref={captionRef}
              placeholder="Enter a caption"
              aria-label="Caption"
            />

            <button
              type="button"
              disabled={!selectedFile}
              className="mt-4 inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
              onClick={uploadPost}
            >
              {loading ? "Uploading..." : "Upload Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
