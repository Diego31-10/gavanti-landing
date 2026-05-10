#!/bin/bash
set -e

# Asegurar permisos en node_modules
chmod +x node_modules/.bin/* 2>/dev/null || true

# Build
npm run build
