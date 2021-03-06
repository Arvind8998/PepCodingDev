let video = document.querySelector("video")
let recordBtn = document.querySelector("#record")
let recDiv = recordBtn.querySelector("div")
let capBtn = document.querySelector("#capture")
let capDiv = capBtn.querySelector("div")
let body = document.querySelector("body")
let mediaRecorder
let isRecording = false
let chunks = []
let appliedFilter
let minZoom = 1
let maxZoom = 3
let currZoom = 1
let zoomInBtn = document.querySelector("zoom-in")
let zoomOutBtn = document.querySelector("zoom-out")
let filters = document.querySelectorAll(".filter")

zoomInBtn.addEventListener("click", ()=>{
    if(currZoom < maxZoom){
        currZoom = currZoom + 0.1
    }
    video.style.transform = `scale(${currZoom})`
})

for (let i = 0; i < filters.length; i++) {
  filters[i].addEventListener("click", (e) => {
    removeFilter()
    appliedFilter = e.currentTarget.style.backgroundColor
    let div = document.createElement("div")
    div.style.backgroundColor = appliedFilter
    div.classList.add("filter-div")
    body.append(div)
  })
}

let removeFilter = () => {
  let Filter = document.querySelector(".filter-div")
  if (Filter) Filter.remove()
}

recordBtn.addEventListener("click", function (e) {
  if (isRecording) {
    mediaRecorder.stop()
    isRecording = false
    recDiv.classList.remove("record-animation")
  } else {
    mediaRecorder.start()
    isRecording = true
    appliedFilter = ""
    removeFilter()
    recDiv.classList.add("record-animation")
  }
})

capBtn.addEventListener("click", function () {
  if (isRecording) return
  capDiv.classList.add("capture-animation")
  setTimeout(function () {
    capDiv.classList.remove("capture-animation")
  }, 1000)

  //jobhi image screen pr dikhara use save krwana
  let canvas = document.createElement("canvas")
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight
  let tool = canvas.getContext("2d")
  tool.drawImage(video, 0, 0)

  if (appliedFilter) {
    tool.fillStyle = appliedFilter
    tool.fillRect(0, 0, canvas.width, canvas.height)
  }

  let link = canvas.toDataURL()
  let a = document.createElement("a")
  a.href = link
  a.download = "img.png"
  a.click()
  a.remove()
  canvas.remove()
})

navigator.mediaDevices
  .getUserMedia({ video: true, audio: true })
  .then(function (mediaStream) {
    mediaRecorder = new MediaRecorder(mediaStream)

    mediaRecorder.addEventListener("dataavailable", function (e) {
      chunks.push(e.data)
    })

    mediaRecorder.addEventListener("stop", function (e) {
      let blob = new Blob(chunks, { type: "video/mp4" })
      chunks = []
      let a = document.createElement("a")
      let url = window.URL.createObjectURL(blob)
      a.href = url
      a.download = "video.mp4"
      a.click()
      a.remove()
    })

    video.srcObject = mediaStream
  })
  .catch(function (err) {
    console.log(err)
  })
