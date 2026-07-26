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
        print(f"⚠️ [{self.owner}] No transactions to undo.")
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
    
            
if __name__ == "__main__":
    print("========================================")
    print("  DAY 7: ACCOUNT REGISTRY & HISTORY STACK")
    print("========================================\n")

    registry = AccountRegistry()

    # 1. Register accounts using Factory and Registry
    acc1 = AccountFactory.create("standard", "Aster", "AB-1000", balance=1500)
    acc2 = AccountFactory.create("savings", "Dawit", "AB-1005", balance=2500, rate=0.06)
    acc3 = AccountFactory.create("current", "Tigist", "AB-1010", balance=400, overdraft=1000)

    registry.add(acc1)
    registry.add(acc2)
    registry.add(acc3)

    # 2. Test O(1) Lookup
    print("\n--- 1. Testing O(1) Lookup ---")
    found_acc = registry.find("AB-1005")
    if found_acc:
        print(f"Found: {found_acc.statement()}")

    # 3. Test Undo Stack
    print("\n--- 2. Testing Transactions & Undo Stack ---")
    acc1.deposit(500)   # Balance -> 2000
    acc1.withdraw(200)  # Balance -> 1800

    print("\nPerforming Undo:")
    acc1.undo_last()    # Undoes 200 withdrawal -> Balance back to 2000
    acc1.undo_last()    # Undoes 500 deposit    -> Balance back to 1500

    # 4. List All Accounts
    print("\n--- 3. Listing All Accounts ---")
    for acc in registry.list_all():
        print(acc.statement())

    print("\n========================================")
 