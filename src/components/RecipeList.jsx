import RecipeCard from './RecipeCard';

function RecipeList({ recipes, title = "Рецепти" }) {
  if (!recipes || recipes.length === 0) {
    return (
      <div className="recipe-list-empty">
        <span className="empty-icon">🍽️</span>
        <p>Рецептів не знайдено</p>
      </div>
    );
  }

  return (
    <section className="recipe-list-section">
      <h2 className="recipe-list-title">{title}</h2>
      <div className="recipe-list">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </section>
  );
}

export default RecipeList;
