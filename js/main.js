'use strict';

{
    function setWord() {
        countDown();
        word = words[index];
        index++;
        target.textContent = word;
        loc = 0;
    }

    function countDown() {
        limitTime = 10;
        limit.style.visibility = 'visible'; // 2回目最初変な数字が表示されてしまう。3回目以降カウントダウンが表示されない。
        if(loc !== 0) { return; } 

        const countDown = () => {
            limitTime--;
            limit.textContent = limitTime;
        } 

        const intervalId = setInterval(() => {
        countDown();

        if (limitTime < 1) {
            clearInterval(intervalId);
            target.textContent = 'Game Over!';
            target.style.backgroundColor = 'red';

            replay.textContent = 'Click to Replay!';
            replay.style.visibility = 'visible';

        }}, 1000);
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
        'green',
    ];
    
    let word;
    let loc = 0;
    let index = 0;
    let count = 4;
    let startTime; 
    let isPlaying = false;
    let isWrong = false;
    let limitTime;
    const target = document.getElementById('target');
    const limit = document.getElementById('limit');
    const replay = document.getElementById('replay');

    function shuffleWords(words,randWords) {
        words.sort(() => Math.random() - 0.5);
    }

    replay.addEventListener('click', () => {
        result.style.visibility = 'hidden';
        replay.style.visibility = 'hidden';
        target.textContent = '';
        limit.textContent = '';
        target.style.visibility = 'visible';
        isWrong = false;
        isPlaying = false;

        target.style.backgroundColor = 'transparent';

        if (isPlaying) { return; }
        index = 0;

        count = 4;
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
        shuffleWords(words);
        setTimeout(setWord, 4000);
    });

    target.addEventListener('click', () => {
        if (isPlaying) { return; }
        index = 0;
        
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
        shuffleWords(words);
        setTimeout(setWord, 4000);
    });
    
    document.addEventListener('keydown', e => {
        if(e.key !== word[loc]) {
            target.style.backgroundColor = 'red';
            return;
        } else {
            target.style.backgroundColor = 'transparent';
        }
        
        loc++;
        target.textContent = '_'.repeat(loc) + word.substring(loc);
        if (loc !== word.length) { return; }

        if (index === words.length) {
            target.style.visibility = 'hidden';
            limit.style.visibility = 'hidden';
            replay.textContent = 'Click to Replay!';
            const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
            const result = document.getElementById('result');
            result.textContent = `Finished! ${elapsedTime} seconds!`;
            result.style.visibility = 'visible';
            replay.style.visibility = 'visible';
            return;
        }
        setWord();
    });
}