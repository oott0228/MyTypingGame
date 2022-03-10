'use strict';


class Countdown {
    constructor(count) {
        this.count = 3;
        this.element = document.getElementById('countdown');
        this.element.textContent = this.count;
        this.intervalId = null;
    }

    start() {
        this.intervalId = setInterval(() => {
            this.count--;
            this.element.textContent = this.count;
            if (this.count < 1) {
                clearInterval(this.intervalId);
            }
        }, 1000);
    }
}

class TypingGame {
    constructor() {
        this.words = [
            'red',
            'blue',
            'pink',
            'white',
            'purple',
            'black',
            'yellow',
            'orange',
            'green',
        ];

        this.currentWord;
        this.loc = 0;
        this.isWrong = false;
        this.shuffledList = [];
        this.currentIndex = 0;
        this.target = document.getElementById('target');
    }

    start() {
        document.addEventListener('keydown', e => {
            this.isCorrect(e);
        });
    }

    shuffle() {
        this.shuffledList = this.words.sort(() => Math.random() - 0.5);
        this.nextWord();
    }

    nextWord() {
        this.currentWord = this.shuffledList[this.currentIndex];
        this.currentIndex++;
        this.target.textContent = this.currentWord;
        this.loc = 0;
    }

    isCorrect(event) {
        if (event.key !== this.currentWord[this.loc]) {
            this.isWrong = true;
            return;
        }
        this.loc++;
        this.target.textContent = '_'.repeat(this.loc) + this.currentWord.substring(this.loc);
        if (this.loc !== this.currentWord.length) { return; }

        this.nextWord();
    }
}

//     function countDown() {
//         limitTime = 10;
//         limit.style.visibility = 'visible'; // 2回目最初変な数字が表示されてしまう。3回目以降カウントダウンが表示されない。
//         if (loc !== 0) { return; }

//         const countDown = () => {
//             limitTime--;
//             limit.textContent = limitTime;
//         }

//         const intervalId = setInterval(() => {
//             countDown();

//             if (limitTime < 1) {
//                 clearInterval(intervalId);
//                 target.textContent = 'Game Over!';
//                 target.style.backgroundColor = 'red';

//                 replay.textContent = 'Click to Replay!';
//                 replay.style.visibility = 'visible';
//             }
//         }, 1000);
//     }


//     const limit = document.getElementById('limit');
//     const replay = document.getElementById('replay');

//     replay.addEventListener('click', () => {
//         result.style.visibility = 'hidden';
//         replay.style.visibility = 'hidden';
//         target.textContent = '';
//         limit.textContent = '';
//         target.style.visibility = 'visible';
//         isWrong = false;
//         isPlaying = false;

//         target.style.backgroundColor = 'transparent';

//         if (isPlaying) { return; }
//         index = 0;

//         isPlaying = true;
//         startTime = Date.now() + 4000;
//         shuffleWords(words);
//         setTimeout(setWord, 4000);
//     });

//     target.addEventListener('click', () => {
//         if (isPlaying) { return; }
//         index = 0;

//         const countDown = () => {
//             count--;
//             target.textContent = count;
//         }
//         const intervalId = setInterval(() => {
//             countDown();
//             if (count < 2) {
//                 clearInterval(intervalId);
//             }
//         }, 1000);

//         isPlaying = true;
//         startTime = Date.now() + 4000;
//         shuffleWords(words);
//         setTimeout(setWord, 4000);
//     });

//     document.addEventListener('keydown', e => {
//         if (e.key !== word[loc]) {
//             target.style.backgroundColor = 'red';
//             return;
//         } else {
//             target.style.backgroundColor = 'transparent';
//         }

//         if (index === words.length) {
//             target.style.visibility = 'hidden';
//             limit.style.visibility = 'hidden';
//             replay.textContent = 'Click to Replay!';
//             const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
//             const result = document.getElementById('result');
//             result.textContent = `Finished! ${elapsedTime} seconds!`;
//             result.style.visibility = 'visible';
//             replay.style.visibility = 'visible';
//             return;
//         }
//         setWord();
//     });