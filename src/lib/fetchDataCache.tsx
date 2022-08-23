
// fetchDataCache

import React, { createContext, useState } from "react";

type CacheItem = {
  url: string;
  data: any;
  updateCount: number;
};

export type FetchDataStore = {
  cache: CacheItem[];
  addItem: (url: string, data: any) => void;
  getResultsForUrl: (url: string) => void | CacheItem;
};

export const FetchDataCacheContext = createContext<FetchDataStore>({
  cache: [],
  addItem: () => {
    throw new Error("First wrap the app with <FetchDataCacheProvider>");
  },
  getResultsForUrl: () => {
    throw new Error("First wrap the app with <FetchDataCacheProvider>");
  },
});

export function FetchDataCacheProvider(props: { children?: React.ReactNode }) {
  const [cache, setCache] = useState<CacheItem[]>([]);

  const addItem = (url: string, data: any) => {
    // using the functional update pattern
    //  to be extra safe we don't lose data when adding
    //  many items in between the same two renders
    setCache( (currentCache: CacheItem[] ) => {
      /*
      const i = currentCache.findIndex((item) => item.url === url);
      if (i >= 0) {
        const updatedCache = currentCache.slice();
        updatedCache.splice(i, 1, { url, data });
        return updatedCache;
      } else {
        return [...currentCache, { url, data }];
      }
      */
      let cacheHasEntry = false;
      let newCache = currentCache.map( (item) => {
        let itemData = item.data;
        let count = item.updateCount;
        if (item.url === url) {
          cacheHasEntry = true;
          itemData = data;
          count += 1;
        }
        return { url: item.url, data: itemData, updateCount: count};
      });
      if (!cacheHasEntry) {
        newCache.push({url, data, updateCount: 0});
      }
      return newCache;
    });
  };

  const getResultsForUrl = (url: string) => {
    return cache.find((item) => item.url === url);
  };

  return (
    <FetchDataCacheContext.Provider
      value={{ cache, addItem, getResultsForUrl }}
    >
      {props.children}
    </FetchDataCacheContext.Provider>
  );
}
