
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
export const map = <E, A, B>(onRight: (a: A) => B) => (ma: Either<E, A>): Either<E, B> => isRight(ma) ? right(onRight(ma.right)) : left(ma.left);
export const mapLeft = <E, A, F>(onLeft: (e: E) => F) => (ma: Either<E, A>): Either<F, A> => isLeft(ma) ? left(onLeft(ma.left)) : right(ma.right);
export const bimap = <E, A, F, B>(onLeft: (e: E) => F, onRight: (a: A) => B) => (ma: Either<E, A>): Either<F, B> => isLeft(ma) ? left(onLeft(ma.left)) : right(onRight(ma.right));
export const tryCatch = <E, A>(f: () => A, onThrow: (e: unknown) => E): Either<E, A> => {
    try {
        return right(f());
    } catch (error) {   
        return left(onThrow(error));
    }
};
export const tryCatchK = <A extends unknown[], B, E>(f: (...a: A) => B, onThrow: (e: unknown) => E) => (...a: A): Either<E, B> => {
    try {
        return right(f(...a));
    } catch (error) {
        return left(onThrow(error));
    }
}
export const toError = (e: unknown) => e instanceof Error ? e : new Error(String(e));
