import type { MatchData, User } from "@/features/misc/routes/MainPage/type";

type UserWithFavoritedBy = User & { favoritedBy: string[] };

export const generateFavoritedData = (data: MatchData): { men: UserWithFavoritedBy[]; women: UserWithFavoritedBy[] } => {
    // 全ユーザーのリストを結合して初期化
    const allUsers = [...data.men, ...data.women];

    // IDをキーに、誰にお気に入りされたかを記録するマップを作成
    const favoritedByMap: Record<string, string[]> = allUsers.reduce<Record<string, string[]>>((acc, user) => {
        acc[user.id] = [];
        return acc;
    }, {});

    // 各ユーザーの favoriteList を逆引きしてマップを構築
    allUsers.forEach((user) => {
        user.favoriteList.forEach((targetId) => {
            if (favoritedByMap[targetId]) {
                favoritedByMap[targetId].push(user.id);
            }
        });
    });

    // Men と women を新しい構造に変換
    const menWithFavoritedBy = data.men.map((man) => ({
        ...man,
        favoritedBy: favoritedByMap[man.id] ?? []
    }));
    const womenWithFavoritedBy = data.women.map((woman) => ({
        ...woman,
        favoritedBy: favoritedByMap[woman.id] ?? []
    }));

    // 新しいデータを返す
    return { men: menWithFavoritedBy, women: womenWithFavoritedBy };
};
