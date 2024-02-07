// uno.config.ts
import {
  defineConfig,
  presetUno,
  transformerDirectives,
  presetTypography,
  presetIcons,
} from "unocss";

export default defineConfig({
  presets: [
    presetUno(),
    presetTypography(),
    presetIcons(),
    // ...custom presets
  ],
  transformers: [transformerDirectives()],
  theme: {
    colors: {
      bg: "var(--bg)",
      fg: "var(--fg)",
      primary: "var(--p)",
    },
  },
  shortcuts: [
    // you could still have object style
    {
      layout: "grid px-4 py-8 max-w-5xl mx-auto",
      btn: "flex gap-2 items-center py-2 px-4 font-semibold rounded-lg shadow-md whitespace-nowrap transition-colors bg-bg text-fg",
      "neutral-btn":
        "inline-flex items-center justify-center whitespace-nowrap rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-80 bg-bg c-fg shadow-md px-4 py-2 h-10 w-full gap-2",
      input:
        "flex w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-500/10 disabled:opacity-50",
    },
    // dynamic shortcuts
    [/^btn-(.*)$/, ([, c]) => `bg-${c}-400 text-${c}-100`],
  ],
});
