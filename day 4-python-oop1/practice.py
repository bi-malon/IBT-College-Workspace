# Exercise 1: Book Class
class Book:
    def __init__(self, title: str, author: str, price: int):
        self.title = title
        self.author = author
        self.price = price

    def describe(self) -> None:
        print(f"Title: '{self.title}', by {self.author}, Price: {self.price} ETB")


# Exercise 2: Product Class
class Product:
    def __init__(self, name: str, price: float, quantity: int):
        self.name = name
        self.price = price

        # Exercise 3: Encapsulation
        if quantity < 0:
            print(f"[{self.name}] Invalid quantity. Setting to 0.")
            self.__quantity = 0
        else:
            self.__quantity = quantity

    # Exercise 3: Read-only property
    @property
    def quantity(self):
        return self.__quantity

    def restock(self, n: int) -> None:
        if n <= 0:
            print(f"[{self.name}] Invalid restock amount. Must be positive.")
            return
        self.__quantity += n
        print(f"[{self.name}] Restocked {n} units. New quantity: {self.__quantity}.")

    def sell(self, n: int) -> None:
        # Exercise 4: Validation
        if n <= 0:
            print(f"[{self.name}] Invalid sell amount. Must be positive.")
            return
        if n > self.__quantity:
            print(f"[{self.name}] Transaction Rejected: Insufficient stock.")
            return
        self.__quantity -= n
        print(f"[{self.name}] Sold {n} units. New quantity: {self.__quantity}.")


if __name__ == "__main__":
    print("--- Day 4 Local Test ---")
    book = Book("Fkr eske mekabr ", "bealu girma", 200)
    book.describe()

    product = Product("Laptop", 15000, 10)
    print(f"Product: {product.name}, Price: {product.price} ETB, Quantity: {product.quantity}")
    product.restock(5)
    product.sell(3)
    product.sell(15)  # Attempt to sell more than available