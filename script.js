const questions = [
    {
        question:"what does CSS stand for?",
        answers: [
            { text: "Cascading StyleSheet",correct:true },
            { text: "Cascading styler Sheet",correct:false },
            { text: "Connecting  StyleSheet",correct:false },
            { text: "Cascoding StyleSheet",correct:false },
        
        ]
    },
    {
        question:"How do you select an element with ID example?",
        answers:[
            { text:".example",correct:false },
            { text:"#example",correct:true },
            { text:"@example",correct:false },
            { text:"$example",correct:false },
        
        ]
    },
    {
        question:"To insert a JavaScript into an HTML page, which tag is used?",
        answers:[
            { text:"javascript",correct:false },
            { text:"script",correct:true },
            { text:"js",correct:false },
            { text:"type>js",correct:false },
        
        ]
    },
    {
        question:"Which of the following is correct to write “Hello World” on the web page?",
        answers:[
            { text:"System.out.println(Hello World)",correct:false },
            { text:"print(hello World)",correct:false },
            { text:"response.write(Hello World)",correct:false},
            { text:"document.write(Hello World)",correct:true },
        
        ]
    },
    {
        question:"HTML program is saved using _________ extension.",
        answers:[
            { text:".html",correct:true },
            { text:".hml",correct:false},
            { text:".htl",correct:false },
            { text:".hltm",correct:false },
        
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
               score = 0;
        nextButton.innerHTML = "Next";
        showQuestion();
}

function showQuestion(){
   resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct; 
        }
        button.addEventListener("click",selectAnswer)
    });
    
}
function resetState(){
    nextButton.style.display = "none";

while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
}
}


function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect =  selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
     Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
     });
     nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();

    }else{
        showScore();
    }
}
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();

    }else{
        startQuiz();
    }
});
startQuiz();