
import { useEffect, useState } from "react";

type Todo = {
  todo_id?: number;
  task: string;
  description?: string;
};

type ModalProps = {
  isOpen: boolean;
  title: string;
  // mode: "add" | "edit";
  todo: Todo | null;
  onClose: () => void;
  onSubmit: (formData: Todo) => Promise<void>;
};

export function UpdateModal({ isOpen, title, todo, onClose, onSubmit }: ModalProps) {
  const [formData, setFormData] = useState<Todo>(todo || { task: "", description: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setFormData(todo || { task: "", description: "" });
    }
  }, [isOpen, todo]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = async () => {
    // Validation
    console.log(formData);
    
    if (!formData.task || !formData.description) {
      setError("All fields are required.");
      return;
    }

    setError(""); // Clear any previous errors

    // Call onSubmit (either create or update depending on mode)
    try {
      await onSubmit(formData);
    } catch (error) {
      setError("Failed to submit form.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Task"
            value={formData.task}
            onChange={(e) => setFormData({ ...formData, task: e.target.value })}
            className="w-full p-2 border rounded"
            autoFocus
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-2 border rounded"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        <div className="flex justify-end space-x-4 mt-4">
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 rounded ${
              !formData.task || !formData.description
                ? "bg-blue-300"
                : "bg-blue-600 text-white"
            }`}
            onClick={handleSubmit}
            disabled={!formData.task || !formData.description}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
