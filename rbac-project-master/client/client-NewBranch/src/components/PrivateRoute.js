import React from 'react';
import { Route, Navigate,Outlet} from 'react-router-dom';

function PrivateRoute({children}) {
  const isAuthenticated = !!localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  //console.log("hello")

  return (
 
     
        isAuthenticated ? (
        children
        ) : (
          <Navigate to="/login" />
        )
      
    
  );
}

export default PrivateRoute;

