import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

const setFavicon = (emoji: string) => {
  if (typeof document === "undefined") return;
  try {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.font = "48px sans-serif, Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(emoji, 32, 36);

    const pngUrl = canvas.toDataURL("image/png");

    // Remove existing favicon links to bust Chrome & Safari cache
    const existingIcons = document.querySelectorAll("link[rel*='icon']");
    existingIcons.forEach((el) => el.remove());

    const newLink = document.createElement("link");
    newLink.rel = "icon";
    newLink.type = "image/png";
    newLink.href = pngUrl;
    document.head.appendChild(newLink);

    // Also update apple-touch-icon for iOS Safari home screen & bookmarks
    let appleLink = document.querySelector<HTMLLinkElement>("link[rel='apple-touch-icon']");
    if (!appleLink) {
      appleLink = document.createElement("link");
      appleLink.rel = "apple-touch-icon";
      document.head.appendChild(appleLink);
    }
    appleLink.href = pngUrl;
  } catch (err) {
    console.error("Favicon update error:", err);
  }
};

interface Step {
  gif: string;
  title: string;
  message: string;
  buttonText: string;
}

const steps: Step[] = [
  {
    gif: "/gifs/first.gif",
    title: "Hey Madam ji",
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

const noMessages = [
  "No",
  "Wait, really? 🥺",
  "Madam ji please? 🙏",
  "Ek chance toh banta hai! 😅",
  "Can't catch me! 🏃💨",
  "Think again! 🙈",
  "Just click Yes already! 😂",
];

const SorryCard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showForgive, setShowForgive] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [forgiven, setForgiven] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [yesScale, setYesScale] = useState(1);
  const [noIndex, setNoIndex] = useState(0);
  const [couponClaimed, setCouponClaimed] = useState(false);

  const handleContinue = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowForgive(true);
    }
  };

  useEffect(() => {
    const activeTitle = forgiven
      ? "Madam ji is the best! 👑✨"
      : "Special message for Madam ji 🌸";
    const activeEmoji = forgiven ? "👑" : "🌸";
    const awayTitle = "🥺 Hey Madam ji, come back!";
    const awayEmoji = "🥺";

    const setTabState = (away: boolean) => {
      document.title = away ? awayTitle : activeTitle;
      setFavicon(away ? awayEmoji : activeEmoji);
    };

    // Apply current state
    setTabState(document.hidden);

    const handleVisibilityChange = () => {
      setTabState(document.hidden);
    };

    const handleBlur = () => {
      setTabState(true);
    };

    const handleFocus = () => {
      setTabState(false);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, [forgiven]);

  const handleNoHover = useCallback((e?: React.SyntheticEvent) => {
    if (e && "preventDefault" in e) {
      e.preventDefault();
    }
    const isMobile = typeof window !== "undefined" && window.innerWidth < 480;
    const maxOffset = isMobile ? 55 : 100;
    const x = Math.random() * (maxOffset * 2) - maxOffset;
    const y = Math.random() * (maxOffset * 1.5) - (maxOffset * 0.75);
    setNoPos({ x, y });
    const maxScale = isMobile ? 1.45 : 2;
    setYesScale((prev) => Math.min(prev + 0.12, maxScale));
    setNoIndex((prev) => (prev + 1) % noMessages.length);
  }, []);

  const handleYes = () => {
    setShowLetter(true);
  };

  return (
    <div className="px-3 sm:px-4 py-4 sm:py-6 w-full flex justify-center">
      <AnimatePresence mode="wait">
        {!showLetter && !forgiven ? (
          <motion.div
            key={showForgive ? "forgive" : `step-${currentStep}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-sorry-card p-5 sm:p-7 rounded-[36px] sm:rounded-[60px] card-shadow min-w-44 w-full max-w-[380px] sm:max-w-[400px] relative flex flex-col items-center gap-3 sm:gap-4"
          >
            {!showForgive ? (
              <>
                {/* GIF display area */}
                <div className="relative h-40 sm:h-44 md:h-52 bg-gradient-to-b from-white/80 to-rose-200 w-full rounded-[30px] sm:rounded-[40px] flex items-end justify-center gif-box-shadow overflow-hidden">
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
                    onClick={handleNoHover}
                    animate={{ x: noPos.x, y: noPos.y }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="bg-muted md:text-lg text-muted-foreground font-semibold px-5 sm:px-6 py-2.5 sm:py-3 btn-shadow rounded-full transition-colors duration-200 whitespace-nowrap touch-manipulation select-none"
                  >
                    {noMessages[noIndex]}
                  </motion.button>
                </div>
              </>
            )}
          </motion.div>
        ) : showLetter && !forgiven ? (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-sorry-card p-5 sm:p-7 rounded-[36px] sm:rounded-[60px] card-shadow min-w-44 w-full max-w-[380px] sm:max-w-[400px] relative flex flex-col items-center gap-3 sm:gap-4"
          >
            <div className="relative h-40 sm:h-44 md:h-52 bg-gradient-to-b from-white/80 to-rose-200 w-full rounded-[30px] sm:rounded-[40px] flex items-end justify-center gif-box-shadow overflow-hidden">
              <Heart className="absolute top-[18%] left-[26%] w-9 h-9 -rotate-[16deg] text-red-300 fill-red-300 opacity-50" aria-hidden="true" />
              <Heart className="absolute top-[18%] right-[26%] w-9 h-9 rotate-[16deg] text-red-300 fill-red-300 opacity-50" aria-hidden="true" />
              <img loading="lazy" src="/gifs/flower.gif" alt="flower" className="absolute w-28 -left-8 bottom-2 opacity-60" />
              <img loading="lazy" src="/gifs/flower.gif" alt="flower" className="absolute w-28 right-12 bottom-2 opacity-60" />
              <img loading="lazy" src="/gifs/second.gif" className="h-28 md:h-32 drop-shadow-xl relative z-10" alt="cute character" />
            </div>

            <div className="flex flex-col items-center gap-2">
              <h2 className="text-3xl md:text-4xl text-sorry-btn-foreground font-dancing font-semibold">
                My Apology Letter
              </h2>
              <div className="text-center text-foreground text-sm md:text-base leading-relaxed max-h-36 md:max-h-44 overflow-y-auto px-2">
                <p className="mb-2">Dear Madam ji,</p>
                <p className="mb-2">
                  I know words alone can't undo what happened, but I want you to know how truly sorry I am. You deserve so much better, and I regret every moment that I made you feel less than the amazing person you are.
                </p>
                <p className="mb-2">
                  You are the most important person in my life, and I never want to lose you. I promise to do better, to listen more, and to always put your feelings first.
                </p>
                <p>Always here for you, someone who truly values your friendship ✨</p>
              </div>
            </div>

            <button
              onClick={() => setForgiven(true)}
              className="bg-sorry-btn md:text-lg text-sorry-btn-foreground font-semibold px-8 py-3 btn-shadow rounded-full hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2"
            >
              You're the best! ✨ <Heart className="w-[18px] h-[18px] fill-sorry-btn-foreground" />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="forgiven"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-sorry-card p-5 sm:p-7 rounded-[36px] sm:rounded-[60px] card-shadow min-w-44 w-full max-w-[380px] sm:max-w-[400px] relative flex flex-col items-center gap-3 sm:gap-4"
          >
            <div className="relative h-40 sm:h-44 md:h-52 bg-gradient-to-b from-white/80 to-rose-200 w-full rounded-[30px] sm:rounded-[40px] flex items-end justify-center gif-box-shadow overflow-hidden">
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
                Big sigh of relief! 😮‍💨 Thank you Madam ji, promise I’ll always treat our friendship with care! 🌸
              </p>
            </div>

            {/* Madam ji Treat Pass */}
            <div className="w-full my-1">
              {!couponClaimed ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCouponClaimed(true)}
                  className="w-full bg-gradient-to-r from-amber-50 via-rose-50 to-pink-50 border-2 border-dashed border-rose-300/80 rounded-2xl p-3 shadow-sm hover:shadow-md transition-all text-left flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl animate-bounce">🎟️</span>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500 bg-rose-100/70 px-2 py-0.5 rounded-full">
                        Madam Ji Special Pass
                      </span>
                      <p className="text-sm font-semibold text-rose-950 mt-0.5">
                        1 Free Coffee or Ice Cream Treat ☕🍦
                      </p>
                      <p className="text-[11px] text-rose-600/80">Tap to claim from me!</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold bg-rose-200/80 group-hover:bg-rose-300 text-rose-800 px-3 py-1.5 rounded-full shadow-sm transition-colors shrink-0">
                    Claim ✨
                  </span>
                </motion.button>
              ) : (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-full bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-2 border-emerald-300 rounded-2xl p-3 shadow-sm text-center relative overflow-hidden"
                >
                  <div className="flex items-center justify-center gap-1.5 text-emerald-800 font-bold text-sm">
                    <span>🎉</span> Claimed by Madam ji!
                  </div>
                  <p className="text-xs text-emerald-700 mt-1">
                    Redeemable anytime you want. Never expires! ☕🍦✨
                  </p>
                </motion.div>
              )}
            </div>

            <button
              onClick={() => {
                setCurrentStep(0);
                setShowForgive(false);
                setShowLetter(false);
                setForgiven(false);
                setNoPos({ x: 0, y: 0 });
                setYesScale(1);
                setNoIndex(0);
                setCouponClaimed(false);
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
