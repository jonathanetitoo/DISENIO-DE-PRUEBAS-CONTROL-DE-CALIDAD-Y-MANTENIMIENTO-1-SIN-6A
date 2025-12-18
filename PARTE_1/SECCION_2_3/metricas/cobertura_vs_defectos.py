# Aqui se utiliza coverage para la cobertura y mutmut para los defectos detectados.
import re
import subprocess
from pathlib import Path

def run_coverage():
    # Se ejecuta pytest con coverage y guarda un XML en reports/coverage.xml.
    Path("reports").mkdir(exist_ok=True)
    cmd = [
        "python", "-m", "pytest", "-q",
        "--cov=busqueda_binaria",
        "--cov-report=term-missing",
        "--cov-report=xml:reports/coverage.xml",
        "tests"
    ]
    subprocess.run(cmd, check=True)

def parse_coverage_percent_from_xml(xml_path: Path) -> float:
    # Se lee el % de cobertura desde el XML.
    text = xml_path.read_text(encoding="utf-8")
    m = re.search(r'line-rate="([0-9.]+)"', text)
    if not m:
        return 0.0
    return float(m.group(1)) * 100.0

def run_mutmut_and_count():
    # Aqui se corre mutmut y cuenta cuántos mutantes quedaron "vivos" (survived/timeout/etc.)
    subprocess.run(["mutmut", "run"], check=False)
    res = subprocess.run(["mutmut", "results"], capture_output=True, text=True, check=False)
    lines = [ln.strip() for ln in res.stdout.splitlines() if ln.strip()]
    survived_or_other = len(lines)
    return survived_or_other, lines

def main():
    # Se muestra la cobertura de código
    run_coverage()
    cov = parse_coverage_percent_from_xml(Path("reports/coverage.xml"))

    # Se muestran los defectos aprocimos, es decir, mutantes no matados
    survived_count, details = run_mutmut_and_count()

    # Se guarda un resumen para evidencias
    Path("reports/coverage_vs_defects.txt").write_text(
        f"coverage_percent={cov:.2f}\n"
        f"mutmut_not_killed_count={survived_count}\n"
        f"mutmut_not_killed_details=\n" + "\n".join(details) + "\n",
        encoding="utf-8"
    )

    print(f"Cobertura (line-rate): {cov:.2f}%")
    print(f"Mutantes NO matados (survived/timeout/etc.): {survived_count}")
    if survived_count:
        print("Revisa reports/coverage_vs_defects.txt para ver cuáles.")

if __name__ == "__main__":
    main()
