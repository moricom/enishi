import React from "react";

import { styled } from "styled-components";

import { LinearLayout } from "@/enishi-ui/components/layout/LinearLayout";
import type { enishiUIProps } from "@/enishi-ui/components/type";

type Props = enishiUIProps;

const Host = styled(LinearLayout)``;

export const RadioGroup: React.FC<Props> = ({ children, ...props }) => <Host {...props}>{children}</Host>;
