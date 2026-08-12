interface LogoProps {
  className?: string;
  title?: string;
}

/**
 * Логотип «Седьмое небо»: голубой контур облака, синяя семёрка внутри
 * и надпись «небо» акцентным шрифтом. Полностью векторный (SVG).
 */
const Logo = ({ className, title = "Седьмое небо" }: LogoProps) => (
  <svg
    className={className}
    viewBox="0 0 300 210"
    role="img"
    aria-label={title}
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{title}</title>

    {/* Контур облака */}
    <path
      d="M62 163C27 163 16 124 45 111C33 74 74 50 103 71C116 31 170 26 188 63C213 41 253 57 250 91C285 92 294 133 265 149C258 160 242 165 228 162"
      fill="none"
      stroke="#88C1FF"
      strokeWidth="5"
      strokeLinecap="round"
    />
    {/* Нижняя линия облака */}
    <path
      d="M228 162H62"
      fill="none"
      stroke="#88C1FF"
      strokeWidth="5"
      strokeLinecap="round"
    />
    {/* Внутренний росчерк-волна */}
    <path
      d="M96 152C132 130 196 122 238 133"
      fill="none"
      stroke="#88C1FF"
      strokeWidth="3.5"
      strokeLinecap="round"
    />

    {/* Семёрка */}
    <text
      x="150"
      y="140"
      textAnchor="middle"
      fill="#1C3C8C"
      fontFamily="'Noto Serif Display', Georgia, serif"
      fontSize="112"
      fontWeight="500"
    >
      7
    </text>

    {/* Надпись «небо» */}
    <text
      x="150"
      y="200"
      textAnchor="middle"
      fill="#1C3C8C"
      fontFamily="'Noto Serif Display', Georgia, serif"
      fontSize="66"
      fontWeight="500"
    >
      небо
    </text>
  </svg>
);

export default Logo;
