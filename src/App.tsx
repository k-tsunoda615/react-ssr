import { Routes, Route } from 'react-router-dom';
import Page from './pages/index';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Page />} />
    </Routes>
  );
}
