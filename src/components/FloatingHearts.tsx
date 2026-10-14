import { Heart, Sparkles, Star, Flower2 } from "lucide-react";
import { motion } from "framer-motion";

const floatingItems = [
  { icon: Heart, top: "8%", left: "10%", size: "w-8 h-8", color: "text-rose-300 fill-rose-300", delay: 0, duration: 4.2 },
  { icon: Sparkles, top: "14%", right: "16%", size: "w-7 h-7", color: "text-amber-300 fill-amber-300", delay: 1, duration: 3.5 },
  { icon: Flower2, top: "34%", left: "8%", size: "w-9 h-9", color: "text-pink-300 fill-pink-300", delay: 1.8, duration: 4.5 },
  { icon: Star, top: "26%", right: "10%", size: "w-6 h-6", color: "text-amber-200 fill-amber-200", delay: 0.5, duration: 3.8 },
  { icon: Heart, bottom: "22%", right: "20%", size: "w-9 h-9", color: "text-red-300 fill-red-300", delay: 1.4, duration: 4.2 },
  { icon: Sparkles, bottom: "16%", left: "14%", size: "w-8 h-8", color: "text-yellow-300 fill-yellow-300", delay: 2.2, duration: 3.6 },
  { icon: Flower2, bottom: "10%", right: "8%", size: "w-10 h-10", color: "text-pink-300 fill-pink-300", delay: 0.8, duration: 4.8 },
  { icon: Star, top: "58%", left: "6%", size: "w-6 h-6", color: "text-amber-300 fill-amber-300", delay: 1.6, duration: 3.9 },
  { icon: Heart, top: "10%", left: "26%", size: "w-14 h-14", color: "text-rose-200 opacity-30 stroke-[2]", delay: 0.2, duration: 5.2 },
  { icon: Sparkles, bottom: "8%", left: "32%", size: "w-10 h-10", color: "text-amber-200 opacity-40", delay: 1.2, duration: 4.4 },
];

const FloatingHearts = () => {
  return (
    <>
      {/* Background gradient blobs */}
      <div className="absolute top-[-120px] right-[-200px] w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle_at_center,hsl(38,60%,90%)_0%,hsl(38,60%,90%)_40%,transparent_70%)] blur-md opacity-90 pointer-events-none" />
      <div className="absolute top-[25%] left-[-210px] w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle_at_center,hsl(10,60%,87%)_0%,hsl(10,60%,87%)_40%,transparent_72%)] blur-md opacity-80 pointer-events-none" />
      <div className="absolute -bottom-40 right-[-200px] w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle_at_center,hsl(260,15%,85%)_0%,hsl(260,15%,85%)_40%,transparent_70%)] blur-sm opacity-90 pointer-events-none" />

      {/* Floating aesthetic elements */}
      {floatingItems.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <motion.div
            key={index}
            className="absolute pointer-events-none"
            style={{
              top: item.top,
              bottom: item.bottom,
              left: item.left,
              right: item.right,
            }}
            animate={{
              y: [0, -12, 0],
              rotate: [0, 6, -6, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              repeatType: "easeInOut",
              delay: item.delay,
              ease: "easeInOut",
            }}
          >
            <IconComponent
              className={`${item.size} ${item.color} opacity-60 drop-shadow-sm`}
              aria-hidden="true"
            />
          </motion.div>
        );
      })}

      {/* Frosted overlay */}
      <div className="absolute inset-0 backdrop-blur-[2px] bg-white/10 pointer-events-none" />
    </>
  );
};

export default FloatingHearts;
