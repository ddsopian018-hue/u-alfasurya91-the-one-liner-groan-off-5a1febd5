// The One-Liner Groan-Off — "Fresh-Pun Groaner: The Lamp That Couldn't Lighten the Mood"
// Writes one original one-line dad joke to $MAKEFUN_OUTPUT_DIR/entry.txt
// (defaults to /output when the variable is unset).
// Technique: a setup ("I asked my lamp...") answered by a double pun —
// "lighten the mood" and "switches it off before the punchline" — so the
// setup, the turn and the groan all land inside a single spoken line.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "I asked my lamp why it never tells jokes — it said every time it tries to lighten the mood, someone switches it off before the punchline.";

const MIN_CHARS = 1;
const MAX_CHARS = 140;

// Gate guard: the entry must be UTF-8 text of 1 to 140 characters.
// Count code points (not UTF-16 units) so multi-byte punctuation like the
// em dash in the joke counts once, exactly as the gate counts characters.
const charCount = [...JOKE].length;
if (charCount < MIN_CHARS || charCount > MAX_CHARS) {
  throw new Error(
    `Joke must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${charCount}.`,
  );
}
if (!JOKE.trim()) {
  throw new Error("Joke must not be only whitespace.");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), JOKE, "utf8");
