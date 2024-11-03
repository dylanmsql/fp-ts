
// Model
export interface Right<A> {readonly right: A};
export interface Left<E> {readonly left: E};
export type Either<E, A> = Left<E> | Right<A>;

// Construtor
export const left = <E = never, A = never>(e: E): Either<E, A> => ({ left: e });
export const right = <E = never, A = never>(a: A): Either<E, A> => ({ right: a });

// Helping Methods
export const isLeft = <E>(me: Either<E, unknown>): me is Left<E> => 'left' in me;
export const isRight = <A>(ma: Either<unknown, A>): ma is Right<A> => 'right' in ma;

// Operations
export const fold = <E, A, B>(onLeft: (e: E) => B, onRight: (a: A) => B) => (ma: Either<E, A>): B => isRight(ma) ? onRight(ma.right) : onLeft(ma.left);
export const foldW = <E, A, B, C>(onLeft: (e: E) => B, onRight: (a: A) => C) => (ma: Either<E, A>): B | C => isRight(ma) ? onRight(ma.right) : onLeft(ma.left);
