//takes an array of strings (from page) and returns the same array, except all the items are numbers.
// Use string.split(“,”)  to convert a string into an array of strings,
// then iterate through and convert each item in the array into a number like:
// array[i] = parseInt(array[i])

var CurrentGrade = "";

//takes data from page, calls on sub-functions to calculate the student grade and output it back to page.
// Also “return” the result so that calculateGradeNeeded() can use it.
function calculateCurrentGrade(){

    var hwScores = document.getElementById("homework").value;
    var quizScores = document.getElementById("quizzes").value;
    var testScores = document.getElementById("tests").value;
    var midtermScore = document.getElementById("midterm").value;

    hwScores = convertArrayStringToNumber(hwScores);
    quizScores = convertArrayStringToNumber(quizScores);
    testScores = convertArrayStringToNumber(testScores);
    midtermScore = convertArrayStringToNumber(midtermScore);

    var avgHwScores = averageArray(hwScores);
    var avgQuizScores = averageArray(quizScores);
    var avgTestScores = averageArray(testScores);
    var avgMidtermScores = averageArray(midtermScore);

    hwScores = testInputs(hwScores);
    quizScores = testInputs(quizScores);
    testScores = testInputs(testScores);
    midtermScore = testInputs(midtermScore);

    var hwWeight = parseInt(document.getElementById("homeworkWeight").value);
    var quizWeight = parseInt(document.getElementById("quizzesWeight").value);
    var testWeight = parseInt(document.getElementById("testsWeight").value);
    var midtermWeight = parseInt(document.getElementById("midtermWeight").value);



        if(!hwScores || !quizScores || !testScores || !midtermScore){
            document.getElementById("output").innerHTML = "Please fill out all the categories. Make sure none of your scores are negative and no letters are present instead of scores.";
        }else if(hwWeight + quizWeight + testWeight + midtermWeight != 100){
            document.getElementById("output").innerHTML = "Please make sure combined Grade Weight = 100%";
        }else{
            CurrentGrade = avgHwScores*(hwWeight/100) + avgQuizScores*(quizWeight/100) + avgTestScores*(testWeight/100) + avgMidtermScores*(midtermWeight/100)
            document.getElementById("output").innerHTML = "Your current grade is: " + CurrentGrade + "%";
        }


    ColorRow(avgHwScores, document.getElementById("hw"));
    ColorRow(avgQuizScores, document.getElementById("quiz"));
    ColorRow(avgTestScores, document.getElementById("test"));
    ColorRow(avgMidtermScores, document.getElementById("mid"));
}

//tests if the inputs are negative or letters
function testInputs(scores){

    for(var i=0; i<scores.length; i++){
        if(scores[i]<0|| isNaN(scores[i])){
            return false;
        }
    }
    return scores;

}

function convertArrayStringToNumber(string){

    string = string.split(",");
    for(var i=0; i<string.length; i++){

        if(string=="") {
            return false;
        } else {
            string[i] = parseInt(string[i])

        }
    }
    return string;

}

//takes an array of numbers and returns the average of those numbers
function averageArray(array){

    var sum1 = 0;
    for(var i=0; i<array.length; i++){
        sum1 += array[i]
    }
    array = sum1/array.length;
    return array;

}



//takes the current grade returned by calculateCurrentGrade()
// and the grade desired and does the math to determine what the user needs on the final.
function calculateGradeNeeded(){

    var finalExamWeight = document.getElementById("examWeight").value;
    var preferredScore = document.getElementById("preferredScore").value;
    var gradeNeeded = "";
    if(finalExamWeight == "" || preferredScore == ""){
        document.getElementById("output1").innerHTML = "Please enter your your final weight and desired grade"
    }else{
        gradeNeeded = ((preferredScore - ((100-(finalExamWeight))/100)*CurrentGrade) / finalExamWeight) *100;
        if(CurrentGrade == ""){
            document.getElementById("output1").innerHTML = "Please Calculate your Current Grade first!"
        }else{
            document.getElementById("output1").innerHTML = "You will need to score at least " + gradeNeeded + "% on your final to get a " + preferredScore + "% overall.";
        }

    }


}

function ColorRow(avgGrade, elem){

    if(avgGrade > 89.5){
        elem.style.background = "#118500";
    }
    if(avgGrade<89.5 && avgGrade>79.5){
        elem.style.background = "#90d95b";
    }
    if(avgGrade<79.5 && avgGrade>69.5){
        elem.style.background = "#e7dd43";
    }
    if(avgGrade<69.5 && avgGrade>59.5){
        elem.style.background = "#dca300";
    }
    if(avgGrade<59.5){
        elem.style.background = "#d93a00"
    }
}