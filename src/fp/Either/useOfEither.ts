import * as E from "./either"
import { pipe } from "../function"

declare type NotEnoughBalance = {
    type: 'NotEnoughBalance',
    message: string
} 

declare type AccountFrozen = {
    type: 'AccountFrozen',
    message: string
} 

type Item = Readonly<{
    id: number,
    name: string,
    cost: number
}>

type BankAccount = Readonly<{
    balance: number,
    isFrozen: boolean
}>

type Cart = Readonly<{
    items: Item[],
    total: number
}>;

const checkout = 
    (cart: Cart) =>
    (account: BankAccount) =>
    pipe(
        account,
        pay(cart.total)
    );

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
                    message: `Cannot pay ${amount} with a balance of ${account.balance}`
                })
                : E.right({
                    ...account,
                    balance: account.balance - amount
                })
