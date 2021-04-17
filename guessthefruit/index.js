// Pages

const startPage = document.querySelector(".startPage");
const gamePage = document.querySelector(".gamePage");
const endPage = document.querySelector(".endPage");
const navbar = document.querySelector(".navbar");

// 

// startPage

const btn = document.querySelector(".btn");
const text = document.getElementById("name");
const goBtn = document.querySelector(".gobtn");

//

// gamePage 

const linkName = document.querySelector(".link-name");
const linkScore = document.querySelector(".link-score");
const linkLeft = document.querySelector(".link-left");

const img = document.querySelector(".img-main");
const opt1 = document.querySelector("button[value='opt1']");
const opt2 = document.querySelector("button[value='opt2']");
const opt3 = document.querySelector("button[value='opt3']");
const opt4 = document.querySelector("button[value='opt4']");

const submitBtn = document.querySelector(".submitBtn");
const endBtn = document.querySelector(".endBtn");

//

// endPage 

const endPageBtn = document.querySelector(".endPageBtn");
const endScore = document.querySelector(".end-score");

//

// commonValues 

let name = "";
let score = 0;
let i=0;

let images = [
    {"src": "https://cdn.pixabay.com/photo/2017/09/26/13/42/apple-2788662_960_720.jpg", "ans": "Apple"},
    {"src": "https://cdn.pixabay.com/photo/2015/03/26/09/45/grapes-690230_960_720.jpg", "ans": "Grape"},
    {"src": "https://cdn.pixabay.com/photo/2017/02/06/19/25/mandarins-2043983_960_720.jpg", "ans": "Orange"},
    {"src": "https://cdn.pixabay.com/photo/2017/03/04/12/10/avocado-2115922_960_720.jpg", "ans": "Avocado"},
    {"src": "https://cdn.pixabay.com/photo/2018/06/07/16/38/blueberry-3460423_960_720.jpg", "ans": "Blueberry"},
    {"src": "https://7esl.com/wp-content/uploads/2017/12/apples-150x150.png", ans: "Apple"},
    {"src": "https://7esl.com/wp-content/uploads/2017/12/watermelon-150x150.png", "ans": "Watermelon"}
];

let fruitNames = ['Apple', 'Avocado', 'Grape', 'Orange', 'Blueberry', 'Watermelon'];
let shuffledImgs = shuffle(images); // shuffle one time
//

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

function defaultStartPage() {
    text.style.opacity = 0;
    goBtn.style.opacity = 0;
    gamePage.style.display = 'none';
    navbar.style.display = 'none';
    endPage.style.display = 'none';
}

function askName() {
    text.style.opacity = 1;
    goBtn.style.opacity = 1;
}

function setNameAndScore() {
    linkName.innerText = "Welcome, ";
    linkScore.innerText = "Score: ";
    linkLeft.innerText = "Questions left: ";
    let nameInner = document.createElement("span");
    let scoreInner = document.createElement("span");
    let leftQs = document.createElement("span");
    nameInner.innerText = name;
    scoreInner.innerText = score;
    leftQs.innerText = images.length - i;
    nameInner.setAttribute("class", "bold");
    scoreInner.setAttribute("class", "bold");
    leftQs.setAttribute("class", "bold");
    linkName.appendChild(nameInner);
    linkScore.appendChild(scoreInner);
    linkLeft.appendChild(leftQs);
}

function endQuiz() {
    navbar.style.display = 'none';
    gamePage.style.display = 'none';
    endPage.style.display = 'flex';
    endScore.innerText = name + ", Your Score is ";
    let highScore = document.createElement("span");
    highScore.innerText = score + ' out of ' + images.length;
    highScore.setAttribute("class", "bold");
    endScore.appendChild(highScore);
}

function showQuestion() {
    if (i >= images.length) {
        endQuiz();
        return;
    }

    let questImg = shuffledImgs[i];
    let shuffledFruitNames = shuffle(fruitNames);
    let options = [questImg.ans];
    let j=0;

    console.log(questImg.ans, options);
    while (options.length < 4) {
        if (shuffledFruitNames[j] != questImg.ans) {
            options.push(shuffledFruitNames[j]);
        }
        j++;
    }
    options = shuffle(options);
    
    img.setAttribute("src", questImg.src);
    opt1.innerText = options[0];
    opt2.innerText = options[1];
    opt3.innerText = options[2];
    opt4.innerText = options[3];
}

function validateAnswer(selctedOption) {
    console.log(selctedOption, shuffledImgs[i].ans);
    if (selctedOption == shuffledImgs[i].ans) {
        score++;
    }
    i++;
    setNameAndScore();
    showQuestion();
}

btn.addEventListener("click", () => {
    askName();
});

goBtn.addEventListener("click", () => {
    name = text.value;
    while(name == "") {
        name = prompt("Enter a Name"); 
    }
    startPage.style.display = 'none';
    navbar.style.display = 'flex';
    gamePage.style.display = 'flex';
    setNameAndScore();
    showQuestion();
});

endPageBtn.addEventListener("click", () => {
    window.location.reload();
});

endBtn.addEventListener("click", () => {
    endQuiz();
});

opt1.addEventListener("click", () => {
    validateAnswer(opt1.innerText);
});

opt2.addEventListener("click", () => {
    validateAnswer(opt2.innerText);
});

opt3.addEventListener("click", () => {
    validateAnswer(opt3.innerText);
});

opt4.addEventListener("click", () => {
    validateAnswer(opt4.innerText);
});

defaultStartPage();