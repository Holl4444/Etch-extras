/*
Figure out how to make it run faster
Check what async functions are

 */
const GRIDAREA = 150;
const boxes = document.getElementsByClassName("column");
const popupBtn = document.getElementById("popup-btn");
const darkenBtn = document.getElementById("darken-btn");
let isPenDown = false;
let isDarkMode = false;

// Set up without grid size choice
window.onload = () => {
  createGrid(4);
};

// If the entry is cancelled cancel else get and check input validity
const getGridSize = () => {
  const gridSize = prompt(
    "Please enter the length of your grid (100 boxes max)"
  );
  if (gridSize == null) {
    return;
  } else if (!gridSize || isNaN(gridSize) || gridSize > 100 || gridSize < 1) {
    alert("Invalid length");
    getGridSize();
  }
  return gridSize;
};

const createGrid = (size) => {
  isPenDown = true;
  let attribute = `min-height: ${GRIDAREA / size}rem; min-width: ${GRIDAREA / size}rem;`;
  const grid = document.querySelector("section");
  // If we have a valid input for size delete last grid and create rows and columns in grid-container.
  if (size) {
    grid.replaceChildren(); 
    for (let i = 0; i < size; i++) {
      const row = document.createElement("div");
      row.classList.add("row");
      for (let j = 0; j < size; j++) {
        const column = document.createElement("div");
        column.classList.add("column");
        column.setAttribute("style", attribute); // fit and fill container
        column.classList.add("10"); // Set up for opacity function

        // On mouseenter, if space isn't pressed, then either get rgb or rgba depending if dark mode has been clicked and apply 
        column.addEventListener("mouseenter", (e) => {
          if (isPenDown) {
            if (isDarkMode) {
              const opInt = parseInt(e.target.classList[1]);
              if (opInt >= 0) {
                const indx = opInt - 1;
                e.target.classList.remove(e.target.classList[1]);
                e.target.classList.add(`${indx}`);
                const rgba = `${getRandomRGBA()}${opacity(opInt)}`;
                e.target.style.backgroundColor = rgba;
              }
            } else {
              e.target.style.background = getrandomRGB();
            }
          }
        });
        row.appendChild(column);
      }
      grid.appendChild(row);
    }
  }
};

const getrandomRGB = () => {
  const colour = () => {
    return Math.floor(Math.random() * 256);
  };
  const rgb = `rgb(${colour()}, ${colour()}, ${colour()})`;
  return rgb;
};

const getRandomRGBA = () => {
  const colour = () => {
    return Math.floor(Math.random() * 256);
  };
  const rgba1 = `rgba(${colour()}, ${colour()}, ${colour()},`;
  return rgba1;
};

const opacity = (num) => {
  const rgba2 = ` ${num / 10})`;
  return rgba2;
};

const resetOpacity = () => {
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].classList.remove(boxes[i].classList[1]);
    boxes[i].classList.add(`10`);
  }
};

// toggle if tiles are interactable
window.addEventListener("keydown", (e) => {
  if (isPenDown && e.code === "Space") {
    isPenDown = false;
    e.preventDefault();
  }
});

window.addEventListener("keyup", (e) => {
  if (e.code === "Space") {
    isPenDown = true;
    e.preventDefault();
  }
});

// Big controller button. It all starts here
popupBtn.addEventListener("click", () => {
  createGrid(getGridSize());
});

// Toggle if tiles will gradually darken
darkenBtn.addEventListener("click", () => {
  if (isDarkMode) {
    isDarkMode = false;
    darkenBtn.textContent = "Darken Mode";
    resetOpacity();
  } else {
    if (!isDarkMode) {
      isDarkMode = true;
      darkenBtn.textContent = "Light Mode";
    }
  }
  darkenBtn.classList.toggle("dark");
});
