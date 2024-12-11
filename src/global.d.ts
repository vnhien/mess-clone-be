export type StateStatus = "IDLE" | "PROCESSING" | "SUCCESS" | "FAILED";

export interface DataWithStatus<T> {
  data?: T;
  status: StateStatus;
  lastFetched?: number;
  cacheTime?: number;
}
