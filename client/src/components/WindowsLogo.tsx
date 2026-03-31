/**
 * Windows XP-style wavy flag logo.
 * Renders the iconic 4-color waving flag.
 */
const WindowsLogo = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 88 88"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Top-left — Red */}
    <path
      d="M0 12.402S19.344 5.159 40 8.088v30.272c0 .001-21.63.926-40-4.402V12.402Z"
      fill="#FF0000"
    />
    {/* Top-right — Green */}
    <path
      d="M44 7.134S60.159 2.083 88 0v38.32c0 .001-27.266 1.991-44-1.078V7.134Z"
      fill="#00A400"
    />
    {/* Bottom-left — Blue */}
    <path
      d="M0 42.97s19.344-.925 40 4.402v30.23c0 .001-21.63 5.159-40 8.088V42.97Z"
      fill="#0050D4"
    />
    {/* Bottom-right — Yellow */}
    <path
      d="M44 40.6s16.159 1.991 44 1.078V80c0 .001-27.266-2.083-44-7.134V40.6Z"
      fill="#FFB900"
    />
  </svg>
);

export default WindowsLogo;
