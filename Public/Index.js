import { useState } from 'react';
import { motion } from 'framer-motion';
import { Howl } from 'howler';
import WinnerModal from '../components/WinnerModal';
import styles from '../styles/Home.module.css';

const prizes = [
  "iPhone 15 Pro Max", "Samsung Galaxy S24", "Gaming Laptop",
  "Professional Camera", "Smart Fridge", "4K Ultra TV",
  "Solar Panel Kit", "Gold Detector", "Gold Weighing Scale", "Gold Smelting Machine"
];

const flipSound = new Howl({ src: ['/sounds/flip.mp3'] });
const winSound = new Howl({ src: ['/sounds/win.mp3'] });

export default function Home() {
  const [revealed, setRevealed] = useState(Array(10).fill(false));
  const [wonPrize, setWonPrize] = useState(null);

  const handleReveal = (index) => {
    if (revealed[index]) return;
    flipSound.play();
    const updated = [...revealed];
    updated[index] = true;
    setRevealed(updated);
    setWonPrize(prizes[index]);
    setTimeout(() => {
      winSound.play();
    }, 300);
  };

  return (
    <div className={styles.container}>
      <img src="/logo.png" alt="Logo" className={styles.logo} />
      <h1 className={styles.title}>Pick a Card & Win Big!</h1>
      <div className={styles.grid}>
        {prizes.map((prize, index) => (
          <motion.div 
            key={index}
            className={`${styles.card} ${revealed[index] ? styles.flipped : ''}`}
            whileHover={{ scale: 1.1 }}
            onClick={() => handleReveal(index)}
          >
            {revealed[index] ? <span>{prize}</span> : <span>?</span>}
          </motion.div>
        ))}
      </div>
      {wonPrize && <WinnerModal prize={wonPrize} />}
    </div>
  );
      }
