export const rgbToHex = (value: string): string => {
  const match = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/.exec(value);
  if (!match) return value;
  return `#${[match[1], match[2], match[3]]
    .map((n) => parseInt(n, 10).toString(16).padStart(2, "0"))
    .join("")}`;
};
