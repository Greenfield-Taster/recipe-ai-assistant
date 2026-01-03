function RecipeCard({ recipe, onClick }) {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Легко": return "difficulty-easy";
      case "Середньо": return "difficulty-medium";
      case "Складно": return "difficulty-hard";
      default: return "";
    }
  };

  return (
    <div className="recipe-card" onClick={onClick}>
      <div className="recipe-card-emoji">{recipe.emoji}</div>
      <div className="recipe-card-content">
        <h3 className="recipe-card-title">{recipe.name}</h3>
        <p className="recipe-card-description">{recipe.description}</p>

        <div className="recipe-card-meta">
          <span className="recipe-meta-item">
            <span className="meta-icon">⏱</span>
            {recipe.time}
          </span>
          <span className="recipe-meta-item">
            <span className="meta-icon">🔥</span>
            {recipe.calories} kcal
          </span>
          <span className={`recipe-difficulty ${getDifficultyColor(recipe.difficulty)}`}>
            {recipe.difficulty}
          </span>
        </div>

        <div className="recipe-ingredients">
          {recipe.ingredients.map((ingredient, index) => (
            <span key={index} className="ingredient-tag">
              {ingredient}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
