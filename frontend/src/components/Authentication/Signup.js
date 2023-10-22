import { FormControl, FormLabel} from '@chakra-ui/form-control';
import { Input, InputGroup, InputRightElement} from '@chakra-ui/input';
import { VStack } from '@chakra-ui/layout';
import React, { useState } from 'react';
import {Button} from "@chakra-ui/button";
import {useToast} from "@chakra-ui/react";
import axios from "axios";
import {useHistory} from "react-router-dom";

const Signup = () => {
    const[name, setName] = useState();
    const[email, setEmail] = useState();
    const[password, setPassword] = useState();
    const[confirmpassword, setConfirmpassword] = useState();
    const[pic, setPic] = useState();
    const [show,setShow]= useState(false);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const history = useHistory();


    const handleClick = () => setShow(!show);
    const postDetails = (pics) => {
      setLoading(true);
      console.log (pics);
      if(pics === undefined){
        toast({
          title: "Please Select an Image!",
          status: "warning",
          duration: 5000,
          isClosable:true,
          position: "bottom",
        });
        return;
      }

      if(pics.type==="image/jpeg" || pics.type === "image/png"){
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "amenotiomoi");
        data.append("cloud_name", "duhless");
        console.log(pics);
        axios.post("https://api.cloudinary.com/v1_1/duhless/image/upload", data)
        .then((response) => {
          console.log("Cloudinary response:", response);
          setPic(response.data.url.toString());
          setLoading(false);
          toast({
            title: "Image uploaded successfully!",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
        })
        .catch((error) => {
          console.log("Cloudinary error:", error);
          setLoading(false);
        });
      } else {
        toast({
          title: "Please Select an Image!",
          stauts: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        return;
      }
    };


    const submitHandler = async () => {
      setLoading(true);
      if(!name || !email || !password || !confirmpassword){
        toast({
          title: "Please Fill all the Fields",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        return;
      }

      if(password !== confirmpassword){
        toast({
          title: "Passwords Do Not Match",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }
      try {
        const config = {
          headers: {
            "Content-type":"application/json",
          },
        };

        const {data} = await axios.post("/api/user", {name, email, password, pic}, config);

        toast({
          title: "Registration Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });

        localStorage.setItem('userInfo', JSON.stringify(data));

        setLoading(false);
        history.pushState('/chats');
      } 
      catch (error) {
        setLoading(false);
      }
    };


  return (
    <VStack spacing= '5px' color="black">
      <FormControl id='first-name' isRequired>
        <FormLabel>Name
            <Input 
                placeholder='Enter Your Name'
                onChange={(e)=> setName(e.target.value)}
            />
        </FormLabel>
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email
            <Input 
                placeholder='Enter Your Email'
                onChange={(e)=> setEmail(e.target.value)}
            />
        </FormLabel>
      </FormControl>
       <FormControl id="password" isRequired>
        <FormLabel>Password
            <InputGroup>
                <Input 
                type={show?"text":"password"}
                placeholder='Set Your Password'
                onChange={(e)=> setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                </Button>
            </InputRightElement>
            </InputGroup>
        </FormLabel>
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password
            <InputGroup>
                <Input 
                type={show?"text":"password"}
                placeholder='Re-enter your Password'
                onChange={(e)=> setConfirmpassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                </Button>
            </InputRightElement>
            </InputGroup>
        </FormLabel>
      </FormControl>

      <FormControl>
        <FormLabel>
            Upload your Picture
        </FormLabel>
        <Input 
        type="file"
        p={1.5}
        accept='image/*'
        onChange={(e) => postDetails(e.target.files[0])}
        /> 
      </FormControl>

      <Button colorScheme="blue"
        width="100%"
        style={{marginTop: 15}}
        onClick={submitHandler}
        isLoading= {loading}
        >
            Sign Up
      </Button>
    </VStack>
  )
}

export default Signup







