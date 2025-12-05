// binarysearch_extended_test.go
package binarysearch

import "testing"

// TestBinarySearch_ConjuntoMejorado - Segundo conjunto con mejor cobertura

func TestBinarySearch_PrimerElemento(t *testing.T) {
	arr := []int{1, 3, 5, 7, 9}
	target := 1
	expected := 0

	result := BinarySearch(arr, target) // Assuming BinarySearch is defined elsewhere in the package

	if result != expected {
		t.Errorf("BinarySearch(%v, %d) = %d; esperado %d", arr, target, result, expected)
	}
}

func TestBinarySearch_UltimoElemento(t *testing.T) {
	arr := []int{1, 3, 5, 7, 9}
	target := 9
	expected := 4

	result := BinarySearch(arr, target)

	if result != expected {
		t.Errorf("BinarySearch(%v, %d) = %d; esperado %d", arr, target, result, expected)
	}
}

func TestBinarySearch_ElementoMedio(t *testing.T) {
	arr := []int{1, 3, 5, 7, 9}
	target := 5
	expected := 2

	result := BinarySearch(arr, target)

	if result != expected {
		t.Errorf("BinarySearch(%v, %d) = %d; esperado %d", arr, target, result, expected)
	}
}

func TestBinarySearch_UnSoloElementoEncontrado(t *testing.T) {
	arr := []int{5}
	target := 5
	expected := 0

	result := BinarySearch(arr, target)

	if result != expected {
		t.Errorf("BinarySearch(%v, %d) = %d; esperado %d", arr, target, result, expected)
	}
}

func TestBinarySearch_UnSoloElementoNoEncontrado(t *testing.T) {
	arr := []int{5}
	target := 3
	expected := -1

	result := BinarySearch(arr, target)

	if result != expected {
		t.Errorf("BinarySearch(%v, %d) = %d; esperado %d", arr, target, result, expected)
	}
}

func TestBinarySearch_ElementoMenorQueTodos(t *testing.T) {
	arr := []int{5, 10, 15, 20}
	target := 1
	expected := -1

	result := BinarySearch(arr, target)

	if result != expected {
		t.Errorf("BinarySearch(%v, %d) = %d; esperado %d", arr, target, result, expected)
	}
}

func TestBinarySearch_ElementoMayorQueTodos(t *testing.T) {
	arr := []int{5, 10, 15, 20}
	target := 25
	expected := -1

	result := BinarySearch(arr, target)

	if result != expected {
		t.Errorf("BinarySearch(%v, %d) = %d; esperado %d", arr, target, result, expected)
	}
}

// Pruebas para la versión recursiva
func TestBinarySearchRecursive_ElementoEncontrado(t *testing.T) {
	arr := []int{2, 4, 6, 8, 10, 12}
	target := 8
	expected := 3

	result := BinarySearchRecursive(arr, target)

	if result != expected {
		t.Errorf("BinarySearchRecursive(%v, %d) = %d; esperado %d", arr, target, result, expected)
	}
}

func TestBinarySearchRecursive_ElementoNoEncontrado(t *testing.T) {
	arr := []int{2, 4, 6, 8, 10}
	target := 7
	expected := -1

	result := BinarySearchRecursive(arr, target)

	if result != expected {
		t.Errorf("BinarySearchRecursive(%v, %d) = %d; esperado %d", arr, target, result, expected)
	}
}

func TestBinarySearchRecursive_ArregloVacio(t *testing.T) {
	arr := []int{}
	target := 5
	expected := -1

	result := BinarySearchRecursive(arr, target)

	if result != expected {
		t.Errorf("BinarySearchRecursive(%v, %d) = %d; esperado %d", arr, target, result, expected)
	}
}