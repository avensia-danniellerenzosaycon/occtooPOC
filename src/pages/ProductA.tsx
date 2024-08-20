import { Box, Flex, Select, SimpleGrid, Spinner } from '@chakra-ui/react';
import ProductCard from '../components/card/ProductCardA';
import { useEffect } from 'react';
import { useProducts } from '../data/hooksA';
import { ECookies, getCookie } from '../core/utils/utils';

interface ProductAProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function Products({ selectedFilter, onFilterChange }: ProductAProps) {
  const token = getCookie(ECookies.ACCESS_TOKEN);
  const { products, isLoading, fetchProducts } = useProducts();

  useEffect(() => {
    if (token) {
      fetchProducts(selectedFilter === 'all' ? undefined : { entityType: selectedFilter });
    }
  }, [token, selectedFilter]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    onFilterChange(selectedValue);
  };

  return (
    <Box px={24}>
      <Flex gap={4}>
        <Box>
          <label htmlFor="filter1">Product Type:</label>
          <Select mt={2} value={selectedFilter} onChange={handleSelectChange}>
            <option value="all">All</option>
            <option value="kit">kit</option>
            <option value="service">service</option>
            <option value="produkt">produkt</option>
            <option value="anskaffning">anskaffning</option>
          </Select>
        </Box>
      </Flex>

      {isLoading ? (
        <Flex align="center" justify="center" h={300}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      ) : (
        <SimpleGrid columns={4} gap={4} py={8}>
          {products.map((product) => (
            <ProductCard key={product.id} data={product} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}
