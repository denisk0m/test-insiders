import React from 'react';
import {useModal} from "@/ui/components/modal/ModalProvider";

interface ownProps {
    //string that describe action in modal we need confirm or decline
    actionToConfirm: string;
    onConfirm?: () => void;
    onDecline?: () => void;
}

const ConfirmInModal: React.FC<ownProps> = ({actionToConfirm, onConfirm, onDecline}) => {
    const {hideModal} = useModal();
    return (<>
            <p>{actionToConfirm}</p>
            <div className="mt-5 flex justify-self-center flex-row w-full justify-center gap-3">
                <button className={"px-7 py-4 rounded-md bg-green-200 hover:text-green-500/50"} onClick={() => {
                    if (onConfirm) onConfirm();
                    hideModal();
                }}>Yes</button>
                <button className={"px-7 py-4 bg-green-200 hover:text-red-600/50"} name={"Ні"} onClick={() => {
                    if (onDecline) onDecline();
                    hideModal();
                }}>No
                </button>
            </div>
        </>
    )
        ;
};

export default ConfirmInModal;