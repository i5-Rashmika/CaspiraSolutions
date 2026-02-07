const GradientText = ({ text, className }) => {
    return (
        <svg
            width="100%"
            height="120"
            viewBox="0 0 1000 150"
            preserveAspectRatio="xMidYMid meet"
            className={`hidden sm:block ${className}`}
        >
            <defs>
                {/* Text Fill Gradient */}
                <linearGradient
                    id="textFillGradient"
                    gradientTransform="rotate(180)"
                >
                    <stop offset="65.62%" stopColor="rgba(59,130,246,0.22)" />
                    <stop offset="30.35%" stopColor="rgba(59,130,246,0)" />
                </linearGradient>

                {/* Stroke Gradient */}
                <linearGradient id="strokeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="40%" stopColor="#3b82f6" /> 
                    <stop offset="70%" stopColor="rgba(35,76,144,0)" />
                </linearGradient>

            
                <linearGradient id="bottomFadeMask" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="70%" stopColor="white" />
                    <stop offset="100%" stopColor="black" />
                </linearGradient>

                <mask id="fadeMask">
                    <rect width="100%" height="100%" fill="url(#bottomFadeMask)" />
                </mask>
            </defs>

            <text
                mask="url(#fadeMask)"
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fontSize="80"
                fontWeight="700"
                fill="url(#textFillGradient)"
                stroke="url(#strokeGradient)"
                strokeWidth="2.5"
                style={{ letterSpacing: "-0.02em", lineHeight: "74px" }}
            >
                {text}
            </text>
        </svg>
    );
};

export default GradientText;
