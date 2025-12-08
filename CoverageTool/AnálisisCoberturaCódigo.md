# Binary Search Algorithm - Testing Coverage Demonstration

## 📋 Overview

This Go package implements the **Binary Search algorithm** in both iterative and recursive versions, accompanied by comprehensive test suites designed to demonstrate **code coverage improvement** from basic to advanced levels.

## 🎯 Purpose

This project serves as an educational example showing:
- Implementation of Binary Search algorithm in Go
- Progressive improvement of test coverage (66.7% → 94.4%)
- Best practices for writing test cases
- Comparison between iterative and recursive implementations

## 📁 Project Structure

```
CoverageTool/
├── binarysearch.go          # Core algorithm implementation
└── binarysearch_test.go     # Comprehensive test suites
```

## 🔧 Algorithm Implementations

### 1. **Iterative Binary Search** (`BinarySearch`)
```go
func BinarySearch(arr []int, target int) int
```
- **Time Complexity**: O(log n)
- **Space Complexity**: O(1)
- **Approach**: Uses a while loop to iteratively divide the search space

### 2. **Recursive Binary Search** (`BinarySearchRecursive`)
```go
func BinarySearchRecursive(arr []int, target int) int
```
- **Time Complexity**: O(log n)
- **Space Complexity**: O(log n) due to call stack
- **Approach**: Uses recursion to divide the search space

## 🧪 Test Coverage Strategy

### **Phase 1: Basic Coverage (66.7%)**
Initial test cases covering fundamental scenarios:
- Element found in array
- Element not found
- Empty array handling

### **Phase 2: Enhanced Coverage (94.4%)**
Extended test suite covering edge cases and boundary conditions:

#### **Boundary Position Tests**
- `TestBinarySearch_PrimerElemento`: First element in array
- `TestBinarySearch_UltimoElemento`: Last element in array  
- `TestBinarySearch_ElementoMedio`: Middle element in array

#### **Edge Case Tests**
- `TestBinarySearch_UnSoloElementoEncontrado`: Single element array (found)
- `TestBinarySearch_UnSoloElementoNoEncontrado`: Single element array (not found)
- `TestBinarySearch_ElementoMenorQueTodos`: Target less than all elements
- `TestBinarySearch_ElementoMayorQueTodos`: Target greater than all elements

#### **Recursive Implementation Tests**
- `TestBinarySearchRecursive_ElementoEncontrado`: Found with recursion
- `TestBinarySearchRecursive_ElementoNoEncontrado`: Not found with recursion
- `TestBinarySearchRecursive_ArregloVacio`: Empty array with recursion

## 📊 Running Tests and Coverage

### **Basic Test Execution**
```bash
# Run all tests
go test ./...

# Run tests with verbose output
go test -v ./...
```

### **Coverage Analysis**
```bash
# Generate coverage profile
go test -coverprofile=coverage.out ./...

# View coverage in terminal
go tool cover -func=coverage.out

# Generate HTML coverage report
go tool cover -html=coverage.out -o coverage.html

# Open HTML report (Linux/Mac)
open coverage.html
# Or (Windows)
start coverage.html
```

### **Coverage Results**
- **Initial Coverage**: 66.7% (basic test suite)
- **Final Coverage**: 94.4% (extended test suite)
- **Improvement**: +27.7 percentage points

## 🚀 Key Features

### **Algorithm Correctness**
- ✅ Handles empty arrays
- ✅ Returns -1 for non-existent elements
- ✅ Works with arrays of any size
- ✅ Supports duplicate elements (returns first occurrence)

### **Performance Optimizations**
- **Midpoint Calculation**: Uses `left + (right-left)/2` to prevent integer overflow
- **Early Exit**: Returns immediately when target is found
- **Tail Recursion**: Recursive version optimized for tail recursion where possible

### **Testing Best Practices**
1. **Descriptive Test Names**: Clear indication of what each test verifies
2. **Table-Driven Tests**: Implicit structure for similar test cases
3. **Edge Case Coverage**: Tests boundary conditions and extreme scenarios
4. **Cross-Implementation Testing**: Both iterative and recursive versions tested

## 💡 Learning Points

### **For Algorithm Understanding**
1. Binary Search requires **sorted input**
2. Works by repeatedly dividing the search interval in half
3. Midpoint calculation prevents overflow with large arrays
4. Recursive vs. iterative trade-offs:
   - Recursive: Elegant but uses call stack memory
   - Iterative: More memory efficient

### **For Testing Strategy**
1. Start with **happy path** tests
2. Add **boundary condition** tests
3. Include **error/edge case** tests
4. Test **different implementations** separately
5. Use coverage reports to identify untested code paths

## 📈 Coverage Analysis Insights

The **5.6% uncovered code** typically includes:
- Error handling for exceptional conditions
- System-level failure scenarios
- Platform-specific edge cases
- Code that's unreachable under normal operation

## 🔗 Related Concepts

- **Test-Driven Development (TDD)**: Write tests before implementation
- **Regression Testing**: Ensure new changes don't break existing functionality
- **Mutation Testing**: Modify code to verify test effectiveness
- **Property-Based Testing**: Generate random inputs to test invariants

## 🛠️ Usage Example

```go
package main

import (
    "fmt"
    "binarysearch" // Assuming package is importable
)

func main() {
    arr := []int{1, 3, 5, 7, 9, 11, 13}
    
    // Using iterative version
    index := binarysearch.BinarySearch(arr, 7)
    fmt.Printf("Element 7 found at index: %d\n", index) // Output: 3
    
    // Using recursive version
    index = binarysearch.BinarySearchRecursive(arr, 11)
    fmt.Printf("Element 11 found at index: %d\n", index) // Output: 5
    
    // Element not found
    index = binarysearch.BinarySearch(arr, 8)
    fmt.Printf("Element 8 found at index: %d\n", index) // Output: -1
}
```

## 📚 Additional Resources

- [Go Testing Package Documentation](https://golang.org/pkg/testing/)
- [Go Coverage Tool Guide](https://blog.golang.org/cover)
- [Binary Search Algorithm - Wikipedia](https://en.wikipedia.org/wiki/Binary_search_algorithm)
- [Test Coverage Best Practices](https://www.atlassian.com/continuous-delivery/software-testing/code-coverage)

## 🏆 Best Practices Demonstrated

1. **Clear Function Signatures**: Well-documented parameters and return values
2. **Error Handling**: Proper handling of edge cases (empty arrays)
3. **Test Organization**: Logical grouping of related test cases
4. **Performance Considerations**: Overflow-safe midpoint calculation
5. **Code Readability**: Descriptive variable names and consistent formatting

