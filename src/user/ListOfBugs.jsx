import React, { useState } from "react";
import BugReport from "./BugReport";

function ListOfBugs() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isBugReportOpen, setIsBugReportOpen] = useState(false);

  const bugs = [
    {
      id: 1,
      title: "Login page crash",
      description: "App crashes when clicking login without password.",
      image: "https://cdn.dnaindia.com/sites/default/files/2020/06/13/909277-ima-pop.jpg?im=FitAndFill=(1200,900)",
    },
    {
      id: 2,
      title: "UI alignment issue",
      description: "Button alignment breaks on mobile view.",
      image: "https://via.placeholder.com/600x400.png?text=UI+Bug",
    },
  ];

  const handleBugReportModalOpen = () => {
    setIsBugReportOpen(true);
  }
  return (
    <div className="flex flex-col gap-4">
        <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4 text-left">🐞 List of Reported Bugs</h2>
        <button className="text-white bg-blue-600 border rounded-md p-2 hover:bg-blue-600 hover:cursor-pointer shadow-xl" onClick={handleBugReportModalOpen} >Create Bug</button>
        </div>
      {bugs.map((bug) => (
        <div
          key={bug.id}
          className="flex justify-between items-start border border-gray-300 p-4 rounded-lg mb-4"
        >
          {/* Left: Title + Description */}
          <div className="flex flex-col text-left max-w-lg">
            <h3 className="font-semibold">{bug.title}</h3>
            <p className="text-sm text-gray-600">{bug.description}</p>
          </div>

          {/* Right: Image + Actions */}
          <div className="flex items-center gap-3">
            <img
              src={bug.image}
              alt="bug"
              onClick={() => setSelectedImage(bug.image)}
              className="w-20 h-14 object-cover cursor-pointer rounded"
            />

            <div className="flex flex-col gap-1">
              <button className="text-xs bg-blue-500 text-white px-2 py-1 rounded">
                Edit
              </button>
              <button className="text-xs bg-red-500 text-white px-2 py-1 rounded">
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Full Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="relative">
            <img
              src={selectedImage}
              alt="full"
              className="max-w-[90vw] max-h-[80vh] rounded"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 bg-white px-4 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
        {isBugReportOpen && <BugReport isOpen={isBugReportOpen} onClose={() => setIsBugReportOpen(false)} />}
    </div>
  );
}

export default ListOfBugs;
