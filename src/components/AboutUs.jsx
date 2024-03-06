import { features } from "../constants";
import styles, { layout } from "../style";
// import Button from "./Button";

const FeatureCard = ({ icon, title, content, index }) => (
  <div className={`flex flex-row p-6 rounded-[20px] ${index !== features.length - 1 ? "mb-6" : "mb-0"} feature-card`} style={{ backgroundColor: '#6CE17C' }}>
    <div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dim`}>
      <img src={icon} alt="star" className="w-[50%] h-[50%] object-contain golden-image" />
    </div>
    <div className="flex-1 flex flex-col ml-3">
      <h4 className="font-poppins font-semibold text-black text-[18px] leading-[23.4px] mb-1">
        {title}
      </h4>
      <p className="font-poppins font-normal text-black text-[16px] leading-[24px]">
        {content}
      </p>
    </div>
  </div>
);

const AboutUs = () =>  (
  <section id="AboutUs" className={layout.section}>
    <div className={layout.sectionInfo}>
      <h6 className={styles.heading3}>
      At Vaatiika Zone,<br className="sm:block hidden" /> We're passionate about connecting farms directly to restaurants,
       cafes, and retailers, ensuring fresh, quality vegetables make their way from field to table.
      </h6>
      {/* <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        With the right credit card, you can improve your financial life by
        building credit, earning rewards and saving money. But with hundreds
        of credit cards on the market.
      </p> */}

      {/* <Button styles={`mt-10`} /> */}
    </div>

    <div className={`${layout.sectionImg} flex-col`}>
      {features.map((feature, index) => (
        <FeatureCard key={feature.id} {...feature} index={index} />
      ))}
    </div>
  </section>
);

export default AboutUs;