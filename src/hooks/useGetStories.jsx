import { useEffect, useState } from 'react';
import { firestore } from '../firebase/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

const useGetStories = () => {
	const [stories, setStories] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onSnapshot(collection(firestore, "stories"), (snapshot) => {
			const storyData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
			setStories(storyData);
			setIsLoading(false);
		});

		return () => unsubscribe();
	}, []);

	return { stories, isLoading };
};

export default useGetStories;
