import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RentMyBae", short_name: "RentMyBae", start_url: "/", display: "standalone",
    background_color: "#FAF8FD", theme_color: "#8B32E8",
    icons: [
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" }
    ]
  };
}
