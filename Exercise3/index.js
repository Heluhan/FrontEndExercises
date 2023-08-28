const nextRound = (e) => {
  const dialog = document.querySelector("#choose");
  dialog.showModal();
};

const giveImgSrc = (pic, num) => {
  if (num === 0) {
    pic.src = "./pics/paper.png";
  } else if (num === 1) {
    pic.src = "./pics/rock.png";
  } else {
    pic.src = "./pics/scissor.png";
  }
};

const renderWin = (who) => {
  let txt;
  let note = "";
  if (who === "rb") {
    txt = document.getElementById("rbtxt");
    note = "Robot wins the round.";
  } else {
    txt = document.getElementById("prtxt");
    note = "Player wins the round.";
  }
  const show = document.getElementsByClassName("round-winner")[0];
  show.innerHTML = note;

  if (txt.innerHTML === "Win : 0 | Lose : 0") {
    txt.innerHTML = "Win : 1 | Lose : 0";
  } else if (txt.innerHTML === "Win : 1 | Lose : 0") {
    txt.innerHTML = "Win : 2 | Lose : 0";
    terminate(who);
  } else if (txt.innerHTML === "Win : 0 | Lose : 1") {
    txt.innerHTML = "Win : 1 | Lose : 1";
  } else {
    txt.innerHTML = "Win : 2 | Lose : 1";
    terminate(who);
  }
};

const renderLose = (who) => {
  let txt;
  if (who === "rb") {
    txt = document.getElementById("rbtxt");
  } else {
    txt = document.getElementById("prtxt");
  }
  if (txt.innerHTML === "Win : 0 | Lose : 0") {
    txt.innerHTML = "Win : 0 | Lose : 1";
  } else if (txt.innerHTML === "Win : 1 | Lose : 0") {
    txt.innerHTML = "Win : 1 | Lose : 1";
  } else if (txt.innerHTML === "Win : 0 | Lose : 1") {
    txt.innerHTML = "Win : 0 | Lose : 2";
  } else {
    txt.innerHTML = "Win : 1 | Lose : 2";
  }
};

const renderDraw = () => {
  const show = document.getElementsByClassName("round-winner")[0];
  show.innerHTML = "The round is a draw.";
};

const terminate = (who) => {
  const dialog = document.querySelector("#choose");
  dialog.close();
  let message = "";
  if (who === "rb") {
    message = "Robot wins the game !!";
  } else if (who === "no") {
    const rbtxt = document.getElementById("rbtxt").innerText;
    const prtxt = document.getElementById("prtxt").innerText;
    if (rbtxt === "Win : 1 | Lose : 0") {
      message = "Robot wins the game !!";
    } else if (rbtxt === "Win : 0 | Lose : 1") {
      message = "Player wins the game !!";
    } else {
      message = "The game is a draw.";
    }
  } else {
    message = "Player wins the game !!";
  }
  const rst = document.getElementsByClassName("rst")[0];
  const nxt = document.getElementsByClassName("nxt")[0];
  rst.removeChild(nxt);
  rst.innerHTML = message;
  rst.style.fontSize = "20px";
};

const startRender = (play) => {
  // Render the robot
  const container = document.querySelector(".rbt .content");
  const pic = document.createElement("img");
  const num = Math.floor(Math.random() * 3);
  giveImgSrc(pic, num);
  container.innerHTML = "";
  container.appendChild(pic);

  // Render the player
  const container_p = document.querySelector(".human .content");
  const pic_p = document.createElement("img");
  giveImgSrc(pic_p, parseInt(play));
  container_p.innerHTML = "";
  container_p.appendChild(pic_p);

  // Render the header
  const header = document.querySelector(".round");
  const computedStyle = getComputedStyle(header);
  if (computedStyle.visibility === "hidden") {
    header.innerHTML = "Round 1";
    header.style.visibility = "visible";
  } else if (header.innerHTML === "Round 1") {
    header.innerHTML = "Round 2";
  } else if (header.innerHTML === "Round 2") {
    header.innerHTML = "Round 3";
    terminate("no");
  }

  // Render the player status
  const playInt = parseInt(play);
  if (
    (num === 1 && playInt === 0) ||
    (num === 0 && playInt === 2) ||
    (num === 2 && playInt === 1)
  ) {
    renderLose("rb");
    renderWin("pr");
  } else if (num === playInt) {
    renderDraw();
  } else {
    renderLose("pr");
    renderWin("rb");
  }
};

const form = document.querySelector("form");
form.onsubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  startRender(formData.get("rps"));
};
