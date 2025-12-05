package binarysearch

// BinarySearch realiza una búsqueda binaria en un slice ordenado
// Retorna el índice del elemento si se encuentra, -1 si no existe
func BinarySearch(arr []int, target int) int {
    if len(arr) == 0 {
        return -1
    }
    
    left := 0
    right := len(arr) - 1
    
    for left <= right {
        mid := left + (right-left)/2
        
        if arr[mid] == target {
            return mid
        }
        
        if arr[mid] < target {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
    
    return -1
}

// BinarySearchRecursive implementación recursiva de búsqueda binaria
func BinarySearchRecursive(arr []int, target int) int {
    return binarySearchHelper(arr, target, 0, len(arr)-1)
}

func binarySearchHelper(arr []int, target, left, right int) int {
    if left > right {
        return -1
    }
    
    mid := left + (right-left)/2
    
    if arr[mid] == target {
        return mid
    }
    
    if arr[mid] < target {
        return binarySearchHelper(arr, target, mid+1, right)
    }
    
    return binarySearchHelper(arr, target, left, mid-1)
}