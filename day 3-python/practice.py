#exercise: 1 unique cities
print("....unique cities....")
city_list = ["Addis Ababa", "Dire Dawa", "Mekelle", "Gondar", "Bahir Dar", "Hawassa", "Jimma", "Adama", "Harar", "Shashamane"]
distinct_cities = set(city_list)
print("distinct cities:", distinct_cities)
print("number of distinct cities:", len(distinct_cities))

# exercise :2 price report
print("....price report....")
grocery_prices = {
    "milk": 90.0,
    "bread": 30.0,
    "eggs": 23.0,
    "coffee": 1600
}
for item, price in grocery_prices.items():
    print(f"{item}: {price:.2f} ETB")

    #excercise:3 tax
    print("....tax....")
    price =[100,250,500,90]
    price_with_tax = [p * 1.15 for p in price]
    print(f"Original prices: {price}")
    print(f"Prices with tax: {price_with_tax}")

    #exercise:4 cheap items
    print("....cheap items....")
    cheap_items  =[p for p in price if p < 200]
    print(f"Cheap items (less than 200 ETB): {cheap_items}")

    #exercise:5 write & read
    print("....write & read....")
    name_to_write = ["jo","sofi","mike"]
    #write to file
    with open("names.txt", "w") as file:
        for name in name_to_write:
            file.write(name + "\n")
    #Read from file
    print("Names read from file:")
    with open("names.txt", "r") as file:
        for line in file:
            print(line.strip())

     # exercise:6 safe division
    print("....safe division....")
    user_input = input("Enter a number to divide 100 by: ")
    try:
        result = 100 / float(user_input)
        print(f"Result: {result}")
    except ZeroDivisionError:
        print("Error: Division by zero is not allowed.")