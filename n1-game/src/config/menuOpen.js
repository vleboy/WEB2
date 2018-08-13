  export const menuOpen = function (name) {
    let openName = []
    if (name.includes('list')){
      openName = ["tool"];
    }
    return openName
  }
