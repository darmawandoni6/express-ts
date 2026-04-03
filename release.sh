#!/bin/bash

set -e

BRANCH="master"

echo "🔍 Checking branch..."
CURRENT_BRANCH=$(git branch --show-current)

if [ "$CURRENT_BRANCH" != "$BRANCH" ]; then
  echo "❌ Harus di branch $BRANCH"
  exit 1
fi

if [ -n "$(git status --porcelain)" ]; then
  echo "❌ Working directory tidak bersih"
  exit 1
fi

echo "Pilih version bump:"
echo "1) patch"
echo "2) minor"
echo "3) major"
read -p "Pilihan: " choice

case $choice in
  1) VERSION_TYPE="patch" ;;
  2) VERSION_TYPE="minor" ;;
  3) VERSION_TYPE="major" ;;
  *) echo "❌ Invalid"; exit 1 ;;
esac

# =========================
# VERSIONING
# =========================
echo "📦 Bumping version..."
NEW_VERSION=$(npm version $VERSION_TYPE)

echo "✅ Version: $NEW_VERSION"

# =========================
# PUSH WITH ERROR HANDLING
# =========================
echo "🚀 Pushing..."

if git push origin $BRANCH --follow-tags; then
  echo "✅ Push success"
else
  echo "❌ Push gagal! Rolling back..."

  # delete tag
  git tag -d $NEW_VERSION

  # reset commit (balik ke sebelum npm version)
  git reset --hard HEAD~1

  echo "↩️ Rollback selesai"
  exit 1
fi

# =========================
# GITHUB RELEASE
# =========================
if command -v gh &> /dev/null
then
  gh release create "$NEW_VERSION" \
    --title "$NEW_VERSION" \
    --notes "Release $NEW_VERSION"
fi

echo "🎉 Release selesai!"