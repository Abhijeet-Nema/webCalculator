//Grabbing the DOM elements

let Screen1 = document.getElementById("Screen1");
let Screen2 = document.getElementById("Screen2");
let Answer = document.getElementById("Answer");
let pads = document.getElementsByClassName("pads");
let HiddenText = document.getElementById("HiddenText");
let Str;
let Temp = "Your History is no more Mystery here <br/> <br/> <hr>";
let HistoryLabel = document.getElementById("HistoryLabel");
let His = document.getElementById("History");
let Calculator = document.getElementById("Calculator");
let ClrHistory = document.getElementById("ClrHistory");
let SwitchToBinary = document.getElementById("SwitchToBinary");
let SwitchBall = document.getElementById("SwitchBall");
let Binarypads = document.getElementsByClassName("Binarypads");
let NormalNumpad = document.getElementById("NormalNumpad");
let BinaryNumpad = document.getElementById("BinaryNumpad");
let container = document.getElementsByClassName("container")[0];

// Showing history on loading of page
ShowHistory();

HiddenText.value = Screen1.innerHTML;
//    console.log(Array.from(pads));
Array.from(pads).forEach((pad) => {
    pad.addEventListener('click', (e) => {
        // console.log(e.target.value);
        DisplayCharacter(e.target.innerHTML);
        e.preventDefault();
    })
})

function DisplayCharacter(Char) {
    if (Screen1.innerHTML.length > 50) {
        // Answer.innerHTML = "Error ! Maximum character range exceeds...!";
        Screen1.classList.add("VerySmall");
        Screen1.classList.remove("Small");

        // return;
    }

    else if (Screen1.innerHTML.length > 30) {
        // Answer.innerHTML = "Error ! Maximum character range exceeds...!";
        Screen1.classList.add("Small");
        Screen1.classList.remove("VerySmall");

        // return;
    }
    else {
        Screen1.classList.remove("Small");
        Screen1.classList.remove("VerySmall");
    }
    if (Char === "C") {
        Screen1.innerHTML = "0";
        HiddenText.value = "0";
        Answer.innerHTML = "0";

    }
    else if (Char === "D") {
        Str = Screen1.innerHTML.length - 1;
        //    console.log(Str);
        Screen1.innerHTML = Screen1.innerHTML.substring(0, Number(Str));
        HiddenText.value = HiddenText.value.substring(0, Number(Str));
        if (Screen1.innerHTML.length === 0) {
            Screen1.innerHTML = "0";
            HiddenText.value = "0";
            Answer.innerHTML = "0";
        }

    }
    else if (Char === "=") {
        Str = eval(HiddenText.value);
        Answer.innerHTML = Str;
        let Calculations = localStorage.getItem("Calculations");
        if (Calculations == null) {
            //  console.log("Nne")
            CalculationsData = [];
        }
        else {
            CalculationsData = JSON.parse(Calculations);
            //  console.log("not null");
            //  console.log(Calculations);
        }
        let HistoryNow = {
            Problem: Screen1.innerHTML,
            Answer: Answer.innerHTML
        }
        CalculationsData.unshift(HistoryNow);
        localStorage.setItem("Calculations", JSON.stringify(CalculationsData));
        ShowHistory();

    }
    else if (Char === "×") {
        Screen1.innerHTML += Char;
        HiddenText.value += '*';
    }
    else if (Char === "÷") {
        Screen1.innerHTML += Char;
        HiddenText.value += '/';
    }
    else if (Char === "ANS") {
        Screen1.innerHTML = eval(HiddenText.value);
        HiddenText.value = eval(HiddenText.value);
        Answer.innerHTML = eval(HiddenText.value);
    }

    else if (Char === "^") {
        Screen1.innerHTML += Char;
        HiddenText.value += "**";
    }

    else if (Char === "% of ") {
        Screen1.innerHTML += Char;
        HiddenText.value += "/100*";
    }
    else if (Char === "√") {
        if (Screen1.innerHTML === '0') {
            Screen1.innerHTML = Char;
            HiddenText.value = "Math.sqrt";
        }
        else {
            Screen1.innerHTML += Char;
            HiddenText.value += "Math.sqrt";
        }
    }

    else {
        if (Screen1.innerHTML === '0') {
            Screen1.innerHTML = Char;
            HiddenText.value = Char;
        }
        else {
            Screen1.innerHTML += Char;
            HiddenText.value += Char;
        }
    }
}

window.addEventListener("keydown", (e) => {
    // console.log(e.keyCode);
    if (e.key === "Enter") {
        DisplayCharacter('=');
    }
    else if (e.keyCode > 95 && e.keyCode <= 111) {
        DisplayCharacter(e.key);
        // console.log(e.keyCode);
    }
    else if (e.keyCode === 8) {
        DisplayCharacter('D');
    }

})

HistoryLabel.addEventListener("click", () => {
    // console.log(Calculator);
    if (HistoryLabel.style.opacity != 1) {
        HistoryLabel.style.opacity = 1;
        His.style.transform = "translate(5%, 3%)";
        // ShowHistory();
    }
    else {
        HistoryLabel.style.opacity = 0.6;
        His.style.transform = "translate(5%, 100%)";
    }
    // HistoryLabel.style.left = "21%";

    // His.style.display = "block";

})

// To show the history from the localStorage
function ShowHistory() {
    let Calculations = localStorage.getItem("Calculations");
    // console.log(Calculations);
    if (Calculations == null) {
        //  console.log("Nne")
        CalculationsData = [];
    }
    else {
        CalculationsData = JSON.parse(Calculations);
        //  console.log("not null");
        //  console.log(Calculations);
    }
    Temp = "Your History is no more Mystery here <br/> <br/> <hr>";

    CalculationsData.forEach((Obj) => {
        Temp += `<div>${Obj.Problem}</div>
        <div>= ${Obj.Answer}</div>
        <hr>`;
        // console.log(Obj)
    })
    Temp += "<button id='ClrHistory' onclick='ClearHistory()'> Clear History </button>";
    His.innerHTML = Temp;
}

function ClearHistory() {
    localStorage.removeItem("Calculations");
    ShowHistory();
}

function TogglingSwitch() {
    if (SwitchBall.style.transform != "translateX(28.6px)") {
        SwitchBall.style.transform = "translateX(28.6px)";
        SwitchBall.style.background = "black";
        SwitchToBinary.style.borderColor = "black";
        BinaryNumpad.style.display = "grid";
        NormalNumpad.style.display = "none";
        container.style.background = "black";
        BinaryLabel.style.color = "white";
    }
    else {
        SwitchBall.style.transform = "translateX(0px)";
        SwitchBall.style.background = "grey";
        SwitchToBinary.style.borderColor = "grey";
        BinaryNumpad.style.display = "none";
        NormalNumpad.style.display = "grid";
        container.style.background = "rgb(255 255 255 / 60%)";
        BinaryLabel.style.color = "black";

    }
}

Array.from(Binarypads).forEach(BinaryPad => {
    BinaryPad.addEventListener('click', (e) => {
        // console.log(e.target.innerText);
        DisplayBinaryCharacter(e.target.innerHTML);
        e.preventDefault();
    })
})

/*
To Decimal
digit = parseInt(digit, 2);

To Binary
Sum = Sum.toString(2);
*/

function DisplayBinaryCharacter(Char) {
    if (Screen1.innerHTML.length > 50) {
        // Answer.innerHTML = "Error ! Maximum character range exceeds...!";
        Screen1.classList.add("VerySmall");
        Screen1.classList.remove("Small");

        // return;
    }

    else if (Screen1.innerHTML.length > 30) {
        // Answer.innerHTML = "Error ! Maximum character range exceeds...!";
        Screen1.classList.add("Small");
        Screen1.classList.remove("VerySmall");

        // return;
    }
    else {
        Screen1.classList.remove("Small");
        Screen1.classList.remove("VerySmall");
    }
    if (Char === "C") {
        Screen1.innerHTML = "0";
        HiddenText.value = "0";
        Answer.innerHTML = "0";

    }
    else if (Char === "D") {
        Str = Screen1.innerHTML.length - 1;
        //    console.log(Str);
        Screen1.innerHTML = Screen1.innerHTML.substring(0, Number(Str));
        HiddenText.value = HiddenText.value.substring(0, Number(Str));
        if (Screen1.innerHTML.length === 0) {
            Screen1.innerHTML = "0";
            HiddenText.value = "0";
            Answer.innerHTML = "0";
        }

    }
    else if (Char === "+") {
        // Converting Binary to Decimal before Calculating
        let Problem = HiddenText.value;
        let Binary;
        let DecimalEquivalent;
        let LargestIndex;
        if (Problem.includes("+") || Problem.includes("-") || Problem.includes("*") || Problem.includes("/") || Problem.includes("&") || Problem.includes("|") || Problem.includes("~")) {
            // console.log("Yes");
            LargestIndex = Math.max(Problem.lastIndexOf("+"), Problem.lastIndexOf("-"), Problem.lastIndexOf("*"), Problem.lastIndexOf("/"), Problem.lastIndexOf("&"), Problem.lastIndexOf("|"),Problem.lastIndexOf("~"));
            Binary = Problem.substr(LargestIndex + 1,);
            // console.log(Binary);
            DecimalEquivalent = parseInt(Binary, 2);
            HiddenText.value = HiddenText.value.substring(0, LargestIndex + 1);
            HiddenText.value += DecimalEquivalent;
        }
        else {
            // console.log("No");
            Binary = Problem;
            DecimalEquivalent = parseInt(Binary, 2);
            HiddenText.value = DecimalEquivalent;
        }

        Screen1.innerHTML += Char;
        HiddenText.value += Char;



    }
    else if (Char === "-") {
        let Problem = HiddenText.value;
        let Binary;
        let DecimalEquivalent;
        let LargestIndex;
        if (Problem.includes("+") || Problem.includes("-") || Problem.includes("*") || Problem.includes("/") || Problem.includes("&") || Problem.includes("|") || Problem.includes("~")) {
            // console.log("Yes");
            LargestIndex = Math.max(Problem.lastIndexOf("+"), Problem.lastIndexOf("-"), Problem.lastIndexOf("*"), Problem.lastIndexOf("/"), Problem.lastIndexOf("&"), Problem.lastIndexOf("|"),Problem.lastIndexOf("~"));
            Binary = Problem.substr(LargestIndex + 1,);
            // console.log(Binary);
            DecimalEquivalent = parseInt(Binary, 2);
            HiddenText.value = HiddenText.value.substring(0, LargestIndex + 1);
            HiddenText.value += DecimalEquivalent;
        }
        else {
            // console.log("No");
            Binary = Problem;
            DecimalEquivalent = parseInt(Binary, 2);
            HiddenText.value = DecimalEquivalent;
        }

        Screen1.innerHTML += Char;
        HiddenText.value += Char;
    }
    else if (Char === "×") {
        let Problem = HiddenText.value;
        let Binary;
        let DecimalEquivalent;
        let LargestIndex;
        if (Problem.includes("+") || Problem.includes("-") || Problem.includes("*") || Problem.includes("/") || Problem.includes("&") || Problem.includes("|") || Problem.includes("~")) {
            // console.log("Yes");
            LargestIndex = Math.max(Problem.lastIndexOf("+"), Problem.lastIndexOf("-"), Problem.lastIndexOf("*"), Problem.lastIndexOf("/"), Problem.lastIndexOf("&"), Problem.lastIndexOf("|"),Problem.lastIndexOf("~"));
            Binary = Problem.substr(LargestIndex + 1,);
            // console.log(Binary);
            DecimalEquivalent = parseInt(Binary, 2);
            HiddenText.value = HiddenText.value.substring(0, LargestIndex + 1);
            HiddenText.value += DecimalEquivalent;
        }
        else {
            // console.log("No");
            Binary = Problem;
            DecimalEquivalent = parseInt(Binary, 2);
            HiddenText.value = DecimalEquivalent;
        }

        Screen1.innerHTML += Char;
        HiddenText.value += '*';
    }
    else if (Char === "÷") {
        let Problem = HiddenText.value;
        let Binary;
        let DecimalEquivalent;
        let LargestIndex;
        if (Problem.includes("+") || Problem.includes("-") || Problem.includes("*") || Problem.includes("/") || Problem.includes("&") || Problem.includes("|") || Problem.includes("~")) {
            // console.log("Yes");
            LargestIndex = Math.max(Problem.lastIndexOf("+"), Problem.lastIndexOf("-"), Problem.lastIndexOf("*"), Problem.lastIndexOf("/"), Problem.lastIndexOf("&"), Problem.lastIndexOf("|"),Problem.lastIndexOf("~"));
            Binary = Problem.substr(LargestIndex + 1,);
            // console.log(Binary);
            DecimalEquivalent = parseInt(Binary, 2);
            HiddenText.value = HiddenText.value.substring(0, LargestIndex + 1);
            HiddenText.value += DecimalEquivalent;
        }
        else {
            // console.log("No");
            Binary = Problem;
            DecimalEquivalent = parseInt(Binary, 2);
            HiddenText.value = DecimalEquivalent;
        }

        Screen1.innerHTML += Char;
        HiddenText.value += '/';
    }
    else if (Char === "AND") {
        let Problem = HiddenText.value;
        let Binary;
        let DecimalEquivalent;
        let LargestIndex;
        if (Problem.includes("+") || Problem.includes("-") || Problem.includes("*") || Problem.includes("/") || Problem.includes("&") || Problem.includes("|") || Problem.includes("~")) {
            // console.log("Yes");
            LargestIndex = Math.max(Problem.lastIndexOf("+"), Problem.lastIndexOf("-"), Problem.lastIndexOf("*"), Problem.lastIndexOf("/"), Problem.lastIndexOf("&"), Problem.lastIndexOf("|"),Problem.lastIndexOf("~"));
            Binary = Problem.substr(LargestIndex + 1,);
            // console.log(Binary);
            DecimalEquivalent = parseInt(Binary, 2);
            HiddenText.value = HiddenText.value.substring(0, LargestIndex + 1);
            HiddenText.value += DecimalEquivalent;
        }
        else {
            // console.log("No");
            Binary = Problem;
            DecimalEquivalent = parseInt(Binary, 2);
            HiddenText.value = DecimalEquivalent;
        }

        Screen1.innerHTML += " " + Char + " ";
        HiddenText.value += '&';
    }
    else if (Char === "NOT") {
        let Problem = HiddenText.value;
        let Binary;
        let DecimalEquivalent;
        let LargestIndex;
        if (Problem.includes("+") || Problem.includes("-") || Problem.includes("*") || Problem.includes("/") || Problem.includes("&") || Problem.includes("|") || Problem.includes("~")) {
            // console.log("Yes");
            LargestIndex = Math.max(Problem.lastIndexOf("+"), Problem.lastIndexOf("-"), Problem.lastIndexOf("*"), Problem.lastIndexOf("/"), Problem.lastIndexOf("&"), Problem.lastIndexOf("|"),Problem.lastIndexOf("~"));
            Binary = Problem.substr(LargestIndex + 1,);
            // console.log(Binary);
            DecimalEquivalent = parseInt(Binary, 2);
            HiddenText.value = HiddenText.value.substring(0, LargestIndex + 1);
            HiddenText.value += DecimalEquivalent;
        }
        else {
            // console.log("No");
            Binary = Problem;
            DecimalEquivalent = parseInt(Binary, 2);
            HiddenText.value = DecimalEquivalent;
        }

        if (Screen1.innerHTML === '0') {
            Screen1.innerHTML = Char;
            HiddenText.value = '~';
        }
        else {
            Screen1.innerHTML += Char;
            HiddenText.value += '~';
        }
    }
    else if (Char === "OR") {
        let Problem = HiddenText.value;
        let Binary;
        let DecimalEquivalent;
        let LargestIndex;
        if (Problem.includes("+") || Problem.includes("-") || Problem.includes("*") || Problem.includes("/") || Problem.includes("&") || Problem.includes("|") || Problem.includes("~")) {
            // console.log("Yes");
            LargestIndex = Math.max(Problem.lastIndexOf("+"), Problem.lastIndexOf("-"), Problem.lastIndexOf("*"), Problem.lastIndexOf("/"), Problem.lastIndexOf("&"), Problem.lastIndexOf("|"),Problem.lastIndexOf("~"));
            Binary = Problem.substr(LargestIndex + 1,);
            // console.log(Binary);
            DecimalEquivalent = parseInt(Binary, 2);
            HiddenText.value = HiddenText.value.substring(0, LargestIndex + 1);
            HiddenText.value += DecimalEquivalent;
        }
        else {
            // console.log("No");
            Binary = Problem;
            DecimalEquivalent = parseInt(Binary, 2);
            HiddenText.value = DecimalEquivalent;
        }

        Screen1.innerHTML += " " + Char + " ";
        HiddenText.value += '|';
    }
    else if (Char === "=") {
        let Problem = HiddenText.value;
        let Binary;
        let DecimalEquivalent;
        let LargestIndex;
        if (Problem.includes("+") || Problem.includes("-") || Problem.includes("*") || Problem.includes("/") || Problem.includes("&") || Problem.includes("|") || Problem.includes("~")) {
            // console.log("Yes");
            LargestIndex = Math.max(Problem.lastIndexOf("+"), Problem.lastIndexOf("-"), Problem.lastIndexOf("*"), Problem.lastIndexOf("/"), Problem.lastIndexOf("&"), Problem.lastIndexOf("|"),Problem.lastIndexOf("~"));
            Binary = Problem.substr(LargestIndex + 1,);
            // console.log(Binary);
            DecimalEquivalent = parseInt(Binary, 2);
            HiddenText.value = HiddenText.value.substring(0, LargestIndex + 1);
            HiddenText.value += DecimalEquivalent;
        }
        else {
            // console.log("No");
            Binary = Problem;
            DecimalEquivalent = parseInt(Binary, 2);
            HiddenText.value = DecimalEquivalent;
        }

        // Converting Answer to Binary Again
        Str = eval(HiddenText.value);
        Str = Str.toString(2);
        Answer.innerHTML = Str;
        let Calculations = localStorage.getItem("Calculations");
        if (Calculations == null) {
            //  console.log("Nne")
            CalculationsData = [];
        }
        else {
            CalculationsData = JSON.parse(Calculations);
            //  console.log("not null");
            //  console.log(Calculations);
        }
        let HistoryNow = {
            Problem: Screen1.innerHTML,
            Answer: Answer.innerHTML
        }
        CalculationsData.unshift(HistoryNow);
        localStorage.setItem("Calculations", JSON.stringify(CalculationsData));
        ShowHistory();
        HiddenText.value = Str;
        Screen1.innerHTML = Str;
    }
    else {
        if (Screen1.innerHTML === '0') {
            Screen1.innerHTML = Char;
            HiddenText.value = Char;
        }
        else {
            Screen1.innerHTML += Char;
            HiddenText.value += Char;
        }
    }
}

