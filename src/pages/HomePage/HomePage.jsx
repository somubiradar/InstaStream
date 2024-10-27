import { Box, Container, Flex, VStack } from "@chakra-ui/react";
import FeedPosts from "../../components/FeedPosts/FeedPosts";
import SuggestedUsers from "../../components/SuggestedUsers/SuggestedUsers";
import AddStoryButton from "../../components/Story/AddStoryButton";


const HomePage = () => {
	const handleStoryUpload = (storyURL) => {
		console.log("Story added:", storyURL);
		// Handle story addition logic here (e.g., update state or send to Firestore)
	};

	return (
		<Container maxW={"container.lg"}>
		<Flex gap={20} direction={{ base: "column", lg: "row" }}>
		<Box flex={2} py={10}>
		<VStack spacing={4} align="flex-start">
		{/* Add Story section */}
    	<Flex gap={4} align="center">
		<AddStoryButton onStoryUpload={handleStoryUpload} />
		</Flex>

		         {/* Feed Posts */}
					<FeedPosts />
					</VStack>
				    </Box>

				{/* Suggested Users */}
				<Box
					flex={3}
					mr={20}
					display={{ base: "none", lg: "block" }}
					maxW={"300px"}
				>
					<SuggestedUsers />
				</Box>
			</Flex>
		</Container>
	);
};

export default HomePage;
