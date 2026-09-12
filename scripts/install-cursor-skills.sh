#!/usr/bin/env bash
set -euo pipefail

WORKSPACE="/var/www"
SKILLS_DIR="$WORKSPACE/.agents/skills"
mkdir -p "$SKILLS_DIR"
cd "$WORKSPACE"

echo "Installing community Cursor skills into $SKILLS_DIR …"

# Vue stack
npx skills add vuejs-ai/skills -a cursor -y \
  --skill vue-options-api-best-practices \
  --skill vue-debug-guides \
  --skill vue-router-best-practices

npx skills add antfu/skills -a cursor -y --skill vue

# Design — npx skills registry
npx skills add anthropics/skills -a cursor -y --skill frontend-design
npx skills add pbakaus/impeccable -a cursor -y

# Design — git copy (not in skills.sh registry as single packages)
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

echo "Installing ui-design-brain…"
git clone --depth 1 https://github.com/carmahhawwari/ui-design-brain.git "$TMP/ui-design-brain"
rm -rf "$SKILLS_DIR/ui-design-brain"
cp -r "$TMP/ui-design-brain" "$SKILLS_DIR/ui-design-brain"

echo "Installing @flitzrrr/frontend-design-skills (21 domain skills)…"
git clone --depth 1 https://github.com/flitzrrr/frontend-design-skills.git "$TMP/fds"
for d in "$TMP/fds/skills-src"/*/; do
  name="$(basename "$d")"
  [[ "$name" == "_template" ]] && continue
  rm -rf "$SKILLS_DIR/$name"
  cp -r "$d" "$SKILLS_DIR/$name"
done

# Optional: full Impeccable bundle from impeccable.style (if network allows)
# npx impeccable@2.3.2 skills install -y

echo ""
echo "Done. Community skills: $SKILLS_DIR"
echo "Project skills: $WORKSPACE/.cursor/skills/speakyninja-*"
echo "Re-run after clone: bash scripts/install-cursor-skills.sh"
