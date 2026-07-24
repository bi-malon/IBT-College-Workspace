
stock = {}

# Requirement 1: Read stock.txt into a dictionary safely
try:
    with open("stock.txt", "r") as f:
        for line in f:
            line = line.strip()
            if line:
                item, qty = line.split(",")
                stock[item] = int(qty)
except FileNotFoundError:
    print("No stock file yet – starting empty.")

# Requirement 2: Function to adjust quantity
def adjust(item: str, amount: int) -> None:
    """Increases or decreases an item's quantity in stock."""
    stock[item] = stock.get(item, 0) + amount

# Requirement 3: Comprehension to identify low-stock items (< 10)
def check_low_stock() -> list:
    return [item for item, qty in stock.items() if qty < 10]

# Requirement 4: Save updated dictionary back to stock.txt
def save_stock() -> None:
    with open("stock.txt", "w") as f:
        for item, qty in stock.items():
            f.write(f"{item},{qty}\n")

# --- Demonstration Run ---
if __name__ == "__main__":
    print("========================================")
    print("     PHARMACY INVENTORY TRACKER         ")
    print("========================================\n")

    print("Initial Stock Loaded:", stock)

    # Perform adjustments
    adjust("Amoxicillin", 10)  # Restock Amoxicillin
    adjust("Aspirin", -1)       # Reduce Aspirin
    adjust("Omeprazole", 12)    # Add new item

    print("\nStock After Adjustments:", stock)

    # Check low stock using comprehension
    low_stock = check_low_stock()
    print("\nLow stock items (< 10):", low_stock)

    # Persist updates
    save_stock()
    print("\n✓ Updated stock saved to stock.txt!")
    print("========================================")