import Header from "./header";
import Dish from "./dish";

const dishes = [
  { id: 1, name: "Doro Wat", price: 240 },
  { id: 2, name: "Kitfo", price: 300 },
  { id: 3, name: "Beyaynetu", price: 180 },
  { id: 4, name: "Shiro Tegabeno", price: 150 },
];

function App() {
  return (
    <main className="app-container">
      <Header />
      <section className="menu-list">
        {dishes.map((dish) => (
          <Dish key={dish.id} name={dish.name} price={dish.price} />
        ))}
      </section>
    </main>
  );
}

export default App;
