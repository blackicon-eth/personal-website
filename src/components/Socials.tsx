import { FaGithub, FaXTwitter, FaLinkedinIn, FaEnvelope } from "react-icons/fa6";
import { SiFarcaster } from "react-icons/si";

const socials = [
  { label: "GitHub", href: "https://github.com/blackicon-eth", Icon: FaGithub },
  { label: "X", href: "https://x.com/TBlackicon", Icon: FaXTwitter },
  { label: "Farcaster", href: "https://farcaster.xyz/blackicon.eth", Icon: SiFarcaster },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mattia-verdecchi-75b785204/", Icon: FaLinkedinIn },
  { label: "Email", href: "mailto:verdecchimattia60@gmail.com", Icon: FaEnvelope },
];

const sizes = {
  md: { icon: "h-5 w-5", gap: "gap-5" },
  lg: { icon: "h-7 w-7", gap: "gap-7" },
};

interface SocialsProps {
  showEmail?: boolean;
  size?: keyof typeof sizes;
}

export function Socials({ showEmail = true, size = "md" }: SocialsProps) {
  const items = socials.filter((s) => showEmail || s.label !== "Email");
  const { icon, gap } = sizes[size];

  return (
    <div className={`flex items-center ${gap}`}>
      {items.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={label}
          title={label}
          className="cursor-pointer text-zinc-200 transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
        >
          <Icon className={icon} />
        </a>
      ))}
    </div>
  );
}
