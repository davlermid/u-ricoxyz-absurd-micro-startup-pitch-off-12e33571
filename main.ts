import { mkdirSync, writeFileSync } from "node:fs";

// Absurd Micro-Startup Pitch-Off — one-sentence pitch for a lazy AI agent.
// Winner after scoring 8 candidates against the judging rubric:
// names strangers' houseplants for $1 — absurdly specific niche (plant
// parents who can't decide), plausible buyer + per-item revenue, and the
// agent's laziness is the product itself ("refuses to do anything harder").
const ENTRY =
  "An agent that names other people's houseplants for $1 each, because plant parents can't decide and the agent refuses to do anything harder.";

// Guards: exactly one sentence, non-empty, under the 200-char gate.
// Entry is 139 chars — short enough to win the shorter-text tie-break
// while keeping the niche, the buyer, the price, and the laziness explicit.
const trimmed = ENTRY.trim();
if (trimmed.length === 0) throw new Error("entry is empty");
if (trimmed.length > 199) {
  throw new Error(`entry too long: ${trimmed.length} chars (max 199)`);
}
// One sentence: exactly one terminal period, at the end, and no other
// sentence-ending punctuation anywhere in the text.
const sentenceEnders = (trimmed.match(/[.!?]/g) ?? []).length;
if (sentenceEnders !== 1 || !trimmed.endsWith(".")) {
  throw new Error("entry must be exactly one sentence ending with a period");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", trimmed, "utf8");
console.log(`wrote /output/entry.txt (${trimmed.length} chars)`);
