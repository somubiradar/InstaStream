import { useRef, useState } from "react";
import { IconButton, Tooltip, Box, Image, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from "@chakra-ui/react"; // Import necessary Chakra UI components
import { AddIcon } from "@chakra-ui/icons"; // Import a "+" icon
import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";
import { auth, firestore, storage } from "../../firebase/firebase";
import { doc, setDoc, deleteDoc } from "firebase/firestore";

const AddStoryButton = ({ onStoryUpload }) => {
    const fileInputRef = useRef(null);
    const [stories, setStories] = useState([]); // State to track uploaded stories
    const [selectedStory, setSelectedStory] = useState(null); // State for the selected story

    const handleStoryUpload = async (file) => {
        if (!file) return;

        // Reference to the storage location
        const storageRef = ref(storage, `stories/${auth.currentUser.uid}/${file.name}`);

        // Upload file to Firebase storage
        await uploadBytes(storageRef, file);

        // Get download URL of the uploaded file
        const storyURL = await getDownloadURL(storageRef);

        // Save the story info to Firestore
        await setDoc(doc(firestore, "stories", auth.currentUser.uid), {
            uid: auth.currentUser.uid,
            url: storyURL,
            timestamp: Date.now(),
        });

        // Update local state to include the new story
        setStories((prev) => [...prev, { name: file.name, url: storyURL }]);

        // Callback function to notify the parent component
        onStoryUpload(storyURL);
    };

    const deleteStory = async (story) => {
        // Reference to the storage location of the story to be deleted
        const storageRef = ref(storage, `stories/${auth.currentUser.uid}/${story.name}`);

        // Delete the story from Firebase storage
        await deleteObject(storageRef);

        // Delete the story document from Firestore
        await deleteDoc(doc(firestore, "stories", auth.currentUser.uid));

        // Update local state to remove the deleted story
        setStories((prev) => prev.filter((s) => s.name !== story.name));
    };

    const selectFile = () => {
        fileInputRef.current.click(); // Trigger file input click
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Get the selected file
        handleStoryUpload(file); // Upload the selected file
    };

    return (
        <>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }} // Hide the file input
                onChange={handleFileChange} // Handle file selection
                accept="image/*,video/*" // Accept images and videos
            />
            <Tooltip label="Add Story" placement="top">
                <IconButton
                    icon={<AddIcon />} // Add icon
                    aria-label="Add Story"
                    onClick={selectFile} // Trigger file selection
                    borderRadius="full" // Makes the button fully round
                    size="lg" // Adjust the size as needed
                    bgColor="blue.500" // Button background color
                    color="white" // Icon color
                    _hover={{ bgColor: "blue.600" }} // Hover color
                    _focus={{ boxShadow: "outline" }} // Focus effect
                />
            </Tooltip>

            {/* Render uploaded stories */}
            <Box mt={4} display="flex" flexDirection="row" flexWrap="wrap">
                {stories.map((story) => (
                    <Box
                        key={story.name}
                        onClick={() => setSelectedStory(story)} // Open story on click
                        cursor="pointer" // Change cursor to pointer
                        borderRadius="full" // Make the box round
                        overflow="hidden" // Ensure the content is contained
                        boxSize="100px" // Set size for the story
                        position="relative" // Position for children elements
                        m={2} // Margin between stories
                        border="2px solid" // Add a border for better visibility
                        borderColor="gray.300"
                    >
                        <Image src={story.url} alt={story.name} boxSize="100%" objectFit="cover" />
                    </Box>
                ))}
            </Box>

            {/* Modal for viewing the selected story */}
            <Modal isOpen={!!selectedStory} onClose={() => setSelectedStory(null)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>View Story</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {selectedStory && (
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <Image src={selectedStory.url} alt={selectedStory.name} boxSize="400px" objectFit="contain" />
                                <Text mt={4}>{selectedStory.name}</Text>
                                <IconButton
                                    mt={2}
                                    onClick={() => deleteStory(selectedStory)} // Call delete function on click
                                    colorScheme="red"
                                    aria-label="Delete Story"
                                    size="sm"
                                    variant="outline"
                                >
                                    Delete Story
                                </IconButton>
                            </Box>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AddStoryButton;
