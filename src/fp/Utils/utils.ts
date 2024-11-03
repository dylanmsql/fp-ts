export const makeFoldHandlersWithField = <DiscriminantKey extends string>(discriminantKey: DiscriminantKey) => 
    <Variant extends Record<DiscriminantKey, string>, Result>(handlers: { [VariantType in Variant[DiscriminantKey]]: (variant: Extract<Variant, Record<DiscriminantKey, VariantType>>) => Result }) =>
        (variant: Variant): Result =>
            handlers[variant[discriminantKey]](variant as Extract<Variant, Record<DiscriminantKey, typeof variant[DiscriminantKey]>>);