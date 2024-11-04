import * as E from "../Either/either";

export const stringify = <A>(a: A): E.Either<unknown, string> =>  {
    try {
        return E.right(JSON.stringify(a));
    } catch (error) {
        return E.left(error);
    }
};