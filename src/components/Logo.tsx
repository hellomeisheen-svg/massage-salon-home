import logoAsset from "@/assets/logo-sedmoe-nebo.png.asset.json";

interface LogoProps {
  className?: string;
  title?: string;
}

/**
 * Логотип «Седьмое небо»: голубой контур облака, синяя семёрка внутри
 * и надпись «небо» акцентным шрифтом.
 */
const Logo = ({ className, title = "Седьмое небо" }: LogoProps) => (
  <img
    src={logoAsset.url}
    alt={title}
    className={className}
    width={1024}
    height={1024}
  />
);

export default Logo;
