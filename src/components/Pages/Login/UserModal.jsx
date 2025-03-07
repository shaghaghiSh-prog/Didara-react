import React, { useState } from "react";
import { X } from "lucide-react";

function UserModal({ isOpen, onClose, onSave, initialName, initialLastName }) {
  const [name, setName] = useState(initialName);
  const [lastName, setLastName] = useState(initialLastName);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(name, lastName);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d1b560] focus:ring focus:ring-[#d1b560] focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d1b560] focus:ring focus:ring-[#d1b560] focus:ring-opacity-50"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#d1b560] text-white py-2 px-4 rounded-md hover:bg-[#c1a550] transition-colors duration-200"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserModal;
