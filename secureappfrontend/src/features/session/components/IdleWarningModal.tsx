import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../config/constants';

const SessionExpiredModal = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded">
        <p>Your session has expired.</p>
        <button onClick={() => navigate(ROUTES.LOGIN)}>
          Login Again
        </button>
      </div>
    </div>
  );
};

export default SessionExpiredModal;
