#!/bin/bash

OUT_DIR="Out"
mkdir -p $OUT_DIR

echo "==================================="
echo "Ejecutando Conjunto Inicial de Pruebas"
echo "==================================="
go test -run 'TestBinarySearch_ElementoEncontrado|TestBinarySearch_ElementoNoEncontrado|TestBinarySearch_ArregloVacio' -coverprofile=$OUT_DIR/coverage_inicial.out

echo ""
echo "Cobertura del Conjunto Inicial:"
go tool cover -func=$OUT_DIR/coverage_inicial.out

echo ""
echo "==================================="
echo "Ejecutando Conjunto Completo de Pruebas"
echo "==================================="
go test -coverprofile=$OUT_DIR/coverage_completo.out

echo ""
echo "Cobertura del Conjunto Completo:"
go tool cover -func=$OUT_DIR/coverage_completo.out

echo ""
echo "==================================="
echo "Generando reportes HTML"
echo "==================================="
go tool cover -html=$OUT_DIR/coverage_inicial.out -o $OUT_DIR/coverage_inicial.html
go tool cover -html=$OUT_DIR/coverage_completo.out -o $OUT_DIR/coverage_completo.html

echo ""
echo "Reportes generados:"
echo "  - $OUT_DIR/coverage_inicial.html"
echo "  - $OUT_DIR/coverage_completo.html"