/* eslint-disable react/jsx-no-bind */
import React, { useState } from "react";

import { BsPersonCircle } from "@react-icons/all-files/bs/BsPersonCircle";
import { styled } from "styled-components";
import { v4 as uuidv4 } from "uuid";

import { TextField } from "@/enishi-ui/components/inputs/TextField";
import { LinearLayout } from "@/enishi-ui/components/layout/LinearLayout";
import { ViewPager } from "@/enishi-ui/components/layout/ViewPager";
import { Stepper } from "@/enishi-ui/components/navigation/Stepper";

import { Page } from "@/components/page/Page";
import { PageHeader } from "@/components/page/PageHeader";
import { MatchRegistrationStepFragment } from "@/features/misc/routes/MainPage//MatchRegistrationStepFragment";

import type { MatchData, User } from "@/features/misc/routes/MainPage/type";

const Host = styled(Page)`
    && {
        padding: 1rem 1.5rem;
        box-sizing: border-box;
        height: 100%;
        overflow: auto;
    }
`;

const Content = styled(LinearLayout)`
    flex-wrap: wrap;
    width: 100%;
`;

const steps = [
    {
        name: "登録"
    },
    {
        name: "結果"
    }
];

const createManList = (countToCreate: number, lastName?: number | string): User[] => {
    const baseNameIndex = lastName === undefined ? 0 : typeof lastName === "number" ? lastName : parseInt(lastName, 10);
    return [...new Array(countToCreate).keys()].map((_, i) => ({
        id: uuidv4(),
        name: `${baseNameIndex + i + 1}`,
        favoriteList: []
    }));
};

const createWomanList = (countToCreate: number, lastName?: string): User[] => {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const baseNameIndex = lastName === undefined ? 64 : lastName.charCodeAt(0);
    return [...new Array(countToCreate).keys()].map((_, i) => ({
        id: uuidv4(),
        name: String.fromCharCode(baseNameIndex + i + 1),
        favoriteList: []
    }));
};

const defaultData: MatchData = {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    men: createManList(10),
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    women: createWomanList(10)
};

export const MainPage: React.FC = (props) => {
    const [stepIndex, setStepIndex] = useState<number>(0);
    const [data, setData] = useState<MatchData>(defaultData);

    return (
        <Host {...props}>
            <PageHeader>
                <BsPersonCircle size="1.1rem" style={{ marginRight: "0.3rem" }} />
                Enishi
            </PageHeader>
            <Content>
                <LinearLayout>
                    <Stepper onChangeStep={setStepIndex} selectedIndex={stepIndex} steps={steps} />
                    <LinearLayout gap="1rem">
                        <TextField
                            labelText="男性"
                            onChange={(c) => {
                                const count = parseInt(c, 10);
                                const n = count - data.men.length;
                                if (n === 0) {
                                    return;
                                }
                                if (n > 0) {
                                    setData((p) => ({ ...p, men: p.men.concat(createManList(n, p.men[p.men.length - 1]?.name ?? 0)) }));
                                } else {
                                    setData((p) => ({ ...p, men: p.men.filter((_, i) => i < count) }));
                                }
                            }}
                            size="small"
                            style={{ width: "4rem" }}
                            type="number"
                            value={data.men.length.toString()}
                        />
                        <TextField
                            labelText="女性"
                            onChange={(c) => {
                                const count = parseInt(c, 10);
                                const n = count - data.women.length;
                                if (n === 0) {
                                    return;
                                }
                                if (n > 0) {
                                    setData((p) => ({
                                        ...p,
                                        women: p.women.concat(createWomanList(n, p.women[p.women.length - 1]?.name ?? undefined))
                                    }));
                                } else {
                                    setData((p) => ({ ...p, women: p.women.filter((_, i) => i < count) }));
                                }
                            }}
                            size="small"
                            style={{ width: "4rem" }}
                            type="number"
                            value={data.women.length.toString()}
                        />
                    </LinearLayout>
                </LinearLayout>
                <ViewPager fullWidth selectedIndex={stepIndex}>
                    <MatchRegistrationStepFragment
                        men={data.men}
                        onFavorite={(type, id, targetId) => {
                            setData((prevData) => {
                                const listKey = type === "man" ? "men" : "women";
                                const updatedList = prevData[listKey].map((user) => {
                                    if (user.id === id) {
                                        const updatedFavoriteList = user.favoriteList.includes(targetId)
                                            ? user.favoriteList
                                            : [...user.favoriteList, targetId];
                                        return { ...user, favoriteList: updatedFavoriteList };
                                    }
                                    return user;
                                });

                                return { ...prevData, [listKey]: updatedList };
                            });
                        }}
                        onUnfavorite={(type, id, targetId) => {
                            setData((prevData) => {
                                const listKey = type === "man" ? "men" : "women";
                                const updatedList = prevData[listKey].map((user) => {
                                    if (user.id === id) {
                                        // TargetId を削除した新しい favoriteList を作成
                                        const updatedFavoriteList = user.favoriteList.filter((favoriteId) => favoriteId !== targetId);
                                        return { ...user, favoriteList: updatedFavoriteList };
                                    }
                                    return user;
                                });

                                // 更新したリストを返す
                                return { ...prevData, [listKey]: updatedList };
                            });
                        }}
                        women={data.women}
                    />
                </ViewPager>
            </Content>
        </Host>
    );
};
