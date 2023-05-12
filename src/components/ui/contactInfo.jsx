

export const ContactInfo = ({icon , title , text, phonetwo}) =>{
    return (
        <div className="w-full flex flex-wrap pb-[42px] items-center">
                         <span className="w-[60px] text-[#222] text-center text-lg">
                         <span
                               value={{className:"text-[25px] text-[#888] w-[35%]"}}
                            >
                           {icon}
                         </span>
                         </span>
                         <div className="w-[calc(100%_-_60px)] pt-[2px]">
                           <span className="font-Poppins text-lg leading-[1.2] text-[#333]">{title}</span>
                           <p className="max-w-[245px] font-Poppins text-[15px] leading-[1.666] text-[#888]">
                             {text}
                           </p>
                           <p className="max-w-[245px] font-Poppins text-[15px] leading-[1.666] text-[#888]">
                             {phonetwo}
                           </p>
                         </div>
        </div>
    )
}