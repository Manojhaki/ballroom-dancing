import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Encyclopedia from './pages/Encyclopedia';
import DanceDetail from './pages/DanceDetail';
import Roadmap from './pages/Roadmap';
import Finder from './pages/Finder';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="encyclopedia" element={<Encyclopedia />} />
        <Route path="encyclopedia/:danceId" element={<DanceDetail />} />
        <Route path="roadmap" element={<Roadmap />} />
        <Route path="finder" element={<Finder />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
