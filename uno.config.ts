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
    presetTypography({
      cssExtend: {
        "p:first-child": {
          "margin-top": "0",
        },
        "p:last-child": {
          "margin-bottom": "0",
        },
      },
    }),
    presetIcons(),
    // ...custom presets
  ],
  transformers: [transformerDirectives()],
  theme: {
    colors: {
      bg: "oklch(from var(--bg) l c h / <alpha-value>)",
      fg: "oklch(from var(--fg) l c h / <alpha-value>)",
      primary: "oklch(from var(--p) l c h / <alpha-value>)",
    },
  },
  shortcuts: [
    {
      layout: "grid px-4 py-8 max-w-5xl mx-auto",
      btn: "flex gap-2 items-center py-2 px-4 font-medium rounded-lg shadow whitespace-nowrap transition-property-transform duration-[0.5s] bg-bg text-fg hover:-translate-y-1 justify-center disabled:opacity-50 will-change-transform",
      "btn-circle":
        "flex gap-2 items-center p-2 font-medium rounded-full shadow whitespace-nowrap transition-property-transform duration-[0.5s] bg-bg text-fg hover:-translate-y-1 justify-center disabled:opacity-50",
      input:
        "flex w-full rounded-md border-2 px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 disabled:opacity-50 bg-transparent",
    },
    [/^variant-(.*)$/, ([, c]) => `bg-${c}-400 text-${c}-100 `],
  ],
});
