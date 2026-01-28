import React, { useRef, useState } from "react";

function BugReport({ isOpen, onClose }) {
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  if (!isOpen) return null;

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const handlePaste = (e) => {
    for (let item of e.clipboardData.items) {
      if (item.type.startsWith("image/")) {
        handleFile(item.getAsFile());
      }
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    removeImage();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onPaste={handlePaste}
        className="bg-white w-full max-w-md rounded-lg p-6 relative"
      >
        <h2 className="text-xl font-bold mb-4">🐞 Create Bug</h2>

        <input
          type="text"
          placeholder="Bug title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />

        <textarea
          placeholder="Describe the bug..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full border p-2 rounded mb-3"
        />

        <div
          onClick={() => fileInputRef.current.click()}
          className="border border-dashed p-4 text-center cursor-pointer rounded mb-3"
        >
          📸 Drag / Paste / Click to upload
          <input
            type="file"
            accept="image/*"
            hidden
            ref={fileInputRef}
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </div>

        {preview && (
          <div className="relative mb-3">
            <img src={preview} alt="preview" className="rounded w-full" />
            <button
              onClick={removeImage}
              className="absolute top-2 right-2 bg-red-600 text-white w-7 h-7 rounded-full"
            >
              ✕
            </button>
          </div>
        )}

        <div className="flex gap-3">
          <button className="flex-1 bg-green-600 text-white py-2 rounded">
            Submit
          </button>
          <button
            onClick={handleCancel}
            className="flex-1 bg-gray-300 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default BugReport;
