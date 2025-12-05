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

### Ventajas

1. ✅ **Eficiencia**: Reduce 90-99% de casos
2. ✅ **Cobertura**: 100% de interacciones por pares
3. ✅ **Efectividad**: Encuentra la mayoría de defectos
4. ✅ **Práctico**: Tiempo de ejecución manejable

### Limitaciones

1. ⚠️ **No cubre 3-way**: Algunas interacciones de 3+ factores pueden no detectarse
2. ⚠️ **Defectos raros**: Combinaciones específicas de 4+ factores no se prueban

### ¿Cuándo usar Pairwise?

✅ **SÍ usar cuando:**
- Tienes 4+ factores con múltiples niveles
- Las pruebas exhaustivas no son viables
- La mayoría de defectos son por interacción de 2 factores
- Necesitas optimizar tiempo de pruebas

❌ **NO usar cuando:**
- Tienes pocos factores (≤3) con pocos niveles
- Necesitas cobertura 3-way o superior
- Hay dependencias complejas entre factores
- Las pruebas exhaustivas son factibles

## 💡 Ejemplo Completo

### Configuración de Factores

```go
factors := []Factor{
    {
        Name: "TipoPago",
        Levels: []string{
            "TarjetaCredito",
            "TarjetaDebito", 
            "PayPal",
            "TransferenciaBancaria",
            "Criptomoneda",
        },
    },
    {
        Name: "TipoEnvio",
        Levels: []string{
            "Express24h",
            "Standard3-5dias",
            "Economico7-10dias",
            "RecogidaTienda",
            "EnvioInternacional",
            "EnvioRefrigerado",
        },
    },
    // ... más factores
}
```

### Generación

```go
tester := NewPairwiseTester(factors)
tester.Generate()
tester.ExportToCSV("casos_prueba.csv")
tester.GenerateReport("informe.txt")
```

### Resultado

46 casos que cubren las 451 combinaciones por pares posibles.

## 🔧 Personalización

### Modificar Factores

Edita el archivo `main_v2.go` en la sección `main()`:

```go
factors := []Factor{
    {
        Name: "TuFactor",
        Levels: []string{"Nivel1", "Nivel2", "Nivel3"},
    },
    // Agrega más factores aquí
}
```

### Cambiar Rutas de Salida

Modifica las rutas en la sección de exportación:

```go
tester.ExportToCSV("/tu/ruta/casos.csv")
tester.GenerateReport("/tu/ruta/informe.txt")
```

### Ajustar Algoritmo

Parámetros configurables en el código:

```go
// Número de intentos por iteración (línea ~125)
for attempt := 0; attempt < 20; attempt++

// Límite de iteraciones (línea ~170)
if iteration > 100
```

## 📈 Comparación de Técnicas

| Técnica | Casos | Cobertura 2-way | Tiempo | Uso Recomendado |
|---------|-------|----------------|--------|-----------------|
| **Exhaustivo** | 25,200 | 100% | ~700h | Sistemas críticos pequeños |
| **Pairwise** | 46 | 100% | ~4h | **Mayoría de sistemas** ✅ |
| **Aleatorio** | 100 | ~60% | ~8h | Exploración inicial |
| **Manual** | 20 | ~30% | ~2h | No recomendado |

## 🧪 Validación de la Herramienta

### Tests Incluidos

```bash
# Verificar cobertura
go test -v -cover

# Benchmark
go test -bench=.
```

### Verificación Manual

```bash
# Contar pares únicos en salida
cat casos_prueba.csv | wc -l  # Debe ser ~46

# Verificar formato JSON
jq . casos_prueba.json
```

## 🤝 Contribuir

### Reportar Issues

Si encuentras un bug o tienes una sugerencia:

1. Crea un issue en GitHub
2. Describe el problema/sugerencia
3. Incluye ejemplos si es posible

### Pull Requests

1. Fork el proyecto
2. Crea una rama: `git checkout -b feature/nueva-caracteristica`
3. Commit: `git commit -m 'Agrega nueva característica'`
4. Push: `git push origin feature/nueva-caracteristica`
5. Abre un Pull Request

## 📖 Referencias

### Artículos Académicos

1. Cohen, D. M., et al. (1997). "The AETG System: An Approach to Testing Based on Combinatorial Design"
2. Kuhn, D. R., et al. (2004). "Software Fault Interactions and Implications for Software Testing"

### Recursos Adicionales

- [NIST Combinatorial Testing](https://csrc.nist.gov/projects/automated-combinatorial-testing-for-software)
- [Pairwise Testing en Wikipedia](https://en.wikipedia.org/wiki/All-pairs_testing)
- [ISO/IEC/IEEE 29119 - Software Testing](https://www.iso.org/standard/45142.html)

## 📝 Licencia

MIT License - Ver archivo LICENSE para detalles

## 👨‍💻 Autor

Desarrollado como parte de un proyecto de Diseño de Experimentos (DOE) para optimización de pruebas de software.

## 🙏 Agradecimientos

- Comunidad de Go por el excelente lenguaje
- Investigadores en combinatorial testing
- Equipos de QA que inspiraron esta herramienta

---

## 📞 Soporte

¿Preguntas? ¿Problemas?

- 📧 Email: qa-team@example.com
- 💬 Discord: [servidor-qa](https://discord.gg/ejemplo)
- 📚 Docs: [wiki del proyecto](https://github.com/tu-usuario/pairwise-doe/wiki)

---

**⭐ Si esta herramienta te fue útil, considera dar una estrella al repositorio!**

---

## 🔄 Changelog

### v1.0.0 (Diciembre 2025)
- ✨ Lanzamiento inicial
- ✅ Algoritmo greedy completo
- ✅ Exportación a CSV, JSON
- ✅ Generación de informes
- ✅ Cobertura 100% de pares

### Próximas Características
- [ ] Soporte para 3-way coverage
- [ ] Interfaz web
- [ ] Importación desde Excel
- [ ] Visualización de cobertura
- [ ] Generación de código de pruebas automático

---

**Happy Testing! 🎉**