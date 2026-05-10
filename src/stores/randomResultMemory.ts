type RandomResult = { th: string; en: string; mode: string };

let randomResult: RandomResult | null = null;

export const getRandomResult = (mode: string): Omit<RandomResult, "mode"> | null =>
  randomResult?.mode === mode ? { th: randomResult.th, en: randomResult.en } : null;

export const setRandomResult = (result: Omit<RandomResult, "mode">, mode: string): void => {
  randomResult = { ...result, mode };
};
