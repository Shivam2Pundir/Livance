import React from "react";

interface LivanceWordmarkProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  asLink?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  variant?: "light" | "dark";
}

export default function LivanceWordmark({
  size = "md",
  className = "",
  asLink = true,
  onClick,
  variant = "light",
}: LivanceWordmarkProps) {
  const sizes = {
    sm: { font: "text-2xl" },
    md: { font: "text-3xl" },
    lg: { font: "text-4xl" },
    xl: { font: "text-5xl" },
  };

  const s = sizes[size] || sizes.md;
  const letters = ["l", "ı", "v", "a", "n", "c", "e"];

  const inner = (
    <span
      className={`livance-wordmark group/livance relative inline-flex items-end font-logo font-bold lowercase text-[#FF2D2D] gap-[0.04em] pt-[0.1em] overflow-visible ${s.font} ${className}`}
    >
      {letters.map((ch, idx) => (
        <span
          key={idx}
          className={`livance-letter relative inline-block select-none overflow-visible ${
            ch === "ı" ? "ml-[0.12em]" : ""
          }`}
          style={{ "--i": idx } as React.CSSProperties}
        >
          {ch}

          {ch === "ı" && (
            <span
              className="livance-dot absolute rounded-full shadow-sm z-30 transition-all duration-300 bg-[#0A192F]"
              style={{
                width: "0.22em",
                height: "0.22em",
                top: "0.02em",
                left: "52%",
                transform: "translateX(-50%)",
              }}
            />
          )}
        </span>
      ))}
    </span>
  );

  if (asLink) {
    return (
      <a
        href="#home"
        onClick={(e) => {
          if (onClick) {
            onClick(e);
          } else {
            // Smooth scroll fallback
            e.preventDefault();
            const elem = document.getElementById("home");
            if (elem) {
              elem.scrollIntoView({ behavior: "smooth" });
            }
          }
        }}
        className="inline-block transition-transform duration-200 active:scale-95"
      >
        {inner}
      </a>
    );
  }

  return inner;
}
