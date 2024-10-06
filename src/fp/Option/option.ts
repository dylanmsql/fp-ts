import { Either, isRight } from "../Either/either";
import { isNullOrUndefined, Nullable } from "../Nullable/nullable";

// Model
export interface None {};
export interface Some<A> {
    readonly some: A,
}
export type Option<A> = None | Some<A>;

// Constructor
export const none: Option<never> = {};
export const some = <A = never>(a: A): Option<A> => ({ some: a });

// Helping Methods
export const isNone = <A>(ma: Option<A>): ma is None => !('some' in ma);
export const isSome = <A>(ma: Option<A>): ma is Some<A> => 'some' in ma;

// Operations
export const fold = <A, B>(onNone: () => B, onSome: (a: A) => B) => (ma: Option<A>): B => isSome(ma) ? onSome(ma.some) : onNone();;
export const foldW = <A, B, C>(onNone: () => B, onSome: (a: A) => C) => (ma: Option<A>): B | C => isSome(ma) ? onSome(ma.some) : onNone();
export const getOrElse = <A>(onNone: () => A) => (ma: Option<A>): A => isSome(ma) ? ma.some : onNone();
export const getOrElseW = <B>(onNone: () => B) => <A>(ma: Option<A>): A | B => isSome(ma) ? ma.some : onNone();
export const map = <A, B>(f: (a: A) => B) => (fa: Option<A>): Option<B> => isSome(fa) ? some(f(fa.some)) : none;
export const flatten = <A>(ffa: Option<Option<A>>): Option<A> => isSome(ffa) ? ffa.some : none;
export const flatMap = <A, B>(f: (a: A) => Option<B>) => (ma: Option<A>): Option<B> => isSome(ma) ? f(ma.some) : none;

// Conversions
export const fromNullable = <A>(n: Nullable<A>): Option<A> => isNullOrUndefined(n) ? none : some(n);
export const toNullable = <A>(sa: Option<A>): Nullable<A> => isSome(sa) ? sa.some : null;
export const toUndefined = <A>(sa: Option<A>): Nullable<A> => isSome(sa) ? sa.some : undefined;
export const fromPredicate = <A>(f: (a: A) => boolean) => (a: A): Option<A> => f(a) ? some(a) : none;
export const fromEither = <A>(fa: Either<unknown, A>): Option<A> => isRight(fa) ? some(fa.right) : none;