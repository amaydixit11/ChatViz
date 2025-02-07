"use client";
import { useState } from "react";
import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [chatData, setChatData] = useState<any>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("No file selected");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`${BACKEND_URL}/upload/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setChatData(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">WhatsApp Chat Analyzer</h1>
      <input type="file" accept=".txt" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Upload & Analyze
      </button>

      {chatData && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h2 className="text-xl font-bold">Parsed Messages:</h2>
          <ul>
            {chatData.messages.map((msg: any, index: number) => (
              <li key={index} className="mt-2">
                <strong>{msg.sender}:</strong> {msg.message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
