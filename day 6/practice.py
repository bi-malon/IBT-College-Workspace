# day06/practice.py
from abc import ABC, abstractmethod
import math

# =====================================================================
# Exercise 1: Spot the SRP Violation (Split Report into 3 classes)
# =====================================================================

class ReportBuilder:
    """Class 1: Responsible only for building report content."""
    def build(self, title: str, body: str) -> str:
        return f"--- {title.upper()} ---\n{body}"


class ReportSaver:
    """Class 2: Responsible only for saving report to storage."""
    def save(self, content: str, filename: str) -> None:
        print(f" [SAVER] Saved report to file: '{filename}'")


class ReportEmailer:
    """Class 3: Responsible only for emailing the report."""
    def send_email(self, content: str, recipient: str) -> None:
        print(f" [EMAILER] Emailed report to: {recipient}")


# =====================================================================
# Exercise 2: Refactor to OCP (Shape Hierarchy)
# =====================================================================

class Shape(ABC):
    """Abstract Shape class enabling Open/Closed Principle."""
    @abstractmethod
    def area(self) -> float:
        pass


class CircleShape(Shape):
    def __init__(self, radius: float):
        self.radius = radius

    def area(self) -> float:
        return math.pi * (self.radius ** 2)


class SquareShape(Shape):
    def __init__(self, side: float):
        self.side = side

    def area(self) -> float:
        return self.side ** 2


# =====================================================================
# Exercise 3: Write a Singleton (AppSettings)
# =====================================================================

class AppSettings:
    """Singleton pattern ensuring only one configuration object exists."""
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.currency = "ETB"
        return cls._instance


# =====================================================================
# Exercise 4: Write a Factory (ShapeFactory)
# =====================================================================

class TriangleShape(Shape):
    def __init__(self, base: float, height: float):
        self.base = base
        self.height = height

    def area(self) -> float:
        return 0.5 * self.base * self.height


class ShapeFactory:
    """Factory to create Circle, Square, or Triangle."""
    @staticmethod
    def create(kind: str, *args) -> Shape:
        kind_clean = kind.strip().lower()
        if kind_clean == "circle":
            return CircleShape(args[0])
        elif kind_clean == "square":
            return SquareShape(args[0])
        elif kind_clean == "triangle":
            return TriangleShape(args[0], args[1])
        else:
            raise ValueError(f"Unknown shape type: '{kind}'")


# =====================================================================
# Exercise 5: Write an Observer Pair (NewsAgency & Subscribers)
# =====================================================================

class NewsSubscriber(ABC):
    @abstractmethod
    def update(self, news: str) -> None:
        pass


class TVChannel(NewsSubscriber):
    def __init__(self, channel_name: str):
        self.channel_name = channel_name

    def update(self, news: str) -> None:
        print(f" [{self.channel_name} TV Breaking News]: {news}")


class NewsWebsite(NewsSubscriber):
    def __init__(self, site_name: str):
        self.site_name = site_name

    def update(self, news: str) -> None:
        print(f" [{self.site_name} Website Alert]: {news}")


class NewsAgency:
    """Subject/Publisher class for Observer pattern."""
    def __init__(self):
        self._subscribers: list[NewsSubscriber] = []

    def subscribe(self, subscriber: NewsSubscriber) -> None:
        self._subscribers.append(subscriber)

    def notify(self, news: str) -> None:
        for subscriber in self._subscribers:
            subscriber.update(news)
# =====================================================================
# EXECUTION DRIVER
# =====================================================================
if __name__ == "__main__":
    print("========================================")
    print("      DAY 6 PRACTICE EXERCISES          ")
    print("========================================\n")

    # 1. Test SRP
    print("--- 1. Testing Single Responsibility Principle ---")
    builder = ReportBuilder()
    saver = ReportSaver()
    emailer = ReportEmailer()
    report = builder.build("Weekly Summary", "All tasks completed on schedule.")
    saver.save(report, "summary.txt")
    emailer.send_email(report, "binilove058@gamil.com.com")

    # 2. Test Singleton
    print("\n--- 2. Testing AppSettings Singleton ---")
    s1 = AppSettings()
    s2 = AppSettings()
    print(f"s1 currency: {s1.currency}")
    print(f"s2 currency: {s2.currency}")
    print(f"Are s1 and s2 the exact same instance? -> {s1 is s2}")

    # 3. Test Factory & OCP
    print("\n--- 3. Testing ShapeFactory ---")
    shapes = [
        ShapeFactory.create("circle", 5.0),
        ShapeFactory.create("square", 4.0),
        ShapeFactory.create("triangle", 6.0, 3.0)
    ]
    for s in shapes:
        print(f"Calculated Area: {s.area():.2f}")

    # 4. Test Observer Pair
    print("\n--- 4. Testing NewsAgency Observers ---")
    agency = NewsAgency()
    tv = TVChannel("EBC")
    web = NewsWebsite("Fana Digital")

    agency.subscribe(tv)
    agency.subscribe(web)
    agency.notify("Day 6 Refactoring Completed Successfully!")

    print("\n========================================")