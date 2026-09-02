import type { CSSProperties, ReactNode } from "react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { AnimatePresence, motion } from "motion/react";
import { useI18n } from "@/i18n/LocaleProvider";

export interface StaggeredMenuItem {
  label: string;
  ariaLabel: string;
  link: string;
}

export interface StaggeredMenuSocialItem {
  label: string;
  link: string;
}

export interface StaggeredMenuProps {
  position?: "left" | "right";
  colors?: string[];
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  logoUrl?: string;
  menuExtra?: ReactNode;
  locationContent?: ReactNode;
  socialContent?: ReactNode;
  socialTitle?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  isFixed?: boolean;
  changeMenuColorOnOpen?: boolean;
  closeOnClickAway?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

export function StaggeredMenu({
  position = "right",
  colors = ["#5227FF", "#7cff67"],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className = "",
  logoUrl,
  menuExtra,
  locationContent,
  socialContent,
  socialTitle = "My socials",
  menuButtonColor = "#e4e4e7",
  openMenuButtonColor = "#18181b",
  accentColor = "#5227FF",
  isFixed = false,
  changeMenuColorOnOpen = true,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose,
}: StaggeredMenuProps) {
  const { locale } = useI18n();
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const preLayersRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const lineRefs = useRef<HTMLSpanElement[]>([]);
  const itemEntranceRef = useRef<gsap.core.Tween | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);

  const closeMenu = useCallback(() => {
    if (!openRef.current) return;
    openRef.current = false;
    setOpen(false);
    onMenuClose?.();

    const target = position === "left" ? -100 : 100;
    const panel = panelRef.current;
    const layers = preLayersRef.current
      ? Array.from(preLayersRef.current.querySelectorAll<HTMLElement>(".sm-prelayer"))
      : [];
    if (!panel) return;

    itemEntranceRef.current?.kill();
    closeTweenRef.current?.kill();
    closeTweenRef.current = gsap.to([panel, ...layers], {
      xPercent: target,
      duration: 0.32,
      ease: "power3.in",
      overwrite: "auto",
    });
  }, [onMenuClose, position]);

  const toggleMenu = useCallback(() => {
    const next = !openRef.current;
    openRef.current = next;
    setOpen(next);
    if (next) onMenuOpen?.();
    else onMenuClose?.();
  }, [onMenuClose, onMenuOpen]);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    const layers = preLayersRef.current
      ? Array.from(preLayersRef.current.querySelectorAll<HTMLElement>(".sm-prelayer"))
      : [];
    if (!panel) return;

    const ctx = gsap.context(() => {
      const initial = position === "left" ? -100 : 100;
      gsap.set([panel, ...layers], { xPercent: initial });
      gsap.set(lineRefs.current, { transformOrigin: "50% 50%" });
    });
    return () => ctx.revert();
  }, [position]);

  useEffect(() => {
    const panel = panelRef.current;
    const layers = preLayersRef.current
      ? Array.from(preLayersRef.current.querySelectorAll<HTMLElement>(".sm-prelayer"))
      : [];
    if (!panel) return;

    const labels = Array.from(panel.querySelectorAll<HTMLElement>(".sm-panel-item-label"));
    const socialLinks = Array.from(panel.querySelectorAll<HTMLElement>(".sm-socials-link"));
    const target = position === "left" ? -100 : 100;

    if (open) {
      gsap.set(panel, { display: "flex" });
      gsap.set(layers, { xPercent: target });
      gsap.set(labels, { yPercent: 140, rotate: 10 });
      gsap.set(socialLinks, { y: 25, opacity: 0 });

      const timeline = gsap.timeline();
      layers.forEach((layer, index) => {
        timeline.to(layer, { xPercent: 0, duration: 0.5, ease: "power4.out" }, index * 0.07);
      });
      const insertAt = layers.length ? (layers.length - 1) * 0.07 + 0.08 : 0;
      timeline.to(panel, { xPercent: 0, duration: 0.65, ease: "power4.out" }, insertAt);
      timeline.to(labels, { yPercent: 0, rotate: 0, duration: 0.8, ease: "power4.out", stagger: 0.08 }, insertAt + 0.1);
      timeline.to(socialLinks, { y: 0, opacity: 1, duration: 0.45, ease: "power3.out", stagger: 0.06 }, insertAt + 0.35);
      itemEntranceRef.current = timeline as unknown as gsap.core.Tween;
    } else {
      gsap.to([panel, ...layers], {
        xPercent: target,
        duration: 0.32,
        ease: "power3.in",
        overwrite: "auto",
        onComplete: () => gsap.set(panel, { display: "none" }),
      });
    }
  }, [open, position]);

  useEffect(() => {
    if (!open || !panelRef.current) return;

    const labels = Array.from(panelRef.current.querySelectorAll<HTMLElement>(".sm-panel-item-label"));
    const socialTitle = panelRef.current.querySelector<HTMLElement>(".sm-socials-title");
    const targets = socialTitle ? [...labels, socialTitle] : labels;

    gsap.fromTo(
      targets,
      { y: 8, opacity: 0.35 },
      { y: 0, opacity: 1, duration: 0.35, ease: "power3.out", stagger: 0.06 },
    );
  }, [locale, open]);

  useEffect(() => {
    if (!closeOnClickAway || !open) return;
    const handleClick = (event: MouseEvent) => {
      if (!panelRef.current?.contains(event.target as Node) && !toggleRef.current?.contains(event.target as Node)) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [closeMenu, closeOnClickAway, open]);

  const rawColors = colors.length ? colors.slice(0, 4) : ["#5227FF", "#7cff67"];
  const layers = rawColors.length > 2 ? rawColors.filter((_, index) => index !== Math.floor(rawColors.length / 2)) : rawColors;
  const shellClass = `${isFixed ? "fixed" : "absolute"} inset-0 z-40 pointer-events-none ${className}`.trim();
  const lineStyle = (index: number): CSSProperties => ({
    background: open && changeMenuColorOnOpen ? openMenuButtonColor : menuButtonColor,
    transform: open
      ? `translateY(${index === 0 ? 4 : -4}px) rotate(${index === 0 ? 45 : -45}deg)`
      : "none",
  });

  return (
    <div className={shellClass} style={{ ["--sm-accent" as string]: accentColor }}>
      <div className={`sm-menu-shell ${position === "left" ? "sm-menu-left" : "sm-menu-right"}`}>
        <div className="sm-prelayers" ref={preLayersRef} aria-hidden="true">
          {layers.map((color, index) => <div className="sm-prelayer" key={`${color}-${index}`} style={{ background: color }} />)}
        </div>

        <header className="sm-menu-header" aria-label="Main navigation header">
          {logoUrl && <img src={logoUrl} alt="Logo" className="sm-menu-logo" draggable={false} />}
          <button
            ref={toggleRef}
            type="button"
            className="sm-menu-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="staggered-menu-panel"
            onClick={toggleMenu}
          >
            <span className="sm-menu-icon" aria-hidden="true">
              {[0, 1].map((index) => (
                <span
                  key={index}
                  ref={(element) => { if (element) lineRefs.current[index] = element; }}
                  className={`sm-menu-line ${index === 1 ? "sm-menu-line-second" : ""}`}
                  style={lineStyle(index)}
                />
              ))}
            </span>
          </button>
        </header>

        <aside ref={panelRef} id="staggered-menu-panel" className="sm-menu-panel" aria-hidden={!open}>
          {menuExtra && <div className="sm-menu-panel-extra">{menuExtra}</div>}
          <div className="sm-menu-panel-inner">
            <ul className="sm-panel-list" data-numbering={displayItemNumbering || undefined} role="list">
              {items.map((item, index) => (
                <li className="sm-panel-item-wrap" key={item.link}>
                  <a
                    className="sm-panel-item"
                    href={item.link}
                    aria-label={item.ariaLabel}
                    onClick={() => closeMenu()}
                  >
                    <span className="sm-panel-item-label">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                          key={locale}
                          className="inline-block"
                          initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.06,
                            ease: [0.25, 0.1, 0.25, 1],
                          }}
                        >
                          {item.label}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {displaySocials && (socialContent || socialItems.length > 0) && (
              <div className="sm-socials" aria-label="Social links">
                {locationContent && <div className="sm-location">{locationContent}</div>}
                <h2 className="sm-socials-title">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={locale}
                      className="inline-block"
                      initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      {socialTitle}
                    </motion.span>
                  </AnimatePresence>
                </h2>
                {socialContent || (
                  <div className="sm-social-links">
                    {socialItems.map((item) => (
                      <a key={item.label} className="sm-socials-link" href={item.link} target="_blank" rel="noopener noreferrer">
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </aside>
      </div>

      <style>{`
        .sm-menu-shell { position: absolute; inset: 0; pointer-events: none; }
        .sm-menu-header { position: absolute; inset: 0 0 auto; z-index: 20; display: flex; align-items: center; justify-content: flex-end; padding: 1.5rem; pointer-events: none; }
        .sm-menu-header > * { pointer-events: auto; }
        .sm-menu-logo { height: 2rem; width: auto; object-fit: contain; }
        .sm-menu-toggle { display: inline-flex; height: 2.5rem; width: 2.5rem; align-items: center; justify-content: center; border: 1px solid rgb(255 255 255 / 0.1); border-radius: 9999px; background: rgb(9 9 11 / 0.6); box-shadow: 0 4px 16px rgb(0 0 0 / 0.25); backdrop-filter: blur(12px); cursor: pointer; padding: 0; }
        .sm-menu-icon { position: relative; display: inline-flex; height: 10px; width: 1.25rem; flex-direction: column; align-items: center; justify-content: center; gap: 6px; }
        .sm-menu-line { display: block; height: 2px; width: 100%; border-radius: 9999px; transition: transform 0.3s ease, background-color 0.3s ease; }
        .sm-prelayers, .sm-menu-panel { position: absolute; top: 0; bottom: 0; width: min(100%, 28rem); }
        .sm-prelayers { z-index: 5; }
        .sm-menu-panel { pointer-events: auto; }
        .sm-prelayer { position: absolute; inset: 0; }
        .sm-menu-panel { z-index: 10; display: none; flex-direction: column; overflow-y: auto; background: rgb(3 3 5 / 0.98); padding: 7rem 1.5rem 2rem; backdrop-filter: blur(18px); }
        .sm-menu-right .sm-prelayers, .sm-menu-right .sm-menu-panel { right: 0; }
        .sm-menu-left .sm-prelayers, .sm-menu-left .sm-menu-panel { left: 0; }
        .sm-menu-panel-inner { display: flex; min-height: 100%; flex: 1; flex-direction: column; gap: 2rem; }
        .sm-menu-panel-extra { position: absolute; top: 1.5rem; left: 1.5rem; z-index: 1; }
        .sm-panel-list { display: flex; list-style: none; flex-direction: column; gap: 1.25rem; margin: 0; padding: 0; }
        .sm-panel-item-wrap { position: relative; overflow: hidden; line-height: 1.05; padding-bottom: 0.25em; margin-bottom: -0.25em; }
        .sm-panel-item { position: relative; display: inline-block; padding-right: 1rem; color: #e4e4e7; font-size: clamp(2.25rem, 10vw, 4rem); font-weight: 500; letter-spacing: -0.04em; line-height: 1.05; text-decoration: none; transition: color 0.2s ease; }
        .sm-panel-item:hover { color: #d4d4d8; }
        .sm-panel-item:active { color: #71717a; }
        .sm-panel-list[data-numbering] .sm-panel-item::after { position: absolute; top: 0.1em; right: 0; color: var(--sm-accent); content: counter(sm-item, decimal-leading-zero); counter-increment: sm-item; font-size: 0.8rem; font-weight: 400; letter-spacing: 0; opacity: var(--sm-num-opacity, 0); }
        .sm-panel-list[data-numbering] { counter-reset: sm-item; }
         .sm-socials { margin-top: auto; border-top: 1px solid rgb(255 255 255 / 0.1); padding-top: 1.5rem; }
         .sm-location { margin-bottom: 1.5rem; }
         .sm-location-label { margin: 0 0 0.5rem; color: #a1a1aa; font-size: 0.75rem; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; }
        .sm-socials-title { margin: 0 0 1rem; color: #a1a1aa; font-size: 0.75rem; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; }
        .sm-social-links { display: flex; flex-wrap: wrap; gap: 1rem; }
        .sm-socials-link { color: #d4d4d8; font-size: 1rem; text-decoration: none; transition: color 0.2s ease; }
        .sm-socials-link:hover { color: #fff; }
        @media (min-width: 640px) { .sm-menu-header { padding: 2rem; } .sm-menu-panel { padding-left: 2rem; padding-right: 2rem; } }
      `}</style>
    </div>
  );
}

export default StaggeredMenu;
