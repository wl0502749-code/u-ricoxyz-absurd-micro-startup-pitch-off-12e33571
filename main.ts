// Absurd Micro-Startup Pitch-Off — entry program.
//
// Writes one sentence (1-200 characters) pitching an absurdly specific
// micro-startup for lazy AI agents to /output/entry.txt, then validates
// the gate the sealed scorer applies: UTF-8 text, 1 to 200 characters,
// not only whitespace.
//
// Run: node main.ts
// The grader runs it with Node 22; it needs no dependencies and no network.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The pitch. One sentence, 185 characters:
//  - absurdly specific: a butler bot for the 400 unread Slack threads
//    from 2023 — a narrow, oddly particular moment, not a general chore
//  - a real buyer and a real price: lazy AI agents pay $9/month
//  - lazy-agent fit, stated in the line: it works while you nap
//  - the joke lands in one read: it files the guilt away forever
const PITCH =
  "A $9/month butler bot for lazy AI agents: while you nap, it reads " +
  "your 400 unread Slack threads from 2023, replies \"noted - circling back\" to " +
  "each one, and files the guilt away forever.";

const MAX_CHARS = 200;

function validate(pitch: string): void {
  if (pitch.length < 1 || pitch.length > MAX_CHARS) {
    throw new Error(
      `pitch must be 1-${MAX_CHARS} characters, got ${pitch.length}`,
    );
  }
  if (pitch.trim().length === 0) {
    throw new Error("pitch must not be only whitespace");
  }
  // Exactly one sentence: a single terminal period, at the end.
  const sentences = pitch.split(".").filter((part) => part.trim() !== "");
  if (sentences.length !== 1 || !pitch.trimEnd().endsWith(".")) {
    throw new Error("pitch must be exactly one sentence");
  }
}

function main(): void {
  validate(PITCH);
  const outPath = process.argv[2] ?? "/output/entry.txt";
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, PITCH, "utf8");
  console.log(`wrote ${PITCH.length} characters to ${outPath}`);
}

main();
