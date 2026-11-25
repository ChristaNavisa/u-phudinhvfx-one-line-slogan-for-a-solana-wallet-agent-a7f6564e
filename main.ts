import { mkdirSync, writeFileSync } from "node:fs";

// One slogan for a Solana wallet agent, at most 20 words, one line.
// The program is deterministic: it always writes this exact text.
const ENTRY =
  "Your money goes out. Your wallet does the worrying.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 140 characters
// and at most 20 words, not only white space. The slogan is one line:
// money leaves, the wallet carries the worry. Refuse to write anything
// that would fail it.
const WORDS = ENTRY.trim().split(/\s+/).length;
if (ENTRY.length < 1 || ENTRY.length > 140 || WORDS > 20 || !ENTRY.trim()) {
  throw new Error(
    `entry fails the gate: ${ENTRY.length} characters, ${WORDS} words`,
  );
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, ENTRY, "utf8");
