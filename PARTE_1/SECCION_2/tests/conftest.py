from pathlib import Path
import sys

REPO_ROOT = Path(__file__).resolve().parents[3]
SECCION_2 = REPO_ROOT / "PARTE_1" / "SECCION_2"

repo_str = str(REPO_ROOT)
sec_str = str(SECCION_2)

if repo_str not in sys.path:
    sys.path.insert(0, repo_str)

if sec_str not in sys.path:
    sys.path.insert(0, sec_str)
