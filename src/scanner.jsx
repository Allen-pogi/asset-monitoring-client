// src/components/HybridQRScanner.jsx
import React, { useState, useEffect, useRef } from "react";
import { QrReader } from "react-qr-reader";

const HybridQRScanner = () => {
  const [scannedData, setScannedData] = useState(null); // raw scanned QR data
  const [assetDetails, setAssetDetails] = useState(null); // full asset details from DB
  const [useCamera, setUseCamera] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef(null);

  // Focus hardware scanner input on mount
  useEffect(() => {
    if (!useCamera && inputRef.current) {
      inputRef.current.focus();
    }
  }, [useCamera]);

  // Fetch asset details from backend
  const fetchAssetDetails = async (serialNumber, category) => {
    try {
      // Pass category as query parameter, for example
      const res = await fetch(
        `http://localhost:5000/api/asset/get/${serialNumber}?category=${category}`
      );

      if (!res.ok) throw new Error("Failed to fetch asset details");
      const data = await res.json();

      // Ensure category from QR is kept if backend doesn't return it
      setAssetDetails({ ...data, category: data.category || category });
      setShowModal(true);
    } catch (err) {
      console.error("Error fetching asset:", err);
      setAssetDetails({ error: "Asset not found or server error" });
      setShowModal(true);
    }
  };

  // Handle hardware scanner input
  const handleInput = (e) => {
    if (e.key === "Enter") {
      const data = e.target.value.trim();
      e.target.value = ""; // clear input
      if (!data) return;

      try {
        const parsed = JSON.parse(data);
        setScannedData(parsed);
        console.log("QR Parsed (hardware):", parsed);
        fetchAssetDetails(parsed.serialNumber, parsed.category);
      } catch (err) {
        console.error("Invalid QR data (hardware):", err, "Raw input:", data);
        setScannedData({ error: "Invalid QR Code" });
        setAssetDetails(null);
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
        console.log("QR Parsed (camera):", parsed);
        fetchAssetDetails(parsed.serialNumber, parsed.category);
      } catch (err) {
        console.error("Invalid QR data (camera):", err, "Raw input:", text);
        setScannedData({ error: "Invalid QR Code" });
        setAssetDetails(null);
      }
    }
    if (error) console.warn("Camera error:", error);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background-light dark:bg-background-dark p-4">
      <h1 className="text-2xl font-bold text-black dark:text-white mb-4">
        Hybrid QR Scanner
      </h1>

      {/* Toggle camera */}
      <button
        className="mb-4 px-4 py-2 rounded bg-primary text-white hover:bg-primary/90"
        onClick={() => setUseCamera(!useCamera)}
      >
        {useCamera ? "Use Hardware Scanner" : "Use Camera"}
      </button>

      {/* Camera Scanner */}
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

      {/* Hardware Scanner Input */}
      {!useCamera && (
        <input
          ref={inputRef}
          onKeyDown={handleInput}
          className="border border-slate-300 dark:border-slate-600 rounded p-2 mb-4 w-0 h-0 opacity-0"
          autoFocus
        />
      )}

      {/* Modal for asset details */}
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
                {/* <li>
                  <strong>Status:</strong> {assetDetails.status}
                </li> */}
                {/* Add any other fields you have */}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HybridQRScanner;
