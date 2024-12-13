import { useState, useEffect, useRef } from 'react';

const CodeOfConduct = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleOpenModal = () => {
    dialogRef.current?.showModal();
  };

  const handleCloseModal = () => {
    dialogRef.current?.close();
  };

  return (
    <>
      <div className="mb-4 p-6 rounded-lg border-2 border-gray-300 hover:border-[#0CFFBB] transition duration-300 ease-in-out lg:col-span-2">
        <p className="text-base">
          Code of Conduct and Terms and Conditions - By submitting this form, you agree to abide by our{' '}
          <button
            onClick={handleOpenModal}
            className="text-blue-600 cursor-pointer underline hover:text-blue-800"
            aria-haspopup="dialog"
          >
            Code of Conduct
          </button>
        </p>
      </div>


      <dialog
        ref={dialogRef}
        className="p-0 rounded-lg backdrop:bg-black backdrop:bg-opacity-50"
        aria-labelledby="modal-title"
      >
        <div className="p-6">
          <form method="dialog">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Close modal"
            >
              ✕
            </button>
          </form>
          <div className="flex flex-col items-center">
            <h3 id="modal-title" className="text-lg font-semibold mb-4 text-center">Our Code of Conduct</h3>
            <img 
              src="./resources/Logo/fred.svg" 
              alt="Plastal-Bot Builders Logo"
              className="h-24 w-24 md:h-36 md:w-36 lg:h-36 lg:w-36 xl:h-48 xl:w24 2xl:h-32 2xl:w-32 mx-auto mb-4" 
            />
          </div>
          <div>
            <p className="mb-4">
              We are committed to providing a welcoming and inclusive environment for everyone. All participants in our community must adhere to the following code of conduct:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Be respectful and inclusive of all participants</li>
              <li>Exercise consideration and empathy in your speech and actions</li>
              <li>Refrain from demeaning, discriminatory, or harassing behavior</li>
              <li>Alert community leaders if you notice violations of this code of conduct</li>
              <li>Participate in an authentic and active way</li>
            </ul>
            <p className="mt-4">
              Failure to comply with these guidelines may result in temporary or permanent exclusion from community participation.
            </p>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default CodeOfConduct;