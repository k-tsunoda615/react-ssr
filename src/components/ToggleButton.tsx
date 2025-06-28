import { useState } from 'react';

export default function ToggleButton() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="toggle">
      <h3>ただのトグルボタン</h3>
      <button className={`toggle-button ${isOn ? 'on' : 'off'}`} onClick={() => setIsOn(!isOn)}>
        {isOn ? 'ON' : 'OFF'}
      </button>
      <p>状態: {isOn ? '有効' : '無効'}</p>
    </div>
  );
}
