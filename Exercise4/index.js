const spd = document.getElementById("spd");
const tp = document.getElementById("tp");
const car = document.getElementById("car");

const updatePic = (tp) => {
  switch (tp) {
    case "tractor":
      car.setAttribute("src", "./pics/car1.png");
      break;
    case "truck":
      car.setAttribute("src", "./pics/car2.png");
      break;
    case "motor":
      car.setAttribute("src", "./pics/car3.png");
      break;
    case "car":
      car.setAttribute("src", "./pics/car4.png");
      break;
    case "ebike":
      car.setAttribute("src", "./pics/car5.png");
      break;
    case "bike":
      car.setAttribute("src", "./pics/car6.png");
      break;
  }
};

let position = {
  x: 0,
  y: 0,
};

if (!localStorage.x) {
  localStorage.x = 0;
  localStorage.y = 0;
} else {
  position.x = Number(localStorage.x);
  position.y = Number(localStorage.y);
}

let panel = {
  spd: 1,
  type: "tractor",
};

if (!localStorage.spd) {
  localStorage.spd = 1;
  localStorage.type = "tractor";
} else {
  panel.spd = Number(localStorage.spd);
  panel.type = localStorage.type;
  spd.value = localStorage.spd;
  tp.value = localStorage.type;
  updatePic(panel.type);
}

const update = (pos) => {
  if (
    position.x > 755 ||
    position.y > 350 ||
    position.x < 0 ||
    position.y < 0
  ) {
    alert("Please remain within bounds !");
    return false;
  } else {
    position.x = pos.x;
    position.y = pos.y;
    return true;
  }
};

const refresh = () => {
  const trans = "translate(" + position.x + "px, " + position.y + "px)";
  car.style.transform = trans;
  localStorage.x = position.x;
  localStorage.y = position.y;
};

refresh();

window.addEventListener("keydown", (e) => {
  if (e.preventDefaulted) {
    return; // Do nothing if event already handled
  }

  let localSpd = Number(localStorage.spd);
  switch (e.code) {
    case "KeyS":
    case "ArrowDown":
      // Handle "downward"
      position.y += localSpd;
      if (!update(position)) {
        position.y -= localSpd;
      }
      break;
    case "KeyW":
    case "ArrowUp":
      // Handle "upward"
      position.y -= localSpd;
      if (!update(position)) {
        position.y += localSpd;
      }
      break;
    case "KeyA":
    case "ArrowLeft":
      // Handle "left"
      position.x -= localSpd;
      if (!update(position)) {
        position.x += localSpd;
      }
      break;
    case "KeyD":
    case "ArrowRight":
      // Handle "right"
      position.x += localSpd;
      if (!update(position)) {
        position.x -= localSpd;
      }
      break;
  }

  refresh();

  e.preventDefault();
});

spd.addEventListener("change", () => {
  localStorage.spd = spd.value;
});

tp.addEventListener("change", () => {
  localStorage.type = tp.value;
  updatePic(localStorage.type);
});
