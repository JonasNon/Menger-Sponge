const head = document.getElementById("head")


let enabled = false

const oldScriptChecker = () => {
  let newScript = document.getElementById("newScript")
  let oldScript = document.getElementById("script")
  if (oldScript == undefined) {
    newScript.id = "script"
    enabled = true
  }
}

