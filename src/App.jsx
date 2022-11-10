import { Routes, Route } from 'react-router-dom';
// Layout
import Layout from './layout/Layout';
import AdminPage from './layout/Admin';
// Page
import Home from './page/Home';
import Admin from './admin/Admin';

function App() {
  return (
    // <Layout />
    <Routes>
      {/* Page */}
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/home' element={<Home />} />
      </Route>
      {/* Admin */}
      <Route path='/admin' element={<AdminPage />}>
        <Route index element={<Admin />} />
      </Route>
    </Routes>
  );
}

export default App;
