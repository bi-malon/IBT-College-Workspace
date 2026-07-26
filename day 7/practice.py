import time
from collections import deque

# =====================================================================
# Exercise 1: Name the Big-O
# =====================================================================
# Snippet 1: arr[idx]                         -> O(1) Constant Time (Direct Indexing)
# Snippet 2: for x in arr:                    -> O(N) Linear Time (Single Loop)
# Snippet 3: for x in arr: for y in arr:      -> O(N^2) Quadratic Time (Nested Loop)
# Snippet 4: my_dict['key']                   -> O(1) Constant Time (Hash Table Lookup)
# Snippet 5: Binary Search                    -> O(log N) Logarithmic Time (Divide and Conquer)


# =====================================================================
# Exercise 2: List vs. Dict Lookup Benchmark
# =====================================================================
def benchmark_list_vs_dict():
    print("--- Exercise 2: List vs Dict Lookup Benchmark ---")
    size = 100_000
    target = f"ACC-{size - 1}"  # Target near the very end (worst-case for list)

    # Setup 100,000 items in a List and a Dict
    acc_list = [f"ACC-{i}" for i in range(size)]
    acc_dict = {f"ACC-{i}": f"AccountData-{i}" for i in range(size)}

    # List Search O(N)
    start = time.perf_counter()
    _ = target in acc_list
    list_time = (time.perf_counter() - start) * 1000

    # Dict Search O(1)
    start = time.perf_counter()
    _ = target in acc_dict
    dict_time = (time.perf_counter() - start) * 1000

    print(f"List search O(N) time: {list_time:.4f} ms")
    print(f"Dict search O(1) time: {dict_time:.4f} ms")


# =====================================================================
# Exercise 3: Build a Stack (Reverse a list of names)
# =====================================================================
class Stack:
    """Last-In, First-Out (LIFO) Stack data structure."""
    def __init__(self):
        self.__items = []

    def push(self, item):
        self.__items.append(item)

    def pop(self):
        return self.__items.pop() if self.__items else None

    def peek(self):
        return self.__items[-1] if self.__items else None

    def is_empty(self):
        return len(self.__items) == 0


def reverse_names_with_stack(names: list[str]) -> list[str]:
    stack = Stack()
    for name in names:
        stack.push(name)

    reversed_list = []
    while not stack.is_empty():
        reversed_list.append(stack.pop())
    return reversed_list


# =====================================================================
# Exercise 4: Build a Queue (Bank Service Line using deque)
# =====================================================================
def run_bank_queue():
    print("\n--- Exercise 4: Bank Queue (FIFO) ---")
    queue = deque()

    # Enqueue 5 customers
    customers = ["Aster", "Dawit", "Tigist", "Abebe", "Kebede"]
    for customer in customers:
        queue.append(customer)
        print(f"📥 Enqueued: {customer}")

    print("\nServing customers in order:")
    # Dequeue/serve customers in FIFO order
    while queue:
        served = queue.popleft()
        print(f"🔔 Served customer: {served}")


# =====================================================================
# Exercise 5: Singly Linked List
# =====================================================================
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


class LinkedList:
    def __init__(self):
        self.head = None

    def push_front(self, data):
        """Prepends a new node to the front of the list."""
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node

    def print_all(self):
        """Walks the chain and prints all node values."""
        current = self.head
        elements = []
        while current:
            elements.append(str(current.data))
            current = current.next
        print(" -> ".join(elements) if elements else "Empty List")
        # =====================================================================
# EXECUTION DRIVER
# =====================================================================
if __name__ == "__main__":
    print("========================================")
    print("      DAY 7 PRACTICE EXERCISES          ")
    print("========================================\n")

    # Ex 2
    benchmark_list_vs_dict()

    # Ex 3
    print("\n--- Exercise 3: Stack Reversal ---")
    original_names = ["Aster", "Dawit", "Tigist", "Abebe"]
    reversed_names = reverse_names_with_stack(original_names)
    print(f"Original: {original_names}")
    print(f"Reversed: {reversed_names}")

    # Ex 4
    run_bank_queue()

    # Ex 5
    print("\n--- Exercise 5: Singly Linked List ---")
    ll = LinkedList()
    ll.push_front("Account 3")
    ll.push_front("Account 2")
    ll.push_front("Account 1")
    print("Linked List chain:")
    ll.print_all()

    print("\n========================================")