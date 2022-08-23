import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import { FetchState, FetchStateStatus } from "../util/fetchstate";
import { FetchDataCacheContext } from './fetchDataCache';

export function useFetchData<Data>(url: string): FetchState<Data> {
  const [state, setState] = useState<FetchState<Data>>({
    status: FetchStateStatus.Loading,
  });
  const {getResultsForUrl, addItem} = useContext(FetchDataCacheContext);
  const cachedItem = getResultsForUrl(url);

  useEffect(() => {
    if (cachedItem) {
      setState({status: FetchStateStatus.Success, data: cachedItem.data});
    } else {
      (async () => {
        setState({status: FetchStateStatus.Loading});
        try {
          const res = await axios.get(url);
          // setState no longer necessary here: it will happen
          //  automatically when the cachedItem is found
          addItem(url, res.data);
        } catch (error) {
          setState({status: FetchStateStatus.Error, error});
        }
      })();
    }
  }, [url, cachedItem, addItem]);

  return state;
}

export function withFetchData<Data>(url: string) {
  return function hoc<P>(
    Wrapped: React.FC<P & { fetchState: FetchState<Data> }>
  ) {
    return function HocWrapperComponent(props: P) {
      const [state, setState] = useState<FetchState<Data>>({
        status: FetchStateStatus.Loading,
      });

      useEffect(() => {
        (async () => {
          setState({status: FetchStateStatus.Loading});
          try {
            const res = await axios.get(url);
            setState({status: FetchStateStatus.Success, data: res.data});
          } catch (error) {
            setState({status: FetchStateStatus.Error, error});
          }
        })();
      }, []);

      return (<Wrapped {...props} fetchState={state}/>);
    };
  };
}

type FetchDataProps<Data> = {
  url: string;
  children: (fetchState: FetchState<Data>) => JSX.Element; // (or else React.ReactNode)
};

export function FetchData<Data>({url, children}: FetchDataProps<Data>) {
  const [state, setState] = useState<FetchState<Data>>({
    status: FetchStateStatus.Loading,
  });

  useEffect(() => {
    (async () => {
      setState({status: FetchStateStatus.Loading});
      try {
        const res = await axios.get(url);
        setState({status: FetchStateStatus.Success, data: res.data});
      } catch (error) {
        setState({status: FetchStateStatus.Error, error});
      }
    })();
  }, [url]);

  return children(state); // jsx!
}

function useRefetchData<Data>(url: string): FetchState<Data> & { refetch: () => void } {
  const [state, setState] = useState<FetchState<Data>>({
    status: FetchStateStatus.Loading,
  });
  const {getResultsForUrl, addItem, removeItem} = useContext(FetchDataCacheContext);
  const cachedItem = getResultsForUrl(url);

  useEffect(() => {
    if (cachedItem) {
      setState({status: FetchStateStatus.Success, data: cachedItem.data});
    } else {
      (async () => {
        setState({status: FetchStateStatus.Loading});
        try {
          const res = await axios.get(url);
          // setState no longer necessary here: it will happen
          //  automatically when the cachedItem is found
          addItem(url, res.data);
        } catch (error) {
          setState({status: FetchStateStatus.Error, error});
        }
      })();
    }
  }, [url, cachedItem, addItem]);

  const refetch = () => {
    removeItem(url);
  };

  return {...state, refetch};
}
