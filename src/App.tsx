import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import ProductA from './pages/ProductA';
import ProductB from './pages/ProductB';
import Home from './pages/Home';
import { useState, useEffect } from 'react';
import { fetchAccessToken } from './core/models/indexA';
import { ECookies, getCookie, Message, setCookie } from './core/utils/utils';
import { useMutation, useQueryClient } from 'react-query';

export function App() {
  let token = getCookie(ECookies.ACCESS_TOKEN);
  const queryClient = useQueryClient();

  const { mutate, isSuccess } = useMutation(fetchAccessToken, {
    onSuccess: (response: any) => {
      if (!response.accessToken) {
        Message('error', 'Failed to get access token');
        return;
      }
      localStorage.setItem('token', JSON.stringify(response));
      setCookie(ECookies.ACCESS_TOKEN, response.accessToken, response.expiresIn);
    },
    onError: () => {
      console.error('ERROR: API Failed');
    },
    onSettled: () => {
      queryClient.invalidateQueries('fetch');
    },
  });

  useEffect(() => {
    if (!token) {
      mutate();
    }
  }, [token, isSuccess]);

  // State for managing the selected filter
  const [filter, setFilter] = useState<string>('all');

  const handleFilterChange = (selectedFilter: string) => {
    setFilter(selectedFilter);
  };

  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<Navbar><Home /></Navbar>} />
        <Route 
          path="/Endpoint1" 
          element={
            <Navbar>
              <ProductA selectedFilter={filter} onFilterChange={handleFilterChange} />
            </Navbar>
          } 
        />
        <Route 
          path="/Endpoint2" 
          element={
            <Navbar>
              <ProductB/>
            </Navbar>
          }
        />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
