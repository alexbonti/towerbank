import { useState } from 'react';
import CreateFloorModal from './CreateFloorModal';

const CreateFloorButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors"
      >
        Create Floor
      </button>
      <CreateFloorModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default CreateFloorButton;