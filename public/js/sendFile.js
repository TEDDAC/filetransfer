const form = document.querySelector("#fileSenderForm")
const fileField = form.querySelector("#fileField")
const errorMessage = document.querySelector("#errorMessage")
const responseLinkParagraph = document.querySelector("#responseLink")
const MAX_SIZE = 2**32 // 4Go

const loading = {
  html: document.querySelector("#fileSendingLoader"),
  show(){
    this.html.style.display = "block";
  },
  hide(){
    this.html.style.display = "none";
  }
}

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
  loading.show();

  const file = fileField.files[0]

  if(file.size > MAX_SIZE){ // 2^26
    onError('File is too large !!! Max 4Go')
  }

  const formData = new FormData()
  formData.append('file', file)

  fetch("/upload", {
    method: "POST",
    body: formData
  }).then(async (res) => {
    console.log(res)
    if(res.status !== 200){
      onError(`An error occured during the transfer: ${res.status} ${res.statusText}`)
      return;
    }
    const body = await res.json()
    const id = body.id;
    const url = `${document.URL}downloadPage/${id}`
    window.location.href = url
  }).catch((reason) => {
    loading.hide()
    console.error(`Request aborted: ${reason}`)
    onError(reason)
  })
})

function onError(message){
  loading.hide()
  console.error(message)
  errorMessage.innerHTML = message
}