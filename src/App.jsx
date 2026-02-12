import React, { useState } from 'react';
import Button from './components/Button/Button';
import styles from './App.module.css';

// 1. A single happy image for success
const YES_IMAGE = "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdW94eHhjYnpmYWowc3pxbmIwM2F1ZWEzNndpeTV1NHp0b2tuY3JtaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qFmdpUKAFZ6rMobzzu/giphy.gif";

// 2. A list of sad/shocked/begging images that cycles through
const NO_IMAGES = [
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWUxMTlzNnl2ZGV2eWd0ZnV6Mm83cnlqejk3azk0dnd3aXJhNTd4OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/CK5gKBdBXdGtVv6AfG/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWd1bWppa2piamN3eHhkYXhveHY2aXI5bnViYWM4a2cwZ3RydHpxNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/rCxogJBzaeZuU/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnc1N3FtNGMwYXFscnh5cGo1bXl6bWpmcXJnb2dkaDg3OWZmZ2NnZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7AzEXdIb1wyCTWJntb/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMG12OGttOGxoYmNqZ3locXVpcjJ5djhvamZqanQ3OW1qdTE2MXNqYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ruyS8Zw9sBqE5UjOnY/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzlkZGFqenB2azVpZGFvZWx5cTJubTd3bWR0N2c5eHR3d2sxZmNnaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vPzbDN4rBxuvtpSpzF/giphy.gif", // Sad 1
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGZraWUxdDE0ZXJ5c3FuNmtoN21saGZ0eHZvMXEzcmpucXc5em40ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/OHRF8LZis06OiPDJby/giphy.gif", // Shocked
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTliZ3o5MWhuOTVsYWJhejY3M3ZrNXBlamdpa2tveTh0cWZlNzg0NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/hEDnRkM5f8Og46hNRg/giphy.gif", // Grumpy
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXpqNWJnOHM1ZjNsYXBnOGtocHdibXA4am10Z2ljYzF3ZXcycXR1bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MNoPXfXzOBrD8alZ9H/giphy.gif", // Pleading
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjd5OXpucXJhazQ3NnN3ajVpcWo2eml2Zjc3b3MwMGJ3ZHd0NHRiNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/I1nwVpCaB4k36/giphy.gif"  // Funny
];

// 3. The text that appears BELOW the image
const PHRASES = [
  "", // First time: No text, just the question
  "No?",
  "Are you sure?",
  "Pookie please...",
  "Don't do this to me :(",
  "I'm gonna cry...",
  "You're breaking my heart!",
  "Fine, I'll stop asking...",
  "Just kidding, PLEASE SAY YES! ❤️"
];

function App() {
  const [yesPressed, setYesPressed] = useState(false);
  const [noCount, setNoCount] = useState(0);

  // LOGIC: Select Image
  // We use modulo (%) so the images loop forever (0, 1, 2, 3, 0, 1...)
  const currentNoImage = NO_IMAGES[noCount % NO_IMAGES.length];

  // LOGIC: Select Text
  // We use Math.min so the text stops changing at the last phrase
  const currentText = PHRASES[Math.min(noCount, PHRASES.length - 1)];

  // LOGIC: Button Sizing
  const yesButtonSize = noCount * 20 + 16;
  const noButtonSize = Math.max(16 - noCount, 0);

  return (
    <main className={styles.mainContainer}>
      <div className={styles.content}>

        {/* --- STATE 1: SUCCESS --- */}
        {yesPressed ? (
          <>
            <div className={styles.imageWrapper}>
              <img src={YES_IMAGE} alt="Happy Cat" className={styles.image} />
            </div>
            <h1 className={styles.title}>Yay!!! I knew you would say yes! ❤️</h1>
          </>
        ) : (

          /* --- STATE 2: ASKING --- */
          <>
            <div className={styles.imageWrapper}>
              {/* key={noCount} ensures the image fades in every time it changes */}
              <img
                key={noCount}
                src={currentNoImage}
                alt="Begging Cat"
                className={styles.image}
              />
            </div>

            {/* MESSAGE AREA (Changes every click) */}
            <div className={styles.messageContainer}>
              {/* Only show text if we have clicked at least once */}
              {noCount > 0 && (
                <p className={styles.guiltText}>{currentText}</p>
              )}
              <h1 className={styles.title}>Will you be my Valentine?</h1>
            </div>

            <div className={styles.buttonGroup}>
              {/* YES BUTTON - Grows */}
              <Button
                variant="primary"
                onClick={() => setYesPressed(true)}
                style={{ fontSize: yesButtonSize }}
              >
                Yes
              </Button>

              {/* NO BUTTON - Shrinks */}
              {noButtonSize > 0 && (
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