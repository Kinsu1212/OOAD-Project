// import Dashboard from './Dashboard';
import Sidebar from '../../../components_faculty/Sidebar';
import HistoryDashboard from './HistoryDashboard';
import '../Page.css';

export default function HistoryDashboardPage() {
  return (
    <div className="App">
      <Sidebar />
      <HistoryDashboard />
    </div>
  );
}