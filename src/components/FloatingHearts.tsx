import { Heart } from "lucide-react";

const FloatingHearts = () => {
  return (
    <>
      {/* Background gradient blobs */}
      <div className="absolute top-[-120px] right-[-200px] w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle_at_center,hsl(38,60%,90%)_0%,hsl(38,60%,90%)_40%,transparent_70%)] blur-md opacity-90" />
      <div className="absolute top-[25%] left-[-210px] w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle_at_center,hsl(10,60%,87%)_0%,hsl(10,60%,87%)_40%,transparent_72%)] blur-md opacity-80" />
      <div className="absolute -bottom-40 right-[-200px] w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle_at_center,hsl(260,15%,85%)_0%,hsl(260,15%,85%)_40%,transparent_70%)] blur-sm opacity-90" />

      {/* Floating hearts */}
      <Heart className="absolute top-[8%] right-[16%] w-10 h-10 -rotate-12 text-purple-300 fill-purple-300 opacity-40" aria-hidden="true" />
      <Heart className="absolute top-[32%] left-[16%] w-7 h-7 rotate-[8deg] text-pink-300 fill-pink-300 opacity-50" aria-hidden="true" />
      <Heart className="absolute bottom-[18%] right-[26%] w-9 h-9 rotate-[5deg] text-red-300 fill-red-300 opacity-50" aria-hidden="true" />
      <Heart className="absolute top-[10%] left-5 w-16 h-16 rotate-[18deg] text-red-300 opacity-50 stroke-[3]" aria-hidden="true" />
      <Heart className="absolute bottom-[8%] right-[-18px] w-20 h-20 -rotate-12 text-red-300 opacity-40 stroke-[3]" aria-hidden="true" />

      {/* Frosted overlay */}
      <div className="absolute inset-0 backdrop-blur-[2px] bg-white/10" />
    </>
  );
};

export default FloatingHearts;
