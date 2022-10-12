import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './pages/Signup';
import PageNotFound404 from './pages/PageNotFound404';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="*" element={<PageNotFound404 />} />
    </Routes>
  );
}

export default App;
