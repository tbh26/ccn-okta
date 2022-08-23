// fetchDataCache

import React, { createContext, useCallback, useState } from "react";

type CacheItem = {
  url: string;
  data: any;
  updateCount: number;
};

export type FetchDataStore = {
  cache: CacheItem[];
  addItem: (url: string, data: any) => void;
  removeItem: (url: string) => void;
  getResultsForUrl: (url: string) => void | CacheItem;
};

export const FetchDataCacheContext = createContext<FetchDataStore>({
  cache: [],
  addItem: () => {
    throw new Error("First wrap the app with <FetchDataCacheProvider>");
  },
  removeItem: () => {
    throw new Error("First wrap the app with <FetchDataCacheProvider>");
  },
  getResultsForUrl: () => {
    throw new Error("First wrap the app with <FetchDataCacheProvider>");
  },
});

export function FetchDataCacheProvider(props: { children?: React.ReactNode }) {
  const [cache, setCache] = useState<CacheItem[]>([]);

  const addItem = useCallback((url: string, data: any) => {
    setCache((currentCache) => {
      let cacheHasEntry = false;
      let newCache = currentCache.map((item) => {
        let itemData = item.data;
        let count = item.updateCount;
        if (item.url === url) {
          cacheHasEntry = true;
          itemData = data;
          count += 1;
        }
        return {url: item.url, data: itemData, updateCount: count};
      });
      if (!cacheHasEntry) {
        newCache.push({url, data, updateCount: 0});
      }
      return newCache;
    });
  }, [setCache]); // useCallback

  //
  const removeItem = (url: string) => {
    setCache((currentCache: CacheItem[]) => {
      return currentCache.filter((item) => item.url === url).map((item) => item);
    });
  };

  const getResultsForUrl = (url: string) => {
    return cache.find((item) => item.url === url);
  };

  return (
    <FetchDataCacheContext.Provider
      value={{cache, addItem, getResultsForUrl, removeItem}}
    >
      {props.children}
    </FetchDataCacheContext.Provider>
  );
}
