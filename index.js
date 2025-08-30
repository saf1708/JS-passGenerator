const textArea = document.querySelector("#text-area");
const copyBtn = document.querySelector(".copyBtn");
const data_copyMsg = document.querySelector(".data_copyMsg");

const  passwordLengthNumber = document.querySelector(".passwordLengthNumber");
const range = document.querySelector(".range");
const uppercase = document.querySelector("#uppercase");
const lowercase = document.querySelector("#lowercase");
const number = document.querySelector("#number");
const symbol = document.querySelector("#symbol");
const allcheckBox = document.querySelectorAll("input[type=checkbox]");
const passGenerate = document.querySelector("#passGenerate");

let symboll = '~!@#$%^&*()+=';

let password = "";
let defaultLength = 8;
let checkCount = 0;
handleSlider();

//set passLength.

function handleSlider(){
    range.value = defaultLength;
    passwordLengthNumber.innerText = defaultLength;
}

function getRandomInteger(min, max){
   return Math.floor( Math.random()*(max - min) ) + min;
}

function getRandomNumber(){
    return getRandomInteger(0,9);


}

function getLowercase(){
    return String.fromCharCode(getRandomInteger(97,123));

}
function getUppercase(){
    return String.fromCharCode(getRandomInteger(65,91));

}

function getSymbol(){
    const randNum = getRandomInteger(0,symboll.length);
    return symboll.charAt(randNum);
}

async function copyContent(){
    try{
  await  navigator.clipboard.writeText(textArea.value);
    data_copyMsg.innerText = 'Copied';
    }
    catch(e){
        data_copyMsg.innerText = "Failed";
    }

    data_copyMsg.classList.add("active");
    setTimeout(() =>{
        data_copyMsg.classList.remove("active")
    },300);
}

range.addEventListener('input',(e)=>{
    defaultLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click',()=>{
    if(textArea.value){
        copyContent();
    }
});

function shufflePass(array){
    for(let i = array.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join("");

}

function handleCheckBox(){
    checkCount = 0;
    allcheckBox.forEach((checkbox) =>{
        if(checkbox.checked)
            checkCount ++;
    })

    if(defaultLength<checkCount){
        defaultLength = checkCount;
    }
    handleSlider();
}

allcheckBox.forEach((checkbox) =>{
    checkbox.addEventListener('change', handleCheckBox)
})


passGenerate.addEventListener('click',()=>{
    if(checkCount<=0) 
        return;

    if(defaultLength<checkCount){
        defaultLength = checkCount;
        handleSlider();
    }

    //let's find pass
    //remove pass
    password = "";
    let fcnArr = [];
    if(uppercase.checked)
        fcnArr.push(getUppercase);
    if(lowercase.checked)
        fcnArr.push(getLowercase);
    if(number.checked)
        fcnArr.push(getRandomNumber);
    if(symbol.checked)
        fcnArr.push(getSymbol);

    //compolsory cdn -> means id there are 2 checkbox xhecked and length is 5, there will be 2 checked item, and the other will be anything

    for(let i = 0; i<fcnArr.length; i++){
        password+= fcnArr[i] ();

    }

    //remaining addition
    for(let i = 0; i<defaultLength-fcnArr.length; i++){
        let randIndx = getRandomInteger(0,fcnArr.length);
        password+= fcnArr[randIndx]();
    }

    //shuffle pass
    password = shufflePass(Array.from(password));
    textArea.value = password;


})

