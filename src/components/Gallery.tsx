import { RollingGallery } from "@/components/ui/rolling-gallery";

const heading = "'Roslindale Cyrillic', 'Roslindale', Georgia, serif";

export default function Gallery() {
  return (
    <section id="galereya" className="scroll-mt-[120px] bg-[#EFF6FF] pt-4 pb-[60px] xl:pt-[140px] xl:pb-0">
      <div className="container-1900" />

      <RollingGallery autoplay pauseOnHover />
    </section>
  );
}
