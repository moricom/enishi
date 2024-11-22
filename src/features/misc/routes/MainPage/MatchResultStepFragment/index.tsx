import React from "react";

import { useTheme } from "styled-components";

import { Chip } from "@/enishi-ui/components/dataDisplay/Chip";
import { Typography } from "@/enishi-ui/components/dataDisplay/Typography";
import { LinearLayout } from "@/enishi-ui/components/layout/LinearLayout";
import { ViewPagerFragment } from "@/enishi-ui/components/layout/ViewPagerFragment";

import { generateFavoritedData } from "@/features/misc/routes/MainPage/MatchResultStepFragment/generateFavoritedData";
import { generatePairs } from "@/features/misc/routes/MainPage/MatchResultStepFragment/generatePairs";

import type { MatchData } from "@/features/misc/routes/MainPage/type";
type Props = React.ComponentPropsWithRef<typeof ViewPagerFragment> & {
    readonly matchData: MatchData;
};

export const MatchResultStepFragment: React.FC<Props> = ({ matchData, ...props }) => {
    const pairs = generatePairs(matchData);
    const dataWithFavoritedBy = generateFavoritedData(matchData);
    const theme = useTheme();

    return (
        <ViewPagerFragment {...props} style={{ display: "block" }}>
            <LinearLayout gap="1rem" orientation="vertical">
                <LinearLayout orientation="vertical">
                    <LinearLayout style={{ margin: "1rem" }}>
                        <Typography variant="h3">カップル</Typography>
                    </LinearLayout>
                    <LinearLayout gap="0.5rem" style={{ padding: "1rem" }} wrap>
                        {pairs.map((x) => (
                            <Chip
                                key={`${x.man}-${x.woman}`}
                                raised
                                style={{ border: `1px solid ${theme.palette.primary[100]}` }}
                                type="toggle"
                            >
                                {x.man} ♡ {x.woman}
                            </Chip>
                        ))}
                    </LinearLayout>
                </LinearLayout>
                <LinearLayout orientation="vertical">
                    <LinearLayout orientation="vertical">
                        <LinearLayout style={{ margin: "1rem" }}>
                            <Typography variant="h3">男性</Typography>
                        </LinearLayout>
                        <LinearLayout orientation="vertical">
                            {dataWithFavoritedBy.men.map((x) => (
                                <LinearLayout gravity="center_left" key={x.id} style={{ height: "1.8rem" }}>
                                    <LinearLayout gravity="center" style={{ width: "2rem" }}>
                                        <Typography>{x.name}: </Typography>
                                    </LinearLayout>
                                    <LinearLayout gap="1rem">
                                        {x.favoritedBy.map((y) => (
                                            <Typography key={y.id} size="large">
                                                {y.name}
                                            </Typography>
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
                            {dataWithFavoritedBy.women.map((x) => (
                                <LinearLayout gravity="center_left" key={x.id} style={{ height: "1.8rem" }}>
                                    <LinearLayout gravity="center" style={{ width: "2rem" }}>
                                        <Typography>{x.name}: </Typography>
                                    </LinearLayout>
                                    <LinearLayout gap="1rem">
                                        {x.favoritedBy.map((y) => (
                                            <Typography key={y.id} size="large">
                                                {y.name}
                                            </Typography>
                                        ))}
                                    </LinearLayout>
                                </LinearLayout>
                            ))}
                        </LinearLayout>
                    </LinearLayout>
                </LinearLayout>
            </LinearLayout>
        </ViewPagerFragment>
    );
};
