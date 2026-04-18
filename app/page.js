'use client';

import { useState } from 'react';

export default function FlipIt() {
  const [balance, setBalance] = useState(1000);
  const [bet, setBet] = useState(50);
  const [result, setResult] = useState('');
  const [view, setView] = useState('coin');

  const playCoinFlip = () => {
    if (bet > balance) return setResult('Not enough balance!');
    const win = Math.random() < 0.5;
    if (win) {
      setBalance(balance + bet);
      setResult('You won 🎉');
    } else {
      setBalance(balance - bet);
      setResult('You lost 😢');
    }
  };

  const playSlots = () => {
    if (bet > balance) return setResult('Not enough balance!');

    const symbols = ['🍒', '🍋', '🔔', '💎'];
    const spin = [
      symbols[Math.floor(Math.random() * symbols.length)],
      symbols[Math.floor(Math.random() * symbols.length)],
      symbols[Math.floor(Math.random() * symbols.length)]
    ];

    if (spin[0] === spin[1] && spin[1] === spin[2]) {
      setBalance(balance + bet * 5);
      setResult('Jackpot! ' + spin.join(' '));
    } else {
      setBalance(balance - bet);
      setResult('No win ' + spin.join(' '));
    }
  };

  const playBlackjack = () => {
    if (bet > balance) return setResult('Not enough balance!');

    const player = Math.floor(Math.random() * 11) + 11;
    const dealer = Math.floor(Math.random() * 11) + 11;

    if (player > dealer) {
      setBalance(balance + bet);
      setResult(`You win ${player} vs ${dealer}`);
    } else if (player < dealer) {
      setBalance(balance - bet);
      setResult(`Dealer wins ${player} vs ${dealer}`);
    } else {
      setResult(`Tie ${player} vs ${dealer}`);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #000, #111)',
      color: 'white',
      padding: 20,
      fontFamily: 'Arial'
    }}>

      <h1 style={{ textAlign: 'center', fontSize: 40 }}>🎰 FlipIt Casino</h1>

      <p style={{ textAlign: 'center', fontSize: 20 }}>
        Balance: ${balance}
      </p>

      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <input
          type="number"
          value={bet}
          onChange={(e) => setBet(Number(e.target.value))}
          style={{ padding: 10, width: 100, marginRight: 10 }}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <button onClick={() => setView('coin')} style={{ margin: 5 }}>Coin Flip</button>
        <button onClick={() => setView('slots')} style={{ margin: 5 }}>Slots</button>
        <button onClick={() => setView('blackjack')} style={{ margin: 5 }}>Blackjack</button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        {view === 'coin' && <button onClick={playCoinFlip}>Flip Coin</button>}
        {view === 'slots' && <button onClick={playSlots}>Spin Slots</button>}
        {view === 'blackjack' && <button onClick={playBlackjack}>Play Blackjack</button>}
      </div>

      <h2 style={{ textAlign: 'center' }}>{result}</h2>

    </div>
  );
}
