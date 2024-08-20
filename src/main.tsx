import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ColorModeScript, createStandaloneToast } from '@chakra-ui/react';

const queryClient = new QueryClient();
const { ToastContainer } = createStandaloneToast();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
        <ToastContainer />
        <ColorModeScript />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
