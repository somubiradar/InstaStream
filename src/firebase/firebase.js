import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

// Upload story function
export const uploadStory = async (userId, file) => {
    try {
        const storyRef = ref(storage, `stories/${userId}/${Date.now()}`);
        await uploadBytes(storyRef, file); // Upload the file to Firebase Storage
        const downloadURL = await getDownloadURL(storyRef);

        await setDoc(doc(firestore, "stories", userId), {
            stories: arrayUnion({ url: downloadURL, timestamp: new Date() }),
        }, { merge: true });

        return downloadURL;
    } catch (error) {
        console.error("Error uploading story:", error);
    }
};

// Share note function
export const shareNote = async (note, userId) => {
    try {
        const noteRef = doc(firestore, "notes", userId);
        await updateDoc(noteRef, {
            notes: arrayUnion({ content: note, timestamp: new Date() }),
        });
    } catch (error) {
        console.error("Error sharing note:", error);
    }
};

export { app, auth, firestore, storage };
