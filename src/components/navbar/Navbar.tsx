import React from "react";
import {
    Box,
    Flex,
    HStack,
    Text,
    VStack,
    Image,
    Spacer,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { BsCart2 } from "react-icons/bs";

const Navbar = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();

    return (
        <>
            <Box 
                bg={'white'} 
                px={16} 
                py={4} 
                position="sticky" 
                top={0} 
                zIndex={1} 
                boxShadow="0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -2px rgba(0, 0, 0, 0.1)"
            >
                <Flex h={16} alignItems={"center"}>
                    <VStack mr={8}>
                        <Box display={"flex"} alignItems={"center"}>
                            <Image 
                                width="40px" 
                                height="40px" 
                                src="https://imgs.search.brave.com/hNPl6OzqlBOl6VeW4I_mq86_Yw-XFVvyEL4xJvQgznA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/LmNsZWFyYml0LmNv/bS93d3cuYXZlbnNp/YS5jb20_c2l6ZT05/Ng" 
                                alt="Logo" 
                            />
                            <Text 
                                ml={2} 
                                fontWeight="bold" 
                                fontSize="lg" 
                                color={'#1a0c0c'}
                            >
                                Avensia POC
                            </Text>
                        </Box>
                    </VStack>
                    <HStack as={"nav"} spacing={4}>
                        {NavList.map((item, index) => (
                            <Box 
                                key={index} 
                                rounded={"md"} 
                                onClick={() => navigate(item.href)} 
                                cursor={'pointer'}
                            >
                                <VStack>
                                    <Text fontSize={'md'}>{item.text}</Text>
                                </VStack>
                            </Box>
                        ))}
                    </HStack>
                    <Spacer />
                    <Box 
                        rounded={"md"} 
                        onClick={() => navigate('/')} 
                        cursor={'pointer'}
                    >
                        <VStack>
                            <Box as={BsCart2} boxSize="24px" />
                        </VStack>
                    </Box>
                </Flex>
            </Box>
            <Box
                px={{ base: 8, sm: 16 }}
                py={8}
            >
                {children}
            </Box>
        </>
    );
};

interface NavItemProps {
    text: string;
    href: string;
}

const NavList: NavItemProps[] = [
    {
        text: 'home',
        href: '/'
    },
    {
        text: 'Endpoint 1',
        href: '/Endpoint1'
    },
    {
        text: 'Endpoint 2',
        href: '/Endpoint2'
    },
];

export default Navbar;
