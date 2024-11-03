import * as E from "./either"
import { makeFoldHandlersWithField } from "../Utils/utils"
import { pipe } from "../function"

type NotEnoughBalance = Readonly<{
    type: 'NotEnoughBalance',
    message: string
}>

type AccountFrozen = Readonly<{
    type: 'AccountFrozen',
    message: string
}>

type Item = Readonly<{
    id: number,
    name: string,
    cost: number
}>

type BankAccount = Readonly<{
    balance: number,
    isFrozen: boolean,
    currency: string
}>

type Cart = Readonly<{
    items: Item[],
    total: number
}>;

const pay = 
    (amount: number) =>
    (account: BankAccount): E.Either<AccountFrozen | NotEnoughBalance, BankAccount> => 
        account.isFrozen
            ? E.left({
                type: 'AccountFrozen',
                message: 'Cannot pay with a frozen account'
            })
            : account.balance < amount
                ? E.left({
                    type: 'NotEnoughBalance',
                    message: `Cannot pay ${amount}${account.currency} with a balance of ${account.balance}${account.currency}`
                })
                : E.right({
                    ...account,
                    balance: account.balance - amount
                })

const foldError = makeFoldHandlersWithField('type');
const checkout = 
    (cart: Cart) =>
    (account: BankAccount) =>
    pipe(
        account,
        pay(cart.total),
        E.fold(
            foldError({
                AccountFrozen: (e) => e.message,
                NotEnoughBalance: (e) => e.message
            }),
            (a) => `The new balnce is ${a.balance}${a.currency}`
        )
    );

console.log('No Problem : ', checkout({
    total: 10,
    items : []
})({
    balance: 20,
    isFrozen: false,
    currency: '€'
}));

console.log('Frozen problem : ', checkout({
    total: 10,
    items : []
})({
    balance: 20,
    isFrozen: true,
    currency: '€'
}));

console.log('balance problem : ', checkout({
    total: 30,
    items : []
})({
    balance: 20,
    isFrozen: false,
    currency: '€'
}));