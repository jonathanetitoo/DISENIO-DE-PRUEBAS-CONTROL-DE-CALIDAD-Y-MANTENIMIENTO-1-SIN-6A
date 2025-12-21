# PARTE 3 - Sección 2: Modelo Predictivo Personalizado (Confiabilidad)

## Qué se entrega
Este módulo implementa un modelo simple de predicción de confiabilidad por módulo. Combina:
- Un componente logarítmico que representa tendencia de riesgo (defectos históricos, complejidad y uso).
- Un componente estocástico que representa variabilidad (tasa de fallos, cobertura y mutation kill rate).

La salida se genera por módulo en formato JSON para integrarse fácilmente con reportes del repositorio.

## Archivos
- `model.py`: script principal del modelo predictivo.
- `usage_patterns.json`: patrones de uso por módulo (inputs).
- `predictions/`: carpeta de salida autogenerada al ejecutar el modelo.
- `predictions/predictions_by_module.json`: resultados por módulo.

## Cómo ejecutar
Desde la raíz del repositorio:

```bash
python PARTE_3/SECCION_2_MODELO_PREDICTIVO/model.py
