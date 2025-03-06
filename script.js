let clickCount = 0;
let gameOver = false;
const grid = Array(3).fill(null).map(() => Array(3).fill(null));
const squares = document.querySelectorAll(".square");
const popup = document.querySelector(".popup");

squares.forEach((square, index) => {
    square.addEventListener("click", function () {
        if (gameOver || this.querySelector("img")) return;

        const row = Math.floor(index / 3);
        const col = index % 3;
        const isOddTurn = clickCount % 2 === 0;
        const imgSrc = isOddTurn ? "images/strb.jpg" : "images/rabbit.jpg";
        grid[row][col] = isOddTurn ? "Player 1" : "Player 2"; // Track player

        const img = document.createElement("img");
        img.src = imgSrc;
        img.alt = "Square Image";
        img.style.opacity = "0";
        img.style.transition = "opacity 0.5s ease-in-out";

        this.appendChild(img);
        setTimeout(() => (img.style.opacity = "1"), 10);

        clickCount++;

        let winner = checkWinningLines();
        const background= document.querySelector(".background-image");
        if (winner) {
            gameOver = true;
            setTimeout(() => {
                popup.innerHTML = `<span class="popup_message">${winner} Wins! 🎉</span>
                <button class="play-again">Play Again</button>`;

                popup.classList.add("show");
                background.classList.add("blur");

                document.querySelector(".play-again").addEventListener("click",resetGame);
            }, 500);
        } else if (clickCount === 9) {
            gameOver = true;
            setTimeout(() => {
                popup.innerHTML = `<span class="popup_message">It's a Tie! 🤝</span>
                <button class="play-again">Play Again</button>`;
                popup.classList.add("show");
                background.classList.add("blur");

                document.querySelector(".play-again").addEventListener("click", resetGame);
            }, 500);
        }
    });
});

function checkWinningLines() {
    for (let r = 0; r < 3; r++) {
        if (grid[r][0] && grid[r][0] === grid[r][1] && grid[r][1] === grid[r][2]) {
            highlightWinningSquares([r * 3, r * 3 + 1, r * 3 + 2]);
            return grid[r][0];
        }
    }

    for (let c = 0; c < 3; c++) {
        if (grid[0][c] && grid[0][c] === grid[1][c] && grid[1][c] === grid[2][c]) {
            highlightWinningSquares([c, c + 3, c + 6]);
            return grid[0][c];
        }
    }

    if (grid[0][0] && grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) {
        highlightWinningSquares([0, 4, 8]);
        return grid[0][0];
    }
    if (grid[0][2] && grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]) {
        highlightWinningSquares([2, 4, 6]);
        return grid[0][2];
    }

    return null;
}

function highlightWinningSquares(indices) {
    indices.forEach(index => {
        squares[index].classList.add("highlight");
    });
}

const playAgainBtn=document.querySelector(".play-again");

function resetGame(){
    clickCount =0;
    gameOver=false;
    grid.forEach(row=>row.fill(null));

    squares.forEach(square=>{
        square.innerHTML="";
        square.classList.remove("highlight");
    });
    popup.classList.remove("show");
    document.querySelector(".background-image").classList.remove("blur");
}