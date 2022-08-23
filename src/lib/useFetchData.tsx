import React, { useEffect, useState } from "react";
import axios from "axios";

import { FetchState, FetchStateStatus } from "../util/fetchstate";

// export default function useFetchData<Data>(url: string) {
export function useFetchData<Data>(url: string): FetchState<Data> {
  const [state, setState] = useState<FetchState<Data>>({
    status: FetchStateStatus.Loading,
  });

  useEffect(() => {
    (async () => {
      setState({ status: FetchStateStatus.Loading });
      try {
        const res = await axios.get(url);
        setState({ status: FetchStateStatus.Success, data: res.data });
      } catch (error) {
        setState({ status: FetchStateStatus.Error, error });
      }
    })();
  }, [url]);

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
          setState({ status: FetchStateStatus.Loading });
          try {
            const res = await axios.get(url);
            setState({ status: FetchStateStatus.Success, data: res.data });
          } catch (error) {
            setState({ status: FetchStateStatus.Error, error });
          }
        })();
      }, []);

      return (<Wrapped {...props} fetchState={state} />);
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
      setState({ status: FetchStateStatus.Loading });
      try {
        const res = await axios.get(url);
        setState({ status: FetchStateStatus.Success, data: res.data });
      } catch (error) {
        setState({ status: FetchStateStatus.Error, error });
      }
    })();
  }, [url]);

  return children(state); // jsx!
}
