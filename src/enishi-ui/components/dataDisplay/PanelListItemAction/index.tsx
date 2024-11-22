import React, { useRef } from "react";

import { BsThreeDots } from "@react-icons/all-files/bs/BsThreeDots";

import { PanelListItemData } from "@/enishi-ui/components/dataDisplay/PanelListItemData";
import { IconButton } from "@/enishi-ui/components/inputs/IconButton";
import { Menu } from "@/enishi-ui/components/navigation/Menu";
import { useBoolean } from "@/enishi-ui/hooks/useBoolean";

type Props = React.ComponentPropsWithRef<typeof PanelListItemData>;

export const PanelListItemAction: React.FC<Props> = ({ children }) => {
    const { value: menuOpened, setTrue: openMenu, setFalse: closeMenu } = useBoolean(false);
    const ref = useRef<HTMLDivElement>(null);
    return (
        <PanelListItemData width="3.4rem">
            <IconButton circle noMargin onClick={openMenu} ref={ref} size="large" stopPropagation>
                <BsThreeDots />
            </IconButton>
            <Menu onClose={closeMenu} targetElement={ref.current} visible={menuOpened}>
                {children}
            </Menu>
        </PanelListItemData>
    );
};
