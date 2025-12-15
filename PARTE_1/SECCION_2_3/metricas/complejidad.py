from pathlib import Path
import json
from radon.complexity import cc_visit

def main():
    tests_dir = Path("tests")
    out = []

    for py in tests_dir.rglob("test_*.py"):
        code = py.read_text(encoding="utf-8")
        blocks = cc_visit(code)
        for b in blocks:
            # Solo funciones de test
            if getattr(b, "name", "").startswith("test_"):
                out.append({
                    "file": str(py),
                    "test": b.name,
                    "cc": b.complexity
                })

    Path("reports").mkdir(exist_ok=True)
    Path("reports/complexity_by_test.json").write_text(json.dumps(out, indent=2), encoding="utf-8")

    if out:
        worst = sorted(out, key=lambda x: x["cc"], reverse=True)[:10]
        print("Top CC (más complejos):")
        for r in worst:
            print(f'{r["cc"]:>2}  {r["file"]}::{r["test"]}')

if __name__ == "__main__":
    main()
