import { useDispatch } from 'react-redux';
import { clearIdleWarning } from '../slices/sessionSlice';
import type { AppDispatch } from '../../../store/store';

const IdleWarningModal = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded">
        <p>You will be logged out soon due to inactivity.</p>
        <button onClick={() => dispatch(clearIdleWarning())}>
          Stay Logged In
        </button>
      </div>
    </div>
  );
};

export default IdleWarningModal;
