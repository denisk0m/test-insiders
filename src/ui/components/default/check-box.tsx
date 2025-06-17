import React from 'react';
import {ImCheckboxChecked, ImCheckboxUnchecked} from "react-icons/im";

type Props = {
    isSelected: boolean;
}

const CheckBox: React.FC<Props> = ({isSelected}) => {
    return (
        isSelected ?
            <ImCheckboxUnchecked className="h-6 w-6 text-red-400"/>
            :
            <ImCheckboxChecked className="h-6 w-6 text-green-500"/>
    );
};

export default CheckBox;
