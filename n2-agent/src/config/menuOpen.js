export const menuOpen = function (name) {
  let openName = []
  if (name.includes('na')) {
    openName = ["report", "nareport"];
  } else if (name == "ttgvideo") {
    openName = ["report", "ttgreport"];
  } else if (name.includes('sa')) {
    openName = ["report", "sareport"];
  } else if (name == "mgvideo") {
    openName = ["report", "mgreport"];
  } else if (name == "agtrue") {
    openName = ["report", "agreport"];
  } else if (name == "ugsport") {
    openName = ["report", "ugreport"];
  } else if (name == "allreport") {
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
