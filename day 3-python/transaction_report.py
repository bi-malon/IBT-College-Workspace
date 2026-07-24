customer_totals = {}

# Step 1 & 4: Read file line by line with try/except
try:
    with open("transactions.txt", "r") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            
            name, amount_str = line.split(",")
            amount = float(amount_str)
            
            # Step 2: Build dict mapping each customer to their total spend
            customer_totals[name] = customer_totals.get(name, 0.0) + amount

    # Step 3: Sort by total spend (highest first)
    sorted_customers = sorted(customer_totals.items(), key=lambda x: x[1], reverse=True)

    print("========================================")
    print("     TELEBIRR TRANSACTION REPORT       ")
    print("========================================\n")

    for name, total in sorted_customers:
        print(f"{name}: {total:.2f} ETB")

    # Step 5: Write summary to report.txt
    with open("report.txt", "w") as out_file:
        out_file.write("--- TELEBIRR TRANSACTION REPORT ---\n")
        for name, total in sorted_customers:
            out_file.write(f"{name}: {total:.2f} ETB\n")
            
    print("\n✓ Summary successfully saved to report.txt")

except FileNotFoundError:
    print("Error: 'transactions.txt' file was not found. Please ensure the file exists.")