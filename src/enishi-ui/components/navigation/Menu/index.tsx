import React from "react";

import { styled } from "styled-components";

import { List } from "@/enishi-ui/components/dataDisplay/List";
import { MenuItem } from "@/enishi-ui/components/navigation/MenuItem";
import { Popup } from "@/enishi-ui/components/navigation/Popup";

const Content = styled.div`
    min-width: 10rem;
    padding: 0.5rem 0;
`;

type Props = React.ComponentPropsWithRef<typeof Popup> & {
    readonly listProps?: React.ComponentPropsWithRef<typeof List>;
    readonly size?: React.ComponentPropsWithRef<typeof MenuItem>["size"];
};

const MenuHost: React.FC<Props> = ({ children, listProps, size, ...props }) => (
    <Popup positionMargin={0} stopPropagation {...props}>
        <List {...listProps}>
            <Content>
                {React.Children.toArray(children).map((child) => {
                    if (!React.isValidElement(child)) {
                        return child;
                    }
                    if (child.type !== MenuItem) {
                        return child;
                    }
                    return React.cloneElement<React.ComponentPropsWithRef<typeof MenuItem>>(
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
                        child as any,
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                        {
                            size,
                            ...child.props,
                            onClick: (...args) => {
                                void props.onClick?.();
                                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
                                child.props?.onClick?.(...args);
                            }
                        }
                    );
                })}
            </Content>
        </List>
    </Popup>
);

export const Menu = React.memo(MenuHost);
