$("document").ready(function(){
    //Delcare global variables which will be used to help us track the state of the game.
    var questionIndex,
        wins,
        losses,
        currQuestion;
    //Array of objects which represent each question, potential answers, the correct answer, and an image that will be shown w/ the question
    var questionAnswers = [
        {
            question:"How many houses in Harry Potter",
            answerChoices: ["Two","One","None","Four"],
            answer: "Four",
            questionImg: "https://i.ebayimg.com/images/g/xv8AAOSwCkZZTXeN/s-l800.jpg"
            
        },
        {
            question:"What is the feather of Harrys wand",
            answerChoices: ["Pheonix-tail","Hufflsnuff","Example","Lorem"],
            answer: "Pheonix-tail",
            questionImg: "https://i.ebayimg.com/images/g/eQ8AAOSwohdZmoIP/s-l300.jpg"
        },
        {
            question:"What were the names of Harrys Friends",
            answerChoices: ["Hermoine, Rone", "Severus, Malfory", "Emma, Sergo"],
            answer: "Hermoine, Rone",
            questionImg: "https://static2.srcdn.com/wordpress/wp-content/uploads/2019/07/Harry-Ron-Hermione.jpg"
        },
        {
            question:"Who was the best Hogwarts headmaster",
            answerChoices: ["Snape"],
            answer: "Snape",
            questionImg: "https://img.cinemablend.com/filter:scale/cb/2/c/4/1/1/9/2c41191b1ff5a5029e89ecb64a691fc0c4e3ca4ff6f19356f18e242ea27f4700.jpg?mw=600"
        },
    ];
    //invoke the initialize function
    initiliazeGame(); 

    //listener on all buttons on the page, when an answer is selected the code inside will run
    $("button").on("click",function(){
        //Take the text on the button that was clicked and assign it to the answerSelection variable
        var answerSelection = $(this).text();
        //execute checkAnswer passing in the users answerChoice 'selection" as a parameter
        checkAnswer(answerSelection);
    });

    //define the initializeGame function
    //no parameters
    /**
     * We set the initial state of our game, the question index should be 0, the wins 0, losses, 0.
     * Based on the default index we set the currentQuestion object that will be used across our program 
     * 
     * We call populate view to update what the user sees for the first time
     */
    function initiliazeGame(){
        questionIndex = 0;
        wins = 0;
        losses = 0;
        currQuestion = questionAnswers[questionIndex];
        populateView(currQuestion);
        
    };

    /**
     * Function which updates the content displayed to the user 
     * 
     * We set the question text on the html element (<h5>) with the #question id
     * We update the image on the html element (<img> tag) with the  #question-img id
     * 
     * Loop through the potential answerChoices and display them to the user as options on each button 
     * 
     * @param {*} questionObject - object representing the current question the user is prompted with 
     */
    function populateView(questionObject){
        $("#question").text(questionObject.question);
        $("#question-img").attr('src', questionObject.questionImg);
        for(var i =0;i<questionObject.answerChoices.length; i++){
            $("#answer"+i).text(questionObject.answerChoices[i]);
        }
    };

    /**
     * Function which checks whether or not our user has selected the correct answer for a given card
     * 
     * @param {*} answerChoice - the selection the user made on the page
     */
    function checkAnswer(answerChoice){
        if(currQuestion && answerChoice == currQuestion.answer){
            wins++;
            nextQuestion();
        }else if(currQuestion && answerChoice !== currQuestion.answer){
            losses++;
            nextQuestion();
        }
    };

    /**
     * Increment our questionIndex by one, update the currQuestion object to the enxt question in the arary
     * 
     * If there is a question at the new index we update the view with the new question information otherwise we end the game
     * 
     */
    function nextQuestion(){
        questionIndex++;
        currQuestion = questionAnswers[questionIndex];
        if(currQuestion){
            populateView(currQuestion); 
        }else{
            endGame();
        }
    }
    /**
     * Simple checks whether the user has a score greater than or equal to three, if so 
     * we alert the user has own then reset the game.
     * 
     * Otherwise we alert the user has lost and reset the game. 
     */
    function endGame(){
        if(wins >= 3){
            alert("You've Won");
            initiliazeGame(); 
        }else{
            alert("You've Lost");
            initiliazeGame(); 
        }
    };
    
});