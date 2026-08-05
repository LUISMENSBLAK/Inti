import type { ImgHTMLAttributes } from "react";

type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string;
  fill?: boolean;
  priority?: boolean;
};

export function Image({ fill, priority, alt, style, ...props }: ImageProps) {
  return (
    // AVIF files are already prepared for the catalog; direct delivery avoids a runtime transformer.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      alt={alt ?? ""}
      loading={priority ? "eager" : props.loading ?? "lazy"}
      fetchPriority={priority ? "high" : props.fetchPriority}
      style={fill ? { position: "absolute", width: "100%", height: "100%", inset: 0, ...style } : style}
    />
  );
}
