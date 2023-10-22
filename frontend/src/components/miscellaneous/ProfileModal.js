import { ViewIcon } from '@chakra-ui/icons';
import { IconButton, Image, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { ModalCloseButton } from '@chakra-ui/react';
import { ModalHeader } from '@chakra-ui/react';
import { ModalBody } from '@chakra-ui/react';
import { ModalOverlay } from '@chakra-ui/react';
import { Modal } from '@chakra-ui/react';
import { ModalContent } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { ModalFooter } from '@chakra-ui/react';

const ProfileModal = ({user, children}) => {

  const {isOpen, onOpen, onClose} = useDisclosure();
  return (
    <>
    {
      children ? (
        <span onClick={onOpen}>{children} </span>
      ) : (
        <IconButton
        d={{base: "flex"}}
        icon={<ViewIcon/>}
        onClick={onOpen}
        />
      )
    }
     <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent h="410px">
          <ModalHeader fontSize="40px" 
          fontFamily="Calibri"
          d="flex"
          justifyContent="center"
          >{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody
          d="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="space-between"
          >
            <Image 
            borderRadius="full"
            boxSize="150px"
            src={user.pic}
            alt={user.name}
             />
             <Text fontSize={{base: "28px", md: "30px"}}
             fontFamily="Times New Roman"
             >
              Email:{user.email}
             </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProfileModal

