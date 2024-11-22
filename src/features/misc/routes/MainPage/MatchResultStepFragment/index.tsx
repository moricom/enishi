import React from "react";

import { Typography } from "@/enishi-ui/components/dataDisplay/Typography";
import { LinearLayout } from "@/enishi-ui/components/layout/LinearLayout";
import { ViewPagerFragment } from "@/enishi-ui/components/layout/ViewPagerFragment";

import { generateFavoritedData } from "@/features/misc/routes/MainPage/MatchResultStepFragment/generateFavoritedData";
import { generatePairs } from "@/features/misc/routes/MainPage/MatchResultStepFragment/generatePairs";

import type { MatchData } from "@/features/misc/routes/MainPage/type";
type Props = React.ComponentPropsWithRef<typeof ViewPagerFragment> & {
    readonly matchData: MatchData;
};

export const MatchRegistrationStepFragment: React.FC<Props> = ({ matchData, ...props }) => {
    const pairs = generatePairs(matchData);
    const dataWithFavoritedBy = generateFavoritedData(matchData);

    return (
        <ViewPagerFragment {...props} style={{ display: "block" }}>
            <LinearLayout gap="1rem" orientation="vertical">
                <LinearLayout orientation="vertical">
                    <Typography variant="h3">カップル</Typography>
                    <LinearLayout orientation="vertical">
                        {pairs.map((x) => (
                            <LinearLayout gravity="center_left" key={`${x.man}${x.woman}`}>
                                <LinearLayout gravity="center" style={{ width: "2rem" }}>
                                    <Typography>{x.man}</Typography>
                                    <Typography>{x.woman}</Typography>
                                </LinearLayout>
                            </LinearLayout>
                        ))}
                    </LinearLayout>
                </LinearLayout>
                <LinearLayout orientation="vertical">
                    <Typography variant="h3">Liked</Typography>
                    <LinearLayout orientation="vertical">{dataWithFavoritedBy.men.map((x) => x.favoritedBy.join(","))}</LinearLayout>
                    <LinearLayout />
                </LinearLayout>
            </LinearLayout>
        </ViewPagerFragment>
    );
};
