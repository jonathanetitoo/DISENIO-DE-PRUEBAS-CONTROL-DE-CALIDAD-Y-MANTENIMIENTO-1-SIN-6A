# Aqui se juntan todas las métricas plantedas con el fin de ejecutar todo en una sola salida.
import subprocess
from pathlib import Path

def banner(titulo: str):
    # Se imprime un separador simple para que la salida quede ordenada por secciones.
    print("\n" + "=" * 70)
    print(titulo)
    print("=" * 70)

# Se marca la carpeta donde está run_all.py (metricas/)
BASE = Path(__file__).resolve().parent
PROYECTO = BASE.parent

def main():
    # Aquí se ejecuta cada métrica como un “módulo” independiente, manteniendo el mismo cwd del proyecto
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
