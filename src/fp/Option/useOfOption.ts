import { identity, pipe } from '../function';
import { Nullable } from '../Nullable/nullable';
import * as O from './option';

const inverse = (x:number): O.Option<number> => 
    x === 0 
    ? O.none
    : O.some(1/x);

const getUiMessageWithInverse = (x: number): string => 
    pipe(
        x,
        inverse,
        O.match(
            () => 'No inverse',
            (a) => `The inverse value from ${x} is ${a}`
        )
    )

console.log(getUiMessageWithInverse(0));
console.log(getUiMessageWithInverse(5));

const safeInverse = (x: number): number => 
    pipe(
        x,
        inverse,
        O.match(
            () => 0,
            identity
        )
    );

console.log(safeInverse(0));
console.log(safeInverse(5));

const safeInverseGetOrElse = (x: number) => 
    pipe(
        x,
        inverse,
        O.getOrElse(
            () => 0
        )
    );

console.log(safeInverseGetOrElse(0));
console.log(safeInverseGetOrElse(5));

const value: Nullable<number> = 3;
const nullValue: Nullable<number> = null;

console.log(O.fromNullable(value));
console.log(O.fromNullable(nullValue));

const head = <A>(as: ReadonlyArray<A>): O.Option<A> => as.length === 0 ? O.none : O.some(as[0]);
const toUppercase = (value: string) => value.toUpperCase();
const addPrefix = (prefix: string) => (value: string) => `${prefix}${value}`;

const getBestMovie = (titles: ReadonlyArray<string>): O.Option<string> => 
    pipe(
        titles,
        head,
        O.map(toUppercase),
        O.map(addPrefix('BEST - '))
    );

const movies = ['Le seigneur des anneaux', "de la merde"];
console.log(getBestMovie(movies));

const inverseHead = (ns: ReadonlyArray<number>) =>
    pipe(
      ns,
      head,
      O.flatMap(inverse)
    );

console.log(inverseHead([5,6,7]));

const isEven = (a: number) => a % 2 === 0;
const getEven = O.fromPredicate(isEven);
console.log(getEven(2));
console.log(getEven(3));
