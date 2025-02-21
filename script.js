let selectedColor = "black"; // Now it's global!


document.getElementById("startButton").addEventListener("click", function () {
    document.getElementById("startButtonDiv").remove();
    createGrids();
});

function createGrids() {
    const title = document.createElement("div");
    title.textContent = "Etch-A-Sketch";
    title.classList.add("title");
    document.body.appendChild(title);

    // Create Controls Container
    const controls = document.createElement("div");
    controls.classList.add("controls");

    // Create Label
    const label = document.createElement("label");
    label.setAttribute("for", "gridSize");
    label.textContent = "Grid Size: ";

    // Create Grid Size Display
    const gridSizeDisplay = document.createElement("span");
    gridSizeDisplay.id = "gridSizeDisplay";
    gridSizeDisplay.textContent = "16";

    const xSymbol = document.createTextNode(" x "); 

    const gridSizeDisplay2 = document.createElement("span"); 
    gridSizeDisplay2.textContent = "16";

    label.appendChild(gridSizeDisplay);
    label.appendChild(xSymbol);
    label.appendChild(gridSizeDisplay2);

    // Create Range Slider
    const gridSizeSlider = document.createElement("input");
    gridSizeSlider.type = "range";
    gridSizeSlider.id = "gridSize";
    gridSizeSlider.min = "16";
    gridSizeSlider.max = "100";
    gridSizeSlider.value = "16";
    gridSizeSlider.step = "1";

    // Create Clear Button
    const clearButton = document.createElement("button");
    clearButton.id = "clearGrid";
    clearButton.textContent = "Clear Grid";

    // Eraser Button
    const eraserButton = document.createElement("button");
    eraserButton.id = 'eraserButton';
    eraserButton.textContent = "Eraser";
    
    // Color Palette Container
    const colorPaletteContainer = document.createElement("div");
    colorPaletteContainer.classList.add("colorPaletteContainer");
    colorPaletteContainer.textContent = "Colors: ";

    // Create color options 
    const colors = ["black", "red", "green", "yellow", "purple", "orange", "pink", "white"];

    colors.forEach(color => {
        const colorButton = document.createElement("button");
        colorButton.classList.add("colorButton");
        colorButton.style.backgroundColor = color; 
        colorButton.setAttribute("data-color", color);
    
        // Changing the selected color     
        colorButton.addEventListener("click", function(){
            selectedColor = this.getAttribute("data-color"); // Now selectedColor is accessible globally!
        });
        colorPaletteContainer.appendChild(colorButton);
    });

    // Append Elements to Controls
    controls.appendChild(label);
    controls.appendChild(gridSizeSlider);
    controls.appendChild(clearButton);
    controls.appendChild(colorPaletteContainer);
    controls.appendChild(eraserButton);
    document.body.appendChild(controls);

    // Create Grid
    const gridContainer = document.createElement("div");
    gridContainer.classList.add("gridContainer");
    gridContainer.style.cursor = "crosshair";
    document.body.appendChild(gridContainer);
    
    createGrid(16); // Default grid size

    // Update Grid Size Display & Regenerate Grid
    gridSizeSlider.addEventListener("input", function () {
        gridSizeDisplay.textContent = this.value;
        gridSizeDisplay2.textContent = this.value;
        createGrid(this.value); // Update grid dynamically
    });

    // Clear Grid Button
    clearButton.addEventListener("click", function () {
        document.querySelectorAll(".gridItem").forEach(item => item.style.backgroundColor = "white");
    });
}

let isDrawing = false;

function createGrid(gridSize) {
    const gridContainer = document.querySelector(".gridContainer");
    gridContainer.innerHTML = ""; // Clear previous grid

    gridContainer.style.display = "flex";
    gridContainer.style.flexWrap = "wrap";
    gridContainer.style.width = "500px";
    gridContainer.style.height = "500px";

    const totalCells = gridSize * gridSize;
    const cellSize = 500 / gridSize;

    for (let i = 0; i < totalCells; i++) {
        const gridItem = document.createElement("div");
        gridItem.classList.add("gridItem");

        gridItem.style.width = `${cellSize}px`;
        gridItem.style.height = `${cellSize}px`;

        // Mouse action/Painting

        gridItem.addEventListener("mousedown", function () {
            let currenOpacity = parseFloat(this.style.opacity) || 0;
            if(currenOpacity<1){
                this.style.opacity = (currenOpacity + 0.1).toFixed(1);
            }
            this.style.backgroundColor = selectedColor;
            isDrawing = true;
        });
        
        gridItem.addEventListener("mouseover", function () {
            if (isDrawing) {
                let currenOpacity = parseFloat(this.style.opacity) || 0;
            if(currenOpacity<1){
                this.style.opacity = (currenOpacity + 0.1).toFixed(1);
            }
                this.style.background = selectedColor;
            }
        });
        
        // Eraser button action
        eraserButton.addEventListener("click", function(){
          selectedColor = "white";   
          gridContainer.style.cursor = "cell";
        });
        // Cursor restore

        document.querySelectorAll(".colorButton").forEach(button =>{
            button.addEventListener("click", function(){
                selectedColor = this.getAttribute("data-color");
                gridContainer.style.cursor = "crosshair";
            });
        });
        gridContainer.appendChild(gridItem);
    }

    document.addEventListener("mouseup", function () {
        isDrawing = false;
    });
}
