# Mediante un reporte de tipo JSON se muestra el resultado de las pruebas inestables (flaky).
import json
import subprocess
from collections import defaultdict
from pathlib import Path

# Se asigna cuántas veces se va a repetir toda la suite para buscar “inestabilidad”.
# En este caso, son 10 veces.
RUNS = 10

def one_run(i: int) -> dict:
    # Se ejecuta pytest una vez y guarda un reporte JSON con los resultados.
    out = Path(f"reports/pytest_run_{i}.json")
    cmd = [
        "python", "-m", "pytest", "-q",
        "--json-report",
        f"--json-report-file={out}",
        "tests"
    ]
    subprocess.run(cmd, check=False)
    return json.loads(out.read_text(encoding="utf-8"))

def main():
    Path("reports").mkdir(exist_ok=True)

    # Aquí se cuenta los resultados por test (nodeid) acumulado en las 10 corridas.
    outcomes = defaultdict(lambda: {"passed": 0, "failed": 0, "skipped": 0, "error": 0})
    for i in range(1, RUNS + 1):
        data = one_run(i)
        for t in data.get("tests", []):
            nodeid = t.get("nodeid")
            outcome = t.get("outcome")
            if outcome in outcomes[nodeid]:
                outcomes[nodeid][outcome] += 1

    # Como se sabe, un test se considera flaky si a veces pasa y a veces falla (en las mismas condiciones).
    flaky = []
    for nodeid, c in outcomes.items():
        if c["failed"] > 0 and c["passed"] > 0:
            flaky.append({"nodeid": nodeid, **c, "runs": RUNS})

    # Se ordena el reporte final para evidencia
    report = {"runs": RUNS, "flaky": flaky, "all": outcomes}
    Path("reports/flaky_report.json").write_text(json.dumps(report, indent=2), encoding="utf-8")

    # Se muestra el resumen en consola
    if not flaky:
        print(f"No flaky tests detectados en {RUNS} corridas.")
    else:
        print("Flaky tests detectados:")
        for f in flaky:
            print(f'- {f["nodeid"]}  passed={f["passed"]} failed={f["failed"]} (runs={RUNS})')

if __name__ == "__main__":
    main()
