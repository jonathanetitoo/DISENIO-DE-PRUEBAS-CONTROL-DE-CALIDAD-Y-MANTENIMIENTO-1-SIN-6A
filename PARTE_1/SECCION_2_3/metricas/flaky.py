import json
import subprocess
from collections import defaultdict
from pathlib import Path

RUNS = 10

def one_run(i: int) -> dict:
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

    outcomes = defaultdict(lambda: {"passed": 0, "failed": 0, "skipped": 0, "error": 0})
    for i in range(1, RUNS + 1):
        data = one_run(i)
        for t in data.get("tests", []):
            nodeid = t.get("nodeid")
            outcome = t.get("outcome")
            if outcome in outcomes[nodeid]:
                outcomes[nodeid][outcome] += 1

    flaky = []
    for nodeid, c in outcomes.items():
        if c["failed"] > 0 and c["passed"] > 0:
            flaky.append({"nodeid": nodeid, **c, "runs": RUNS})

    report = {"runs": RUNS, "flaky": flaky, "all": outcomes}
    Path("reports/flaky_report.json").write_text(json.dumps(report, indent=2), encoding="utf-8")

    if not flaky:
        print(f"No flaky tests detectados en {RUNS} corridas.")
    else:
        print("Flaky tests detectados:")
        for f in flaky:
            print(f'- {f["nodeid"]}  passed={f["passed"]} failed={f["failed"]} (runs={RUNS})')

if __name__ == "__main__":
    main()
