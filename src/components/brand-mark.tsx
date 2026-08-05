import { Image } from "./image";
import { siteConfig } from "@/src/config/site";

export function BrandMark({ tone = "dark", compact = false }: { tone?: "dark" | "light"; compact?: boolean }) {
  const source = tone === "light" ? siteConfig.brand.monogramIvory : siteConfig.brand.monogramTerracotta;
  return (
    <span className={compact ? "brand-mark is-compact" : "brand-mark"}>
      <Image src={source} alt="" width={72} height={72} priority />
      {!compact && <span>{siteConfig.displayName}</span>}
    </span>
  );
}
