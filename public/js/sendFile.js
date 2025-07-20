const form = document.querySelector("#fileSenderForm")
const fileField = form.querySelector("#fileField")
const errorMessage = document.querySelector("#errorMessage")
const responseLinkParagraph = document.querySelector("#responseLink")
const MAX_SIZE = 2**32 // 4Go

fileField.addEventListener("change", (e) => {
  e.preventDefault()
  
  const file = fileField.files[0]

  if(file.size > MAX_SIZE){ // 2^26
    onError('File is too large !!! Max 4Go')
  }
})

form.addEventListener("submit", async (e) => {
  e.preventDefault()
  errorMessage.innerHTML = ""

  const file = fileField.files[0]

  if(file.size > MAX_SIZE){ // 2^26
    onError('File is too large !!! Max 4Go')
  }

  const formData = new FormData()
  formData.append('file', file)

  const response = fetch("/upload", {
    method: "POST",
    body: formData
  }).then(async (res) => {
    const body = await res.json()
    const id = body.id;
    const url = `${document.URL}/downloadPage/${id}`
    window.location.href = url
  }).catch((reason) => {
    console.error(`Request aborted: ${reason}`)
  })
})

function onError(message){
  console.error(message)
  errorMessage.innerHTML = message
}