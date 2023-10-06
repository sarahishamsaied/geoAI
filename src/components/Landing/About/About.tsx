import React, { useEffect, useState } from "react";
import style from "./about.module.css";
import Card from "../../card/Card";
import * as BiIcons from "react-icons/bi";
import * as GiIcons from "react-icons/gi";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

type Props = {};

const About = (props: Props) => {
  const { ref, inView } = useInView();
  const controls = useAnimation();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1 });
    }
  }, [controls, inView]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      id="about"
      ref={ref}
      className={`${style.about} flex flex-col justify-start gap-28 p-11`}
      initial={{ opacity: 0 }}
      animate={controls}
    >
      <h1 className="text-5xl font-bold text-white">About the Challenge</h1>
      <p className="text-xl w-[80%]">
        Our challenge is to leverage existing geospatial foundation models to
        develop fine-tuned models that can support disaster recovery operations
        or real-time environmental monitoring, with the aim of improving the
        effectiveness and efficiencies of these critical operations.
      </p>
      <h1 className="font-bold text-5xl">What we provide.</h1>
      <div className="flex justify-start flex-wrap items-center gap-5">
        <motion.div
          className="card"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
        >
          <Card
            left={30}
            top={99 - scrollY / 2} // Adjust the scroll effect as needed
            height={400}
            heading="Visualize Sentinel-2 and Landsat satellites"
            description="Our feature provides users with the flexibility to visualize Earth's landscapes with custom band IDs, including NIR, R, G, B, SWIR, and SWIR2. This customization enhances the ability to extract valuable insights and perform specific analyses tailored to individual needs."
            icon={<GiIcons.GiSatelliteCommunication className="text-3xl" />}
          />
        </motion.div>
        <motion.div
          className="card"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
        >
          <Card
            left={30}
            top={99 - scrollY / 2}
            height={400}
            heading="Unveiling the Third Dimension: 3D Scene Exploration"
            description="Explore geospatial data in stunning 3D landscapes with our interactive feature. Delve into dynamic cityscapes, natural environments, and architectural structures to uncover new perspectives and insights."
            icon={<BiIcons.BiCube className="text-3xl" />}
          />
        </motion.div>
        <motion.div
          className="card"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
        >
          <Card
            left={30}
            top={99 - scrollY / 2}
            height={400}
            heading="Geospatial Intelligence Hub"
            description="Our Geospatial Intelligence Hub delivers a wealth of valuable predictions and analysis results. Explore comprehensive geospatial insights, including land cover classifications, change detection, object identification like burn scars, causality assessments, and similarity search findings, all designed to empower informed decision-making and resource management."
            icon={<BiIcons.BiBrain className="text-3xl" />}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;
