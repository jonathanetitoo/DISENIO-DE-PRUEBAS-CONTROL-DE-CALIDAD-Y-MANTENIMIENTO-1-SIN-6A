# Herramienta DOE - Pairwise Testing en Go

![Go Version](https://img.shields.io/badge/Go-1.22+-00ADD8?style=flat&logo=go)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-production-brightgreen)

Herramienta de línea de comandos para generar casos de prueba óptimos mediante Diseño de Experimentos (DOE) utilizando la técnica de **Pairwise Testing** (combinación por pares).

## 📋 Tabla de Contenidos

- [Características](#características)
- [Instalación](#instalación)
- [Uso Rápido](#uso-rápido)
- [Documentación](#documentación)
- [Resultados](#resultados)
- [Teoría: Pairwise Testing](#teoría-pairwise-testing)
- [Ejemplo Completo](#ejemplo-completo)
- [Personalización](#personalización)
- [Contribuir](#contribuir)

## ✨ Características

- ✅ **Algoritmo Greedy Optimizado**: Generación eficiente de casos de prueba
- ✅ **Cobertura 100%**: Garantiza cobertura completa de interacciones por pares
- ✅ **Múltiples Formatos**: Exporta en CSV, JSON y TXT
- ✅ **Reportes Detallados**: Análisis completo de cobertura y estadísticas
- ✅ **Altamente Configurable**: Factores y niveles personalizables
- ✅ **Sin Dependencias Externas**: Solo biblioteca estándar de Go
- ✅ **Reducción de ~99.8%**: De casos de prueba vs. testing exhaustivo

## 🚀 Instalación

### Opción 1: Compilar desde fuente

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/pairwise-doe.git
cd pairwise-doe

# Compilar
go build -o pairwise main_v2.go

# Ejecutar
./pairwise
```

### Opción 2: Usar directamente

```bash
# Ejecutar sin compilar
go run main_v2.go
```

### Requisitos

- Go 1.22 o superior
- Sistema operativo: Linux, macOS, Windows

## 🎯 Uso Rápido

### Ejecución Básica

```bash
go run main_v2.go
```

### Salida esperada:

```
=================================================
GENERADOR DE CASOS DE PRUEBA - PAIRWISE TESTING
Sistema: Plataforma de Comercio Electrónico
=================================================

Total de pares posibles: 451

Caso 1: 3.33% pares cubiertos (15/451)
Caso 2: 6.65% pares cubiertos (30/451)
...
Caso 46: 100.00% pares cubiertos (451/451)

✓ Generación completada: 46 casos de prueba
✓ Cobertura final: 100.00% (451/451 pares)
```

## 📚 Documentación

### Archivos Generados

| Archivo | Descripción | Formato |
|---------|-------------|---------|
| `casos_prueba.csv` | Casos de prueba tabulados | CSV |
| `casos_prueba.json` | Casos en formato estructurado | JSON |
| `factores.json` | Configuración de factores | JSON |
| `informe_doe.txt` | Análisis detallado de cobertura | Texto |
| `especificacion_software.md` | Especificación completa del sistema | Markdown |
| `casos_prueba_detallados.md` | Casos con descripciones expandidas | Markdown |

### Estructura de Archivos

```
pairwise-doe/
├── main_v2.go                      # Código principal
├── README.md                        # Este archivo
├── outputs/
│   ├── casos_prueba.csv
│   ├── casos_prueba.json
│   ├── factores.json
│   ├── informe_doe.txt
│   ├── especificacion_software.md
│   └── casos_prueba_detallados.md
```

## 📊 Resultados

### Ejemplo de Caso de Prueba (CSV)

```csv
ID,TipoPago,TipoEnvio,TipoUsuario,Plataforma,Region,CodigoDescuento
TC-001,TarjetaCredito,Express24h,Invitado,WebEscritorio,NorteAmerica,SinDescuento
TC-002,TarjetaCredito,Standard3-5dias,Registrado,WebMovil,SurAmerica,Descuento10
```

### Ejemplo de Informe

```
ANÁLISIS DE COBERTURA
-------------------------------------------------
Total de combinaciones posibles (exhaustivas): 25,200
Total de pares posibles: 451
Total de pares cubiertos: 451
Cobertura de pares: 100.00%

Casos de prueba generados: 46
Reducción de casos: 99.82%
```

## 🎓 Teoría: Pairwise Testing

### ¿Qué es Pairwise Testing?

Pairwise testing (también conocido como All-Pairs Testing) es una técnica de diseño de experimentos que reduce drásticamente el número de casos de prueba necesarios mientras mantiene una alta cobertura.

### Principio Fundamental

**La mayoría de los defectos (70-95%) son causados por la interacción de solo 2 factores.**

Por lo tanto, no necesitamos probar TODAS las combinaciones posibles, solo asegurar que cada PAR de valores se pruebe al menos una vez.

### Ejemplo

Para 3 factores con 3 niveles cada uno:

**Exhaustivo:** 3 × 3 × 3 = 27 casos  
**Pairwise:** ~9 casos (reducción del 66%)

Con más factores, la reducción es aún mayor:

**6 factores × 5 niveles promedio:**  
**Exhaustivo:** 25,200 casos  
**Pairwise:** 46 casos (reducción del 99.82%)
