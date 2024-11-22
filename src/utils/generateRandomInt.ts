export const generateRandomInt = (min: number, max: number) => {
    const intMin = Math.ceil(min);
    const intMax = Math.floor(max + 1);
    return Math.floor(Math.random() * (intMax - intMin) + intMin);
};
