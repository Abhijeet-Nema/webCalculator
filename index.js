//Grabbing the DOM elements

let Screen1 = document.getElementById("Screen1");
let Screen2 = document.getElementById("Screen2");
let Answer = document.getElementById("Answer");
let pads = document.getElementsByClassName("pads");
let HiddenText = document.getElementById("HiddenText");
let Str;

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
    else if (Char === ".") {
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