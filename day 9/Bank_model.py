from abc import ABC, abstractmethod

class Observer(ABC):
    @abstractmethod
    def update(self, message: str) -> None:
        pass

class SMSAlert(Observer):
    def __init__(self, phone_number: str):
        self.phone_number = phone_number

    def update(self, message: str) -> None:
        print(f" [SMS to {self.phone_number}]: {message}")

class AuditLog(Observer):
    def update(self, message: str) -> None:
        print(f" [AUDIT LOG]: {message}")

class Account:
    def __init__(self, owner: str, account_number, balance=0.0):
        self.owner = owner
        self.account_number = account_number
        
        if balance < 0:
            raise ValueError("Initial balance cannot be negative.")
        self.__balance = float(balance)
        self._observers =[]
        self._history_stack =[]

    def subscribe(self, observer: Observer)->None:
        self._observers.append(observer)
    def notify(self, message: str)->None:
        for observer in self._observers:
            observer.update(message)

    @property
    def balance(self):
        return self.__balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Deposit amount must be positive.")
        self.__balance += amount
        self._history_stack.append(("deposit", amount))
        msg = f"[{self.owner}] Deposited {amount:.2f} ETB. New balance: {self.__balance:.2f} ETB."
        self.notify(f"[{self.owner}] Deposited {amount:.2f} ETB. New balance: {self.__balance:.2f} ETB.")
        print(f"right {msg}")
        self.notify(msg)
        return True
    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive.")
        if amount > self.__balance:
            print(f"[{self.owner}] Transaction Rejected: Insufficient funds.")
            return False
        self.__balance -= amount
        self._history_stack.append(("withdraw", amount))
        print(f"[{self.owner}] Withdrew {amount:.2f} ETB. New balance: {self.__balance:.2f} ETB.")
        return True
    def undo_last(self) -> bool:
        """Pops the most recent transaction from the history stack and reverts it."""
        if not self._history_stack:
            print(f" [{self.owner}] No transactions to undo.")
            return False

        tx_type, amount = self._history_stack.pop()

        if tx_type == "deposit":
            self.__balance -= amount
            msg = f" UNDO: Reverted deposit of {amount:.2f} ETB. New balance: {self.__balance:.2f} ETB"
        elif tx_type == "withdraw":
            self.__balance += amount
            msg = f" UNDO: Reverted withdrawal of {amount:.2f} ETB. New balance: {self.__balance:.2f} ETB"

        print(f"[{self.owner}] {msg}")
        self.notify(msg)
        return True
     # Day 8 added
    def total_transactions_recursive(self) -> float:
        """Helper to invoke recursion without altering the internal stack."""
        return self._recursive_sum(list(self._history_stack))

    def _recursive_sum(self, stack_copy: list[tuple[str, float]]) -> float:
        """
        Base Case: Empty list -> return 0.0
        Recursive Step: Pop item and recursively sum the rest.
        """
        if not stack_copy:
            return 0.0
        _, amount = stack_copy.pop()
        return amount + self._recursive_sum(stack_copy)
    def statement(self):
        return f"Account | Owner: {self.owner} | Acc No: {self.account_number} | Balance: {self.__balance:.2f} ETB"
    
# DAY 5 Added
class SavingsAccount(Account):
    def init(self, owner: str, account_number, balance=0.0, rate=0.05):
        # Call parent constructor using super()
        super().init(owner, account_number, balance)
        self.rate = float(rate)

    def add_interest(self):
        interest = self.balance * self.rate
        self.deposit(interest)  # Uses parent deposit method
        print(f"[{self.owner}] Interest added ({self.rate * 100}%): +{interest:.2f} ETB.")

    def statement(self):
        return f"Savings Account | Owner: {self.owner} | Acc No: {self.account_number} | Balance: {self.__balance:.2f} ETB | Rate: {self.rate * 100}%"

class CurrentAccount(Account):
    def init(self, owner: str, account_number, balance=0.0, overdraft=500.0):
        super().init(owner, account_number, balance)
        self.overdraft = float(overdraft)

    # Override withdraw to allow overdraft
    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive.")
        if amount > (self.balance + self.overdraft):
            print(f"[{self.owner}] Transaction Rejected: Exceeds overdraft limit of {self.overdraft:.2f} ETB.")
            return False
        
        # Accessing private balance variable from parent class to deduct
        self._Account__balance -= amount
        print(f"[{self.owner}] Withdrew {amount:.2f} ETB. New balance: {self.__balance:.2f} ETB.")
        print(f"right {msg}")
        self.notify(msg)
        return True
def undo_last(self) -> bool:
    """Pops the most recent transaction and reverses its effect."""
    if not self._history_stack:
        print(f"[{self.owner}] No transactions to undo.")
        return False

    tx_type, amount = self._history_stack.pop()  # Pop LIFO

    if tx_type == "deposit":
        self.__balance -= amount
        msg = f" UNDO: Reverted deposit of {amount:.2f} ETB. New balance: {self.__balance:.2f} ETB"
    elif tx_type == "withdraw":
        self.__balance += amount
        msg = f" UNDO: Reverted withdrawal of {amount:.2f} ETB. New balance: {self.__balance:.2f} ETB"

    print(f"[{self.owner}] {msg}")
    self.notify(msg)
    return True

    def statement(self):
        return f"Current Account | Owner: {self.owner} | Acc No: {self.account_number} | Balance: {self.__balance:.2f} ETB | Overdraft Limit: {self.overdraft:.2f} ETB"




# DAY 5  added

class SavingsAccount(Account):
    def __init__(self, owner: str, account_number: str, balance: float = 0.0, rate: float = 0.05):
        # Call the parent class constructor
        super().__init__(owner, account_number, balance)
        self.rate = float(rate)

    def add_interest(self):
        interest = self.balance * self.rate
        self.deposit(interest)
        print(f"[{self.owner}] Interest added ({self.rate * 100}%): +{interest:.2f} ETB.")

    def statement(self):
        return f"Savings Account | Owner: {self.owner} | Acc No: {self.account_number} | Balance: {self.balance:.2f} ETB | Rate: {self.rate * 100}%"


class CurrentAccount(Account):
    def __init__(self, owner: str, account_number: str, balance: float = 0.0, overdraft: float = 500.0):
        # Call the parent class constructor
        super().__init__(owner, account_number, balance)
        self.overdraft = float(overdraft)

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive.")
        if amount > (self.balance + self.overdraft):
            print(f"[{self.owner}] Transaction Rejected: Exceeds overdraft limit of {self.overdraft:.2f} ETB.")
            return False
        
        self._Account__balance -= amount
        print(f"[{self.owner}] Withdrew {amount:.2f} ETB. New balance: {self.balance:.2f} ETB.")
        return True

    def statement(self):
        return f"Current Account | Owner: {self.owner} | Acc No: {self.account_number} | Balance: {self.balance:.2f} ETB | Overdraft Limit: {self.overdraft:.2f} ETB"

# Day 6
# =====================================================================
class AccountFactory:
    @staticmethod
    def create(kind: str, owner: str, account_number: str, balance: float = 0.0, **kwargs) -> Account:
        kind_clean = kind.strip().lower()
        if kind_clean in ["savings", "sav"]:
            rate = kwargs.get("rate", 0.05)
            return SavingsAccount(owner, account_number, balance, rate=rate)
        elif kind_clean in ["current", "cur", "checking"]:
            overdraft = kwargs.get("overdraft", 500.0)
            return CurrentAccount(owner, account_number, balance, overdraft=overdraft)
        elif kind_clean in ["standard", "account", "base"]:
            return Account(owner, account_number, balance)
        else:
            raise ValueError(f"Unknown account type: '{kind}'")
    # Day 9 added
class BranchNode:
    """Represents a Tree Node in the Bank Organizational Hierarchy."""
    def __init__(self, name: str, balance: float = 0.0):
        self.name = name
        self.balance = float(balance)  # Local branch balance
        self.children: list['BranchNode'] = []  # Sub-branches / regions

    def add_child(self, child_node: 'BranchNode') -> None:
        """Adds a child branch to this node."""
        self.children.append(child_node)

    def total_balance(self) -> float:
        """
        Recursively calculates the total balance of this node AND all sub-branches.
        Base Case: Leaf node with no children returns self.balance.
        Recursive Step: Adds self.balance + sum of all children's total_balance().
        """
        total = self.balance
        for child in self.children:
            total += child.total_balance()  # Recursive tree traversal
        return total
    
class AccountRegistry:
    """Stores accounts in a dict for O(1) instant lookup and keeps insertion order."""
    def __init__(self):
        self.by_number = {}  # Dict for O(1) find
        self.order = []      # List for ordered listing

    def add(self, acc: Account) -> None:
        """Adds account to registry. O(1) time complexity."""
        self.by_number[acc.account_number] = acc
        self.order.append(acc.account_number)

    def find(self, number: str) -> Account | None:
        """Instant lookup by account number. O(1) time complexity."""
        return self.by_number.get(number)

    def list_all(self) -> list[Account]:
        """Returns list of accounts in insertion order."""
        return [self.by_number[num] for num in self.order]
    # day 8 added
    def top_by_balance(self, n: int = 3) -> list[Account]:
        """Returns top 'n' accounts sorted by balance descending."""
        all_accounts = list(self.by_number.values())
        return sorted(all_accounts, key=lambda acc: acc.balance, reverse=True)[:n]

    def find_by_number_binary(self, number: str) -> Account | None:
        """
        Performs Binary Search on sorted list of account numbers.
        Time Complexity: O(log N)
        """
        sorted_accs = sorted(self.by_number.values(), key=lambda acc: acc.account_number)
        low = 0
        high = len(sorted_accs) - 1

        while low <= high:
            mid = (low + high) // 2
            mid_acc_no = sorted_accs[mid].account_number

            if mid_acc_no == number:
                return sorted_accs[mid]
            elif mid_acc_no < number:
                low = mid + 1
            else:
                high = mid - 1

        return None
    # 📍 INSIDE class AccountRegistry (Add at the bottom of class):
    def init_graph(self):
        """Initializes an empty transfer graph (adjacency list)."""
        if not hasattr(self, "_transfer_graph"):
            self._transfer_graph = {}

    def add_transfer_edge(self, from_acc: str, to_acc: str) -> None:
        """Adds a directed transfer edge between two accounts in the graph."""
        self.init_graph()
        if from_acc not in self._transfer_graph:
            self._transfer_graph[from_acc] = []
        self._transfer_graph[from_acc].append(to_acc)

    def bfs_reachable(self, start_acc: str) -> list[str]:
        """
        Breadth-First Search (BFS) using a Queue (FIFO) to find all reachable accounts.
        Returns a list of account numbers reachable from start_acc.
        """
        self.init_graph()
        if start_acc not in self._transfer_graph:
            return []

        from collections import deque
        visited = set([start_acc])
        queue = deque([start_acc])
        reachable = []

        while queue:
            current = queue.popleft()
            if current != start_acc:
                reachable.append(current)

            for neighbor in self._transfer_graph.get(current, []):
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)

        return reachable
    
            
if __name__ == "__main__":
    print("========================================")
    print(" DAY 9: ADDIS BANK MODEL (TREES & BFS GRAPH)  ")
    print("========================================\n")

    # 1. TREE DEMO: Branch Hierarchy
    print("--- 1. Recursive Branch Tree Hierarchy ---")
    head_office = BranchNode("Head Office", balance=1_000_000)

    addis_region = BranchNode("Addis Ababa Region", balance=500_000)
    hawassa_region = BranchNode("Hawassa Region", balance=300_000)

    ABank_1 = BranchNode("AB-1 (Bole)", balance=250_000)
    ABank_2 = BranchNode("AB-2 (Piazza)", balance=150_000)
    ABank_hawassa = BranchNode("AB Hawassa Main", balance=180_000)

    # Build Tree Connections
    head_office.add_child(addis_region)
    head_office.add_child(hawassa_region)

    addis_region.add_child(ABank_1)
    addis_region.add_child(ABank_2)
    hawassa_region.add_child(ABank_hawassa)

    print(f"Total Balance across entire bank (Head Office + All Branches): {head_office.total_balance():,.2f} ETB")
    print(f"Total Balance for Addis Ababa Region only: {addis_region.total_balance():,.2f} ETB")

    # 2. GRAPH & BFS DEMO: Transfer Network
    print("\n--- 2. Graph Traversal: BFS Money Transfers ---")
    registry = AccountRegistry()

    # Define money transfers: AB-1 -> AB-2 -> AB-3 ...
    registry.add_transfer_edge("AB-1", "AB-2")
    registry.add_transfer_edge("AB-1", "AB-3")
    registry.add_transfer_edge("AB-2", "AB-4")
    registry.add_transfer_edge("AB-3", "AB-5")
    registry.add_transfer_edge("AB-4", "AB-6")

    reachable_accounts = registry.bfs_reachable("AB-1")
    print(f"Accounts reachable from AB-1 via transfers (BFS): {reachable_accounts}")

    print("\n========================================")