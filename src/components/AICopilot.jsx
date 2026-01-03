import { useState } from 'react';

function AICopilot({ recipes, onRecipesFound }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Привіт! Я твій кулінарний помічник. Напиши які інгредієнти у тебе є, і я підкажу що можна приготувати!'
    }
  ]);

  const findRecipes = (ingredients) => {
    const userIngredients = ingredients
      .toLowerCase()
      .split(/[,\s]+/)
      .filter(i => i.length > 2);

    const matchedRecipes = recipes.map(recipe => {
      const recipeIngredients = recipe.ingredients.map(i => i.toLowerCase());
      const matches = userIngredients.filter(ui =>
        recipeIngredients.some(ri => ri.includes(ui) || ui.includes(ri))
      );
      return {
        ...recipe,
        matchCount: matches.length,
        matchPercentage: Math.round((matches.length / recipeIngredients.length) * 100)
      };
    }).filter(r => r.matchCount > 0)
      .sort((a, b) => b.matchPercentage - a.matchPercentage);

    return matchedRecipes;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { type: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);

    const foundRecipes = findRecipes(input);

    let botResponse;
    if (foundRecipes.length === 0) {
      botResponse = {
        type: 'bot',
        text: 'На жаль, не знайшов рецептів з такими інгредієнтами. Спробуй ввести інші продукти!'
      };
      onRecipesFound([]);
    } else {
      const topRecipes = foundRecipes.slice(0, 4);
      botResponse = {
        type: 'bot',
        text: `Чудово! Знайшов ${foundRecipes.length} рецепт(ів). Ось найкращі варіанти:`,
        recipes: topRecipes
      };
      onRecipesFound(topRecipes);
    }

    setMessages(prev => [...prev, botResponse]);
    setInput('');
  };

  return (
    <div className="ai-copilot">
      <div className="copilot-header">
        <span className="copilot-icon">🤖</span>
        <h3>AI Помічник</h3>
      </div>

      <div className="copilot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.type}`}>
            <div className="message-content">
              <p>{msg.text}</p>
              {msg.recipes && (
                <div className="message-recipes">
                  {msg.recipes.map(r => (
                    <div key={r.id} className="mini-recipe">
                      <span className="mini-emoji">{r.emoji}</span>
                      <span className="mini-name">{r.name}</span>
                      <span className="mini-match">{r.matchPercentage}%</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <form className="copilot-input" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Напр: картопля, цибуля, м'ясо..."
        />
        <button type="submit">
          <span>Знайти</span>
          <span className="btn-icon">✨</span>
        </button>
      </form>
    </div>
  );
}

export default AICopilot;
