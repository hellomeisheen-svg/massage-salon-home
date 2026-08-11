interface LogoProps {
  className?: string;
  title?: string;
}

/**
 * Векторный логотип «Седьмое небо»: облако с семёркой и надпись акцентным шрифтом.
 */
const Logo = ({ className, title = "Седьмое небо" }: LogoProps) => (
  <svg
    viewBox="0 0 320 190"
    role="img"
    aria-label={title}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{title}</title>
    <g
      fill="none"
      stroke="#E3D2B8"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Облако */}
      <path d="M78 104C50 106 32 90 36 68C39 52 55 43 70 48C71 27 93 14 113 21C124 8 148 6 161 17C174 7 196 10 204 25C224 20 243 33 244 51C263 50 276 65 273 82C270 99 254 109 238 106C200 114 116 114 78 104Z" />
      {/* Семёрка */}
      <path d="M112 48C124 42 150 41 168 46C158 60 146 78 141 100" />
      <path d="M126 72H155" strokeWidth="4" />
    </g>
    <text
      x="160"
      y="176"
      textAnchor="middle"
      fill="#1C3C8C"
      fontFamily='"Roslindale Cyrillic Display Condensed", "Times New Roman", serif'
      fontWeight="500"
      fontSize="62"
      letterSpacing="0.5"
    >
      седьмое небо
    </text>
  </svg>
);

export default Logo;
