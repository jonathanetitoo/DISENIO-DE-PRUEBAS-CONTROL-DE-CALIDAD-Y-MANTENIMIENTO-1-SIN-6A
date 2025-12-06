# doe/generate_tests_from_pairwise.py
import pandas as pd
from pathlib import Path

df = pd.read_csv("../reports/pairwise_cases.csv")
out = Path("../tests/test_pairwise_generated.py")
out.parent.mkdir(parents=True, exist_ok=True)

with open(out, "w", encoding="utf-8") as f:
    f.write("import pytest\n\n")
    f.write("from src.some_module import dummy_function_to_test\n\n")  # reemplaza por tu función real
    f.write("@pytest.mark.parametrize('tipo,metodo,navegador,estado,so', [\n")
    for _, row in df.iterrows():
        f.write(f"    ('{row['tipo_usuario']}','{row['metodo_auth']}','{row['navegador']}','{row['estado_red']}','{row['sistema_op']}'),\n")
    f.write("])\n")
    f.write("def test_pairwise(tipo,metodo,navegador,estado,so):\n")
    f.write("    # Aquí se debe mapear los parámetros a la llamada real de tu función\n")
    f.write("    # Por ahora, ejemplo dummy:\n")
    f.write("    assert True\n")
