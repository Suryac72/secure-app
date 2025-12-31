import { useDispatch } from 'react-redux';
import { logout } from '../../auth/slices/authSlice';
import type { AppDispatch } from '../../../store/store';

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <header className="flex justify-between p-4 shadow">
      <h1 className="text-xl font-bold">Secure Dashboard</h1>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </header>
  );
};

export default Header;
