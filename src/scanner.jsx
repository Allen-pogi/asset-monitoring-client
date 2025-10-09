// src/components/HybridQRScanner.jsx
import React, { useState, useEffect, useRef } from "react";
import { QrReader } from "react-qr-reader";

const HybridQRScanner = () => {
  const [scannedData, setScannedData] = useState(null);
  const [assetDetails, setAssetDetails] = useState(null);
  const [editableStatus, setEditableStatus] = useState("");
  const [useCamera, setUseCamera] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef(null);

  // Auto-focus hardware scanner input
  useEffect(() => {
    if (!useCamera && inputRef.current) inputRef.current.focus();
  }, [useCamera, scannedData]);

  // Fetch asset details
  const fetchAssetDetails = async (serialNumber, category) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/asset/get/${serialNumber}?category=${category}`
      );
      if (!res.ok) throw new Error("Asset not found");

      const data = await res.json();
      setAssetDetails(data);
      setEditableStatus(data.status || "Good Condition");
      setShowModal(true);
    } catch (err) {
      console.error(err);
      setAssetDetails({ error: "Asset not found or server error" });
      setShowModal(true);
    }
  };

  // Update status
  const updateStatus = async () => {
    if (!assetDetails) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/asset/update/${assetDetails.serialNumber}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: editableStatus }),
        }
      );
      if (!res.ok) throw new Error("Failed to update status");

      setAssetDetails((prev) => ({ ...prev, status: editableStatus }));
      setShowModal(false); // close modal
      setScannedData(null); // ready for next scan
      if (!useCamera && inputRef.current) inputRef.current.focus();
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  // Handle hardware scanner input
  const handleInput = (e) => {
    if (e.key === "Enter") {
      const data = e.target.value.trim();
      e.target.value = "";
      if (!data) return;

      try {
        const parsed = JSON.parse(data);
        setScannedData(parsed);
        fetchAssetDetails(parsed.serialNumber, parsed.category);
      } catch (err) {
        console.error("Invalid QR data:", err);
        setAssetDetails({ error: "Invalid QR Code" });
        setShowModal(true);
      }
    }
  };

  // Handle camera scan
  const handleCameraScan = (result, error) => {
    if (!!result) {
      const text = result?.text || result;
      try {
        const parsed = JSON.parse(text);
        setScannedData(parsed);
        fetchAssetDetails(parsed.serialNumber, parsed.category);
      } catch (err) {
        console.error("Invalid QR data (camera):", err);
        setAssetDetails({ error: "Invalid QR Code" });
        setShowModal(true);
      }
    }
    if (error) console.warn("Camera error:", error);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background-light dark:bg-background-dark p-4">
      <h1 className="text-2xl font-bold text-black dark:text-white mb-4">
        Hybrid QR Scanner
      </h1>

      <button
        className="mb-4 px-4 py-2 rounded bg-primary text-white hover:bg-primary/90"
        onClick={() => setUseCamera(!useCamera)}
      >
        {useCamera ? "Use Hardware Scanner" : "Use Camera"}
      </button>

      {useCamera && (
        <div className="w-full max-w-sm">
          <QrReader
            onResult={handleCameraScan}
            constraints={{ facingMode: "environment" }}
            containerStyle={{ width: "100%" }}
            videoStyle={{ width: "100%" }}
          />
        </div>
      )}

      {!useCamera && (
        <input
          ref={inputRef}
          onKeyDown={handleInput}
          className="border border-slate-300 dark:border-slate-600 rounded p-2 mb-4 w-0 h-0 opacity-0"
          autoFocus
        />
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-white"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
              {assetDetails?.error ? "Error" : "Asset Details"}
            </h2>

            {assetDetails?.error ? (
              <p className="text-red-500">{assetDetails.error}</p>
            ) : (
              <ul className="space-y-2 text-black dark:text-white text-sm">
                <li>
                  <strong>Serial Number:</strong> {assetDetails.serialNumber}
                </li>
                <li>
                  <strong>Asset Name:</strong> {assetDetails.assetName}
                </li>
                <li>
                  <strong>Category:</strong> {assetDetails.category}
                </li>
                <li>
                  <strong>Issued to:</strong> {assetDetails.issuedTo}
                </li>
                <li>
                  <strong>Description:</strong> {assetDetails.description}
                </li>
                <li>
                  <strong>Purchase Date:</strong> {assetDetails.purchaseDate}
                </li>
                <li>
                  <strong>Issued Date:</strong> {assetDetails.issuedDate}
                </li>
                <li>
                  <strong>Status:</strong>
                  <select
                    value={editableStatus}
                    onChange={(e) => setEditableStatus(e.target.value)}
                    className="ml-2 px-2 py-1 border rounded bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white border-slate-300 dark:border-slate-600"
                  >
                    <option value="Good Condition">Good Condition</option>
                    <option value="Under Maintenance">Under Maintenance</option>
                    <option value="For Disposal">For Disposal</option>
                  </select>
                </li>
              </ul>
            )}

            {!assetDetails?.error && (
              <div className="mt-4 flex justify-end">
                <button
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
                  onClick={updateStatus}
                >
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HybridQRScanner;
