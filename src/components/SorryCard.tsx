import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

interface Step {
  gif: string;
  title: string;
  message: string;
  buttonText: string;
}

const steps: Step[] = [
  {
    gif: "/gifs/first.gif",
    title: "Hey Cutiepie",
    message: "Can we talk for a moment? There's something important I want to tell you.",
    buttonText: "Continue",
  },
  {
    gif: "/gifs/second.gif",
    title: "I'm Sorry",
    message: "I know I messed up, and I feel really bad about it. You mean the world to me.",
    buttonText: "Next",
  },
];

const SorryCard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showForgive, setShowForgive] = useState(false);
  const [forgiven, setForgiven] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [yesScale, setYesScale] = useState(1);

  const handleContinue = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowForgive(true);
    }
  };

  const handleNoHover = useCallback(() => {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    setNoPos({ x, y });
    setYesScale((prev) => Math.min(prev + 0.15, 2));
  }, []);

  const handleYes = () => {
    setForgiven(true);
  };

  return (
    <div className="px-4 py-6 w-full flex justify-center">
      <AnimatePresence mode="wait">
        {!forgiven ? (
          <motion.div
            key={showForgive ? "forgive" : `step-${currentStep}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-sorry-card p-7 rounded-[60px] card-shadow min-w-48 w-full max-w-[400px] relative flex flex-col items-center gap-4"
          >
            {!showForgive ? (
              <>
                {/* GIF display area */}
                <div className="relative h-44 md:h-52 bg-gradient-to-b from-white/80 to-rose-200 w-full rounded-[40px] flex items-end justify-center gif-box-shadow overflow-hidden">
                  <Heart className="absolute top-[18%] left-[26%] w-9 h-9 -rotate-[16deg] text-red-300 fill-red-300 opacity-50" aria-hidden="true" />
                  <Heart className="absolute top-[18%] right-[26%] w-9 h-9 rotate-[16deg] text-red-300 fill-red-300 opacity-50" aria-hidden="true" />
                  <img
                    loading="lazy"
                    src="/gifs/flower.gif"
                    alt="flower"
                    className="absolute w-28 -left-8 bottom-2 opacity-60"
                  />
                  <img
                    loading="lazy"
                    src="/gifs/flower.gif"
                    alt="flower"
                    className="absolute w-28 right-12 bottom-2 opacity-60"
                  />
                  <img
                    loading="lazy"
                    src={steps[currentStep].gif}
                    className="h-28 md:h-32 drop-shadow-xl relative z-10"
                    alt="cute character"
                  />
                </div>

                {/* Text content */}
                <div className="flex flex-col items-center gap-1 md:gap-2">
                  <h2 className="text-4xl md:text-5xl text-sorry-btn-foreground font-dancing font-semibold">
                    {steps[currentStep].title}
                  </h2>
                  <p className="text-center text-foreground md:text-lg leading-normal max-h-24 md:max-h-28 overflow-y-auto">
                    {steps[currentStep].message}
                  </p>
                </div>

                {/* Continue button */}
                <button
                  onClick={handleContinue}
                  className="bg-sorry-btn md:text-lg text-sorry-btn-foreground font-semibold px-8 py-3 btn-shadow rounded-full hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2"
                >
                  {steps[currentStep].buttonText}{" "}
                  <Heart className="w-[18px] h-[18px] fill-sorry-btn-foreground" />
                </button>
              </>
            ) : (
              <>
                {/* Forgive me step */}
                <div className="relative h-44 md:h-52 bg-gradient-to-b from-white/80 to-rose-200 w-full rounded-[40px] flex items-end justify-center gif-box-shadow overflow-hidden">
                  <Heart className="absolute top-[18%] left-[26%] w-9 h-9 -rotate-[16deg] text-red-300 fill-red-300 opacity-50" aria-hidden="true" />
                  <Heart className="absolute top-[18%] right-[26%] w-9 h-9 rotate-[16deg] text-red-300 fill-red-300 opacity-50" aria-hidden="true" />
                  <img
                    loading="lazy"
                    src="/gifs/flower.gif"
                    alt="flower"
                    className="absolute w-28 -left-8 bottom-2 opacity-60"
                  />
                  <img
                    loading="lazy"
                    src="/gifs/flower.gif"
                    alt="flower"
                    className="absolute w-28 right-12 bottom-2 opacity-60"
                  />
                  <img
                    loading="lazy"
                    src="/gifs/first.gif"
                    className="h-28 md:h-32 drop-shadow-xl relative z-10"
                    alt="cute character"
                  />
                </div>

                <div className="flex flex-col items-center gap-1 md:gap-2">
                  <h2 className="text-4xl md:text-5xl text-sorry-btn-foreground font-dancing font-semibold">
                    Forgive Me?
                  </h2>
                  <p className="text-center text-foreground md:text-lg leading-normal">
                    I promise I'll make it up to you. Will you forgive me?
                  </p>
                </div>

                <div className="flex items-center gap-4 relative min-h-[60px]">
                  <motion.button
                    onClick={handleYes}
                    animate={{ scale: yesScale }}
                    className="bg-sorry-btn md:text-lg text-sorry-btn-foreground font-semibold px-8 py-3 btn-shadow rounded-full hover:scale-105 active:scale-95 transition-colors duration-200 flex items-center gap-2"
                  >
                    Yes <Heart className="w-[18px] h-[18px] fill-sorry-btn-foreground" />
                  </motion.button>

                  <motion.button
                    onMouseEnter={handleNoHover}
                    onTouchStart={handleNoHover}
                    animate={{ x: noPos.x, y: noPos.y }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="bg-muted md:text-lg text-muted-foreground font-semibold px-8 py-3 btn-shadow rounded-full transition-colors duration-200"
                  >
                    No
                  </motion.button>
                </div>
              </>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="forgiven"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-sorry-card p-7 rounded-[60px] card-shadow min-w-48 w-full max-w-[400px] relative flex flex-col items-center gap-4"
          >
            <div className="relative h-44 md:h-52 bg-gradient-to-b from-white/80 to-rose-200 w-full rounded-[40px] flex items-end justify-center gif-box-shadow overflow-hidden">
              <Heart className="absolute top-[18%] left-[26%] w-9 h-9 -rotate-[16deg] text-red-300 fill-red-300 opacity-50" aria-hidden="true" />
              <Heart className="absolute top-[18%] right-[26%] w-9 h-9 rotate-[16deg] text-red-300 fill-red-300 opacity-50" aria-hidden="true" />
              <img
                loading="lazy"
                src="/gifs/flower.gif"
                alt="flower"
                className="absolute w-28 -left-8 bottom-2 opacity-60"
              />
              <img
                loading="lazy"
                src="/gifs/flower.gif"
                alt="flower"
                className="absolute w-28 right-12 bottom-2 opacity-60"
              />
              <img
                loading="lazy"
                src="/gifs/second.gif"
                className="h-28 md:h-32 drop-shadow-xl relative z-10"
                alt="happy character"
              />
            </div>

            <div className="flex flex-col items-center gap-1 md:gap-2">
              <h2 className="text-4xl md:text-5xl text-sorry-btn-foreground font-dancing font-semibold">
                Yay! Thank You!
              </h2>
              <p className="text-center text-foreground md:text-lg leading-normal">
                You just made me the happiest person ever! I love you so much! 💕
              </p>
            </div>

            <button
              onClick={() => {
                setCurrentStep(0);
                setShowForgive(false);
                setForgiven(false);
                setNoPos({ x: 0, y: 0 });
                setYesScale(1);
              }}
              className="bg-sorry-btn md:text-lg text-sorry-btn-foreground font-semibold px-8 py-3 btn-shadow rounded-full hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2"
            >
              Restart <Heart className="w-[18px] h-[18px] fill-sorry-btn-foreground" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SorryCard;
