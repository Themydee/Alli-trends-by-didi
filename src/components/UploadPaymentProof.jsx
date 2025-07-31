// src/components/UploadPaymentProof.jsx
import React, { useState } from "react";
import { FaUpload } from "react-icons/fa6";

const UploadPaymentProof = ({ onUpload }) => {
  const [fileName, setFileName] = useState("");

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onUpload(file); // 👈 renamed from onFileChange
    }
  };

  return (
    <div className="bg-white p-4 mt-4 border rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-2 text-secondary">
        Upload Proof of Payment
      </h3>

      <label
        htmlFor="payment-proof"
        className="flex items-center gap-2 px-4 py-2 bg-secondary text-white text-sm rounded cursor-pointer w-fit"
      >
        <FaUpload /> Upload File
      </label>

      <input
        type="file"
        id="payment-proof"
        accept="image/*,application/pdf"
        onChange={handleChange}
        className="hidden"
      />

      {fileName && (
        <p className="mt-2 text-sm text-green-600">
          Selected File: {fileName}
        </p>
      )}

      <p className="text-xs text-gray-500 mt-1">
        Accepted formats: JPG, PNG, PDF
      </p>
    </div>
  );
};

export default UploadPaymentProof;
