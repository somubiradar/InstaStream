import { Box, VStack,Image,  Flex ,Text} from "@chakra-ui/react"
import { useState } from "react"
import Signup from "./Signup";
import Login from "./Login";
import GoogleAuth from "./GoogleAuth";


const AuthForm = () => {
   const [isLogin,setIsLogin] = useState(true);
  
   
  return <>
    <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <VStack spacing={4}>
            <Image src="/Insta-stream.png" h={24} cursor={"pointer"} alt='Insta-stream'/> 
           
           {isLogin ? <Login /> : <Signup/>}
           
            {/* ---------------------------------------------OR-------------------------------*/}

            <Flex alignItems={"center"} justifyContent={"center"} my={4} gap={1} w={"full"}>
                <Box flex={2} h={"1px"} bg={"gray.400"} />
                <Text mx={1} color={"white"}>OR</Text>
                <Box flex={2} h={"1px"} bg={"gray.400"} />
            </Flex>
             
             <GoogleAuth prefix={isLogin ? "Login" : "Sign up"} />

        </VStack>

        </Box>
        <Box border={"1px solid gray"} borderRadius={4} padding={5}>
            <Flex alignItems={"center"} justifyContent={"center"}>
                <Box mx={2} fontSize={14}>
                    {isLogin ? "Don't have an account?" : "Alraedy have an account?"}
                </Box>
                <Box onClick={() => setIsLogin(!isLogin)} color={"blue.500"} cursor={"pointer"}>
                    {isLogin ? "Sign up":"Log in"}
                </Box>
            </Flex>

        </Box>
        </>
  
}

export default AuthForm