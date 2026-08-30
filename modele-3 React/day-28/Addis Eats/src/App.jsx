import Header from "./Header";
import Menu from "./Menu";
import { dishes } from "./data";

function App() {
  // Category filter driver (Hardcoded for Day 27 as required; state arrives on Day 28)
  const selectedCategory = "Main";

  return (
    <main className="app-container">
      <Header />
      <h2>Category: {selectedCategory}</h2>
      <Menu items={dishes} selectedCategory={selectedCategory} />
    </main>
  );
}

export default App;
