import {  useToast } from "@chakra-ui/react"
import { useCallback } from "react"



const useShowToast = () => {
     const  toast = useToast()

     //useCallback is used to prevent infinte loop,by caching the function
    const ShowToast = useCallback((title,description,status) => {
      toast({
         title: title,
         description: description,
         status: status,
         duration: 3000,
         isClosable :true,
      });
     },[toast])
    
  return ShowToast
}

export default useShowToast