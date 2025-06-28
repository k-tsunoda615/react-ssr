import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="counter">
      <h3>普通のカウンター</h3>
      <p>現在の値: {count}</p>
      <div className="counter-buttons">
        <button onClick={() => setCount(count - 1)}>-1</button>
        <button onClick={() => setCount(0)}>リセット</button>
        <button onClick={() => setCount(count + 1)}>+1</button>
      </div>
    </div>
  );
}
