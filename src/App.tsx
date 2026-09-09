import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Workout from './pages/Workout';
import Nutrition from './pages/Nutrition';
import FoodBank from './pages/FoodBank';
import Analysis from './pages/Analysis';
import Progress from './pages/Progress';
import BodyPhotos from './pages/BodyPhotos';
import CalendarPage from './pages/Calendar';
import Reminders from './pages/Reminders';
import Supplements from './pages/Supplements';
import Settings from './pages/Settings';
import Assessment from './pages/Assessment';
import Compact from './pages/Compact';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'profile': return <Profile />;
      case 'workout': return <Workout />;
      case 'compact': return <Compact />;
      case 'nutrition': return <Nutrition />;
      case 'foodbank': return <FoodBank />;
      case 'analysis': return <Analysis />;
      case 'progress': return <Progress />;
      case 'photos': return <BodyPhotos />;
      case 'calendar': return <CalendarPage />;
      case 'reminders': return <Reminders />;
      case 'supplements': return <Supplements />;
      case 'settings': return <Settings />;
      case 'assessment': return <Assessment />;
      default: return <Dashboard />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
