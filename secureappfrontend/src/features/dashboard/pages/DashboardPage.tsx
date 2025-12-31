import { useSelector } from 'react-redux';
import { useIdleTimeout } from '../../session/hooks/useIdleTimeout';
import { useSessionMonitor } from '../../session/hooks/useSessionMonitor';
import IdleWarningModal from '../../session/components/IdleWarningModal';
import type { RootState } from '../../../store/store';

const DashboardPage = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const showIdleWarning = useSelector(
    (state: RootState) => state.session.showIdleWarning
  );

  useIdleTimeout();
  useSessionMonitor();

  return (
    <div>
      <header>
        <h1>Dashboard</h1>
        <p>Welcome, {user?.username}</p>
      </header>

      <main>
        <section>Statistics</section>
        <section>Recent Activity</section>
        <section>Quick Actions</section>
      </main>

      {showIdleWarning && <IdleWarningModal />}
    </div>
  );
};

export default DashboardPage;
