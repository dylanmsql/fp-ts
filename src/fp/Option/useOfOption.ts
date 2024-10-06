import { identity, pipe } from '../function';
import { Nullable } from '../Nullable/nullable';
import * as O from './option';
import * as N from '../Nullable/nullable'

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

const safeInverseGetOrElse = (x: number): number => 
    pipe(
        x,
        inverse,
        O.getOrElse(
            () => 0
        )
    );

console.log(safeInverseGetOrElse(0));
console.log(safeInverseGetOrElse(5));
