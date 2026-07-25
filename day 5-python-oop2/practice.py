from abc import ABC, abstractmethod

# Exercise 5: Make Vehicle an abstract base class (inherits from ABC)
class Vehicle(ABC):
    def __init__(self, make: str, model: str):
        self.make = make
        self.model = model

    def describe(self) -> str:
        return f"Vehicle: {self.make} {self.model}"

    # Exercise 5: Abstract method enforcing wheels() on subclasses
    @abstractmethod
    def wheels(self) -> int:
        pass


# Exercise 1: Car subclass extending Vehicle
class Car(Vehicle):
    def wheels(self) -> int:
        return 4

    def describe(self) -> str:
        return f"Car: {self.make} {self.model} ({self.wheels()} wheels)"


# Exercise 1, 2, 3: Truck subclass with capacity, super(), and overridden describe()
class Truck(Vehicle):
    def __init__(self, make: str, model: str, capacity: float):
        # Exercise 2: Using super().init()
        super().__init__(make, model)
        self.capacity = capacity  # Capacity in tons

    def wheels(self) -> int:
        return 6

    # Exercise 3: Overriding describe() to include capacity
    def describe(self) -> str:
        return f"Truck: {self.make} {self.model} | Capacity: {self.capacity} tons ({self.wheels()} wheels)"


# Exercise 4: Polymorphic Demonstration
if __name__ == "__main__":
    print("========================================")
    print("      DAY 5 PRACTICE EXERCISES          ")
    print("========================================\n")

    # Exercise 4: List of mixed vehicle instances
    vehicles: list[Vehicle] = [
        Car("Toyota", "Corolla"),
        Truck("Isuzu", "NPR", 5.0),
        Car("Tesla", "Model 3"),
        Truck("Volvo", "FH16", 25.0)
    ]

    print("--- Exercise 4: Polymorphic Loop ---")
    for vehicle in vehicles:
        # Calls the specific describe() version for each object type!
        print(vehicle.describe())

    print("\n========================================")