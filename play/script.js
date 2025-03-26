const gridContainer = document.getElementById('bingoGrid');
const titleElement = document.getElementById('title');
const bingoOverlay = document.getElementById('bingoOverlay');

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Fisher-Yates Shuffle function to randomize an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Get mode (grid size) and učitel from URL
const gridSize = parseInt(getQueryParam('mode')) || 5; // Default to 5x5 if not specified
const ucitel = getQueryParam('ucitel');

// Redirect to home if no učitel is selected
if (!ucitel) {
    window.location.replace("/");
}

// Apply grid layout dynamically
gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

async function loadPhrases() {
    const filePath = `/play/cells/${ucitel}`;

    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`Failed to fetch bingo options`);
        const text = await response.text();
        const lines = text.split('\n').map(line => line.trim()).filter(line => line !== '');

        // Validate enough options for the selected grid size
        if (lines.length < gridSize * gridSize + 1) {
            throw new Error(`The file does not contain enough options for ${gridSize}x${gridSize}`);
        }

        const title = lines[0]; // The first line is the title
        const phrases = shuffle(lines.slice(1)); // Remaining lines are the bingo options

        // Set the title above the grid
        titleElement.textContent = title;

        populateGrid(phrases);
    } catch (error) {
        console.error(error);
        alert(`Error loading bingo options from ${filePath}. Check console for details.`);
        window.location.replace("/");
    }
}

function populateGrid(phrases) {
    const cells = [];
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.textContent = phrases[i];

        const row = Math.floor(i / gridSize);
        const col = i % gridSize;
        cell.dataset.row = row;
        cell.dataset.col = col;

        gridContainer.appendChild(cell);
        cells.push(cell);
    }

    setupCellClickHandlers(cells);
}

function setupCellClickHandlers(cells) {
    const grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(null));

    cells.forEach((cell, index) => {
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;
        grid[row][col] = cell;
    });

    function checkBingo() {
        // Check rows & columns
        for (let i = 0; i < gridSize; i++) {
            if (grid[i].every(cell => cell.classList.contains('clicked'))) return true;
            if (grid.every(row => row[i].classList.contains('clicked'))) return true;
        }
        // Check diagonals
        if ([...Array(gridSize)].every((_, i) => grid[i][i].classList.contains('clicked'))) return true;
        if ([...Array(gridSize)].every((_, i) => grid[i][gridSize - 1 - i].classList.contains('clicked'))) return true;

        return false;
    }

    cells.forEach(cell => {
        cell.addEventListener('click', function () {
            if (this.classList.contains('clicked')) return;
            this.classList.add('clicked');

            if (checkBingo()) showBingo();
        });
    });
}

function showBingo() {
    bingoOverlay.style.display = 'flex';
}

loadPhrases();
