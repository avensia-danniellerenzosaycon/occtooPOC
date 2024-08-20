import { Box, Flex, Heading, Text, Image } from '@chakra-ui/react';

export default function HomePage() {
    return (
        <Box
            position="relative"
            p={8}
            bg="blue.500" // Blue background
            color="white"
            overflow="hidden" // Hide overflow for the diagonal cut
            borderRadius="md" // Optional, for rounded corners
        >
            {/* Diagonal White Cut */}
            <Box
                position="absolute"
                top={0}
                left={0}
                width="100%"
                height="100%"
                bg="white"
                transform="skewY(-10deg)" // Diagonal cut effect
                transformOrigin="top left"
                zIndex={0}
            />

            {/* Content on top of the background */}
            <Flex
                direction={{ base: 'column', md: 'row' }}
                align="center"
                position="relative"
                zIndex={1} // Ensures content is above the white diagonal cut
            >
                {/* Left Side - Text Section */}
                <Box flex="1" textAlign={{ base: 'center', md: 'left' }} mb={{ base: 8, md: 0 }}>
                    <Heading as="h1" size="2xl" mb={4}>
                        Title
                    </Heading>
                    <Text fontSize="lg">
                        This is the title page description.
                    </Text>
                </Box>

                {/* Right Side - Product Image */}
                <Box flex="1" textAlign="center">
                    <Image
                        src="your-product-image-url.jpg"
                        alt="Product Image"
                        boxSize="300px"
                        objectFit="cover"
                        mx="auto"
                    />
                </Box>
            </Flex>
        </Box>
    );
}
