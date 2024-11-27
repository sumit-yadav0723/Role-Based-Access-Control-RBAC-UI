import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Import components
import Login from './components/Login';

import AdminHome from './components/AdminHome';
import SubAdminHome from './components/SubAdminHome';
import UserHome from './components/UserHome';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import { PostsPage } from './components/Posts';

function App() {
  const [theme, colorMode] = useMode();
  const [id, setId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated on component mount
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  // Update authentication state when id changes
  useEffect(() => {
    setIsAuthenticated(!!id);
  }, [id]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <div className='app'>
            
            <main className='content'>
            <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} setId={setId} />
              <Routes>
                <Route path="/" element={<Navigate to='/login' />} />
                
             
                  <Route path="/login" element={<Login id={id} setId={setId} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />
                  
             
                
               
                  <Route path='/admin' element={<PrivateRoute><AdminHome /></PrivateRoute>} />
                  <Route path="/subadmin" element={<PrivateRoute><SubAdminHome /></PrivateRoute>} />
                  <Route path="/user" element={<PrivateRoute><UserHome id={id} /></PrivateRoute>} />
            <Route path="/posts" element={<PostsPage id={id}  isAuthenticated={isAuthenticated} />} />
              </Routes>
            </main>
            <ToastContainer />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;