import Collapse from '@mui/material/Collapse';
import { useState } from 'react';
import { BsQuestionCircle } from 'react-icons/bs';
import { IconContext } from "react-icons";

const FaqItem = ({ faq }) => {

    return (
        <div>
            <div className="my-10 flex items-center">
                <IconContext.Provider
                    value={{ className: "text-[25px] text-[#888] " }}
                >
                    <BsQuestionCircle />
                </IconContext.Provider>
                <p className="font-bold text-xl px-2" id={`${faq._id}`}>{faq.question}</p>
            </div>
            <div>
                <p className="pl-10 pb-4">{faq.answer}</p>
            </div>
            <hr />
        </div>
    )
}

export default FaqItem