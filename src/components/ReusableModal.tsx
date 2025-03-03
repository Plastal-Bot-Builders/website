import React from 'react';
import { Modal, Button } from 'flowbite-react';
import { FaTimes } from 'react-icons/fa';

interface ReusableModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    content: React.ReactNode;
    actions: React.ReactNode;
    image?: string; // Optional image prop
}

const ReusableModal: React.FC<ReusableModalProps> = ({ isOpen, onClose, title, content, actions, image }) => {
    return (
     <Modal show={isOpen} onClose={onClose} className="flex items-center justify-center p-4 sm:p-8 md:p-16 lg:p-32 xl:p-48 2xl:p-64 backdrop-blur-sm">
            <div className="w-full max-w-4xl mx-auto overflow-y-auto max-h-screen p-4 md:p-5">
                <div className="flex justify-end">
                    <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={onClose}
                        style={{ color: '#0cffbb' }} // Custom color
                    >
                        <FaTimes className="w-3 h-3" />
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <div className="text-center">
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{title}</h3>
                    {image && <img src={image} alt="Modal Image" className="mx-auto mb-4 w-32 h-32 object-cover" />}
                    <div className="flex flex-col items-center justify-center">
                        {content}
                    </div>
                    <div className="mt-4 flex justify-center">
                        {actions}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ReusableModal;