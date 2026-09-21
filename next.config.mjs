import createMDX from "@next/mdx";

const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const basePath = rawBasePath && rawBasePath !== "/"
  ? `/${rawBasePath.replace(/^\/+|\/+$/g, "")}`
  : "";

const withMDX = createMDX({ extension: /\.mdx?$/ });

export default withMDX({
  output: "export",
  basePath,
  trailingSlash: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: { unoptimized: true }
});
