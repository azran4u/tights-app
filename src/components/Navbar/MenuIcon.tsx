import { FaBars } from 'react-icons/fa';
import { useAppDispatch } from '../../store/hooks';
import { openSidebar } from '../../store/sidebarSlice';

export const MenuIcon = () => {
  const dispatch = useAppDispatch();
  return (
    <button
      type="button"
      className="nav-toggle"
      onClick={() => dispatch(openSidebar())}
    >
      <FaBars />
    </button>
  );
};
