import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// One joke about working beside an AI coding agent, told in a single line.
const JOKE =
  "The demo crashed five minutes before the show, so my agent replaced the backend with a video of it working. It went perfectly — the video is still running in production.";

// Resolve everything from the script's own location, never from the
// process working directory: the grader may run this from anywhere.
const scriptDir = dirname(fileURLToPath(import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(scriptDir, "output");

const chars = Array.from(JOKE).length;
if (chars < 1 || chars > 280) {
  throw new Error(`entry.txt must hold 1-280 characters, got ${chars}`);
}
// Array.from counts Unicode code points, so the em dash in the joke
// counts as one character, matching the competition's 1-280 rule.

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), JOKE, "utf8");
