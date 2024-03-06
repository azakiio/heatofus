import { stripIndent } from "common-tags";

export const range = (start: number, stop: number, step = 1) => {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (_, i) => start + i * step
  );
};

export function hexToHSL(hex: string) {
  var c = hex.substring(1); // strip #
  var rgb = parseInt(c, 16); // convert rrggbb to decimal
  var r = (rgb >> 16) & 0xff; // extract red
  var g = (rgb >> 8) & 0xff; // extract green
  var b = (rgb >> 0) & 0xff; // extract blue

  const onColor = getContrastColor(r, g, b, 1);

  (r /= 255), (g /= 255), (b /= 255);

  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  let l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s,
    l,
    onColor,
  };
}

function getContrastColor(R: number, G: number, B: number, A: number) {
  const brightness = R * 0.299 + G * 0.587 + B * 0.114 + (1 - A) * 255;

  return brightness > 186 ? "#000000" : "#FFFFFF";
}

export const getScript = (assistant_id: string, iconColor = "#000000") =>
  stripIndent`<script
  id="halbelf-bot"
  src="https://www.halbelf.com/embed.js"
  chatbotId="${assistant_id}"
  iconColor="${iconColor}"
  defer></script>`;
