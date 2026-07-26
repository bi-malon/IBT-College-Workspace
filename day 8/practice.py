#Day 8 Exercises: Recursion, Search, Sort & Two Pointers
import random


# =====================================================================
# Exercise 1: Recursive Sum & Countdown
# =====================================================================
def total(nums: list[int | float]) -> float:
    """Recursively sums a list of numbers."""
    if not nums:
        return 0
    return nums[0] + total(nums[1:])


def count_down(n: int) -> None:
    """Recursively prints n down to 1."""
    if n < 1:
        return
    print(n, end=" ")
    count_down(n - 1)


# =====================================================================
# Exercise 2: Binary Search
# =====================================================================
def binary_search(items: list, target) -> int:
    """
    Performs binary search on a sorted list.
    Returns the index if found, or -1 if not present.
    """
    low, high = 0, len(items) - 1

    while low <= high:
        mid = (low + high) // 2
        if items[mid] == target:
            return mid
        elif items[mid] < target:
            low = mid + 1
        else:
            high = mid - 1

    return -1


# =====================================================================
# Exercise 3: Merge Sort
# =====================================================================
def merge(left: list, right: list) -> list:
    """Helper function to merge two sorted lists."""
    result = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])
    return result


def merge_sort(items: list) -> list:
    """Recursively divides and sorts a list using Merge Sort O(N log N)."""
    if len(items) <= 1:
        return items

    mid = len(items) // 2
    left_sorted = merge_sort(items[:mid])
    right_sorted = merge_sort(items[mid:])

    return merge(left_sorted, right_sorted)


# =====================================================================
# Exercise 4: Sort with a Key
# =====================================================================
def sort_accounts_by_balance(accounts: list[tuple[str, float]]) -> list[tuple[str, float]]:
    """Sorts a list of (name, balance) tuples by balance in descending order."""
    return sorted(accounts, key=lambda item: item[1], reverse=True)


# =====================================================================
# Exercise 5: Two Pointers (Target Sum on Sorted List)
# =====================================================================
def has_pair(nums: list[int | float], target: float) -> bool:
    """
    Determines if two numbers in a sorted list sum up to target using two pointers.
    Time Complexity: O(N)
    """
    left, right = 0, len(nums) - 1

    while left < right:
        current_sum = nums[left] + nums[right]
        if current_sum == target:
            return True
        elif current_sum < target:
            left += 1
        else:
            right -= 1

    return False


# =====================================================================
# EXECUTION DRIVER
# =====================================================================
if __name__ == "__main__":
    print("========================================")
    print("      DAY 8 PRACTICE EXERCISES          ")
    print("========================================\n")

    # --- Ex 1: Recursive Sum & Countdown ---
    print("--- Exercise 1: Recursion ---")
    nums_list = [10, 20, 30, 40, 50]
    print(f"Recursive total of {nums_list}: {total(nums_list)}")
    print("Countdown from 5: ", end="")
    count_down(5)
    print("\n")

    # --- Ex 2: Binary Search ---
    print("--- Exercise 2: Binary Search ---")
    balances = [100.0, 250.5, 500.0, 1200.0, 3500.0, 5000.0]
    search_target = 1200.0
    idx = binary_search(balances, search_target)
    print(f"Searching for {search_target} in {balances}")
    print(f"Found at index: {idx}")
    print(f"Searching for 999.0: index = {binary_search(balances, 999.0)}\n")

    # --- Ex 3: Merge Sort ---
    print("--- Exercise 3: Merge Sort ---")
    random_list = [random.randint(1, 100) for _ in range(8)]
    print(f"Unsorted List : {random_list}")
    my_sorted = merge_sort(random_list)
    py_sorted = sorted(random_list)
    print(f"Merge Sorted  : {my_sorted}")
    print(f"Matches sorted()? {'✅ YES' if my_sorted == py_sorted else '❌ NO'}\n")

    # --- Ex 4: Sort with Key ---
    print("--- Exercise 4: Sort with Key (Descending) ---")
    account_tuples = [("Aster", 1500.0), ("Dawit", 5000.0), ("Tigist", 3200.0), ("Kebede", 800.0)]
    sorted_tuples = sort_accounts_by_balance(account_tuples)
    print("Leaderboard (Name, Balance):")
    for rank, (name, bal) in enumerate(sorted_tuples, 1):
        print(f"  #{rank} {name}: {bal:.2f} ETB")
    print()

    # --- Ex 5: Two Pointers ---
    print("--- Exercise 5: Two Pointers ---")
    sorted_nums = [1, 3, 5, 8, 12, 15]
    target_val = 13
    print(f"Does {sorted_nums} have pair summing to {target_val}? -> {has_pair(sorted_nums, target_val)}")
    print(f"Does {sorted_nums} have pair summing to 100? -> {has_pair(sorted_nums, 100)}")

    print("\n========================================")