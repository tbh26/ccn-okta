export type FetchState<Data> =
  | {
  status: "loading";
}
  | {
  status: "success";
  data: Data;
}
  | {
  status: "error";
  error: any;
};
