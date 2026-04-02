#!/bin/bash
DB="/Volumes/External/openclaw-workspace-v2/deckpad/deckpad.db"
BACKUP_DIR="/Volumes/External/openclaw-workspace-v2/deckpad/backups"
mkdir -p "$BACKUP_DIR"
DATE=$(date +%Y-%m-%d_%H%M)
cp "$DB" "$BACKUP_DIR/deckpad-${DATE}.db"
find "$BACKUP_DIR" -name "*.db" -mtime +7 -delete
echo "Backup: deckpad-${DATE}.db"
