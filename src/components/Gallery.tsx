import { RollingGallery } from "@/components/ui/rolling-gallery";

const heading = "'Roslindale Cyrillic', 'Roslindale', Georgia, serif";

export default function Gallery() {
  return (
    <section id="galereya" className="bg-[#EFF6FF] py-[60px] xl:py-[120px]">
      <div className="container-1900" />

      <RollingGallery autoplay pauseOnHover />
    </section>
  );
}
