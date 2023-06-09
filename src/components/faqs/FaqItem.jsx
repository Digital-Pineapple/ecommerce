
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const FaqItem = ({ faq }) => {

    return (
        <div>
            <div className="my-5 flex items-center">
                <HelpOutlineIcon 
                    className="text-[25px] text-[#000]"
                />
                <p className="font-bold text-xl px-2" id={`${faq._id}`}>{faq.question}</p>
            </div>
            <p className="pl-10 pb-10">{faq.answer}</p>
            <hr />
        </div>
    )
}

export default FaqItem