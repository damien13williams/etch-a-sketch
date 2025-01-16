const gridContainer = document.getElementById("grid-container")
const rowsInput = document.getElementById("rows");
const columnsInput = document.getElementById("columns");
const generateButton = document.getElementById("generate-grid");


// Function to generate a random color
function getRandomColor() {
    const r = Math.floor(Math.random() * 256); // Random red (0-255)
    const g = Math.floor(Math.random() * 256); // Random green (0-255)
    const b = Math.floor(Math.random() * 256); // Random blue (0-255)
    return `rgb(${r}, ${g}, ${b})`; // Return in rgb format
}

// Function to darken the color
function darkenColor(color, amount) {
    const rgb = color.match(/\d+/g); // Get the rgb values as an array
    const r = Math.max(parseInt(rgb[0]) - amount, 0); // Darken red by "amount", can't go below 0
    const g = Math.max(parseInt(rgb[1]) - amount, 0); // Darken green by "amount"
    const b = Math.max(parseInt(rgb[2]) - amount, 0); // Darken blue by "amount"
    return `rgb(${r}, ${g}, ${b})`; // Return darkened rgb color
}

function createGrid(rows, columns){
    gridContainer.innerHTML = ''; // Clear existing grid items

    const itemWidth = `calc(100% / ${columns})`;
    const itemHeight = `calc(100% / ${rows})`;

    for(let i = 0; i < rows; i++){
        for(let j = 0; j < columns; j++){
            const gridItem = document.createElement("div");
            gridItem.className = 'grid-item';

            gridItem.style.flex = `0 0 ${itemWidth}`;
            gridItem.style.height = itemHeight; // Set dynamic height
            // Add hover effect using event listener
            gridItem.addEventListener('mouseover', () => {
                gridItem.classList.add('hovered'); // Add the hovered class
            });
            
            // Initialize hover count for each grid item, set starting color to white
            gridItem.hoverCount = 0;
            gridItem.style.backgroundColor = 'rgb(255, 255, 255)'; // Start with white color

            // Add hover effect using event listener
            gridItem.addEventListener('mouseover', () => {
                if (gridItem.hoverCount === 0) {
                    // On first hover, set a random color
                    gridItem.style.backgroundColor = getRandomColor();
                } else if (gridItem.hoverCount < 10) {
                    // Darken color after the first hover
                    gridItem.style.backgroundColor = darkenColor(gridItem.style.backgroundColor, 25); // Darken by 25 each hover
                }

                // Increment hover count
                gridItem.hoverCount++;
            });
            gridContainer.appendChild(gridItem);

        }
    }
}

// Event listener for the "Generate Grid" button
generateButton.addEventListener("click", () => {
    const rows = parseInt(rowsInput.value);
    const columns = parseInt(columnsInput.value);

    createGrid(rows, columns); // Generate grid based on user input
});

