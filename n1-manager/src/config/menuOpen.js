  export const menuOpen = function (name) {
    let openName = []
    if (name == "merchantList" ||name == "managerList") {
      openName = ["businessCenter"];
    } else if (name == "ownspace-index") {
      openName = [];
    } else if (name.includes("Log")) {
      openName = ["logCenter"];
    } else if (name == "playList") {
      openName = ["playerCenter"];
    } else if (name == "board") {
      openName = [];
    }
    return openName
  }
