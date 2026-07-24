<<<<<<< HEAD
#excercice 1 : Temperature label

def check_temprature(temp:float):
    if temp < 0:
        return "Freezing"
    elif 0 <= temp < 10:
        return "Cold"
    elif 10 <= temp < 20:
        return "Cool"
    elif 20 <= temp < 30:
        return "Warm"
    else:
        return "Hot"

    #exercise 2 : receipt loop
    print("....Receipt Loop....")
    for n in range(1, 11):
        print(f"Receipt {n}:")

    #exercise 3 : even numbers

print("....Even Numbers....")
for num in range(1, 21):
    if num % 2 == 0:
        print(num)

    #exercise 4 :discount function
    print("....Discount Function....")
    def apply_discount(price:float, percent:10):
        discount_amount = price * (percent / 100)
        discounted_price = price - discount_amount
        return discounted_price
    price_with_default = apply_discount(100.0,10)
    print(f"Price after discount: {price_with_default}")
    price_wuth_custom= apply_discount(100.0, 20)
    print(f"Price after custom discount: {price_wuth_custom}")

    #exercise 5: countdown 
    print("....Countdown....")
    count = 5
    while count >= 1:
        print(count)
        count -= 1

=======
#excercice 1 : Temperature label

def check_temprature(temp:float):
    if temp < 0:
        return "Freezing"
    elif 0 <= temp < 10:
        return "Cold"
    elif 10 <= temp < 20:
        return "Cool"
    elif 20 <= temp < 30:
        return "Warm"
    else:
        return "Hot"

    #exercise 2 : receipt loop
    print("....Receipt Loop....")
    for n in range(1, 11):
        print(f"Receipt {n}:")

    #exercise 3 : even numbers

print("....Even Numbers....")
for num in range(1, 21):
    if num % 2 == 0:
        print(num)

    #exercise 4 :discount function
    print("....Discount Function....")
    def apply_discount(price:float, percent:10):
        discount_amount = price * (percent / 100)
        discounted_price = price - discount_amount
        return discounted_price
    price_with_default = apply_discount(100.0,10)
    print(f"Price after discount: {price_with_default}")
    price_wuth_custom= apply_discount(100.0, 20)
    print(f"Price after custom discount: {price_wuth_custom}")

    #exercise 5: countdown 
    print("....Countdown....")
    count = 5
    while count >= 1:
        print(count)
        count -= 1

>>>>>>> 03d8c9e0f852ffb7f9837142a3c5c8119c3c48bd
        print("DONE!")