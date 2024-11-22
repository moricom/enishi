import React from "react";

import { styled } from "styled-components";

import { Step } from "@/enishi-ui/components/navigation/Stepper/Step";
import type { enishiUIProps } from "@/enishi-ui/components/type";

const Host = styled.div`
    display: flex;
    position: relative;
    width: fit-content;
`;

const Border = styled.div<{ $stepCount: number; $selectedIndex: number }>`
    margin: 0 4.5rem;
    width: calc(100% - 9rem);
    position: absolute;
    top: 0.94rem;
    min-height: 0.2rem;
    height: 0.2rem;
    max-height: 0.2rem;
    background-color: ${({ theme }) => theme.palette.grey[50]};
    &::after {
        position: absolute;
        top: 0;
        left: 0;
        height: 0.2rem;
        min-width: calc(${({ $stepCount, $selectedIndex }) => ($selectedIndex / ($stepCount - 1)) * 100}%);
        width: calc(${({ $stepCount, $selectedIndex }) => ($selectedIndex / ($stepCount - 1)) * 100}%);
        background-color: ${({ theme }) => theme.palette.primary[100]};
        content: "";
        transition: all ${({ theme: { transitions } }) => `${transitions.duration.standard} ${transitions.easing.easeOut}`};
    }
`;

type Props = enishiUIProps<{
    steps: {
        name: string;
    }[];
    selectedIndex: number;
    onChangeStep: (stepIndex: number) => void;
}>;

export const Stepper: React.FC<Props> = ({ steps, onChangeStep, selectedIndex, ...props }) => (
    <Host {...props}>
        {steps.map((x, i) => (
            <Step
                finished={i < selectedIndex}
                key={x.name}
                // eslint-disable-next-line react/jsx-no-bind
                onClick={() => {
                    onChangeStep(i);
                }}
                selected={i === selectedIndex}
            >
                {x.name}
            </Step>
        ))}
        <Border $selectedIndex={selectedIndex} $stepCount={steps.length} />
    </Host>
);
