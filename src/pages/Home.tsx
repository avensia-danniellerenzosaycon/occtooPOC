import { Box, Flex, Heading, Text, Image } from '@chakra-ui/react';

export default function HomePage() {
    return (
        <Box
            position="relative"
            p={300}
            bg="#151515" // Background with hex color #151515
            color="white"
            minH="80vh"
            overflow="hidden"
            borderRadius="lg" // Optional rounded corners for the background
        >
            {/* Background Image Positioned in the Right Corner */}
            <Image
                src="src\assets\Picture1.png"
                alt="Product Image"
                position="absolute"
                top={0}
                right={0}
                height="100%" // Same height as the background
                objectFit="cover"
            />

            {/* Content on top of the background */}
            <Flex
                direction="column"
                align="flex-start" // Aligns content to the left
                justify="center" // Centers content vertically
                position="relative"
                zIndex={1}
                h="100%"
                pl={{ base: 0, md: 200 }} // Adjust padding to keep content away from the edges
            >
                <Box textAlign="left" mb={8}>
                    <Heading as="h1"  fontSize={{ base: '10xl', md: '8xl', lg: '10xl' }} mb={4}>
                        OCCTOO 
                    </Heading>
                    <Text fontSize="lg">
                        Avensia IM Data Onboarding Proof of concept
                    </Text>
                </Box>
            </Flex>
        </Box>
    );
}
