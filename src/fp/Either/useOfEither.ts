import * as E from "./either";
import { makeFoldHandlersWithField } from "../Utils/utils";
import { pipe } from "../function";

type NotEnoughBalance = Readonly<{
    type: 'NotEnoughBalance',
    message: string
}>;

type AccountFrozen = Readonly<{
    type: 'AccountFrozen',
    message: string
}>;

type Item = Readonly<{
    id: number,
    name: string,
    cost: number
}>;

type BankAccount = Readonly<{
    balance: number,
    isFrozen: boolean,
    currency: string
}>;

type Cart = Readonly<{
    items: Item[],
    total: number
}>;

type PaymentError = AccountFrozen | NotEnoughBalance;

const pay = (amount: number) => 
    (account: BankAccount): E.Either<PaymentError, BankAccount> => {
        if (account.isFrozen) {
            return E.left({
                type: 'AccountFrozen',
                message: 'Cannot pay with a frozen account'
            });
        }
        if (account.balance < amount) {
            return E.left({
                type: 'NotEnoughBalance',
                message: `Cannot pay ${amount}${account.currency} with a balance of ${account.balance}${account.currency}`
            });
        }
        return E.right({
            ...account,
            balance: account.balance - amount
        });
    };

const foldError = makeFoldHandlersWithField('type');
const checkout = (cart: Cart) => (account: BankAccount): string =>
    pipe(
        account,
        pay(cart.total),
        E.fold(
            foldError({
                AccountFrozen: (e) => e.message,
                NotEnoughBalance: (e) => e.message
            }),
            (updatedAccount) => `The new balance is ${updatedAccount.balance}${updatedAccount.currency}`
        )
    );

const applyCheckout = (cart: Cart, account: BankAccount): string => 
    checkout(cart)(account);

console.log('No Problem:', applyCheckout(
    { total: 10, items: [] },
    { balance: 20, isFrozen: false, currency: '€' }
));

console.log('Frozen problem:', applyCheckout(
    { total: 10, items: [] },
    { balance: 20, isFrozen: true, currency: '€' }
));

console.log('Balance problem:', applyCheckout(
    { total: 30, items: [] },
    { balance: 20, isFrozen: false, currency: '€' }
));

type JsonParseError = Readonly<{
    type: 'JsonParseError',
    error: Error
}>;

const jsonParse = (text: string): E.Either<JsonParseError, unknown> => E.tryCatch(
    () => JSON.parse(text),
    (e) => ({
        type: 'JsonParseError',
        error: E.toError(e)
    })
)

const jsonParseMoreConcise: (text: string) => E.Either<JsonParseError, unknown> = E.tryCatchK(
    JSON.parse,
    (e) => ({
        type: 'JsonParseError',
        error: E.toError(e)
    })
)

console.log(jsonParse('{"foo": "bar"}'));
console.log(jsonParseMoreConcise('{"foo": "bar"}'));

console.log(jsonParse('{invalid}'));
console.log(jsonParseMoreConcise('{invalid}'));

