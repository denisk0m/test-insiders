import React, {useEffect, useRef} from 'react';


interface ownProps {
    isActive: boolean;
    setIsActive: (isActive: boolean) => void;
    children?: React.ReactNode;
}

const duration = 300;


const ModalWindow: React.FC<ownProps> = ({isActive, setIsActive, children}) => {

    const closeWindow = () => setIsActive(false);
    return (
        isActive ? <div
                className={`fixed flex  bg-[rgb(0,0,0,0.5)] justify-center items-center z-10 -inset-x-0 -inset-y-0 transition ease-out duration-300`}
                style={{backdropFilter: 'blur(10px)'}}>
                <div
                    className={`flex flex-col space-between bg-white rounded-xl p-5`}>
                    <div className="flex flex-row justify-end ">
                        <button onClick={closeWindow}
                                className={"text-field-color font-bold pb-3 text-l hover:text-red-500 transition ease-in duration-200"}>╳
                        </button>
                    </div>
                        {children}
                </div>
            </div>
            :
            null)

};

export default ModalWindow;