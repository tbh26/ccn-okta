
export enum FetchStateStatus {
  Loading = "loading",
  Success = "succes",
  Error = "error"
}

export type FetchState<Data> =
  | {
  // status: "loading";
  status: FetchStateStatus.Loading;
}
  | {
  // status: "success";
  status: FetchStateStatus.Success;
  data: Data;
}
  | {
  // status: "error";
  status: FetchStateStatus.Error;
  error: any;
};
