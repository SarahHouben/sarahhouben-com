#!/usr/bin/env node
// Runs Prettier on each file Claude Code edits, so formatting is enforced
// rather than left to instructions. It never blocks Claude Code: if
// formatting fails, the edit still stands and lint will catch it.
import { execFileSync } from "node:child_process";
import { isAbsolute, relative, resolve } from "node:path";

let input = "";
process.stdin.on("data", (chunk) => (input += chunk));
process.stdin.on("end", () => {
  try {
    const filePath = JSON.parse(input)?.tool_input?.file_path;
    if (!filePath) return;

    const projectDir = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();
    const pathInRepo = relative(projectDir, resolve(projectDir, filePath));
    if (pathInRepo.startsWith("..") || isAbsolute(pathInRepo)) return;

    execFileSync("npx", ["prettier", "--write", "--ignore-unknown", filePath], {
      cwd: projectDir,
      stdio: "ignore",
    });
  } catch {
    // Formatting problems must never interrupt the session.
  }
});
