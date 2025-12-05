package main

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"math/rand"
	"os"
	"sort"
	"time"
)

// Factor representa un factor de prueba con sus niveles
type Factor struct {
	Name   string   `json:"name"`
	Levels []string `json:"levels"`
}

// TestCase representa un caso de prueba generado
type TestCase map[string]string

// PairwiseTester implementa el algoritmo de pairwise testing
type PairwiseTester struct {
	Factors   []Factor
	TestCases []TestCase
	Coverage  map[string]bool
}

// Pair representa un par de valores para dos factores
type Pair struct {
	Factor1 string
	Value1  string
	Factor2 string
	Value2  string
}

func (p Pair) String() string {
	return fmt.Sprintf("%s=%s,%s=%s", p.Factor1, p.Value1, p.Factor2, p.Value2)
}

// NewPairwiseTester crea un nuevo tester
func NewPairwiseTester(factors []Factor) *PairwiseTester {
	return &PairwiseTester{
		Factors:   factors,
		TestCases: make([]TestCase, 0),
		Coverage:  make(map[string]bool),
	}
}

// GenerateAllPairs genera todos los pares posibles
func (pt *PairwiseTester) GenerateAllPairs() []Pair {
	pairs := make([]Pair, 0)
	
	for i := 0; i < len(pt.Factors); i++ {
		for j := i + 1; j < len(pt.Factors); j++ {
			factor1 := pt.Factors[i]
			factor2 := pt.Factors[j]
			
			for _, level1 := range factor1.Levels {
				for _, level2 := range factor2.Levels {
					pairs = append(pairs, Pair{
						Factor1: factor1.Name,
						Value1:  level1,
						Factor2: factor2.Name,
						Value2:  level2,
					})
				}
			}
		}
	}
	
	return pairs
}

// GetPairsFromTestCase extrae todos los pares de un caso de prueba
func (pt *PairwiseTester) GetPairsFromTestCase(testCase TestCase) []Pair {
	pairs := make([]Pair, 0)
	factors := make([]string, 0)
	
	for factor := range testCase {
		factors = append(factors, factor)
	}
	sort.Strings(factors)
	
	for i := 0; i < len(factors); i++ {
		for j := i + 1; j < len(factors); j++ {
			pairs = append(pairs, Pair{
				Factor1: factors[i],
				Value1:  testCase[factors[i]],
				Factor2: factors[j],
				Value2:  testCase[factors[j]],
			})
		}
	}
	
	return pairs
}

// CountUncoveredPairs cuenta pares no cubiertos en un test case
func (pt *PairwiseTester) CountUncoveredPairs(testCase TestCase) int {
	count := 0
	pairs := pt.GetPairsFromTestCase(testCase)
	
	for _, pair := range pairs {
		if !pt.Coverage[pair.String()] {
			count++
		}
	}
	
	return count
}

// MarkCovered marca pares como cubiertos
func (pt *PairwiseTester) MarkCovered(testCase TestCase) {
	pairs := pt.GetPairsFromTestCase(testCase)
	for _, pair := range pairs {
		pt.Coverage[pair.String()] = true
	}
}

// Generate genera casos usando algoritmo greedy mejorado con cobertura completa
func (pt *PairwiseTester) Generate() {
	rand.Seed(time.Now().UnixNano())
	
	allPairs := pt.GenerateAllPairs()
	totalPairs := len(allPairs)
	fmt.Printf("Total de pares posibles: %d\n\n", totalPairs)
	
	// Fase 1: Generación greedy de casos base
	iteration := 0
	for len(pt.Coverage) < totalPairs {
		iteration++
		
		bestTestCase := make(TestCase)
		maxCoverage := 0
		
		// Probar múltiples configuraciones aleatorias y elegir la mejor
		for attempt := 0; attempt < 20; attempt++ {
			testCase := make(TestCase)
			
			// Llenar aleatoriamente
			for _, factor := range pt.Factors {
				testCase[factor.Name] = factor.Levels[rand.Intn(len(factor.Levels))]
			}
			
			// Optimizar greedy: cambiar cada factor al valor que maximice cobertura
			for _, factor := range pt.Factors {
				bestLevel := testCase[factor.Name]
				bestCount := 0
				
				for _, level := range factor.Levels {
					testCase[factor.Name] = level
					count := pt.CountUncoveredPairs(testCase)
					
					if count > bestCount {
						bestCount = count
						bestLevel = level
					}
				}
				
				testCase[factor.Name] = bestLevel
			}
			
			coverage := pt.CountUncoveredPairs(testCase)
			if coverage > maxCoverage {
				maxCoverage = coverage
				bestTestCase = testCase
			}
		}
		
		if maxCoverage == 0 {
			break
		}
		
		pt.TestCases = append(pt.TestCases, bestTestCase)
		pt.MarkCovered(bestTestCase)
		
		coveragePercent := float64(len(pt.Coverage)) / float64(totalPairs) * 100
		
		if iteration <= 20 || iteration%5 == 0 {
			fmt.Printf("Caso %d: %.2f%% pares cubiertos (%d/%d)\n", 
				iteration, coveragePercent, len(pt.Coverage), totalPairs)
		}
		
		if iteration > 100 {
			break
		}
	}
	
	// Fase 2: Completar pares faltantes
	if len(pt.Coverage) < totalPairs {
		fmt.Println("\nFase 2: Cubriendo pares restantes...")
		
		for _, pair := range allPairs {
			if !pt.Coverage[pair.String()] {
				// Crear caso específico para este par
				testCase := make(TestCase)
				testCase[pair.Factor1] = pair.Value1
				testCase[pair.Factor2] = pair.Value2
				
				// Llenar el resto aleatoriamente
				for _, factor := range pt.Factors {
					if _, exists := testCase[factor.Name]; !exists {
						testCase[factor.Name] = factor.Levels[rand.Intn(len(factor.Levels))]
					}
				}
				
				pt.TestCases = append(pt.TestCases, testCase)
				pt.MarkCovered(testCase)
				
				iteration++
			}
			
			if len(pt.Coverage) >= totalPairs {
				break
			}
		}
	}
	
	coveragePercent := float64(len(pt.Coverage)) / float64(totalPairs) * 100
	fmt.Printf("\n✓ Generación completada: %d casos de prueba\n", len(pt.TestCases))
	fmt.Printf("✓ Cobertura final: %.2f%% (%d/%d pares)\n", 
		coveragePercent, len(pt.Coverage), totalPairs)
}

// ExportToCSV exporta los casos de prueba a CSV
func (pt *PairwiseTester) ExportToCSV(filename string) error {
	file, err := os.Create(filename)
	if err != nil {
		return err
	}
	defer file.Close()
	
	writer := csv.NewWriter(file)
	defer writer.Flush()
	
	headers := make([]string, 0)
	headers = append(headers, "ID")
	for _, factor := range pt.Factors {
		headers = append(headers, factor.Name)
	}
	writer.Write(headers)
	
	for i, testCase := range pt.TestCases {
		row := make([]string, 0)
		row = append(row, fmt.Sprintf("TC-%03d", i+1))
		
		for _, factor := range pt.Factors {
			row = append(row, testCase[factor.Name])
		}
		writer.Write(row)
	}
	
	return nil
}

// GenerateReport genera un informe detallado
func (pt *PairwiseTester) GenerateReport(filename string) error {
	file, err := os.Create(filename)
	if err != nil {
		return err
	}
	defer file.Close()
	
	allPairs := pt.GenerateAllPairs()
	
	report := fmt.Sprintf(`=================================================
INFORME DE DISEÑO DE EXPERIMENTOS (DOE)
Técnica: Pairwise Testing (Combinación por Pares)
=================================================

FECHA DE GENERACIÓN: %s

1. RESUMEN DE FACTORES
-------------------------------------------------
Número total de factores: %d

`, time.Now().Format("2006-01-02 15:04:05"), len(pt.Factors))
	
	for i, factor := range pt.Factors {
		report += fmt.Sprintf("Factor %d: %s\n", i+1, factor.Name)
		report += fmt.Sprintf("  Niveles (%d): %v\n\n", len(factor.Levels), factor.Levels)
	}
	
	totalCombinations := 1
	for _, factor := range pt.Factors {
		totalCombinations *= len(factor.Levels)
	}
	
	coveragePercent := float64(len(pt.Coverage)) / float64(len(allPairs)) * 100
	
	report += fmt.Sprintf(`
2. ANÁLISIS DE COBERTURA
-------------------------------------------------
Total de combinaciones posibles (exhaustivas): %d
Total de pares posibles: %d
Total de pares cubiertos: %d
Cobertura de pares: %.2f%%

Casos de prueba generados: %d
Reducción de casos: %.2f%%

`, totalCombinations, len(allPairs), 
		len(pt.Coverage), coveragePercent,
		len(pt.TestCases),
		(1-float64(len(pt.TestCases))/float64(totalCombinations))*100)
	
	report += `
3. ESTADÍSTICAS POR FACTOR
-------------------------------------------------
`
	
	for _, factor := range pt.Factors {
		coverage := make(map[string]int)
		for _, testCase := range pt.TestCases {
			coverage[testCase[factor.Name]]++
		}
		
		report += fmt.Sprintf("\n%s:\n", factor.Name)
		for _, level := range factor.Levels {
			count := coverage[level]
			percentage := float64(count) / float64(len(pt.TestCases)) * 100
			report += fmt.Sprintf("  - %s: %d veces (%.1f%%)\n", level, count, percentage)
		}
	}
	
	report += `

4. EFICIENCIA DEL DISEÑO
-------------------------------------------------
`
	
	efficiency := float64(len(pt.TestCases)) / float64(totalCombinations) * 100
	report += fmt.Sprintf("Eficiencia: %.4f%% (usando solo %d de %d casos posibles)\n", 
		efficiency, len(pt.TestCases), totalCombinations)
	
	avgPairsPerTest := float64(len(pt.Coverage)) / float64(len(pt.TestCases))
	report += fmt.Sprintf("Promedio de pares únicos por caso: %.2f\n", avgPairsPerTest)
	
	report += `

5. VENTAJAS DEL PAIRWISE TESTING
-------------------------------------------------
✓ Cobertura exhaustiva de interacciones por pares (2-way)
✓ Reducción significativa de casos de prueba vs prueba exhaustiva
✓ Balance óptimo entre cobertura y esfuerzo de pruebas
✓ Detección eficiente de defectos por interacción de 2 factores
✓ Conjunto ejecutable en tiempo razonable

6. CONCLUSIONES
-------------------------------------------------
El diseño de experimentos mediante pairwise testing ha reducido
significativamente el número de casos de prueba necesarios mientras
mantiene una alta cobertura de interacciones por pares entre factores.

Esta técnica es especialmente valiosa cuando:
- Se tienen múltiples factores con varios niveles cada uno
- Las pruebas exhaustivas no son factibles
- Los defectos típicos involucran interacciones de 2 factores
- Se requiere optimizar el tiempo de ejecución de pruebas

=================================================
Fin del Informe
=================================================
`
	
	_, err = file.WriteString(report)
	return err
}

func main() {
	// Especificación: Sistema de Comercio Electrónico
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
		{
			Name: "TipoUsuario",
			Levels: []string{
				"Invitado",
				"Registrado",
				"Premium",
				"Corporativo",
				"Estudiante",
			},
		},
		{
			Name: "Plataforma",
			Levels: []string{
				"WebEscritorio",
				"WebMovil",
				"AppAndroid",
				"AppIOS",
				"AppHuawei",
				"PWA",
				"ApiRest",
			},
		},
		{
			Name: "Region",
			Levels: []string{
				"NorteAmerica",
				"SurAmerica",
				"Europa",
				"Asia",
				"Oceania",
				"Africa",
			},
		},
		{
			Name: "CodigoDescuento",
			Levels: []string{
				"SinDescuento",
				"Descuento10",
				"Descuento25",
				"BlackFriday50",
			},
		},
	}
	
	fmt.Println("=================================================")
	fmt.Println("GENERADOR DE CASOS DE PRUEBA - PAIRWISE TESTING")
	fmt.Println("Sistema: Plataforma de Comercio Electrónico")
	fmt.Println("=================================================\n")
	
	tester := NewPairwiseTester(factors)
	tester.Generate()
	
	fmt.Println("\n=================================================")
	fmt.Println("EXPORTANDO RESULTADOS...")
	fmt.Println("=================================================\n")
	
	// Crear directorio de salida si no existe
	outputDir := "outputs"
	if err := os.MkdirAll(outputDir, 0755); err != nil {
		fmt.Printf("Error creando directorio outputs: %v\n", err)
		return
	}
	
	if err := tester.ExportToCSV(outputDir + "/casos_prueba.csv"); err != nil {
		fmt.Printf("Error exportando CSV: %v\n", err)
	} else {
		fmt.Println("✓ Casos de prueba exportados a: outputs/casos_prueba.csv")
	}
	
	if err := tester.GenerateReport(outputDir + "/informe_doe.txt"); err != nil {
		fmt.Printf("Error generando informe: %v\n", err)
	} else {
		fmt.Println("✓ Informe generado en: outputs/informe_doe.txt")
	}
	
	factorsJSON, _ := json.MarshalIndent(factors, "", "  ")
	if err := os.WriteFile(outputDir+"/factores.json", factorsJSON, 0644); err != nil {
		fmt.Printf("Error exportando factores: %v\n", err)
	} else {
		fmt.Println("✓ Factores exportados a: outputs/factores.json")
	}
	
	casesJSON, _ := json.MarshalIndent(tester.TestCases, "", "  ")
	if err := os.WriteFile(outputDir+"/casos_prueba.json", casesJSON, 0644); err != nil {
		fmt.Printf("Error exportando casos JSON: %v\n", err)
	} else {
		fmt.Println("✓ Casos de prueba exportados a: outputs/casos_prueba.json")
	}
	
	fmt.Println("\n=================================================")
	fmt.Println("✓ PROCESO COMPLETADO EXITOSAMENTE")
	fmt.Println("=================================================")
}