export const toObjectFromURIQuery = (search: string): Record<string, string> | undefined =>
    search.length
        ? search
              .substring(1)
              .split("&")
              .reduce((prev, next) => {
                  const y = /^(?<key>.*)=(?<value>.*)/u.exec(next);
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
                  return y ? Object.assign(prev, { [y.groups?.key!]: y.groups?.value }) : prev;
              }, {})
        : undefined;
