import random
from src.binary_search import binary_search

def test_binary_search_found():
    arr = list(range(0, 100))
    target = random.choice(arr)
    assert binary_search(arr, target) == target

def test_binary_search_not_found():
    arr = list(range(0, 100))
    target = 150
    assert binary_search(arr, target) == -1

def test_random_arrays():
    arr = sorted(random.sample(range(0, 500), 50))
    target = random.choice(arr)
    assert binary_search(arr, target) != -1
