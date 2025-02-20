document.getElementById("startButton").addEventListener("click", function() {
    document.getElementById("startButtonDiv").remove();
    createGrids();
});

function createGrids(){
        const title = document.createElement('div');
        title.textContent = "Etch-A-Sketch";
        title.classList.add("title");
        document.body.appendChild(title);

        createGrid();
    };

let isDrawing = false;

function createGrid(){
    const gridContainer = document.createElement("div");
    gridContainer.classList.add("gridContainer");

    for( let i = 0; i < 256; i++ ) {
        const gridItem = document.createElement("div");
        gridItem.classList.add("gridItem");
        gridContainer.appendChild(gridItem);

        gridItem.addEventListener("mousedown", function(){
            this.style.backgroundColor = "black";
            isDrawing = true;
            });
        gridItem.addEventListener("mouseover", function(){
            if(isDrawing){
                this.style.background = "black";
            }
        });  
        gridContainer.appendChild(gridItem);  
    }

    document.addEventListener("mouseup", function(){
         isDrawing = false; 
    });

    document.body.appendChild(gridContainer);
}
