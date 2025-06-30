import LoginPage from './Pages/loginPage'
import './App.css';
import { BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom';
import AdminUsersPage from './Pages/adminUsersPage'
import CuratorPage from './Pages/curatorPage'
import TablesPage  from './Pages/tablesPage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="login" element={<LoginPage />} />
        <Route path='admin' element={<AdminUsersPage/>}/>
        <Route path='curator' element={<CuratorPage/>}/>
        <Route path='tables' element={<TablesPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
