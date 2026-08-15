import habitAsset from "@/assets/habit-quote-background.png.asset.json";

export function HabitQuote() {
  return (
    <section className="bg-[#EFF6FF] py-10 sm:py-20 xl:py-[120px]">
      <div className="container-1900">
        {/* Main image container */}
        <div className="relative w-full aspect-[2/1] sm:aspect-[21/9] rounded-[16px] sm:rounded-[24px] overflow-hidden flex items-center justify-center text-center px-4 sm:px-6">
          <img 
            src={habitAsset.url} 
            alt="Регулярная забота о теле" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-white/5 pointer-events-none" />
          
          <div className="relative z-10 max-w-[900px]">
            <h2 className="font-noto-serif-narrow text-[22px] sm:text-[32px] xl:text-[42px] leading-[1.2] text-[#1C3C8C]">
              Регулярная забота о теле — спокойная привычка, которая помогает сохранять внутреннюю опору и легкость в повседневной жизни
            </h2>
          </div>
          
          {/* Floating decorative elements (matching the reference image layout) */}
          <div className="hidden sm:block absolute top-[10%] left-[8%] w-[12%] aspect-square rounded-[16px] overflow-hidden border-2 border-white/50 shadow-sm rotate-[-4deg]">
             <img src="/images/service-vector.png" className="w-full h-full object-cover opacity-80" alt="" />
          </div>
          <div className="hidden sm:block absolute top-[10%] right-[8%] w-[12%] aspect-square rounded-[16px] overflow-hidden border-2 border-white/50 shadow-sm rotate-[4deg]">
             <img src="/images/service-ketgut.png" className="w-full h-full object-cover opacity-80" alt="" />
          </div>
          <div className="hidden sm:block absolute bottom-[10%] left-[15%] w-[10%] aspect-square rounded-[16px] overflow-hidden border-2 border-white/50 shadow-sm rotate-[6deg]">
             <img src="/images/service-hirudo.png" className="w-full h-full object-cover opacity-80" alt="" />
          </div>
          <div className="hidden sm:block absolute bottom-[10%] right-[15%] w-[10%] aspect-square rounded-[16px] overflow-hidden border-2 border-white/50 shadow-sm rotate-[-6deg]">
             <img src="/images/service-banks.png" className="w-full h-full object-cover opacity-80" alt="" />
          </div>
          
          {/* Central decorative icon */}
          <div className="absolute top-[10%] left-1/2 -translate-x-1/2 opacity-20 text-[#1C3C8C]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z" fill="currentColor"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
