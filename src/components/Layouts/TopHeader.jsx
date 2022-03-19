import Link from "next/link";
import { useEffect,useState } from "react";
import { IconContext } from "react-icons";
import {BsInstagram , BsTwitter , BsFacebook , BsYoutube} from "react-icons/bs";
import {FaTiktok} from "react-icons/fa";
import { useSelector } from "react-redux";

const TopHeader = () => {
  const { facebook , instagram , tiktok ,  top_text } = useSelector((state)=>state.administrable);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
  };

  useEffect(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, []);

  return (
    <div className="bg-white-dg py-3 hidden lg:block 2xl:block relative z-20 w-full">
      <div className="w-full mr-auto ml-auto ">
          <div className="grid grid-cols-3">
          <div className="flex justify-start mx-24 divide-x">
            <Link href={facebook} className="mx-3 text-sm">
            <IconContext.Provider value={{size:"1.1rem", className:"hover:text-[#3b5998] text-[#888] mr-3 cursor-pointer"}}>
              <BsFacebook/>
            </IconContext.Provider>
            </Link>
            <Link href={instagram} className="mx-3 text-sm">
            <IconContext.Provider value={{size:"1.1rem"  , className:"hover:text-[#E1306C] text-[#888] mr-3 cursor-pointer"}}>
              <BsInstagram/>
            </IconContext.Provider>
            </Link>
            <Link href="/" className="mx-3 text-sm">
            <IconContext.Provider value={{size:"1.1rem" , className:"hover:text-[#000000] text-[#888] mr-3 cursor-pointer"}}>
                <FaTiktok/>
            </IconContext.Provider>
            </Link>        
          </div>
          <div className="flex justify-center">
              <p className="text-[#888] font-Poppins">{top_text}</p>
          </div>
          <div className="flex justify-end mx-24">
            <Link href="/">
                <span  className="mx-3 text-sm text-[#888] font-Poppins">Blog</span>
            </Link>
            <Link href="/">
                <span className="mx-3 text-sm text-[#888] font-Poppins">Lenguage</span>
            </Link>
          </div>
          </div>
      </div>
    </div>
  );
};

export default TopHeader;
