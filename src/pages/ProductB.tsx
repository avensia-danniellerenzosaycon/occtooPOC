import { Box, Flex, Select, SimpleGrid, Spinner } from '@chakra-ui/react';
import ProductCard from '../components/card/ProductCardB';
import { useEffect, useState } from 'react';
import { getProducts, IProduct , fetchAccessToken} from '../core/models/indexB';
import { useMutation, useQueryClient } from 'react-query';
import { jwtDecode } from 'jwt-decode';
import { Message } from '../core/utils/utils';


export default function ProductB() {
    const [token, setToken] = useState<any | null>(null);
    const [data, setData] = useState<IProduct[]>([]);
    const queryClient = useQueryClient();
  
    const isTokenExpired = (token: string): boolean => {
      const decoded: { exp: number } = jwtDecode(token);
      const now = Date.now() / 1000;
      return decoded.exp < now;
    };
  
    const { mutate: fetchToken } = useMutation(fetchAccessToken, {
      onSuccess: (response: any) => {
        if (!response.accessToken) {
          Message('error', 'Failed to get access token');
          return;
        }
        localStorage.setItem('ProductBToken', JSON.stringify(response));
        setToken(response.accessToken); // Set the token state
  
        // Trigger the getProducts mutation after fetching the access token
        console.log(response.accessToken);
        fetchProducts(response.accessToken);
      },
      onError: () => {
        console.error('ERROR: API Failed');
      },
      onSettled: () => {
        queryClient.invalidateQueries('fetch');
      },
    });
  
    const { mutate: fetchProducts, isLoading } = useMutation(getProducts, {
      onSuccess: (response: any) => {
        if (response.results.length === 0) {
          Message('error', 'Failed to get products');
          return;
        }
        setData(response.results);
      },
      onError: () => {
        console.error('ERROR: API Failed');
      },
      onSettled: () => {
        queryClient.invalidateQueries('fetch');
      },
    });
  
    useEffect(() => {
      const fetchProductData = async () => {
        if (!token || isTokenExpired(token)) {
          await fetchToken();
        } else {
          fetchProducts(token);
        }
      };
  
      fetchProductData();
    }, [token]);
  

    return (
        <Box px={24} >
            <Flex gap={4}>
                <Box>
                    <label htmlFor='filter1'>Product Type:</label>
                    <Select mt={2}>
                        <option value='all'>All</option>
                    </Select>
                </Box>
            </Flex>
            {
                isLoading ?
                    <Flex align='center' justify='center' h={300}>
                        <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='xl'
                        />
                    </Flex>
                    :
                    <SimpleGrid columns={4} gap={4} py={8}>
                        {data.map((product) => (
                            <ProductCard key={product.id} data={product} />
                        ))}
                    </SimpleGrid >
            }
        </Box>
    );
}
