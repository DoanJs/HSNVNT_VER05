import { InMemoryCache, ReactiveVar, makeVar } from "@apollo/client";

export const accountLoginVar: ReactiveVar<any> = makeVar<any>(null);
export const infoDeleteDataVar: ReactiveVar<any> = makeVar<any>({
  Title: "",
  Table: "",
  ID: 0,
  Form: null,
});

const cache = new InMemoryCache();
export default cache;
