import * as React from "react";

const MOBILE_BREAKPOINT = 768;
/** Alineado con Tailwind `sm` (640px). */
const SM_BREAKPOINT = 640;

function getSmDown() {
  if (typeof window === "undefined") return false;
  return window.matchMedia(`(max-width: ${SM_BREAKPOINT - 1}px)`).matches;
}

function getMobile() {
  if (typeof window === "undefined") return false;
  return window.innerWidth < MOBILE_BREAKPOINT;
}

export function useIsSmDown() {
  const [isSmDown, setIsSmDown] = React.useState(getSmDown);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${SM_BREAKPOINT - 1}px)`);
    const onChange = () => setIsSmDown(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isSmDown;
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(getMobile);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}