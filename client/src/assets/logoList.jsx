import React from 'react';

export const LightIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-sun" {...props}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 19a1 1 0 0 1 .993 .883l.007 .117v1a1 1 0 0 1 -1.993 .117l-.007 -.117v-1a1 1 0 0 1 1 -1z" /><path d="M18.313 16.91l.094 .083l.7 .7a1 1 0 0 1 -1.32 1.497l-.094 -.083l-.7 -.7a1 1 0 0 1 1.218 -1.567l.102 .07z" /><path d="M7.007 16.993a1 1 0 0 1 .083 1.32l-.083 .094l-.7 .7a1 1 0 0 1 -1.497 -1.32l.083 -.094l.7 -.7a1 1 0 0 1 1.414 0z" /><path d="M4 11a1 1 0 0 1 .117 1.993l-.117 .007h-1a1 1 0 0 1 -.117 -1.993l.117 -.007h1z" /><path d="M21 11a1 1 0 0 1 .117 1.993l-.117 .007h-1a1 1 0 0 1 -.117 -1.993l.117 -.007h1z" /><path d="M6.213 4.81l.094 .083l.7 .7a1 1 0 0 1 -1.32 1.497l-.094 -.083l-.7 -.7a1 1 0 0 1 1.217 -1.567l.102 .07z" /><path d="M19.107 4.893a1 1 0 0 1 .083 1.32l-.083 .094l-.7 .7a1 1 0 0 1 -1.497 -1.32l.083 -.094l-.7 -.7a1 1 0 0 1 1.414 0z" /><path d="M12 2a1 1 0 0 1 .993 .883l.007 .117v1a1 1 0 0 1 -1.993 .117l-.007 -.117v-1a1 1 0 0 1 1 -1z" /><path d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z" /></svg>
);

export const DarkIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-moon" {...props}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" /></svg>
);

export const ThemeLogo = ({ theme, className = "h-12 w-auto", ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 220 60"
        className={className}
        fill="none"
        {...props}
    >
        <defs>
            <mask id="moon-mask-theme-logo">
                <rect x="0" y="0" width="220" height="60" fill="white" />
                <circle cx="48" cy="15" r="24" fill="black" />
            </mask>
        </defs>

        {theme === 'light' ? (
            /* Sun Group (Orange) */
            <circle cx="35" cy="28" r="24" fill="#ea580c" className="transition-all duration-500 ease-in-out origin-center" />
        ) : (
            /* Moon Group (Yellow) - Uses same base circle as sun, masked */
            <circle cx="35" cy="28" r="24" fill="#fbbf24" mask="url(#moon-mask-theme-logo)" className="transition-all duration-500 ease-in-out origin-center" />
        )}

        <g transform="translate(14, 12)">
            {/* Pillars */}
            <path d="M12 36 L11 8" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" className="text-white" />
            <path d="M30 36 L31 8" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" className="text-white" />

            {/* Nuki (Lower crossbar) */}
            <path d="M8 16 H34" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-white" />

            {/* Shimaki/Kasagi (Top curved crossbar) */}
            <path d="M4 8 Q21 2 38 8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-white" />
        </g>

        {/* Text */}
        <text
            x="75"
            y="40"
            fontFamily="'Inter', sans-serif"
            fontWeight="900"
            fontSize="32"
            fill="currentColor"
            style={{ letterSpacing: '-0.04em' }}
            className="transition-colors duration-300"
        >
            Nihon<tspan fill={theme === 'light' ? "#ea580c" : "#fbbf24"}>GO!</tspan>
        </text>
    </svg>
);