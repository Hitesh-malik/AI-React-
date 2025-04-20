// src/components/auth/TestimonialSlide.tsx
import { motion } from 'framer-motion';

interface TestimonialSlideProps {
  testimonial: {
    quote: string;
    author: string;
    title: string;
  };
}

const TestimonialSlide: React.FC<TestimonialSlideProps> = ({ testimonial }) => {
  const testimonialVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="relative">
      <motion.div
        className="mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <span className="text-5xl text-white">"</span>
      </motion.div>

      <div className="min-h-[180px] relative">
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={testimonialVariants}
          className="absolute inset-0"
        >
          <p className="text-white text-lg mb-6 leading-relaxed">
            {testimonial.quote}
          </p>

          <div>
            <p className="text-white font-semibold">
              {testimonial.author}
            </p>
            <p className="text-white text-opacity-70">
              {testimonial.title}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TestimonialSlide;