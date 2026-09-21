import type { MDXComponents } from "mdx/types";
import { Callout, Checklist, CopyText, Reveal, TryIt } from "@/components/guide/blocks";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { Callout, Checklist, CopyText, Reveal, TryIt, ...components };
}
