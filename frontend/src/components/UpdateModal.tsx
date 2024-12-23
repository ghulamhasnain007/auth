interface ModalProps {
    isOpen: boolean;
    title: string;
    onClose: () => void;
    onSubmit: (e: any) => any;
    children: React.ReactNode; // To render any input fields or content inside the modal
  }
  
  export default function UpdateModal({ isOpen, title, onClose, onSubmit, children }: ModalProps) {
    if (!isOpen) return null; // Render nothing if modal is not open
  
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white p-5 rounded shadow-lg w-96">
          <h2 className="text-lg font-bold mb-4">{title}</h2>
          <div>{children}</div>
  
          <div className="flex justify-end space-x-4 mt-4">
            <button
              className="px-4 py-2 bg-gray-400 text-white rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded"
              onClick={onSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }