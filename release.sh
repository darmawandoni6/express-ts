#!/bin/bash

# Stop kalau ada error
set -e

# Cek apakah working directory bersih
if [ -n "$(git status --porcelain)" ]; then
  echo "❌ Git working directory tidak bersih. Commit atau stash dulu."
  exit 1
fi

# Ambil versi dari package.json
VERSION=$(node -p "require('./package.json').version")

echo "📦 Versi terdeteksi: v$VERSION"

# Cek apakah tag sudah ada
if git rev-parse "v$VERSION" >/dev/null 2>&1; then
  echo "⚠️ Tag v$VERSION sudah ada."
  exit 1
fi

# Buat tag
git tag -a "v$VERSION" -m "Release v$VERSION"

# Push tag ke remote
git push origin "v$VERSION"

echo "🚀 Berhasil release v$VERSION"