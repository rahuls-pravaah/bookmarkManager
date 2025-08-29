import React, {useContext} from 'react'
import { BookmarkContext } from '../context/BookmarkContext';

function Modal() {
    const { modalContent, closeModal } = useContext(BookmarkContext);

  if (!modalContent) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-opacity-50 backdrop-blur-xs flex justify-center items-center z-50 transition-all duration-300"
      onClick={closeModal}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="border p-6 md:p-8 rounded-2xl shadow-2xl relative w-11/12 md:max-w-md transform transition-transform duration-300 scale-100"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-black hover:cursor-pointer hover:text-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {
            modalContent
        }
      </div>
    </div>
  )
}

export default Modal;