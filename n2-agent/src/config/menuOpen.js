export const menuOpen = function (name) {
  let openName = []
  if (name.includes('na')) {
    openName = ["report"];
  } else if (name == "agentList" || name == "warnList") {
    openName = ["agentCenter"];
  } else if (name == "ownspace-index") {
    openName = [];
  } else if (name.includes("Log")) {
    openName = ["logCenter"];
  } else if (name == "playList") {
    openName = ["playerCenter"];
  } else if (name == 'gameConfig') {
    openName = ['gameCenter']
  }else if (name == 'adminList') {
    openName = ['adminCenter']
  }
  return openName
}
