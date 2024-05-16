const btns = document.querySelectorAll(".box");
const reset = document.getElementById("reset");
let count = 1;
btns.forEach(btn => {
    btn.addEventListener("click", () => {
        if (count % 2 == 0) {
            btn.innerHTML = "O";
        }
        else {
            btn.innerHTML = "X";
        }
        btn.disabled = true;
        count++;
        CheckWinner();
    })
})

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
    [3, 4, 5],
    [6, 7, 8]
]

function CheckWinner() {
    winPatterns.forEach(arr => {
        console.log(btns[arr[0]])
        if ((btns[arr[0]].innerHTML === "X" || btns[arr[0]].innerHTML === "O") && btns[arr[0]].innerHTML === btns[arr[1]].innerHTML && btns[arr[0]].innerHTML === btns[arr[2]].innerHTML) {
            if(btns[arr[0]].innerHTML==="X"){
            alert("X won!");
        }
            else{
                alert("O won!") 
            }
            setTimeout(()=>{
                ResetFunction();
            },1000)
        }
    })
}

ResetFunction = function () {
    btns.forEach(e => {
        count = 1;
        e.innerHTML = ""
        e.disabled = false;
    })
}
reset.addEventListener("click", () => {
    ResetFunction()
})
