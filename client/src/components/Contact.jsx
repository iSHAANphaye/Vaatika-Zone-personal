import styles from "../style";
import { logo1, instagramIcon } from "../assets";
import { HiOutlineMail, HiPhone, HiLocationMarker } from "react-icons/hi";


const Contact = () => (
  <section className={`${styles.flexCenter} ${styles.paddingY} flex-col`}>
    <div className={`${styles.flexStart} md:flex-row flex-col mb-8 w-full`}>
      <div className="flex-[1] flex flex-col justify-start mr-10">
        <img
          src={logo1}
          alt="Vaatiika Zone"
          className="w-[370px] h-[270px] object-contain"
        />
        <p className={`${styles.paragraph} mt-4 max-w-[312px]`}>
          Your unparalleled access to the finest produce.
        </p>

      {/* </div>
      <div className="flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10">
        {footerLinks.map((footerlink) => (
          <div key={footerlink.title} className={`flex flex-col ss:my-0 my-4 min-w-[150px]`}>
            <h4 className="font-poppins font-medium text-[18px] leading-[27px] text-white">
              {footerlink.title}
            </h4>
            <ul className="list-none mt-4">
              {footerlink.links.map((link, index) => (
                <li
                  key={link.name}
                  className={`font-poppins font-normal text-[16px] leading-[24px] text-black hover:text-secondary cursor-pointer ${
                    index !== footerlink.links.length - 1 ? "mb-4" : "mb-0"
                  }`}
                >
                  {link.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div> */}
    </div>

      <div className="flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10">
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center">
            <HiLocationMarker className="w-6 h-6 mr-2 text-black" />
            <p className="font-poppins font-normal text-[18px] leading-[27px] text-black">D.D. Nagar, Raipur, Chhattisgarh, India</p>
          </div>
          <div className="flex items-center mt-4">
            <HiPhone className="w-6 h-6 mr-2 text-black" />
            <p className="font-poppins font-normal text-[18px] leading-[27px] text-black">+916265225582</p>
          </div>
          <div className="flex items-center mt-4">
            <HiOutlineMail className="w-6 h-6 mr-2 text-black" />
            <p className="font-poppins font-normal text-[18px] leading-[27px] text-black">Vaatiikaorg0130@gmail.com</p>
          </div>
          <div className="flex items-center mt-4">
            <a href="https://www.instagram.com/vaatiika_zone?igsh=MWw3YWwwNzFrOTZrbg==" target="_blank" rel="noopener noreferrer" className="flex items-center text-black font-poppins font-normal text-[18px] leading-[27px] hover:text-green">
              <img src={instagramIcon} alt="Instagram" className="w-6 h-6 mr-2" />
              Follow us on Instagram
            </a>
          </div>
        </div>
      </div>
    </div>

    {/* {/* <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
      <div className="flex flex-row md:mt-0 mt-6">
        {socialMedia.map((social, index) => (
          <img
            key={social.id}
            src={social.icon}
            alt={social.id}
            className={`w-[21px] h-[21px] object-contain cursor-pointer ${
              index !== socialMedia.length - 1 ? "mr-6" : "mr-0"
            }`}
            onClick={() => window.open(social.link)}
          />
        ))}
      </div>
    </div> */}
     <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
      <p className="font-poppins font-normal text-center text-[18px] leading-[27px] text-black">
        Copyright Ⓒ 2024 Vaatiika Zone. All Rights Reserved.
      </p>
     </div>
  </section>
);

export default Contact;
