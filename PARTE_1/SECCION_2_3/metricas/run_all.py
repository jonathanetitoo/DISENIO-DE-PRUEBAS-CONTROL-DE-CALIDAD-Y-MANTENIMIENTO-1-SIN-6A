import subprocess
from pathlib import Path

def banner(titulo: str):
    print("\n" + "=" * 70)
    print(titulo)
    print("=" * 70)

BASE = Path(__file__).resolve().parent
PROYECTO = BASE.parent

def main():
    banner("1) Complejidad ciclomática por prueba")
    subprocess.run(["python", str(BASE / "complejidad.py")], check=True, cwd=str(PROYECTO))

    banner("2) Análisis de tiempo de ejecución")
    subprocess.run(["python", str(BASE / "timings.py")], check=True, cwd=str(PROYECTO))

    banner("3) Detección de pruebas inestables (flaky tests)")
    subprocess.run(["python", str(BASE / "flaky.py")], check=True, cwd=str(PROYECTO))

    banner("4) Cobertura vs defectos detectados")
    subprocess.run(["python", str(BASE / "cobertura_vs_defectos.py")], check=True, cwd=str(PROYECTO))

    print("\n✔ Listo. Revisa la carpeta reports/")

if __name__ == "__main__":
    main()
