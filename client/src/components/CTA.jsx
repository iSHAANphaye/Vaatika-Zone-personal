import styles from "../style";
import Button from "./Button";
import {Link} from "react-router-dom";

const CTA = () => (
  <section id="Contact" className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}>
    <div className="flex-1 flex flex-col">
      <h2 className={styles.heading2}>Let’s try our service now!</h2>
      <p className={`${styles.paragraph1} max-w-[470px] mt-5`}>
        Everything you need, to access to the freshest, most nutritious vegetables, sourced directly from local farms, 
        fostering healthier communities and a stronger agricultural economy.
      </p>
    </div>

    <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
      
      <Link className='text-blue-500 hover:underline' to='/signuppage'><Button /></Link>
    </div>
  </section>
);

export default CTA;