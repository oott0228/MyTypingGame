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
            if (this.count <= 0) {
                clearInterval(this.intervalId);
            }
        }, 1000);

        TypingGame.getStarttime(); 
        setTimeout()
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
        this.startTime = '';
    }

        // target.addEventListener('click', Countdown.start()); 
        //　↑buttonタグでonclickの方が良い？メソッドの中に入れないといけない？メソッドに入れるとしたらクリックイベントはどうやって設定するのか
            
        //if (isPlaying) { return; }
        //isPlaying = true;
        //↑ゲーム開始された判定はメソッド作る？


    getStarttime() {
        this.startTime = Date.now() + 3000; //ここで良い？
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

class LimitTime {
    constructor() {
        this.limitTime;
        this.limit = document.getElementById('limit');
        this.intervalId = null;
    }
    // this.limit.style.display = 'block';  不要？
    // if (loc !== 0) { return; }  不要？違うクラス内で書く？locをこのクラスでも使えるようにする？

    // nextWord()と同時に呼び出したい
    // TypingGameクラスのnextWord()の下に書く？nextWord()の中で呼び出す？
    start() {
        this.limitTime = 10;
        this.limit.style.backgroundColor = 'transparent';
        this.intervalId = setInterval(() => {
            this.limitTime--;
            this.limit.textContent = this.limitTime;
            if (this.limitTime <= 0) {
                clearInterval(this.intervalId);
                this.limit.textContent = 'Game Over!';
                this.limit.style.backgroundColor = 'red';
            }
        }, 1000);
    }
}

class Result {
    constructor() {
        this.elapsedTime = ((Date.now() - this.startTime) / 1000).toFixed(2); //startTime　TypingGameクラスから持ってこないといけない
        this.result = document.getElementById('result');
    }
    //currentIndex === words.lengthの時にこのメソッドを呼びたい
    // TypingGameクラス内でこのメソッドを呼び出す？このクラスでcurrentIndexやwords.lengthなどを使えるようにする？
    showResult() {
        this.result.textContent = `Finished! ${this.elapsedTime} seconds!`;
    }
}



//  ↓まだクラス化していない部分など

//         const intervalId = setInterval(() => {
//             countDown();
//             if (limitTime < 1) {
//                 clearInterval(intervalId);

//                 replay.textContent = 'Click to Replay!';
//                 replay.style.display = 'block';
//             }
//         }, 1000);
//     }

//     const replay = document.getElementById('replay');

//     replay.addEventListener('click', () => {
//         result.style.display = 'none';
//         replay.style.display = 'none';
//         target.textContent = '';
//         limit.textContent = '';
//         target.style.display = 'block';
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



//     document.addEventListener('keydown', e => {
//         if (e.key !== word[loc]) {
//             target.style.backgroundColor = 'red';
//             return;
//         } else {
//             target.style.backgroundColor = 'transparent';
//         }

//         if (index === words.length) {
//             target.style.display = 'none';
//             limit.style.display = 'none';
//             replay.textContent = 'Click to Replay!';

//             result.style.display = 'block';
//             replay.style.display = 'block';
//             return;
//         }
//         setWord();
//     });