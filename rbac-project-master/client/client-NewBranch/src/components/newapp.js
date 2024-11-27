import logo from './logo.svg';
import './App.css';
import { ColorModeContext,useMode } from './theme';
import { CssBaseline,ThemeProvider } from '@mui/material';
import Home from './components/Home/Home';

import { BrowserRouter,Routes,Route} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ProtectedLayout from './components/Layout/ProtectedLayout';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

function App() {
  const [theme,colorMode]=useMode();
  return (
   <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
    <CssBaseline/>
  <BrowserRouter>
  <div className='app'>
      <main className='content'>
      
   
  <Routes>
        <Route path="/" element={<ProtectedLayout user={null}/>}>
          <Route index element={<Home />} />
      
        </Route>
        <Route path='/' element={<Layout/>}>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        </Route>
      </Routes>
      </main>
      </div>

    </BrowserRouter>
  
    </ThemeProvider>

   </ColorModeContext.Provider>
  );
}

export default App;
