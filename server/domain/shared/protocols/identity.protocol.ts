export interface Identity<T> {
  id: T;
}

export interface IdentityQuery {
  [id: string]: string;
}
