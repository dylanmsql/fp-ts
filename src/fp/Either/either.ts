export interface Right<A> {readonly right: A};
export interface Left<E> {readonly left: E};
export type Either<E, A> = Left<E> | Right<A>;
export const left = <E = never, A = never>(e: E): Either<E, A> => ({ left: e });
export const right = <E = never, A = never>(a: A): Either<E, A> => ({ right: a });
export const isLeft = <E>(me: Either<E, unknown>): me is Left<E> => 'left' in me;
export const isRight= <A>(ma: Either<unknown, A>): ma is Right<A> => 'right' in ma;
