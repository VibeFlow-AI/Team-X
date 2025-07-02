"use client";

import { motion, useAnimationControls, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const StudentBenefits = () => {
  const benefits = [
    {
      title: "Personalized Learning",
      description:
        "We tailor the mentorship experience to fit each student's unique goals, learning style, and pace making every session impactful.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    },
    {
      title: "Real Mentors, Real Guidance",
      description: "Connect with industry professionals who provide authentic mentorship based on real-world experience.",
      image:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    },
    {
      title: "Growth & Career Readiness",
      description: "Develop skills and confidence needed to excel in your academic journey and future career path.",
      image:
        "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      title: "Insights-Driven Support",
      description: "Receive data-backed guidance and track your progress through comprehensive analytics and feedback.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const controls = useAnimationControls();
  const x = useMotionValue(0);

  // Create triple array for seamless infinite scroll
  const allBenefits = [...benefits, ...benefits, ...benefits];

  // Animation control
  useEffect(() => {
    const animateMarquee = () => {
      if (!isPaused) {
        const containerWidth = containerRef.current?.scrollWidth || 0;
        controls.start({
          x: -containerWidth / 3,
          transition: {
            duration: 40,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          },
        });
      } else {
        controls.stop();
      }
    };

    animateMarquee();

    return () => {
      controls.stop();
    };
  }, [isPaused, controls, benefits.length]);

  const Card = ({ benefit, index }: { benefit: { title: string; description: string; image: string }; index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const cardWidth = 300 + 16 * 2; // width + mx-4 * 2
    const oneSetWidth = benefits.length * cardWidth;

    // Calculate the point where the card should be fully enlarged.
    // This is when the card is at the beginning of the visible area.
    const featurePoint = -index * cardWidth;

    // Define the input range for the transform based on the feature point.
    // The card will start enlarging before it reaches the feature point and
    // start shrinking after it passes it.
    const inputRange = [featurePoint - oneSetWidth, featurePoint, featurePoint + oneSetWidth];

    // We create a seamless wrap-around effect by transforming the looping x value
    // into a continuous value for the purpose of this card's animation.
    const continuousX = useTransform(x, (latestX) => {
      const loopedX = (latestX % oneSetWidth) - oneSetWidth;
      return loopedX;
    });

    const width = useTransform(continuousX, [featurePoint - cardWidth, featurePoint, featurePoint + cardWidth], [300, 400, 300], {
      clamp: true,
    });
    const scale = useTransform(continuousX, [featurePoint - cardWidth, featurePoint, featurePoint + cardWidth], [1, 1.05, 1], {
      clamp: true,
    });

    return (
      <motion.div
        ref={cardRef}
        className="flex-shrink-0 mx-4 bg-white rounded-lg overflow-hidden shadow-md"
        style={{ width }}
        animate={{ scale: 1 }}
        whileHover={{
          scale: 1.08,
          transition: { duration: 0.3 },
        }}
      >
        <div className="h-48 overflow-hidden">
          <img src={benefit.image} alt={benefit.title} className="w-full h-full object-cover" />
        </div>
        <div className="p-6">
          <h3 className="font-bold text-xl mb-2">{benefit.title}</h3>
          <p className="text-gray-700">{benefit.description}</p>
        </div>
      </motion.div>
    );
  };

  return (
    <section className="w-full py-16 px-6 md:px-12 lg:px-16 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">What's in it for Students?</h2>
        <p className="text-lg md:text-xl">
          EduVibe is a student-mentor platform designed to personalize learning journeys. It connects students with mentors who
          offer guidance, support, and practical industry insights.
        </p>
      </div>
      <div className="relative overflow-hidden">
        <motion.div
          ref={containerRef}
          className="flex"
          style={{ x }}
          animate={controls}
          onHoverStart={() => setIsPaused(true)}
          onHoverEnd={() => setIsPaused(false)}
        >
          {allBenefits.map((benefit, index) => (
            <Card key={`card-${index}`} benefit={benefit} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
export default StudentBenefits;
