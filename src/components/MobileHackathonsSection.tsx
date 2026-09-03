import { useEffect, useMemo, useRef, useState } from "react";
import { DriftWall } from "@/components/DriftWall";
import { hackathons } from "@/data/hackathons";
import { LocaleText } from "@/components/LocaleText";
import { useI18n } from "@/i18n/LocaleProvider";

const BASE_TILE_WIDTH = 156;
const BASE_TILE_HEIGHT = 112;
const GAP = 12;

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

export function MobileHackathonsSection() {
  const { t } = useI18n();
  const wallContainerRef = useRef<HTMLDivElement>(null);
  const [tileSize, setTileSize] = useState({ width: BASE_TILE_WIDTH, height: BASE_TILE_HEIGHT, columns: 2 });

  useEffect(() => {
    const container = wallContainerRef.current;
    if (!container) return;

    const updateSize = () => {
      const width = container.clientWidth;
      if (!width) return;
      const columns = Math.min(
        4,
        Math.max(2, Math.floor((width + GAP) / (BASE_TILE_WIDTH + GAP))),
      );
      const tileWidth = Math.floor((width - (columns - 1) * GAP) / columns);
      setTileSize({
        width: tileWidth,
        height: Math.round(tileWidth * (BASE_TILE_HEIGHT / BASE_TILE_WIDTH)),
        columns,
      });
    };

    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(container);
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
    <section id="hackathons" className="flex w-full items-center py-10">
      <div className="w-full px-4">
        <p className="mb-8 text-xs font-medium uppercase tracking-[0.24em] text-zinc-500">
          <LocaleText>{t.hackathons.label}</LocaleText>
        </p>
        <div ref={wallContainerRef} className="h-[80vh] w-full">
          <div className="relative h-full w-full">
            <DriftWall
              items={items}
              columns={tileSize.columns}
              tileWidth={tileSize.width}
              tileHeight={tileSize.height}
              gap={GAP}
              fade={0.05}
              dim={0.75}
              overlayOpacity={0.18}
              parallax={0.35}
              roll={-3}
              turn={6}
              tilt={6}
              overlayColor="#17171c"
              direction="up"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
