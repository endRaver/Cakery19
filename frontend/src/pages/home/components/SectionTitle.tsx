import { motion } from "framer-motion";

const SectionTitle = ({ title, description }: { title: string; description: string }) => {
  return (
    <div>
      <motion.h2
        className="text-center text-2xl text-primary-500 sm:text-3xl sm:leading-[46px]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
      >
        {title}
      </motion.h2>

      <motion.p
        className="text-center font-light tracking-wider text-primary-300 sm:text-sm lg:text-lg"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        viewport={{ once: true }}
      >
        {description}
      </motion.p>
    </div>
  );
};

export default SectionTitle;
