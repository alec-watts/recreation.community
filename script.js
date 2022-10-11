//ELEMENTS
const tan = "#feebca"

// VIDEOS
var vidElement = document.getElementById("video")
var video = $('#video')
const videoArray = {
  "vibes": [],
  "one": [],
  "two": [],
  "three": []
}
const video1 = "assets/videos/grinder demo.mp4"
const video2 = "assets/videos/grinder vibes.mp4"
const video1mobile = "assets/videos/grinder demo mobile.mp4"
const video2mobile = "assets/videos/grinder vibes mobile.mp4"
var videos = [video1, video2]
var activeVideo = 0
let currentVid;

$(document).ready(function () {
  if ($(window).width() < 640) {
    videos = [video1mobile, video2mobile]
    appQR.remove()
  }
  vidElement.src = videos[activeVideo]
  currentVideo = videos[activeVideo]
})

function vid(video) {
  vidElement.src = video
  currentVid = video
  vidElement.load()
  vidElement.play()
}

video.click(() => toggleVid())
$("#main").click(toggleVid)

// JQuery: vidElement.onended = nextVid(), would need to be object instead of DOM element
vidElement.addEventListener('ended', nextVid)
function nextVid() {
  activeVideo == videos.length - 1 ? activeVideo = 0 : activeVideo += 1
  vid(videos[activeVideo])
}

function toggleVid() { vidElement.paused ? vidElement.play() : vidElement.pause() }

// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// ––––––––––––––––––––––––––––––––––––3D/AR––––––––––––––––––––––––––––––––––––––
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

const modelViewer = $("model-viewer")
const x = 0.1
const y = 0.1
const z = 0.1
// trying to scale down 50%, not working
const scale = () => {
  modelViewer.scale = `${x} ${y} ${z}`
  modelViewer.updateFraming()
  console.log("scale")
}
if (modelViewer.loaded) scale()

const reality = $('#reality')
reality.click(() => {
  video.toggle()
  modelViewer.toggle()
  console.log("toggle")
  vidElement.pause()
  video.is(":hidden") ? reality.html("reality") : reality.html("virtual")
})

// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// ––––––––––––––––––––––––––––––––––––BUYING–––––––––––––––––––––––––––––––––––––
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

const description = $('#description')
const description_text = $('#description > p')
const description_header = $('#description > h2')
const buyButton = $('#buyButton')
const btnContainer = $("#btnContainer")

const twoButton = $('#two')
const threeButton = $('#three')
const TWOplusbutton = $('#TWO+_buy')
const buttons = [twoButton, threeButton, TWOplusbutton]
let lastButton;

// create some type of media file? although ideally would just get from Shopify (as backend)
// header, description, price, image/video, 3D model, UGC?
const two = {
  'header': 'TWO-PIECE',
  'description': 'Never out of place; fully featured; as portable as possible. This ain\'t your grandpa\'s two-piece. <br><ul><li>top storage</li><li>pocket sized</li><li>no-gunk guide-ring</li></ul>',
  'video': 'assets/videos/plus demo.mp4',
  'link': 'https://recreation-community.myshopify.com/66077622512/checkouts/cc54e961365c315f73dc92c436bd95a7',
  'button': twoButton,
  'price': '$69'
}
const three = {
  'header': 'THREE-PIECE',
  'description': '<br>The grinder you thought you knew. The freedom  Our no-gunk friction ring <br><ul><li>portable container</li><li>top storage</li><li>shareability</li></ul>',
  'video': 'assets/videos/plus demo.mp4',
  'link': 'https://recreation-community.myshopify.com/66077622512/checkouts/53f976204e77cdb828fb2c37b7bbda30',
  'button': threeButton
}


products = [one, two, three]
let currentProduct

// create the elements using JS?
/* products.forEach(element => {
  btnContainer.append(element.button)
}) */

function explore(product) {
  if (lastButton == null) {
    lastButton = product.button
    description.toggle()
  }
  if (product == three) {
    console.log('product three')
    vidElement.pause()
    video.css("filter", "blur(6px)")
    buyButton.html('WAITLIST')
  }
  else {
    // if (currentVid != product.video) vid(product.video)
    buyButton.show()
    // vidElement.play()
    video.css("filter", "initial")
    buyButton.html(`<a href="${product.link}" class="branded" style="text-decoration:none" target="_blank" onclick="toggleVid()">BUY ${product.price}</a>`)
  }

  console.log('other shits')
  currentProduct = product

  description_header.html(product.header)
  description_text.html(product.description)
  // description_text.html("lalalalalal")
  buttons.forEach(button => button.css("background-color", tan))
  product.button.css("background-color", "#f2f2f2")
}

/* document.querySelector('.klaviyo_form_trigger').addEventListener('click', function () {
  if (currentProduct == three) {
    window._klOnsite = window._klOnsite || []
    window._klOnsite.push(['openForm', 'Wef6xU'])
    console.log('form toggle')
  }
}) */

$('.klaviyo_form_trigger').click(() => {
  if (currentProduct == three) {
    window._klOnsite = window._klOnsite || []
    window._klOnsite.push(['openForm', 'Wef6xU'])
    console.log('form toggle')
  }
})

// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// ––––––––––––––––––––––––––––––––––––POP-UPS––––––––––––––––––––––––––––––––––––
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

// 21+
$("#21y").click(() => twentyOne())
$("#21n").click(() => window.open('https://media.tenor.com/ZZEl8q6eRaoAAAAC/shame-game-of-thrones.gif', '_self'))
function twentyOne() {
  $('#ageCheck').hide()
  $('#fullBlur').hide()
  // toggleVid()
  explore(three)
}

// ––––––––––––––––––––––––––––––––––––––APP––––––––––––––––––––––––––––––––––––––
const appButton = $('#appButton')
const appQR = $('#appQR')
appButton.mouseenter(() => {
  appQR.show()
  video[0].pause()
})
appButton.mouseleave(() => {
  appQR.hide()
  video[0].play()
})
appButton.click(() => window.open('https://apps.apple.com/us/app/consume-alcohol-tracker/id1633718776', '_blank'))