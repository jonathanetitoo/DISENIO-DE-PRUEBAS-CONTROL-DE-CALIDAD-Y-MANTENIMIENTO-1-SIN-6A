# Aqui se utiliza radon para medir la complejidad ciclomática de los test.
from pathlib import Path
import json
from radon.complexity import cc_visit

def main():
    tests_dir = Path("tests")
    out = []

    # Aqui recorre todos los archivos de pruebas tipo test_*.py.
    for py in tests_dir.rglob("test_*.py"):
        code = py.read_text(encoding="utf-8")

        # La herramienta radon analiza el código y devuelve bloques (funciones, clases, etc.) con su CC.
        blocks = cc_visit(code)
        for b in blocks:
            # Se queda solo con funciones que sean tests (empiezan con test_).
            if getattr(b, "name", "").startswith("test_"):
                out.append({
                    "file": str(py),
                    "test": b.name,
                    "cc": b.complexity
                })

    # Aquí se guarda el reporte en JSON para evidencia/automatización.
    Path("reports").mkdir(exist_ok=True)
    Path("reports/complexity_by_test.json").write_text(
        json.dumps(out, indent=2),
        encoding="utf-8"
    )

    # Por último, muestra en consola los tests más “complejos” (mayor CC).
    if out:
        worst = sorted(out, key=lambda x: x["cc"], reverse=True)[:10]
        print("Top CC (más complejos):")
        for r in worst:
            print(f'{r["cc"]:>2}  {r["file"]}::{r["test"]}')

if __name__ == "__main__":
    main()
