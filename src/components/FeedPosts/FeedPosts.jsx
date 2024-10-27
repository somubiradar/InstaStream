import  { useState } from "react"; // Add this line to import useState
import { Box, Container, Flex, Skeleton, SkeletonCircle, Text, VStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Image } from "@chakra-ui/react";
import FeedPost from "./FeedPost";
import useGetFeedPosts from "../../hooks/useGetFeedPosts";
import useGetStories from "../../hooks/useGetStories";
import { useDisclosure } from "@chakra-ui/react"; // Import useDisclosure

const FeedPosts = () => {
	const { isLoading: loadingPosts, posts } = useGetFeedPosts();
	const { isLoading: loadingStories, stories } = useGetStories();
	const { isOpen, onOpen, onClose } = useDisclosure(); // Manage modal state
	const [selectedStory, setSelectedStory] = useState(null); // State for selected story

	const handleStoryClick = (story) => {
		setSelectedStory(story); // Set the selected story
		onOpen(); // Open the modal
	};

	return (
		<Container maxW={"container.sm"} py={10} px={2}>
			{loadingStories && (
				<VStack gap={4} alignItems={"flex-start"} mb={10}>
					<SkeletonCircle size='10' />
					<Skeleton height='10px' w={"200px"} />
				</VStack>
			)}

			{/* Display stories if available */}
			{!loadingStories && stories.length > 0 && (
				<Box mb={4}>
					<Text fontWeight="bold">Stories:</Text>
					<Flex gap={2}>
						{stories.map((story) => (
							<Box key={story.id} borderRadius="full" overflow="hidden" onClick={() => handleStoryClick(story)} cursor="pointer">
								<img src={story.url} alt="Story" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
							</Box>
						))}
					</Flex>
				</Box>
			)}

			{/* Loading skeleton for posts */}
			{loadingPosts &&
				[0, 1, 2].map((_, idx) => (
					<VStack key={idx} gap={4} alignItems={"flex-start"} mb={10}>
						<Flex gap='2'>
							<SkeletonCircle size='10' />
							<VStack gap={2} alignItems={"flex-start"}>
								<Skeleton height='10px' w={"200px"} />
								<Skeleton height='10px' w={"200px"} />
							</VStack>
						</Flex>
						<Skeleton w={"full"}>
							<Box h={"400px"}>contents wrapped</Box>
						</Skeleton>
					</VStack>
				))}

			{/* Display feed posts */}
			{!loadingPosts && posts.length > 0 && posts.map((post) => <FeedPost key={post.id} post={post} />)}
			{!loadingPosts && posts.length === 0 && (
				<>
					<Text fontSize={"md"} color={"red.400"}>
						Dayuum. Looks like you don&apos;t have any friends.
					</Text>
					<Text color={"red.400"}>Stop coding and go make some!!</Text>
				</>
			)}

			{/* Modal for displaying selected story */}
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>View Story</ModalHeader>
					<ModalCloseButton />
					<ModalBody display="flex" justifyContent="center" alignItems="center">
						{selectedStory && (
							<Image src={selectedStory.url} alt="Story" maxW="100%" maxH="400px" objectFit="contain" />
						)}
					</ModalBody>
				</ModalContent>
			</Modal>
		</Container>
	);
};

export default FeedPosts;
