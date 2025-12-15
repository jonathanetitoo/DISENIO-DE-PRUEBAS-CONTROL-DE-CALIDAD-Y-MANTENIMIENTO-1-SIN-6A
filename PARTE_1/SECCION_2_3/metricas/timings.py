import json
import subprocess
from pathlib import Path

def run_pytest_json(report_path: Path):
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
    run_pytest_json(report_path)

    data = json.loads(report_path.read_text(encoding="utf-8"))
    tests = data.get("tests", [])

    rows = []
    for t in tests:
        nodeid = t.get("nodeid")
        outcome = t.get("outcome")

        setup_d = t.get("setup", {}).get("duration", 0.0) or 0.0
        call_d  = t.get("call", {}).get("duration", 0.0) or 0.0
        tear_d  = t.get("teardown", {}).get("duration", 0.0) or 0.0
        duration = setup_d + call_d + tear_d

        rows.append({"nodeid": nodeid, "duration_s": duration, "outcome": outcome})

    rows.sort(key=lambda x: x["duration_s"], reverse=True)
    Path("reports/timings_by_test.json").write_text(
        json.dumps(rows, indent=2),
        encoding="utf-8"
    )

    print("Top 10 más lentos:")
    for r in rows[:10]:
        print(f'{r["duration_s"]:.8f}s  {r["nodeid"]}  ({r["outcome"]})')

if __name__ == "__main__":
    main()
