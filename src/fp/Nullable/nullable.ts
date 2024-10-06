export type Nullable<A> = A | null | undefined;

export const isNull = <A>(n: Nullable<A>): boolean => n === null;
export const isUndefined = <A>(n: Nullable<A>): boolean => n === undefined;
export const isNullOrUndefined = <A>(n: Nullable<A>): boolean => isNull(n) || isUndefined(n);