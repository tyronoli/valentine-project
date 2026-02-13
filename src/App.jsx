import React, { useState, useEffect } from 'react';
import Button from './components/Button/Button';
import styles from './App.module.css';

const YES_IMAGE = "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdW94eHhjYnpmYWowc3pxbmIwM2F1ZWEzNndpeTV1NHp0b2tuY3JtaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qFmdpUKAFZ6rMobzzu/giphy.gif";

const NO_IMAGES = [
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWUxMTlzNnl2ZGV2eWd0ZnV6Mm83cnlqejk3azk0dnd3aXJhNTd4OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/CK5gKBdBXdGtVv6AfG/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWd1bWppa2piamN3eHhkYXhveHY2aXI5bnViYWM4a2cwZ3RydHpxNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/rCxogJBzaeZuU/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnc1N3FtNGMwYXFscnh5cGo1bXl6bWpmcXJnb2dkaDg3OWZmZ2NnZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7AzEXdIb1wyCTWJntb/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGp1ZTQwNDRudTE0eWJ3M3RmZXNmYmV6MWFvbWllM2FtZzQ5dWR0NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fFa05KbZowXiEIyRse/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExemoxMG1tNWk5YnR3Nno5aDRiOHlyeW1rb2VnMDh3NHl5bDRjeTFhYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Zl7u48zLVFgLpRwq6f/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMG12OGttOGxoYmNqZ3locXVpcjJ5djhvamZqanQ3OW1qdTE2MXNqYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ruyS8Zw9sBqE5UjOnY/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXpqNWJnOHM1ZjNsYXBnOGtocHdibXA4am10Z2ljYzF3ZXcycXR1bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MNoPXfXzOBrD8alZ9H/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjd5OXpucXJhazQ3NnN3ajVpcWo2eml2Zjc3b3MwMGJ3ZHd0NHRiNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/I1nwVpCaB4k36/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3Y3YXk3ZHhqYTJsdjR0anh5aGg4cGt1cmI4cHRyb3JndmdvbGt0ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YLPOIP1jPu1N87yemm/giphy.gif"
];

const PHRASES = [
  "",
  "Ayaw 😢?",
  "Are you sure?",
  "Wabwaab please...",
  "Eto po flower para mag yes ka na",
  "Iiyak ato wabwab",
  "Ayaw to na nga...",
  "Chawoot lang po, PLEASE SAY YES! ❤️",
  "Nitanggal ko na yung NO, wala ka nang magagawa HAHAHAHA"
];

function App() {
  const [yesPressed, setYesPressed] = useState(false);
  const [noCount, setNoCount] = useState(0);

  // --- NEW: PRELOAD IMAGES ---
  useEffect(() => {
    // This function runs once when the app loads.
    // It forces the browser to download all images in the background.
    const preloadImages = () => {
      // 1. Preload the 'Yes' image
      const imgYes = new Image();
      imgYes.src = YES_IMAGE;

      // 2. Preload all 'No' images
      NO_IMAGES.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    };

    preloadImages();
  }, []); // Empty dependency array [] means run this only once on mount

  // Logic
  const isNoButtonVisible = noCount < PHRASES.length - 1;
  const currentNoImage = NO_IMAGES[noCount % NO_IMAGES.length];
  const currentText = PHRASES[Math.min(noCount, PHRASES.length - 1)];
  const yesButtonSize = noCount * 20 + 16;
  const noButtonSize = Math.max(16 - noCount, 8);

  return (
    <main className={styles.mainContainer}>
      <div className={styles.content}>

        {yesPressed ? (
          <>
            <div className={styles.imageWrapper}>
              <img src={YES_IMAGE} alt="Happy Cat" className={styles.image} />
            </div>
            <h1 className={styles.title}>Yay!!! Thank you wabwab Aywabwabwabyuuuuu! ❤️</h1>
          </>
        ) : (
          <>
            <div className={styles.imageWrapper}>
              <img
                key={noCount}
                src={currentNoImage}
                alt="Begging Cat"
                className={styles.image}
              />
            </div>

            <div className={styles.messageContainer}>
              {noCount > 0 && (
                <p className={styles.guiltText}>{currentText}</p>
              )}
              <h1 className={styles.title}>Will you be my Valentine?</h1>
            </div>

            <div className={styles.buttonGroup}>
              <Button
                variant="primary"
                onClick={() => setYesPressed(true)}
                style={{ fontSize: yesButtonSize }}
              >
                Yes
              </Button>

              {isNoButtonVisible && (
                <Button
                  variant="secondary"
                  onClick={() => setNoCount(noCount + 1)}
                  style={{ fontSize: noButtonSize }}
                >
                  No
                </Button>
              )}
            </div>
          </>
        )}

      </div>
    </main>
  );
}

export default App;