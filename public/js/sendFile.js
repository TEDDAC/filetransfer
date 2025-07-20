const form = document.querySelector("#fileSenderForm")
const fileField = form.querySelector("#fileField")
const errorMessage = document.querySelector("#errorMessage")


fileField.addEventListener("change", (e) => {
  e.preventDefault()
  
  const file = fileField.files[0]

  if(file.size > 65536){ // 2^26
    onError('File is too large !!! Max 64Mo')
  }
})

form.addEventListener("submit", async (e) => {
  e.preventDefault()
  errorMessage.innerHTML = ""

  const file = fileField.files[0]

  if(file.size > 65536){ // 2^26
    onError('File is too large !!! Max 64Mo')
  }

  const formData = new FormData()
  formData.append('file', file)

  const response = fetch("/upload", {
    method: "POST",
    body: formData
  }).then((res) => {
    console.debug(res)
  }).catch((reason) => {
    console.error(`Request aborted: ${reason}`)
  })
})

function onError(message){
  console.error(message)
  errorMessage.innerHTML = message
}