
const sidebar = document.getElementById("sidebar");
const menuButton = document.getElementById("menuButton");
const closeButton = document.getElementById("closeButton");
const overlay = document.getElementById("overlay");
const main = document.getElementById("main");

const mobileScreen = window.matchMedia("(max-width: 992px)");

function updateMenu(open) {
  sidebar.classList.toggle("closed", !open);

  const mobile = mobileScreen.matches;

  overlay.classList.toggle("active", open && mobile);
  main.classList.toggle("expanded", !open);

  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute(
    "aria-label",
    open ? "Menyuni yopish" : "Menyuni ochish"
  );
}

menuButton.addEventListener("click", () => {
  updateMenu(sidebar.classList.contains("closed"));
});

closeButton.addEventListener("click", () => {
  updateMenu(false);
});

overlay.addEventListener("click", () => {
  updateMenu(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    updateMenu(false);
  }
});

mobileScreen.addEventListener("change", () => {
  updateMenu(!sidebar.classList.contains("closed"));
});

// LOCAL CLOCK
function updateClock() {
  const now = new Date();

  const time = now.toLocaleTimeString("uz-UZ", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });

  document.getElementById("clock").textContent = time;
}

updateClock();
setInterval(updateClock, 1000);

// INITIAL STATE: SIDEBAR OPEN
updateMenu(true);
