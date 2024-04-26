import React from 'react';
import { MdOutlineCancel } from "react-icons/md";
import { useStateContext } from "../../contexts/ContextProvider";

const RightModal = ({ children, afterClose, title }) => {
    const { setRightModal } = useStateContext();
    const closeModal = () => {
        setRightModal(false);
        if (afterClose) afterClose();
    };

    return (
        <div className="bg-half-transparent w-screen h-screen fixed top-0 right-0 flex justify-end" onClick={closeModal}>
            {/* Modal Content */}
            <div className="w-800 bg-white dark:bg-[#484B52] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                {/* Modal Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <button
                        onClick={closeModal}
                        className="rounded-full p-2 text-xl text-gray-400 hover:text-gray-600"
                        aria-label="close"
                    >
                        <MdOutlineCancel />
                    </button>
                </div>
                <div className="p-4 m-2 md:m-10 mt-24 md:p-10 bg-white rounded-3xl">
                    <div className="mx-auto max-w-screen-xl bg-white">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RightModal;
