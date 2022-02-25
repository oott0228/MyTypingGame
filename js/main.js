'use strict';

{
    function setWord() {
        countDown();
        word = words.splice(Math.floor(Math.random() * words.length), 1)[0];
        target.textContent = word;
        loc = 0;
    }

    function countDown() {
        limitTime = 6;
        if(loc === 0) {
            const countDown = () => {
                limitTime--;
                limit.textContent = limitTime;
            } 
            const intervalId = setInterval(() => {
            countDown();
    
            if(limitTime < 2) {
                clearInterval(intervalId);
                target.textContent = 'Game Over!';
            }}, 1000);  
        }
    }
    const words = [
        'red',
        'blue',
        'pink',
        'white',
        'purple',
        'black',
        'yellow',
        'orange',
        'green'
    ];

    let word;
    let loc = 0;
    let count = 4;
    let startTime; 
    let isPlaying = false;
    let isWrong = false;
    let limitTime;
    const index = words.length;
    const target = document.getElementById('target');
    const limit = document.getElementById('limit');

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
            isWrong = true;
            if(isWrong) {
                target.style.backgroundColor = 'red';
            }
            return;
        }

        isWrong = false;
        if(!isWrong) {
            target.style.backgroundColor = 'transparent';
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