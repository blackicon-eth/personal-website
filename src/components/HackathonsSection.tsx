import { useEffect, useMemo, useRef, useState } from "react";
import { DriftWall } from "@/components/DriftWall";
import { hackathons } from "@/data/hackathons";

const TILE_WIDTH = 280;
const TILE_HEIGHT = 180;
const GAP = 20;

function placeholderImage(event: string, year: string): string {
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">` +
    `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">` +
    `<stop offset="0" stop-color="#18181b"/><stop offset="1" stop-color="#09090b"/>` +
    `</linearGradient></defs>` +
    `<rect width="600" height="400" fill="url(#g)"/>` +
    `<text x="300" y="182" fill="#fafafa" font-family="Arial, sans-serif" font-size="34" font-weight="600" text-anchor="middle">${esc(event)}</text>` +
    `<text x="300" y="232" fill="#71717a" font-family="monospace" font-size="20" letter-spacing="6" text-anchor="middle">${esc(year)}</text>` +
    `</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export function HackathonsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(8);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const compute = () => {
      const style = window.getComputedStyle(el);
      const width =
        el.clientWidth -
        parseFloat(style.paddingLeft) -
        parseFloat(style.paddingRight);
      setColumns(
        Math.min(5, Math.max(3, Math.ceil(width / ((TILE_WIDTH + GAP) * 1.18))) + 1),
      );
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const items = useMemo(
    () =>
      hackathons.map((h) => ({
        image: h.logo ?? placeholderImage(h.event, h.year),
        title: h.event,
        subtitle: h.year,
        background: h.background,
        logoTranslateY: h.logoTranslateY,
        href: h.url,
      })),
    [],
  );

  return (
    <section
      id="hackathons"
      className="flex min-h-screen w-full items-center py-24"
    >
      <div
        ref={containerRef}
        className="h-[80vh] min-h-140 w-full px-24 lg:pr-104"
      >
        <div className="relative h-full w-full">
          <DriftWall
            items={items}
            columns={columns}
            tileWidth={TILE_WIDTH}
            tileHeight={TILE_HEIGHT}
            gap={GAP}
            fade={0.05}
            parallax={0.5}
            roll={-5}
            turn={10}
            tilt={10}
            overlayColor="#17171c"
            direction="up"
          />
        </div>
      </div>
    </section>
  );
}
