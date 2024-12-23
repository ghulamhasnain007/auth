// interface ModalProps {
//   isOpen: boolean;
//   title: string;
//   onClose: () => void;
//   onSubmit: () => void;
//   children: React.ReactNode; // To render any input fields or content inside the modal
// }

// export default function Modal({ isOpen, title, onClose, onSubmit, children }: ModalProps) {
//   if (!isOpen) return null; // Render nothing if modal is not open

//   return (
//     <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
//       <div className="bg-white p-5 rounded shadow-lg w-96">
//         <h2 className="text-lg font-bold mb-4">{title}</h2>
//         <div>{children}</div>

//         <div className="flex justify-end space-x-4 mt-4">
//           <button
//             className="px-4 py-2 bg-gray-400 text-white rounded"
//             onClick={onClose}
//           >
//             Cancel
//           </button>
//           <button
//             className="px-4 py-2 bg-blue-600 text-white rounded"
//             onClick={onSubmit}
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// interface ModalProps {
//   isOpen: boolean;
//   title: string;
//   onClose: () => void;
//   onSubmit: () => void;
//   // children: React.ReactNode; // To render any input fields or content inside the modal
// }

// export default function Modal({ isOpen, title, onClose, onSubmit, children }: ModalProps) {
//   if (!isOpen) return null; // Render nothing if modal is not open

//   return (
//     <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
//       <div className="bg-white p-5 rounded shadow-lg w-96">
//         <h2 className="text-lg font-bold mb-4">{title}</h2>
//         {/* <div>{children}</div> */}
//         <div className="space-y-3">
//           <input
//             type="text"
//             placeholder="Username"
//             value={newUser.username}
//             onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
//             className="w-full p-2 border rounded"
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={newUser.email}
//             onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
//             className="w-full p-2 border rounded"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={newUser.password}
//             onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div className="flex justify-end space-x-4 mt-4">
//           <button
//             className="px-4 py-2 bg-gray-400 text-white rounded"
//             onClick={onClose}
//           >
//             Cancel
//           </button>
//           <button
//             className="px-4 py-2 bg-blue-600 text-white rounded"
//             onClick={onSubmit}
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState } from "react";

// type ModalProps = {
//   isOpen: boolean; // Indicates whether the modal is visible
//   title: string;   // Title of the modal
//   mode: "add" | "edit"; // Mode of the modal
//   user: SubUser | null; // User data for editing
//   onClose: () => void;  // Function to handle modal close
//   onSubmit: (formData: SubUser) => Promise<void>; // Function to handle form submission
// };


// export function Modal({ isOpen, title, mode, user, onClose, onSubmit }: ModalProps) {
//   const [formData, setFormData] = useState<SubUser | any>(
//     user || { username: "", email: "", password: "" }
//   );

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
//       <div className="bg-white p-5 rounded shadow-lg w-96">
//         <h2 className="text-lg font-bold mb-4">{title}</h2>
//         <div className="space-y-3">
//           <input
//             type="text"
//             placeholder="Username"
//             value={formData.username}
//             onChange={(e) => setFormData({ ...formData, username: e.target.value })}
//             className="w-full p-2 border rounded"
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             className="w-full p-2 border rounded"
//           />
//           {mode === "add" && (
//             <input
//               type="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//               className="w-full p-2 border rounded"
//             />
//           )}
//         </div>
//         <div className="flex justify-end space-x-4 mt-4">
//           <button
//             className="px-4 py-2 bg-gray-400 text-white rounded"
//             onClick={onClose}
//           >
//             Cancel
//           </button>
//           <button
//             className="px-4 py-2 bg-blue-600 text-white rounded"
//             onClick={() => onSubmit(formData)}
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";

type SubUser = {
  id?: number; // Optional for "add" mode
  username: string;
  email: string;
  password?: string; // Optional for "edit" mode
};


type ModalProps = {
  isOpen: boolean;
  title: string;
  mode: "add" | "edit";
  user: SubUser | null;
  onClose: () => void;
  onSubmit: (formData: SubUser) => Promise<void>;
};


export function Modal({ isOpen, title, mode, user, onClose, onSubmit }: ModalProps) {
  const [formData, setFormData] = useState<SubUser>(
    user || { username: "", email: "", password: "" }
  );
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) setFormData(user || { username: "", email: "", password: "" });
  }, [isOpen, user]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = () => {
    if (!formData.username || !formData.email || (mode === "add" && !formData.password)) {
      setError("All fields are required.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email.");
      return;
    }
    setError("");
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="w-full p-2 border rounded"
            autoFocus
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-2 border rounded"
          />
          {mode === "add" && (
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full p-2 border rounded"
            />
          )}
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
              !formData.username || !formData.email || (mode === "add" && !formData.password)
                ? "bg-blue-300"
                : "bg-blue-600 text-white"
            }`}
            onClick={handleSubmit}
            disabled={
              !formData.username || !formData.email || (mode === "add" && !formData.password)
            }
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
