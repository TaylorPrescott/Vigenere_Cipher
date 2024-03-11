const optionBtns = document.querySelector(".option-container");
const result = document.getElementById("result");
const submitBtn = document.getElementById("submit");

// Add Iterations functionality

const calcShifts = key => {
    
    const aCharChode = 97;
    let shifts = [];
    for (let i = 0; i < key.length; i++) {
        shifts[i] = key.charCodeAt(i) - aCharChode;
    }
    return shifts;
};

const decodeVigenere = (key, msg) => {
    let keyShifts = calcShifts(key);
    let decodedStr = "";
    let shiftIndex = 0;
    for (let i = 0; i < msg.length; i++) {
        if (msg[i] == " ") {
            decodedStr += " ";
            continue;
        }
        if (shiftIndex === keyShifts.length) {
            shiftIndex = 0;
        }
        if (msg.charCodeAt(i) - keyShifts[shiftIndex] < 97) {
            //charCode: 99, shift: 5, 94 shift -= (charCode - 97)+1, charCode = 122, shift 2
            let shiftCopy = keyShifts[shiftIndex];
            let currCharCode = msg.charCodeAt(i);

            shiftCopy -= (currCharCode - 97)+1;
            currCharCode = 122 - shiftCopy;
            decodedStr = decodedStr + String.fromCharCode(currCharCode);
            shiftIndex++;
            continue;
        }
        decodedStr = decodedStr + String.fromCharCode(msg.charCodeAt(i) - keyShifts[shiftIndex]);
        shiftIndex++;
    }
    result.textContent = decodedStr;
    console.log(decodedStr);
};


const encodeVigenere = (key, msg) => {
    let keyShifts = calcShifts(key);
    let encodedStr = "";
    let shiftIndex = 0;
    for (let i = 0; i < msg.length; i++) {
        if (msg[i] == " ") {
            encodedStr += " ";
            continue;
        }
        if (shiftIndex === keyShifts.length) {
            shiftIndex = 0;
        }
        if (msg.charCodeAt(i) + keyShifts[shiftIndex] > 122) {
            //charCode: 99, shift: 5, 94 shift -= (charCode - 97)+1, charCode = 122, shift 2
            let shiftCopy = keyShifts[shiftIndex];
            let currCharCode = msg.charCodeAt(i);

            shiftCopy -= (122 - currCharCode)+1;
            currCharCode = 97 + shiftCopy;
            encodedStr = encodedStr + String.fromCharCode(currCharCode);
            shiftIndex++;
            continue;
        }
        encodedStr = encodedStr + String.fromCharCode(msg.charCodeAt(i) + keyShifts[shiftIndex]);
        shiftIndex++;
    }
    result.textContent = encodedStr;
    console.log(encodedStr);
};


submitBtn.addEventListener("click", e => {
    const cipherKey = document.getElementById("cipherKey");
    const cipherText = document.getElementById("cipherText");
    let strippedText = "";
    for (let i = 0; i < cipherText.value.length; i++) {
        if (cipherText.value[i] === " ") {
            strippedText += " ";
            continue;
        }

        if (isNaN(cipherText.value[i])) {
            strippedText += cipherText.value[i];

        }
    }

    if (optionBtns.children[0].checked) {
        encodeVigenere(cipherKey.value, strippedText.toLowerCase());
    } else {
        decodeVigenere(cipherKey.value, strippedText.toLowerCase());
    }
});

// let count = 0;
// function bruteFactor(n) {
//     for (let i = 2; i < Math.floor(Math.sqrt(n)); i++) {
//         count++;
//         if (n % i === 0) {
//             return "Composite";
//         }
//     }
//     return "Prime";
// }

// console.log(bruteFactor(653117));
// console.log(count);
