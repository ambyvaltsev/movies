/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useLayoutEffect, useEffect } from "react";

interface IMedia {
  [index: string]: boolean;
}

const queries = [
  "(max-width: 575.98px)",
  "(max-width: 767.98px)",
  "(max-width: 991.98px)",
  "(max-width: 1199.98px)",
];

export const useMatchMedia = (): IMedia => {
  if (typeof window === "undefined") return {};


  

  const mediaQueryLists = queries.map((query) => matchMedia(query));

  const getValues = () => mediaQueryLists.map((list) => list.matches);

  const [values, setValues] = useState(getValues);

  useLayoutEffect(() => {
    const handler = () => setValues(getValues);

    mediaQueryLists.forEach((list) => list.addEventListener("change", handler));

    return () =>
      mediaQueryLists.forEach((list) =>
        list.removeEventListener("change", handler)
      );
  }, []);

  return ["isSmallMobile", "isMobile", "isTablet", "isDesktops"].reduce(
    (acc, screen, index) => ({
      ...acc,
      [screen]: values[index],
    }),
    {}
  );
};
