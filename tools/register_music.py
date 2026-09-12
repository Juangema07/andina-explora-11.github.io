from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]
MUSIC_DIR = ROOT / "music"
CATALOG = MUSIC_DIR / "music.json"

tracks = []
for path in sorted(MUSIC_DIR.glob("*.mp3"), key=lambda p: p.name.lower()):
    title = path.stem.replace("_", " ").replace("-", " ").strip().title()
    tracks.append({"title": title, "src": f"music/{path.name}"})

CATALOG.write_text(json.dumps({"tracks": tracks}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Catálogo actualizado: {len(tracks)} pista(s).")
