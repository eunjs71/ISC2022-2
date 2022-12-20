const MENU_HOME = "MENU_HOME";
const MENU_READY = "MENU_READY";
const MENU_QNA = "MENU_QNA";
const MENU_ARCHIVE = "MENU_ARCHIVE";

const MENU_WINDOW = {
  MENU_HOME: "iscContents-home",
  MENU_READY: "iscContents-ready",
  MENU_QNA: "iscContents-qna",
  MENU_ARCHIVE: "iscContents-archive",
};

let menu = MENU_HOME;

function onMenuClicked(e) {
  //   console.log(e);
  //   let target = e.target;
  deactivateAllMenus();
  e.target.classList.add("menuOptionActive");
  let menuKey = e.target.getAttribute("menukey");
  //   console.log(menuKey);
  let menuID = MENU_WINDOW[menuKey];
  //   console.log(menuID);
  document.getElementById(menuID).style.display = "flex";
  //   console.log(document.getElementById(menuID));
}

function deactivateAllMenus() {
  const menuOptions = document.getElementsByClassName("iscMenuOption");
  const contentWindows = document.getElementsByClassName("iscContent__window");
  for (let i = 0; i < menuOptions.length; i++) {
    let option = menuOptions[i];
    let w = contentWindows[i];
    option.classList.remove("menuOptionActive");
    w.style.display = "none";
  }
}

const menuOptions = document.getElementsByClassName("iscMenuOption");
// console.log(menuOptions);
// console.log(menuOptions.length);
for (let i = 0; i < menuOptions.length; i++) {
  let option = menuOptions[i];
  //   console.log(option);
  option.addEventListener("click", onMenuClicked);
}
