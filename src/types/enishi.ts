export type Uuid = string & { _uuidBrand: undefined };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BaseProps<P = Record<string, any>> = Omit<
    {
        readonly id?: string;
        readonly className?: string;
        readonly style?: React.CSSProperties;
        readonly onClick?: () => void;
        readonly children?: React.ReactNode;
    },
    keyof P
> &
    P;
