interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  color?: string;
  shineColor?: string;
}

export function ShinyText({
  text,
  disabled = false,
  speed = 5,
  className = "",
  color = "rgba(181, 181, 181, 0.64)",
  shineColor = "rgba(255, 255, 255, 0.8)",
}: ShinyTextProps) {
  return (
    <span
      className={`inline-block ${className}`}
      style={{
        color,
        backgroundImage:
          `linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, ${shineColor} 50%, rgba(255, 255, 255, 0) 60%)`,
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        animation: disabled ? "none" : `shine ${speed}s linear infinite`,
      }}
    >
      {text}
    </span>
  );
}
