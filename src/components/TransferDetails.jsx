// src/components/BankTransferDetails.jsx
import React from "react";

const TransferDetails = () => {
  return (
    <div className=" bold bg-white p-4 mt-4 border rounded-lg shadow-sm">
      <h3 className="text-lg font-bold mb-2 text-secondary">Bank Transfer Details</h3>
      <ul className="text-sm space-y-1">
        <li className="text-3xl"><strong>Bank Name:</strong> Zenith Bank</li>
        <li className="text-3xl"><strong>Account Number:</strong> 1234567890</li>
        <li className="text-3xl"><strong>Account Name:</strong> Glimmer Luxury Store</li>
        <li className="text-3xl"><strong>Amount:</strong> Check cart total</li>
        <li className="text-red-500 font-medium mt-2">Please upload proof of payment after transfer.</li>
      </ul>
    </div>
  );
};

export default TransferDetails;
