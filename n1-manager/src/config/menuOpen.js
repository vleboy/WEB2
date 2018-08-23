  export const menuOpen = function (name) {
    let openName = []
    if (name == "merchantList" ||name == "dealerList") {
      openName = ["businessCenter"];
    } else if (name == "ownspace-index") {
      openName = [];
    } else if (name.includes("Log")) {
      openName = ["logCenter"];
    } else if (name == "playList") {
      openName = ["playerCenter"];
    } else if (name == "board") {
      openName = [];
    }else if(name.includes('na')) {
      openName = ["report", "nareport"];
    } else if (name == "ttgvideo") {
      openName = ["report", "ttgreport"];
    } else if (name.includes('sa')) {
      openName = ["report", "sareport"];
    }else if (name == "sbvideo" || name == "sbtrue" || name == "sbAll") {
      openName = ["report", "sbreport"];
    } else if (name == "mgvideo") {
      openName = ["report", "mgreport"];
    } else if (name == "agtrue") {
      openName = ["report", "agreport"];
    }else if(name=='ysbSport'){
      openName = ["report", "ysbReport"];
    } else if (name == "ugsport") {
      openName = ["report", "ugreport"];
    } else if (name == "allreport") {
      openName = ["report"];
    }else if (name == 'rtgGame') {
      openName = ["report", "rtgReport"];
    }else if (name == 'dtGame') {
      openName = ["report", "dtReport"];
    }else if (name == 'ppGame') {
      openName = ["report", "ppReport"];
    }
    return openName
  }
