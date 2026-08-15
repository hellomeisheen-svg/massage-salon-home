import habitAsset from "@/assets/habit-quote-background.png.asset.json";

export function HabitQuote() {
  return (
    <section className="bg-[#EFF6FF] py-10 sm:py-20 xl:py-[120px]">
      <div className="container-1900">
        <div className="relative w-full aspect-[2/1] sm:aspect-[21/9] rounded-[16px] sm:rounded-[24px] overflow-hidden flex items-center justify-center text-center px-4 sm:px-6">
          <img 
            src={habitAsset.url} 
            alt="Регулярная забота о теле" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Overlay to ensure text readability if the image is too light/dark */}
          <div className="absolute inset-0 bg-white/10 pointer-events-none" />
          
          <div className="relative z-10 max-w-[900px]">
            <h2 className="font-noto-serif-narrow text-[22px] sm:text-[32px] xl:text-[42px] leading-[1.2] text-[#1C3C8C]">
              Регулярная забота о теле — спокойная привычка, которая помогает сохранять внутреннюю опору и легкость в повседневной жизни
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
