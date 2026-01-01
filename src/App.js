import { useState, useEffect } from 'react';
import './App.css'; // This imports the design we just wrote

function App() {
  const [goals, setGoals] = useState([]);
  const [inputText, setInputText] = useState(""); 

  const getData = async () => {
    try {
      const response = await fetch('http://localhost:5000/goals');
      const data = await response.json();
      setGoals(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addGoal = async () => {
    if (!inputText) return;
    await fetch('http://localhost:5000/goals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: inputText }),
    });
    setInputText(""); 
    getData(); 
  };

  const deleteGoal = async (id) => {
    await fetch(`http://localhost:5000/goals/${id}`, {
      method: 'DELETE',
    });
    getData(); 
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <div className="app-container">
        
        <h1>🚀 Goal Tracker</h1>

        {/* Input Section */}
        <div className="input-group">
          <input 
            type="text" 
            placeholder="What is your next goal?" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addGoal()} // Allow pressing "Enter" to add
          />
          <button className="add-btn" onClick={addGoal}>
            Add
          </button>
        </div>

        {/* List Section */}
        <ul>
          {goals.map((goal) => (
            <li key={goal._id} className="goal-item">
              <span>{goal.text}</span>
              <button 
                className="delete-btn"
                onClick={() => deleteGoal(goal._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}

export default App;