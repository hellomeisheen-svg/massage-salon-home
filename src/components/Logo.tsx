import logoSvg from "@/assets/logo-sedmoe-nebo.svg";

interface LogoProps {
  className?: string;
  title?: string;
}

/**
 * Логотип «Седьмое небо» (SVG): голубой контур облака, синяя семёрка
 * и надпись «небо».
 */
const Logo = ({ className, title = "Седьмое небо" }: LogoProps) => (
  <img src={logoSvg} alt={title} className={className} width={696} height={484} />
);

export default Logo;
