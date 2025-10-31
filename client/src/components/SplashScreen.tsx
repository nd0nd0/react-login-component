import React from "react";
import { motion } from "framer-motion";

export interface SplashScreenProps {
  onContinue: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onContinue }) => {
  return (
    <motion.div className="max-h-screen overflow-hidden bg-white">
      <motion.div
        className="relative flex flex-col rounded-b-[60px] h-[55vh] bg-linear-to-b from-orange-500 to-orange-600 shadow-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Decorative stars/sparkles */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute w-2 h-2 bg-white rounded-full sparkle top-12 left-8 opacity-80"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          ></motion.div>
          <motion.div
            className="sparkle absolute top-20 left-1/4 w-1.5 h-1.5 bg-white rounded-full opacity-60"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          ></motion.div>
          <motion.div
            className="absolute w-2 h-2 bg-white rounded-full sparkle top-32 right-16 opacity-80"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          ></motion.div>
          <motion.div
            className="absolute w-1 h-1 bg-white rounded-full sparkle top-16 right-1/4 opacity-60"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          ></motion.div>
          <motion.div
            className="sparkle absolute top-40 left-16 w-1.5 h-1.5 bg-white rounded-full opacity-70"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.7 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          ></motion.div>
        </div>

        {/* Decorative clouds */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top left cloud */}
          <motion.div
            className="absolute flex items-center top-8 left-4"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <div className="w-16 h-12 bg-orange-400 rounded-full opacity-60"></div>
            <div className="w-20 h-16 -ml-10 bg-orange-400 rounded-full opacity-60"></div>
            <div className="h-10 -ml-8 bg-orange-400 rounded-full w-14 opacity-60"></div>
          </motion.div>

          {/* Top right cloud */}
          <motion.div
            className="absolute flex items-center top-36 right-3"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <div className="w-20 bg-orange-400 rounded-full h-14 opacity-60"></div>
            <div className="w-24 -ml-12 bg-orange-400 rounded-full h-18 opacity-60"></div>
            <div className="w-16 h-12 -ml-10 bg-orange-400 rounded-full opacity-60"></div>
          </motion.div>

          {/* Bottom left cloud */}
          <motion.div
            className="absolute left-0 flex items-center bottom-1/3"
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            <div className="w-12 h-10 bg-orange-400 rounded-full opacity-50"></div>
            <div className="w-16 h-12 -ml-6 bg-orange-400 rounded-full opacity-50"></div>
          </motion.div>
        </div>

         {/* Illustration area */}
          <motion.div
            className="relative mb-8 md:mb-6"
            initial={{ scale: 0.5, opacity: 0, y: -50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              type: "spring",
              stiffness: 100,
            }}
          >
            {/* Main illustration placeholder - represents the character and panda */}
            <div className="relative flex items-center justify-center w-56 h-56 sm:w-72 sm:h-72">
              {/* Character silhouette/glow */}
              <motion.div
                className="absolute bottom-0 transform -translate-x-1/2 left-1/2"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="w-24 h-40 rounded-full sm:w-32 sm:h-48 bg-linear-to-b from-orange-300 to-orange-400 opacity-40 blur-2xl"></div>
              </motion.div>

              {/* Placeholder for actual character illustration */}
              <div className="relative flex items-end justify-center gap-4">
                {/* Panda placeholder */}
                <motion.div
                  className="flex items-center justify-center w-16 h-20 bg-white rounded-full shadow-lg sm:w-20 sm:h-24 opacity-90"
                  initial={{ x: -50, opacity: 0, rotate: -20 }}
                  animate={{ x: 0, opacity: 0.9, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.6, type: "spring" }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-3xl sm:text-4xl">🐼</div>
                </motion.div>

                {/* Character placeholder */}
                <motion.div
                  className="flex items-center justify-center w-20 bg-white rounded-full shadow-lg h-28 sm:w-24 sm:h-32 opacity-90"
                  initial={{ x: 50, opacity: 0, rotate: 20 }}
                  animate={{ x: 0, opacity: 0.9, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.7, type: "spring" }}
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-4xl sm:text-5xl">👧🏾</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
      </motion.div>
      {/* Bottom white section to complete the card look */}
      <motion.div
        className=" h-[55vh] overflow-hidden sm:block"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        {/* Main content container */}
          <motion.div
            className="w-full max-w-md px-6 py-8 mt-auto text-left md:py-6"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.7,
              delay: 0.5,
              type: "spring",
              stiffness: 80,
            }}
          >
            <motion.h1
              className="mb-3 text-xl font-bold leading-tight text-gray-900 sm:mb-4 md:text-2xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              Earn rewards for
              <br />
              every step you take.
            </motion.h1>

            <motion.p
              className="mb-6 text-sm leading-relaxed text-gray-600 sm:mb-8 sm:text-base"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              More than tracking transform
              <br />
              walking into winning.
            </motion.p>

            {/* Log in button */}
            <motion.button
              onClick={onContinue}
              className="w-full px-6 py-4 font-semibold text-white bg-orange-500 shadow-lg hover:bg-orange-600 rounded-xl hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-orange-500/50"
              initial={{ y: 20, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Log in
            </motion.button>
          </motion.div>
       
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
