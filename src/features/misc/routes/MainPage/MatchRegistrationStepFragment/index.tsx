import React from "react";

import { BsCheck } from "@react-icons/all-files/bs/BsCheck";

import { Typography } from "@/enishi-ui/components/dataDisplay/Typography";
import { Button } from "@/enishi-ui/components/inputs/Button";
import { LinearLayout } from "@/enishi-ui/components/layout/LinearLayout";
import { ViewPagerFragment } from "@/enishi-ui/components/layout/ViewPagerFragment";

import type { User } from "@/features/misc/routes/MainPage/type";
type Props = React.ComponentPropsWithRef<typeof ViewPagerFragment> & {
    readonly men: User[];
    readonly women: User[];
    readonly onFavorite: (type: "man" | "woman", id: User["id"], targetId: User["id"]) => void;
    readonly onUnfavorite: (type: "man" | "woman", id: User["id"], targetId: User["id"]) => void;
};

export const MatchRegistrationStepFragment: React.FC<Props> = ({ men, women, onFavorite, onUnfavorite, ...props }) => (
    <ViewPagerFragment {...props} style={{ display: "block" }}>
        <LinearLayout gap="1rem" orientation="vertical">
            <LinearLayout orientation="vertical">
                <LinearLayout style={{ margin: "1rem" }}>
                    <Typography variant="h3">男性</Typography>
                </LinearLayout>
                <LinearLayout orientation="vertical">
                    {men.map((x) => (
                        <LinearLayout gravity="center_left" key={x.id}>
                            <LinearLayout gravity="center" style={{ width: "2rem" }}>
                                <Typography>{x.name}</Typography>
                            </LinearLayout>
                            <LinearLayout>
                                {women.map((y) => (
                                    <Button
                                        checked={x.favoriteList.includes(y.id)}
                                        colorTheme={x.favoriteList.includes(y.id) ? "accent" : "info"}
                                        icon={x.favoriteList.includes(y.id) ? <BsCheck /> : null}
                                        iconPosition="right"
                                        key={y.id}
                                        // eslint-disable-next-line react/jsx-no-bind
                                        onClick={() => {
                                            if (x.favoriteList.includes(y.id)) {
                                                onUnfavorite("man", x.id, y.id);
                                            } else {
                                                onFavorite("man", x.id, y.id);
                                            }
                                        }}
                                        size="small"
                                        variant="outlined"
                                    >
                                        {y.name}
                                    </Button>
                                ))}
                            </LinearLayout>
                        </LinearLayout>
                    ))}
                </LinearLayout>
            </LinearLayout>
            <LinearLayout orientation="vertical">
                <LinearLayout style={{ margin: "1rem" }}>
                    <Typography variant="h3">女性</Typography>
                </LinearLayout>
                <LinearLayout orientation="vertical">
                    {women.map((x) => (
                        <LinearLayout gravity="center_left" key={x.id}>
                            <LinearLayout gravity="center" style={{ width: "2rem" }}>
                                <Typography>{x.name}</Typography>
                            </LinearLayout>
                            <LinearLayout>
                                {men.map((y) => (
                                    <Button
                                        checked={x.favoriteList.includes(y.id)}
                                        colorTheme={x.favoriteList.includes(y.id) ? "accent" : "info"}
                                        icon={x.favoriteList.includes(y.id) ? <BsCheck /> : null}
                                        iconPosition="right"
                                        key={y.id}
                                        // eslint-disable-next-line react/jsx-no-bind
                                        onClick={() => {
                                            if (x.favoriteList.includes(y.id)) {
                                                onUnfavorite("woman", x.id, y.id);
                                            } else {
                                                onFavorite("woman", x.id, y.id);
                                            }
                                        }}
                                        size="small"
                                        variant="outlined"
                                    >
                                        {y.name}
                                    </Button>
                                ))}
                            </LinearLayout>
                        </LinearLayout>
                    ))}
                </LinearLayout>
                <LinearLayout />
            </LinearLayout>
        </LinearLayout>
    </ViewPagerFragment>
);
