#!/bin/bash

set -e

# =========================
# CONFIG
# =========================
BRANCH="master"

# =========================
# CHECKS
# =========================
echo "🔍 Checking current branch..."
CURRENT_BRANCH=$(git branch --show-current)

if [ "$CURRENT_BRANCH" != "$BRANCH" ]; then
  echo "❌ Harus di branch $BRANCH (sekarang: $CURRENT_BRANCH)"
  exit 1
fi

echo "🔍 Checking uncommitted changes..."
if [ -n "$(git status --porcelain)" ]; then
  echo "❌ Masih ada perubahan yang belum di-commit"
  exit 1
fi

# =========================
# INPUT VERSION TYPE
# =========================
echo "Pilih version bump:"
echo "1) patch"
echo "2) minor"
echo "3) major"
read -p "Masukkan pilihan (1/2/3): " choice

case $choice in
  1) VERSION_TYPE="patch" ;;
  2) VERSION_TYPE="minor" ;;
  3) VERSION_TYPE="major" ;;
  *) echo "❌ Pilihan tidak valid"; exit 1 ;;
esac

# =========================
# BUMP VERSION
# =========================
echo "📦 Bumping version ($VERSION_TYPE)..."
NEW_VERSION=$(npm version $VERSION_TYPE)

echo "✅ New version: $NEW_VERSION"

# =========================
# PUSH
# =========================
echo "🚀 Pushing to origin..."
git push origin $BRANCH --follow-tags

# =========================
# OPTIONAL: GITHUB RELEASE
# =========================
if command -v gh &> /dev/null
then
  echo "📢 Creating GitHub release..."
  gh release create "$NEW_VERSION" \
    --title "$NEW_VERSION" \
    --notes "Release $NEW_VERSION"
else
  echo "⚠️ gh CLI tidak ditemukan, skip GitHub release"
fi

echo "🎉 Release selesai!"