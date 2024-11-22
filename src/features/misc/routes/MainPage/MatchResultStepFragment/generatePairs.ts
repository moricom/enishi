import type { MatchData } from "@/features/misc/routes/MainPage/type";

export const generatePairs = (data: MatchData): { man: string; woman: string }[] =>
    data.men.flatMap((man) =>
        man.favoriteList.flatMap((womanId) => {
            const woman = data.women.find((w) => w.id === womanId);
            // お互いにお気に入り登録されている場合のみペアを作成
            if (woman?.favoriteList.includes(man.id)) {
                return { man: man.name, woman: woman.name };
            }
            return [];
        })
    );
