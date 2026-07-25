import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Start from './pages/Start';
import American from './pages/American';
import International from './pages/International';
import DanceDetail from './pages/DanceDetail';
import Compete from './pages/Compete';
import Resources from './pages/Resources';
import History from './pages/History';
import About from './pages/About';
import Credits from './pages/Credits';
import Finder from './pages/Finder';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="start" element={<Start />} />
        <Route path="american" element={<American />} />
        <Route path="international" element={<International />} />
        <Route path="dance/:danceId" element={<DanceDetail />} />
        <Route path="compete" element={<Compete />} />
        <Route path="resources" element={<Resources />} />
        <Route path="history" element={<History />} />
        <Route path="about" element={<About />} />
        <Route path="credits" element={<Credits />} />
        <Route path="finder" element={<Finder />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
