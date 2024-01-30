import { useEffect, useState } from "react";

interface IMediaQueryListEvent {
  media: string;
  matches: boolean;
}

export interface IMediaQueryObject {
  media: string;
  matches: boolean;
  addEventListener: (
    type: string,
    listener: (event: IMediaQueryListEvent) => void,
  ) => void;
  removeEventListener: (
    type: string,
    listener: (event: IMediaQueryListEvent) => void,
  ) => void;
}

type MediaQueryList = Array<IMediaQueryObject>;

import {
  validateArrayType,
  validateQueries,
  validateArrayNotEmpty,
} from "./functions/validators";

const initializeState = (
  mediaQueryList: MediaQueryList,
): Record<string, boolean> => {
  const initialState: Record<string, boolean> = {};
  mediaQueryList.forEach((mediaQueryObject) => {
    initialState[mediaQueryObject.media] = mediaQueryObject.matches;
  });
  return initialState;
};

export const useMediaQueries = (queries: string[]): Record<string, boolean> => {
  validateArrayType(queries);
  validateQueries(queries);
  validateArrayNotEmpty(queries);

  const mediaQueryList: MediaQueryList = queries.map((query) =>
    window.matchMedia(query),
  );
  const [matches, setMatches] = useState<Record<string, boolean>>(() =>
    initializeState(mediaQueryList),
  );

  const handleChange = (event: IMediaQueryListEvent): void => {
    setMatches((prevState) => {
      return { ...prevState, [event.media]: event.matches };
    });
  };

  useEffect(() => {
    mediaQueryList.forEach((mediaQueryObject) => {
      mediaQueryObject.addEventListener("change", handleChange);
    });

    return () => {
      mediaQueryList.forEach((mediaQueryObject) => {
        mediaQueryObject.removeEventListener("change", handleChange);
      });
    };
  }, [mediaQueryList]);

  return matches;
};
