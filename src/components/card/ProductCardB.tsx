import { Text, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Stack, Image } from '@chakra-ui/react';
import { IProduct } from '../../core/models/indexB';

interface Props {
    data: IProduct;
}
export default function ProductCard({ data }: Props) {
    const product = data;
    return (
        <Card maxW='sm' boxShadow='0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -2px rgba(0, 0, 0, 0.1)'>
            <CardBody>
                <Image
                    src={product.imageUrl}
                    alt={product.productName}
                    borderRadius='lg'
                    width='260px'
                    height='160px'
                    objectFit='cover' // Ensures the image covers the dimensions without stretching
                />
                <Stack mt='6' spacing='3'>
                    <Heading size='md'>{product.productName}</Heading>
                    <Text>
                        <strong>Owner:</strong> {product.owner} <br/>
                        <strong>Product Type:</strong> {product.productType} <br/>
                        <strong>ERP Item Number:</strong> {product.erpItemNumber} <br/>
                        <strong>Product Status:</strong> {product.productStatus} <br/>
                        <strong>ID:</strong> {product.id} <br/>
                        <strong>Product Taxonomy:</strong> {product.productTaxonomy} <br/>
                        <strong>Image URL:</strong> {product.imageUrl} <br/>
                    </Text>
                    <Text color='blue.600' fontSize='2xl'>
                        $450
                    </Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                <ButtonGroup spacing='2'>
                    <Button variant='solid' colorScheme='blue'>
                        Buy now
                    </Button>
                    <Button variant='ghost' colorScheme='blue'>
                        Add to cart
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    );
}
