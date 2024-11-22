import React from "react";

import { FiFileText } from "@react-icons/all-files/fi/FiFileText";

import { ListItem } from "@/enishi-ui/components/dataDisplay/ListItem";
import { ListItemIcon } from "@/enishi-ui/components/dataDisplay/ListItemIcon";

export const FileListItem: React.FC<React.ComponentPropsWithRef<typeof ListItem>> = ({ children, ...props }) => (
    <ListItem {...props}>
        <ListItemIcon size={props.size}>
            <FiFileText />
        </ListItemIcon>
        {children}
    </ListItem>
);
