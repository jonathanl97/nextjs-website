import type { NextConfig } from "next";

const hostnames = ["upload.wikimedia.org", "thumb.wikimedia.org"];

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    //  domains: ["upload.wikimedia.org", "thumb.wikimedia.org"],
    remotePatterns: hostnames.map((hostname) => ({
      protocol: "https",
      hostname,
    })),

    /*
    [
      new URL("https://upload.wikimedia.org/**"),
      new URL("https://thumb.wikimedia.org/**"),
    ],
    */
  },
};

export default nextConfig;
