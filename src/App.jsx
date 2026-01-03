import { useState } from 'react'
import RecipeList from './components/RecipeList'
import RecipeDetail from './components/RecipeDetail'
import AICopilot from './components/AICopilot'
import { recipes } from './data/recipes'
import './App.css'

function App() {
  const [filteredRecipes, setFilteredRecipes] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleRecipesFound = (found) => {
    setFilteredRecipes(found.length > 0 ? found : null);
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseDetail = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1 className="logo">
            <span className="logo-icon">🍳</span>
            <span className="logo-text">RecipeAI</span>
          </h1>
        </div>
        <AICopilot recipes={recipes} onRecipesFound={handleRecipesFound} />
      </aside>

      <main className="main-content">
        <header className="content-header">
          <p className="tagline">Знайди ідеальний рецепт за інгредієнтами</p>
        </header>

        <section className="recipes-section">
          {filteredRecipes ? (
            <RecipeList
              recipes={filteredRecipes}
              title="Знайдені рецепти"
              onRecipeClick={handleRecipeClick}
            />
          ) : (
            <RecipeList
              recipes={recipes}
              title="Всі рецепти"
              onRecipeClick={handleRecipeClick}
            />
          )}
        </section>

        <footer className="footer">
          <p>RecipeAI - твій розумний кулінарний помічник</p>
        </footer>
      </main>

      {selectedRecipe && (
        <RecipeDetail recipe={selectedRecipe} onClose={handleCloseDetail} />
      )}
    </div>
  )
}

export default App
