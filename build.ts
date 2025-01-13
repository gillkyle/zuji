import dts from "bun-plugin-dts";

// Generates `dist/index.d.ts` at build time
await Bun.build({
  entrypoints: ["./src/index.ts"],
  outdir: "./dist",
  plugins: [dts()],
});
