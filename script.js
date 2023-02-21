const operations = ["+", "-", "x", "/", "=", "Clear"]
const display = document.querySelector("#display")


let firstInput = 0
let firstInputSet = false
let secondInput = 0
let secondInputSet = false

let operator = ""
let operatorSelected = false
let displayChanged = false

initializeHTML()

function initializeHTML() {
    // initiallize digits
    let bttnOrder = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0]
    let nums = document.querySelector(".num-container")
    bttnOrder.forEach(digit => {
        let bttn = document.createElement("button")
        bttn.classList.add("digit")
        bttn.textContent = digit
        bttn.addEventListener("click", clickHandler)
        nums.appendChild(bttn)
    })

    function clickHandler() {
        setDisplayValue(this.textContent)
        displayChanged = false
        operatorSelected = false
    }

    window.addEventListener("keydown", function (e) {

        for (let i = 0;i<10;i++){
            if (e["key"]== i){
                setDisplayValue(i)
            displayChanged = false
            operatorSelected = false
            }
        }
    })

    function onKeypress() {
        console.log(this.textContent)

    }

    document.querySelector("#clear").addEventListener("click", function () {
        display.textContent = "0"
        firstInput = 0
        secondInput = 0
        firstInputSet = false
        secondInputSet = false
        operator = ""
        displayChanged = false
        operatorSelected = false
    })


    document.querySelector("#equals").addEventListener("click", equalsbttn)

    document.querySelector("#add").addEventListener("click", evaluate)
    document.querySelector("#subtract").addEventListener("click", evaluate)
    document.querySelector("#multiply").addEventListener("click", evaluate)
    document.querySelector("#divide").addEventListener("click", evaluate)


}

function getOperator(string) {
    switch (string) {
        case "+":
            operator = add
            break;
        case "-":
            operator = subtract
            break;
        case "x":
            operator = multiply
            break;
        case "/":
            operator = divide
            break;
        default:
            operator = "LOL"
            break;
    }
    return operator
}

function equalsbttn() {

    if (operator == "equals") {
        return
    }

    storeValue()
    if (firstInputSet == true && secondInputSet == true) {
        let result = operate(Number(firstInput), Number(secondInput), operator)
        display.textContent = result
        displayChanged = true

        firstInput = 0
        firstInputSet = false

        secondInput = 0
        secondInputSet = false

        operator = "equals"
        // console.log(`firstInput=${firstInput} secondInput=${secondInput} operator=${operator}`)
        return result
    }
}

function evaluate() {

    if (operatorSelected) {
        if (operator == getOperator(this.textContent)) {
            // console.log(`same op, ${operator} ${this.textContent}`)
            return
        } else {
            operator = getOperator(this.textContent)
            // console.log(`new op = ${this.textContent}`)
            return
        }
    }

    // console.log(`button= ${this.textContent}`)
    // console.log(`current operator = ${operator}`)

    storeValue()


    if (firstInputSet == true && secondInputSet == true) {
        if (operator == "equals") {
            operator = getOperator(this.textContent)
        }
        equals(operator)
    }

    if (operatorSelected == false) {
        operator = getOperator(this.textContent)
        operatorSelected = true
        displayChanged = true
        // console.log(`operator selected = ${operator} ${operatorSelected}`)
        // console.log(`firstInput= ${firstInput} secondInput=${secondInput}`)
        return
    }

    operatorSelected = true

}
function equals(op) {

    let result = operate(Number(firstInput), Number(secondInput), operator)
    display.textContent = result
    // console.log(`op result = ${result}`)

    firstInput = result
    firstInputSet = true

    secondInput = 0
    secondInputSet = false

    return result


}

function storeValue() {
    if (firstInputSet == false) {
        firstInput = display.textContent
        firstInputSet = true
        // console.log(`firstInput=${firstInput} secondInput=${secondInput} operator=${operator}`)
        return

    } else {
        secondInput = display.textContent
        secondInputSet = true
        // console.log(`firstInput=${firstInput} secondInput=${secondInput} operator=${operator}`)
        return
    }
}

function setDisplayValue(num) {
    if (display.textContent == 0) {
        display.textContent = num
        return
    }

    if (displayChanged == false) {
        display.textContent = display.textContent.concat(num)
        return
    } else {
        display.textContent = num
        return
    }

}

//function to call the math operation
function operate(a, b, operation) {
    if (operator == "equals") {
        return
    }
    return operation(a, b)
}

//basic math functions
function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    if (b != 0) {
        return a / b
    } else {
        return "ERROR"
    }
}