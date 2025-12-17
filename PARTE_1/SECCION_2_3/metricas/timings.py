# Este script se encarga del análisis de tiempo de ejecución de cada test.
import json
import subprocess
from pathlib import Path

def run_pytest_json(report_path: Path):
    # Se ejecuta pytest generando un reporte JSON con duraciones por test (setup/call/teardown).
    cmd = [
        "python", "-m", "pytest", "-q",
        "--json-report",
        f"--json-report-file={report_path}",
        "tests"
    ]
    subprocess.run(cmd, check=True)

def main():
    Path("reports").mkdir(exist_ok=True)
    report_path = Path("reports/pytest_report.json")

    # Aqui se corre la suite y captura resultados/duraciones en JSON.
    run_pytest_json(report_path)

    # Despues lee el reporte y extrae los tests.
    data = json.loads(report_path.read_text(encoding="utf-8"))
    tests = data.get("tests", [])

    rows = []
    for t in tests:
        nodeid = t.get("nodeid")
        outcome = t.get("outcome")

        # Se suman las tres fases del test para tener un tiempo total más realista.
        setup_d = t.get("setup", {}).get("duration", 0.0) or 0.0
        call_d  = t.get("call", {}).get("duration", 0.0) or 0.0
        tear_d  = t.get("teardown", {}).get("duration", 0.0) or 0.0
        duration = setup_d + call_d + tear_d

        rows.append({"nodeid": nodeid, "duration_s": duration, "outcome": outcome})

    # Aquí se ordena por los más lentos y guarda el reporte.
    rows.sort(key=lambda x: x["duration_s"], reverse=True)
    Path("reports/timings_by_test.json").write_text(
        json.dumps(rows, indent=2),
        encoding="utf-8"
    )

    # Por último se imprime un resumen con el top 10 pruebas mas lentas.
    print("Top 10 más lentos:")
    for r in rows[:10]:
        print(f'{r["duration_s"]:.8f}s  {r["nodeid"]}  ({r["outcome"]})')

if __name__ == "__main__":
    main()
