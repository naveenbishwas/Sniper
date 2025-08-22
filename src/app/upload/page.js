"use client";
import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleUpload = async () => {
    if (!file) return;

    setStatus("Uploading...");

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      setStatus(`Uploaded: ${data.url}`);
    } else {
      setStatus(`Error: ${data.error}`);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Upload to AWS S3</h2>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0])} />
      <button onClick={handleUpload}>Upload</button>
      <p>{status}</p>
    </div>
  );
}
