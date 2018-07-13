  export const menuOpen = function (name) {
    let openName = []
    if (name.includes('na') ) {
      openName = ["report", "nareport"];
    } else if (name == "ttgvideo") {
      openName = ["report", "ttgreport"];
    } else if (name.includes('sa')) {
      openName = ["report", "sareport"];
    } else if (name == "mgvideo") {
      openName = ["report", "mgreport"];
    } else if (name == "agtrue") {
      openName = ["report", "agreport"];
    }else if(name=='ysbSport'){
      openName = ["report", "ysbReport"];
    }else if (name == 'rtgGame') {
      openName = ["report", "rtgReport"];
    } else if (name == "ugsport") {
      openName = ["report", "ugreport"];
    } else if (name == "allreport") {
      openName = ["report"];
    } else if (name == "businessList" ||name == "lineBusiness"||name =="warnList") {
      openName = ["businessCenter"];
    } else if (name == "ownspace-index") {
      openName = [];
    } else if (name == "adminList" ||name == "lineNumList" ||name == "adminRole") {
      openName = ["adminCenter"];
    } else if (name.includes("Log")) {
      openName = ["logCenter"];
    } else if (name == "playList") {
      openName = ["playerCenter"];
    } else if (name == "boothList" || name == "gameMailList" || name == "horseRaceLampList" || name == "gameNoticeList" ) {
      openName = ["operation"];
    } else if (name == "board") {
      openName = ["board"];
    }
    return openName
  }
