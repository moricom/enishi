import React from "react";

import { styled } from "styled-components";

import { LinearLayout } from "@/enishi-ui/components/layout/LinearLayout";
import type { EnishiUIProps } from "@/enishi-ui/components/type";

type Props = EnishiUIProps;

const Host = styled(LinearLayout)``;

export const RadioGroup: React.FC<Props> = ({ children, ...props }) => <Host {...props}>{children}</Host>;
