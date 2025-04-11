import { Routes, Route } from 'react-router-dom';
import Page from './pages/index';
import Hydration from './pages/Hydration';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Page />} />
      <Route path="/hydration" element={<Hydration />} />
    </Routes>
  );
}
