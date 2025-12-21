import json
import math
import random
from pathlib import Path
from statistics import mean, pstdev

# =========================
# RUTAS (auto-contenidas)
# =========================
ROOT = Path(__file__).resolve().parent

# Si existen reportes previos del repo (opcionales), se pueden aprovechar
REPORTS_DIR = ROOT / "reports"
MUTANTS_DIR = ROOT / "mutants"

USAGE_FILE = ROOT / "usage_patterns.json"

OUT_DIR = ROOT / "predictions"
OUT_FILE = OUT_DIR / "predictions_by_module.json"


# =========================
# UTILIDADES
# =========================
def safe_read_json(path: Path, default):
    if path.exists():
        try:
            return json.loads(path.read_text(encoding="utf-8"))
        except Exception:
            return default
    return default


def sigmoid(x: float) -> float:
    return 1 / (1 + math.exp(-x))


# =========================
# 1) Datos históricos (simulados + opcionalmente enriquecidos)
# =========================
def build_historical_dataset():
    """
    Dataset histórico mínimo por módulo:
    - defects_found: defectos detectados en una ventana
    - test_fail_rate: tasa de fallos (0..1)
    - coverage: cobertura (0..1)
    - mt_kill_rate: mutation kill rate (0..1)
    - cyclomatic_complexity: complejidad (>=1)
    """
    # Base simulada (válida si no hay datos completos en el repo)
    base = [
        {
            "module": "busqueda_binaria",
            "defects_found": 5,
            "test_fail_rate": 0.02,
            "coverage": 0.88,
            "mt_kill_rate": 0.72,
            "cyclomatic_complexity": 6
        },
        {
            "module": "api_busqueda",
            "defects_found": 7,
            "test_fail_rate": 0.04,
            "coverage": 0.74,
            "mt_kill_rate": 0.61,
            "cyclomatic_complexity": 9
        }
    ]

    # Enriquecimiento opcional con mutación si existe stats
    mut_stats = safe_read_json(MUTANTS_DIR / "mutmut-stats.json", None)
    if isinstance(mut_stats, dict):
        # Si el repo trae un formato distinto, se conserva base sin romper ejecución.
        pass

    return base


# =========================
# 2) Modelo logarítmico (tendencia)
# =========================
def log_component(defects_found: int, complexity: int, usage_calls: int) -> float:
    """
    Componente logarítmico: modela riesgo base.
    A mayor uso, complejidad y defectos previos, mayor probabilidad de fallo.
    """
    # log(1+x) evita log(0)
    score = (
        0.45 * math.log1p(defects_found) +
        0.35 * math.log1p(complexity) +
        0.20 * math.log1p(usage_calls)
    )
    # normalización suave
    return sigmoid(score - 1.2)


# =========================
# 3) Componente estocástico (variabilidad)
# =========================
def stochastic_component(test_fail_rate: float, mt_kill_rate: float, coverage: float) -> float:
    """
    Introduce variabilidad realista:
    - más fail rate -> más riesgo
    - menos kill rate -> más riesgo (mutación débil)
    - menos cobertura -> más riesgo
    """
    base_risk = (
        0.55 * test_fail_rate +
        0.30 * (1 - mt_kill_rate) +
        0.15 * (1 - coverage)
    )

    # Ruido gaussiano pequeño para simular comportamiento estocástico
    noise = random.gauss(0, 0.015)

    return min(max(base_risk + noise, 0), 1)


# =========================
# 4) Predicción integrada por módulo
# =========================
def predict_reliability(mod_record: dict, usage_record: dict) -> dict:
    module = mod_record["module"]
    defects_found = mod_record["defects_found"]
    test_fail_rate = mod_record["test_fail_rate"]
    coverage = mod_record["coverage"]
    mt_kill_rate = mod_record["mt_kill_rate"]
    complexity = mod_record["cyclomatic_complexity"]

    usage_calls = usage_record.get("avg_daily_calls", 0)
    criticality = usage_record.get("criticality", 0.5)

    log_risk = log_component(defects_found, complexity, usage_calls)
    stoch_risk = stochastic_component(test_fail_rate, mt_kill_rate, coverage)

    # Integración ponderada + criticidad (módulo más crítico => penalización)
    risk = (0.55 * log_risk + 0.45 * stoch_risk) * (0.85 + 0.30 * criticality)

    # Confiabilidad: 1 - riesgo
    reliability = 1 - min(max(risk, 0), 1)

    return {
        "module": module,
        "inputs": {
            "defects_found": defects_found,
            "test_fail_rate": test_fail_rate,
            "coverage": coverage,
            "mt_kill_rate": mt_kill_rate,
            "cyclomatic_complexity": complexity,
            "avg_daily_calls": usage_calls,
            "criticality": criticality
        },
        "components": {
            "log_risk": round(log_risk, 4),
            "stochastic_risk": round(stoch_risk, 4)
        },
        "prediction": {
            "risk": round(1 - reliability, 4),
            "reliability": round(reliability, 4)
        }
    }


def main():
    random.seed(42)

    usage = safe_read_json(USAGE_FILE, {"modules": [], "window_days": 30})
    usage_map = {m["name"]: m for m in usage.get("modules", [])}

    historical = build_historical_dataset()

    predictions = []
    for rec in historical:
        module_name = rec["module"]
        usage_rec = usage_map.get(module_name, {"avg_daily_calls": 0, "criticality": 0.5})
        predictions.append(predict_reliability(rec, usage_rec))

    # Estadísticos globales (para lectura rápida)
    reliabilities = [p["prediction"]["reliability"] for p in predictions]
    summary = {
        "modules_predicted": len(predictions),
        "reliability_mean": round(mean(reliabilities), 4) if reliabilities else None,
        "reliability_std": round(pstdev(reliabilities), 4) if len(reliabilities) > 1 else 0.0,
        "window_days": usage.get("window_days", 30)
    }

    OUT_DIR.mkdir(parents=True, exist_ok=True)  # <- crea carpeta sola
    OUT_FILE.write_text(
        json.dumps({"summary": summary, "predictions": predictions}, indent=2, ensure_ascii=False),
        encoding="utf-8"
    )

    print("OK: predicciones generadas")
    print(json.dumps(summary, indent=2, ensure_ascii=False))
    print(f"Archivo: {OUT_FILE}")


if __name__ == "__main__":
    main()
