// @ts-nocheck

import { useEffect, useState } from "react";

const PHONE_WIDTH = 420;
const TABLET_WIDTH = 768;
const DESKTOP_WIDTH = 1400;

export interface MediaQueries {
  isPhone: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

const queries = {
  isPhone: `screen and (max-width: ${PHONE_WIDTH}px)`,
  isTablet: `screen and (min-width: ${PHONE_WIDTH}px) and (max-width: ${
    TABLET_WIDTH - 1
  }px)`,
  isDesktop: `screen and (min-width: ${DESKTOP_WIDTH}px)`,
};

const initialState: MediaQueries = {
  isPhone: false,
  isTablet: false,
  isDesktop: true,
};

export const useMedia = (): MediaQueries => {
  const [queryMatch, setQueryMatch] = useState(null);

  useEffect(() => {
    const mediaQueryLists = {};
    const keys = Object.keys(queries);

    let isAttached = false;

    const handleQueryListener = () => {
      const updatedMatches = keys.reduce((acc, media) => {
        acc[media] = !!(
          mediaQueryLists[media] && mediaQueryLists[media].matches
        );
        return acc;
      }, {});
      setQueryMatch(updatedMatches);
    };

    if (window && window.matchMedia) {
      const matches = {};
      keys.forEach((media) => {
        if (typeof queries[media] === "string") {
          mediaQueryLists[media] = window.matchMedia(queries[media]);
          matches[media] = mediaQueryLists[media].matches;
        } else {
          matches[media] = false;
        }
      });

      setQueryMatch(matches);
      isAttached = true;
      keys.forEach((media) => {
        if (typeof queries[media] === "string") {
          mediaQueryLists[media].addListener(handleQueryListener);
        }
      });
    }

    return () => {
      if (isAttached) {
        keys.forEach((media) => {
          if (typeof queries[media] === "string") {
            mediaQueryLists[media].removeListener(handleQueryListener);
          }
        });
      }
    };
  }, [queries]);

  return queryMatch || initialState;
};
