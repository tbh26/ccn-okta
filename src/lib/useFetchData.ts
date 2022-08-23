import { useState, useEffect } from "react";
import axios from "axios";

import { FetchState, FetchStateStatus } from "../util/fetchstate";

// export default function useFetchData<Data>(url: string) {
export default function useFetchData<Data>(url: string): FetchState<Data> {
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
