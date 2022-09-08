import { useMatchMedia } from "../../../hooks/";
import { useState, useEffect, useLayoutEffect } from "react";

export const useGetNumberItems = () => {
  const { isMobile, isSmallMobile, isDesktops, isTablet } = useMatchMedia();
  const [number, setNumber] = useState(5);
  useEffect(() => {
    if (isDesktops) {
      setNumber(5);
    }
    if (isTablet) {
      setNumber(4);
    }
    if (isMobile) {
      setNumber(3);
    }
    if (isSmallMobile) {
      setNumber(2);
    }
  }, [isDesktops, isSmallMobile, isTablet, isMobile]);

  return number
};
