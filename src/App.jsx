import { useState } from 'react'
import RecipeList from './components/RecipeList'
import AICopilot from './components/AICopilot'
import { recipes } from './data/recipes'
import './App.css'

function App() {
  const [filteredRecipes, setFilteredRecipes] = useState(null);

  const handleRecipesFound = (found) => {
    setFilteredRecipes(found.length > 0 ? found : null);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1 className="logo">
            <span className="logo-icon">🍳</span>
            <span className="logo-text">RecipeAI</span>
          </h1>
          <p className="tagline">Знайди ідеальний рецепт з AI</p>
        </div>
      </header>

      <main className="main-content">
        <div className="content-grid">
          <aside className="sidebar">
            <AICopilot recipes={recipes} onRecipesFound={handleRecipesFound} />
          </aside>

          <section className="recipes-section">
            {filteredRecipes ? (
              <RecipeList
                recipes={filteredRecipes}
                title="Знайдені рецепти"
              />
            ) : (
              <RecipeList
                recipes={recipes}
                title="Всі рецепти"
              />
            )}
          </section>
        </div>
      </main>

      <footer className="footer">
        <p>RecipeAI - твій розумний кулінарний помічник</p>
      </footer>
    </div>
  )
}

export default App
