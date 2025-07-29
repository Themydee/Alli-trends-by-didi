// src/components/BankTransferDetails.jsx
import React from "react";

const TransferDetails = () => {
  return (
    <div className="bg-white p-4 mt-4 border rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-2 text-secondary">Bank Transfer Details</h3>
      <ul className="text-sm space-y-1">
        <li><strong>Bank Name:</strong> Zenith Bank</li>
        <li><strong>Account Number:</strong> 1234567890</li>
        <li><strong>Account Name:</strong> Glimmer Luxury Store</li>
        <li><strong>Amount:</strong> Check cart total</li>
        <li className="text-red-500 font-medium mt-2">Please upload proof of payment after transfer.</li>
      </ul>
    </div>
  );
};

export default TransferDetails;
