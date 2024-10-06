import { boolean } from "fp-ts";
import { Nullable } from "../Nullable/nullable";

export interface None {};
export interface Some<A> {
    some: A,
}
export type Option<A> = None | Some<A>;
export const none: Option<never> = {};
export const some = <A = never>(a: A): Option<A> => ({ some: a });
export const isNone = <A>(ma: Option<A>): ma is None => !('some' in ma);
export const isSome = <A>(ma: Option<A>): ma is Some<A> => 'some' in ma;
export const match = <A, B>(onNone: () => B, onSome: (a: A) => B) => (ma: Option<A>): B => isSome(ma) ? onSome(ma.some) : onNone();
export const matchW = <A, B, C>(onNone: () => B, onSome: (a: A) => C) => (ma: Option<A>): B | C => isSome(ma) ? onSome(ma.some) : onNone();
export const fold = match;
export const getOrElse = <A>(onNone: () => A) => (ma: Option<A>): A => isSome(ma) ? ma.some : onNone();
export const getOrElseW = <B>(onNone: () => B) => <A>(ma: Option<A>): A | B => isSome(ma) ? ma.some : onNone();
export const fromNullable = <A>(nullable: Nullable<A>): Option<A> => nullable === null || nullable === undefined ? none : some(nullable);
export const map = <A, B>(f: (a: A) => B) => (fa: Option<A>): Option<B> => isSome(fa) ? some(f(fa.some)) : none;
export const flatten = <A>(ffa: Option<Option<A>>): Option<A> => isSome(ffa) ? ffa.some : none;
export const flatMap = <A, B>(f: (a: A) => Option<B>) => (ma: Option<A>): Option<B> => isSome(ma) ? f(ma.some) : none;
export const fromPredicate = <A>(f: (a: A) => boolean) => (a: A): Option<A> => f(a) ? some(a) : none;