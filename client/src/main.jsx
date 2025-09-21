import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // This now imports Tailwind!
import { BrowserRouter } from 'react-router-dom';
// import { ChakraProvider } from '@chakra-ui/react'; // REMOVE THIS
// import theme from './theme'; // REMOVE THIS if you had one

// Import i18n for internationalization
import './i18n';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <ChakraProvider theme={theme}>  */} {/* REMOVE THIS LINE */}
        <App />
      {/* </ChakraProvider> */} {/* REMOVE THIS LINE */}
    </BrowserRouter>
  </React.StrictMode>,
)
