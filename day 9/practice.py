# day09/practice.py - Day 9 Practice Exercises: BST, Depth, BFS/DFS, Priority Queue
import heapq
from collections import deque


# =====================================================================
# Exercise 1: Build a Binary Search Tree (BST)
# =====================================================================
class BSTNode:
    def __init__(self, value: float):
        self.value = value
        self.left = None
        self.right = None


def insert(root: BSTNode | None, value: float) -> BSTNode:
    """Inserts a value into the BST recursively."""
    if root is None:
        return BSTNode(value)
    
    if value < root.value:
        root.left = insert(root.left, value)
    else:
        root.right = insert(root.right, value)
    
    return root


def in_order_traversal(root: BSTNode | None, result: list | None = None) -> list:
    """Performs in-order traversal (Left -> Node -> Right) yielding sorted values."""
    if result is None:
        result = []
    if root:
        in_order_traversal(root.left, result)
        result.append(root.value)
        in_order_traversal(root.right, result)
    return result


# =====================================================================
# Exercise 2: Tree Depth / Height
# =====================================================================
def height(node: BSTNode | None) -> int:
    """
    Recursively returns the depth/height of a binary tree.
    Base Case: Empty tree height is 0.
    """
    if node is None:
        return 0
    return 1 + max(height(node.left), height(node.right))


# =====================================================================
# Exercise 3: Graph BFS (Breadth-First Search)
# =====================================================================
def bfs(graph: dict[str, list[str]], start: str) -> set[str]:
    """Breadth-First Search using a Queue (FIFO). Returns set of reachable nodes."""
    visited = set([start])
    queue = deque([start])

    while queue:
        vertex = queue.popleft()
        for neighbor in graph.get(vertex, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

    return visited


# =====================================================================
# Exercise 4: Graph DFS (Depth-First Search)
# =====================================================================
def dfs(graph: dict[str, list[str]], start: str, visited: list[str] | None = None) -> list[str]:
    """Depth-First Search implemented recursively. Returns visit order list."""
    if visited is None:
        visited = []

    if start not in visited:
        visited.append(start)
        for neighbor in graph.get(start, []):
            dfs(graph, neighbor, visited)

    return visited


# =====================================================================
# Exercise 5: Priority Queue using heapq
# =====================================================================
def run_priority_queue():
    """Demonstrates a Priority Queue pushing tuples and popping by priority."""
    pq = []
    # Tuples: (priority, task_name) -> Lower number = higher priority
    tasks = [
        (3, "Audit account statements"),
        (1, "Process urgent wire transfer"),
        (4, "Archive month-end logs"),
        (2, "Resolve overdraft alert")
    ]

    for item in tasks:
        heapq.heappush(pq, item)

    popped_order = []
    while pq:
        popped_order.append(heapq.heappop(pq))

    return popped_order


# =====================================================================
# EXECUTION DRIVER
# =====================================================================
if __name__ == "__main__":
    print("========================================")
    print("      DAY 9 PRACTICE EXERCISES          ")
    print("========================================\n")
    # --- Exercise 1: BST In-Order Traversal ---
    print("--- Exercise 1: Binary Search Tree ---")
    balances = [1500.0, 500.0, 3200.0, 800.0, 2500.0, 100.0]
    root = None
    for b in balances:
        root = insert(root, b)
    
    sorted_balances = in_order_traversal(root)
    print(f"Original balances : {balances}")
    print(f"In-Order Traversal: {sorted_balances}\n")

    # --- Exercise 2: Tree Depth ---
    print("--- Exercise 2: Tree Depth / Height ---")
    tree_depth = height(root)
    print(f"Depth of the constructed BST: {tree_depth}\n")

    # --- Exercise 3 & 4: Graph BFS vs DFS ---
    print("--- Exercise 3 & 4: Graph BFS vs DFS ---")
    transfer_graph = {
        "A": ["B", "C"],
        "B": ["D", "E"],
        "C": ["F"],
        "D": [],
        "E": ["F"],
        "F": []
    }

    bfs_nodes = bfs(transfer_graph, "A")
    dfs_order = dfs(transfer_graph, "A")

    print(f"Graph Adjacency List: {transfer_graph}")
    print(f"BFS Reachable Set  : {bfs_nodes}")
    print(f"DFS Visit Order    : {dfs_order}\n")

    # --- Exercise 5: Priority Queue ---
    print("--- Exercise 5: Priority Queue ---")
    sorted_tasks = run_priority_queue()
    print("Popped tasks in priority order:")
    for priority, task in sorted_tasks:
        print(f"  [Priority {priority}] {task}")

    print("\n========================================")