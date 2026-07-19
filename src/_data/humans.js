import { execSync } from "node:child_process";

function run(command) {
  try {
    return execSync(command, { encoding: "utf8" }).trim();
  } catch {
    return "";
  }
}

function lines(command) {
  const output = run(command);
  return output
    ? output
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
    : [];
}

const authors = lines("git log --format='%aN <%aE>' | sort -u");
const contributors = lines("git shortlog -sne --all | sed 's/^\\s*[0-9]*\\s*//'");

const coauthorMatches = run("git log --format=%B")
  .split("\n")
  .map((line) => line.match(/^Co-authored-by:\s*(.+)$/i)?.[1]?.trim())
  .filter(Boolean);

const coauthors = [...new Set(coauthorMatches)].sort((a, b) => a.localeCompare(b));

export default {
  authors,
  contributors,
  coauthors,
  lastCommitDate: run("git log -1 --date=short --format=%cd") || "unknown"
};
