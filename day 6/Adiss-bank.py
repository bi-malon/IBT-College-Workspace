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
        self.notify(f"[{self.owner}] Deposited {amount:.2f} ETB. New balance: {self.__balance:.2f} ETB.")

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive.")
        if amount > self.__balance:
            print(f"[{self.owner}] Transaction Rejected: Insufficient funds.")
            return False
        self.__balance -= amount
        print(f"[{self.owner}] Withdrew {amount:.2f} ETB. New balance: {self.__balance:.2f} ETB.")
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
        return f"Savings Account | Owner: {self.owner} | Acc No: {self.account_number} | Balance: {self.balance:.2f} ETB | Rate: {self.rate * 100}%"

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
        print(f"[{self.owner}] Withdrew {amount:.2f} ETB. New balance: {self.balance:.2f} ETB.")
        return True

    def statement(self):
        return f"Current Account | Owner: {self.owner} | Acc No: {self.account_number} | Balance: {self.balance:.2f} ETB | Overdraft Limit: {self.overdraft:.2f} ETB"

if __name__ == "__main__":
    print("--- Day 4 Local Test ---")
    acc = Account("Aster", "AB-1000", 1500) 
    acc.deposit(500)
    acc.withdraw(300)
    print(acc.statement())

    
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

            
if __name__ == "__main__":
    print("========================================")
    print("     DAY 6: PATTERNS & REFACTORING      ")
    print("========================================\n")

    # 1. Create accounts using the Factory
    acc1 = AccountFactory.create("standard", "Aster", "AB-1000", balance=1500)
    acc2 = AccountFactory.create("savings", "Dawit", "SA-2000", balance=2500, rate=0.06)
    acc3 = AccountFactory.create("current", "Tigist", "CA-3000", balance=400, overdraft=1000)

    # 2. Attach Observers
    sms = SMSAlert("+251937015998")
    audit = AuditLog()

    acc2.subscribe(sms)
    acc2.subscribe(audit)
    acc3.subscribe(sms)

    # 3. Test operations
    print("--- 1. Testing Observers ---")
    if isinstance(acc2, SavingsAccount):
        acc2.add_interest()

    print()
    acc3.withdraw(800)

    # 4. Polymorphic loop
    print("\n--- 2. Statement Loop ---")
    for acc in [acc1, acc2, acc3]:
        print(acc.statement())