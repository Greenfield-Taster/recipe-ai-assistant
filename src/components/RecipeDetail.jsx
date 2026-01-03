import { useState } from 'react';

function RecipeDetail({ recipe, onClose }) {
  const [copied, setCopied] = useState(false);
  const [servingsMultiplier, setServingsMultiplier] = useState(1);

  if (!recipe) return null;

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Легко": return "difficulty-easy";
      case "Середньо": return "difficulty-medium";
      case "Складно": return "difficulty-hard";
      default: return "";
    }
  };

  const calculateAmount = (amount) => {
    if (!amount) return "";
    const num = parseFloat(amount);
    if (isNaN(num)) return amount;
    const result = num * servingsMultiplier;
    return Number.isInteger(result) ? result : result.toFixed(1);
  };

  const generateShareText = () => {
    const currentServings = recipe.servings * servingsMultiplier;

    let text = `${recipe.emoji} ${recipe.name}\n`;
    text += `━━━━━━━━━━━━━━━━━━━━\n`;
    text += `⏱ ${recipe.time} | 🔥 ${recipe.calories} kcal | 👥 ${currentServings} порц.\n\n`;

    text += `🛒 Інгредієнти:\n`;
    recipe.fullIngredients?.forEach((ing) => {
      const amount = calculateAmount(ing.amount);
      text += `• ${ing.name} — ${amount} ${ing.unit}\n`;
    });

    text += `\n👨‍🍳 Приготування:\n`;
    recipe.steps?.forEach((step, index) => {
      text += `${index + 1}. ${step}\n`;
    });

    text += `\n━━━━━━━━━━━━━━━━━━━━\n`;
    text += `📲 Знайдено на RecipeAI`;

    return text;
  };

  const handleShare = async () => {
    const text = generateShareText();

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const currentServings = recipe.servings * servingsMultiplier;

  return (
    <div className="recipe-detail-overlay" onClick={onClose}>
      <div className="recipe-detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <span>×</span>
        </button>

        <div className="modal-header">
          <span className="modal-emoji">{recipe.emoji}</span>
          <div className="modal-title-block">
            <h2 className="modal-title">{recipe.name}</h2>
            <p className="modal-description">{recipe.description}</p>
          </div>
        </div>

        <div className="modal-meta">
          <span className="modal-meta-item">
            <span className="meta-icon">⏱</span>
            {recipe.time}
          </span>
          <span className="modal-meta-item">
            <span className="meta-icon">🔥</span>
            {recipe.calories} kcal
          </span>
          <div className="servings-control">
            <span className="meta-icon">👥</span>
            <button
              className="servings-btn"
              onClick={() => setServingsMultiplier(Math.max(0.5, servingsMultiplier - 0.5))}
            >
              −
            </button>
            <span className="servings-value">{currentServings} порц.</span>
            <button
              className="servings-btn"
              onClick={() => setServingsMultiplier(servingsMultiplier + 0.5)}
            >
              +
            </button>
          </div>
          <span className={`recipe-difficulty ${getDifficultyColor(recipe.difficulty)}`}>
            {recipe.difficulty}
          </span>
          <button className={`share-btn ${copied ? 'copied' : ''}`} onClick={handleShare}>
            <span className="share-icon">{copied ? '✓' : '📤'}</span>
            <span>{copied ? 'Скопійовано!' : 'Поділитися'}</span>
          </button>
        </div>

        <div className="modal-content">
          <div className="modal-ingredients">
            <h3>
              <span className="section-icon">🛒</span>
              Інгредієнти
            </h3>
            <ul className="ingredients-list">
              {recipe.fullIngredients?.map((ing, index) => (
                <li key={index} className="ingredient-item">
                  <span className="ingredient-name">{ing.name}</span>
                  <span className="ingredient-amount">
                    {calculateAmount(ing.amount)} {ing.unit}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="modal-steps">
            <h3>
              <span className="section-icon">👨‍🍳</span>
              Приготування
            </h3>
            <ol className="steps-list">
              {recipe.steps?.map((step, index) => (
                <li key={index} className="step-item">
                  <span className="step-number">{index + 1}</span>
                  <span className="step-text">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
