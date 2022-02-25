'use strict';

{
    function setWord() {
        word = words.splice(Math.floor(Math.random() * words.length), 1)[0];
        target.textContent = word;
        loc = 0;
    }

    const words = [
        'red',
        'blue',
        'pink'
    ];

    let word;
    let loc = 0;
    let count = 4;
    let startTime;
    let isPlaying = false;
    const target = document.getElementById('target');

    document.addEventListener('click', () => {
        if (isPlaying === true) {
            return;
            }

        const countDown = () => {
            count--;
            target.textContent = count;
        } 
        const intervalId = setInterval(() => {
            countDown();
            if(count < 2) {
                clearInterval(intervalId);
            }}, 1000);

        isPlaying = true;
        startTime = Date.now() + 4000;
        setTimeout(setWord, 4000);
   });

    document.addEventListener('keydown', e => {
        if(e.key !== word[loc]) {
            return;
        }
        
        loc++;
        target.textContent = '_'.repeat(loc) + word.substring(loc);

        if (loc === word.length) {
            if (words.length === 0) {
                const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
                const result = document.getElementById('result');
                result.textContent = `Finished! ${elapsedTime} seconds!`;
                return;
            }
            setWord();
        }
    });
}