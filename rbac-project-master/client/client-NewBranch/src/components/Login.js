import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { toast } from 'react-toastify';
import { Box, Button, TextField, Typography, useTheme } from '@mui/material';

function Login({ setId, setIsAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('/api/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setIsAuthenticated(true);
      setId(response.data.user.id);

      if (response.data.user.role.name === 'Admin') {
        navigate('/admin');
      } else if (response.data.user.role.name === 'SubAdmin') {
        navigate('/subadmin');
      } else {
        navigate('/user');
      }
    } catch (error) {
      setError('Login failed. Please check your credentials.');
      toast.error('Login failed. Please check your credentials.');
      console.error('Login failed:', error);
    }
  };


  // return (
  //   <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  //     <div className="max-w-md w-full space-y-8">
  //       <div>
  //         <div className="mx-auto h-12 w-12 text-indigo-600 flex items-center justify-center">
  //           <Lock className="h-8 w-8" />
  //         </div>
  //         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
  //           Sign in to your account
  //         </h2>
  //       </div>
  //       <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
  //         <div className="rounded-md shadow-sm -space-y-px">
  //           <div>
  //             <input
  //               type="text"
  //               required
  //               className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
  //               placeholder="Username"
  //               value={username}
  //               onChange={(e) => setUsername(e.target.value)}
  //             />
  //           </div>
  //           <div>
  //             <input
  //               type="password"
  //               required
  //               className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
  //               placeholder="Password"
  //               value={password}
  //               onChange={(e) => setPassword(e.target.value)}
  //             />
  //           </div>
  //         </div>

  //         {error && (
  //           <div className="text-center text-red-500 text-sm">
  //             {error}
  //           </div>
  //         )}

  //         <div>
  //           <button
  //             type="submit"
  //             className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  //           >
  //             <span className="absolute left-0 inset-y-0 flex items-center pl-3">
  //               <Lock className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
  //             </span>
  //             Sign in
  //           </button>
  //         </div>
  //       </form>
  //     </div>
  //   </div>
  // );
  const theme=useTheme()
  

return (  <Box>
  <Box
    width="100%"
    backgroundColor={theme.palette.background.alt}
    p="1rem 6%"
    textAlign="center"
  >
    <Typography fontWeight="bold" fontSize="32px">
     Welcome to VRV Dashboard
    </Typography>
  </Box>
  <Box
    width="100%"
    backgroundColor={theme.palette.background.alt}
    p="1rem 6%"
    textAlign="center"

  >
    
       <TextField
                label="Enter Username"
                
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                
             
          
                sx={{ gridColumn: "span 2" }}
              />
   
   
  </Box>

               <Box
    width="100%"
    backgroundColor={theme.palette.background.alt}
    p="1rem 6%"
    textAlign="center"
  >
        <TextField
                label="Enter Password"
                
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                
             
          
                sx={{ gridColumn: "span 2" }}
              />
    </Box>

    <Box
    width="100%"
    backgroundColor={theme.palette.background}
    p="1rem 6%"
    textAlign="center"
  >

       <Button
            
            type="submit"
            sx={{
              m: "2rem 2rem 0",
              p: "1rem",
              color: theme.palette.text.primary,
              "&:hover": { color: theme.palette.text.secondary },
            }}
            onClick={handleSubmit}
          >
            LOGIN
          </Button>
      
    </Box>
</Box>

  
  //   <div className="mb-4">
  //     <button onClick={handleRegister} className="bg-blue-500 text-white p-2 mr-2">Register</button>
  //     <button onClick={handleLogin} className="bg-green-500 text-white p-2 mr-2">Login</button>
  //     <button onClick={handleAdminAccess} className="bg-red-500 text-white p-2">Access Admin Area</button>
  //   </div>
  //   <div>{message}</div>
  // </div>
);

}
export default Login;