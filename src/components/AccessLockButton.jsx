import { FiLock } from 'react-icons/fi';

const AccessLockButton = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute top-4 right-4 flex items-center justify-center w-20 h-20 bg-black/75 rounded-full z-10 cursor-pointer shadow-lg transition hover:bg-black/90"
  >
    <FiLock className="text-white" size={20} />
  </div>
);

export default AccessLockButton;
