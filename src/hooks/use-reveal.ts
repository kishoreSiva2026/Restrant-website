import { useRef } from "react";
import { useInView } from "framer-motion";

/**
 * Returns a [ref, isInView] pair.
 * margin: how far before the element enters the viewport to trigger.
 * once: only animate in once (default true).
 */
export function useReveal(margin = "-80px", once = true) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin } as Parameters<typeof useInView>[1]);
  return [ref, isInView] as const;
}
