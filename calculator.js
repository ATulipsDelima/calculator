const display = document.querySelector('.display'); // get display element
const numbers = document.querySelectorAll('.number'); // geting all number buttons
const operators = document.querySelectorAll('.operator'); // geting all operator buttons
const clear = document.querySelector('.clear'); // get clear button
const equal = document.querySelector('.equal'); // get equal button

let add = (a, b) =>{
    return a+b;
};
let sub = (a, b) =>{
    return a - b;
};
let mul = (a, b) =>{
    return a * b;
};
let div = (a, b) =>{
    return a / b;
};
let operate = (func, num1, num2) =>{
    return func(num1, num2);
 };

let operation = (evaluate)=>{
    dict = {
        '+': add,
        '-': sub,
        '/': div,
        '*': mul,

    };
    numsAndOps = evaluate.split(" ");
    nums = numsAndOps.filter((a,i)=>i%2===0).map(num=> parseInt(num)); // get numbers and conver to integers
    ops = numsAndOps.filter((a,i)=>i%2===1);

    // calculate whle ops still have elements 
    while(ops.length > 0){
        let operator = dict[ops.shift()];
        let [num1, num2] = nums.splice(0,2);
        total = operate(operator, num1, num2);
        nums.unshift(total);
    }

    display.textContent = "Total: " + nums[0];
}




// adding event listenrs to buttons
numbers.forEach(number =>{
    number.addEventListener('click', (e)=>{
        let firstChar = display.textContent.charAt(0);

        if(firstChar === "T"){
            display.textContent = e.target.textContent;
            return;
        }
        display.textContent += e.target.textContent;
    });
});

operators.forEach(operator =>{
    operator.addEventListener('click', (e)=>{
        let lastIndex = display.textContent.length - 1;
        let lastChar = display.textContent.charAt(lastIndex)
        let firstChar = display.textContent.charAt(0);
        // if space or no space then need number
        if(lastChar === " "|| lastChar === ""){
            alert("cannot input operator, add number first");
        }
        else if(firstChar ==="T"){
            display.textContent = " ";
        }
        else{
            display.textContent += " " + e.target.textContent + " ";
        }
    });
    
});

clear.addEventListener('click', ()=>{
    display.textContent = "";
});

equal.addEventListener('click', (e)=>{
    let lastIndex = display.textContent.length - 1;
    let lastChar = display.textContent.charAt(lastIndex);
    let firstChar = display.textContent.charAt(0);

    if(lastChar === " "|| lastChar === ""){
        alert("Cannot calculate operation.");
    }
    else if(firstChar == "T"){
        return;
    }
    else{
        operation(display.textContent);
    }
});

