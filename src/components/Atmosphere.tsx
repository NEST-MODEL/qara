/** Concrete / night-street backdrop shown when a photo is missing. */
export default function Atmosphere({ variant = 0 }: { variant?: number }) {
  const shift = [0, 12, -10, 22][variant % 4]
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
      <defs>
        <linearGradient id={`wall-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2c2c2d" />
          <stop offset="0.55" stopColor="#171717" />
          <stop offset="1" stopColor="#0a0a0a" />
        </linearGradient>
        <radialGradient id={`lamp-${variant}`} cx={`${62 + shift}%`} cy="22%" r="42%">
          <stop offset="0" stopColor="#ffffff" stopOpacity=".16" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1600" height="900" fill={`url(#wall-${variant})`} />
      <g stroke="#ffffff" strokeOpacity=".05">
        {[200, 460, 720, 980, 1240, 1500].map((x) => (<line key={x} x1={x} y1="0" x2={x} y2="900" />))}
        {[180, 380].map((y) => (<line key={y} x1="0" y1={y} x2="1600" y2={y} />))}
      </g>
      <rect width="1600" height="900" fill={`url(#lamp-${variant})`} />
      <g fill="#050505" opacity=".92">
        <path d={`M${1010 + shift * 6} 900 L${1030 + shift * 6} 480 Q${1100 + shift * 6} 300 1200 330 Q${1290 + shift * 6} 360 ${1290 + shift * 6} 480 L${1360 + shift * 6} 900 Z`} />
        <path d={`M${790 + shift * 4} 900 L${800 + shift * 4} 560 Q${830 + shift * 4} 440 ${900 + shift * 4} 450 Q${960 + shift * 4} 470 ${960 + shift * 4} 560 L${990 + shift * 4} 900 Z`} />
      </g>
    </svg>
  )
}
