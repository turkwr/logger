import chalk from "chalk";

const hexRgb = (h: string): [number, number, number] => {
  const s = h.replace("#", "");
  return [
    parseInt(s.slice(0, 2), 16),
    parseInt(s.slice(2, 4), 16),
    parseInt(s.slice(4, 6), 16),
  ];
};

export const gradient = (
  text: string,
  from = "#a879ff",
  to = "#ffffff",
): string => {
  const [fr, fg, fb] = hexRgb(from);
  const [tr, tg, tb] = hexRgb(to);
  const chars = [...text];
  return chars
    .map((ch, i) => {
      const t = chars.length <= 1 ? 0 : i / (chars.length - 1);
      const r = Math.round(fr + (tr - fr) * t);
      const g = Math.round(fg + (tg - fg) * t);
      const b = Math.round(fb + (tb - fb) * t);
      return chalk.rgb(r, g, b)(ch);
    })
    .join("");
};
