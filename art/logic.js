var imgs = []
var imgsExt = ["png","jpg","jpeg","webp"]

var assetPath = "/art/assets/"

const imgNode = document.createElement("div")
imgNode.setAttribute("class","img")
const popinNode = document.createElement("div")
popinNode.setAttribute("class","popin")
const modal = document.querySelector(".modal");

var x = 0
var y = 0

const modalimg = document.getElementById("modalImage");

document.getElementById("themodal").addEventListener("click", function() {
    const topElement = document.elementFromPoint(event.clientX, event.clientY);
    if (!topElement.classList.contains("modal-image")) {
        modal.style.display = "none";
        zoom = false
        fixModalSize()
    }
})
function fixModalSize() {
    modalimg.style.height = window.innerHeight * 0.95 + "px";
    modalimg.style.marginTop = window.innerHeight * 0.025 + "px";
    if (window.innerWidth * 0.8 < parseInt(modalimg.style.height)) {
        console.log("width is smaller than height")
        modalimg.style.height = window.innerWidth * 0.8 + "px";
    }
    if (zoom) {
        modalimg.style.marginTop = 0;
        modalimg.style.height = "auto";
        modalimg.style.maxWidth = "auto";
        modalimg.style.top = "2.5%";
    }
}

fixModalSize()
window.addEventListener("resize", function() {
    fixModalSize()
})
var zoom = false

modalimg.addEventListener("mouseover", function() {
    if (!zoom) {
        modalimg.style.cursor = "zoom-in"
    } else {
        modalimg.style.cursor = "zoom-out"
    }
})

document.addEventListener("mousemove", function(event) {
    y = event.clientY
    x = event.clientX
})




modalimg.addEventListener("click", function() {
    if (!zoom) {
        console.log(window.innerHeight)
        console.log(modalimg.scrollHeight)
        modalimg.style.cursor = "zoom-out"
        modalimg.style.height = "auto";
        modalimg.style.maxWidth = "auto";
        modalimg.style.top = "2.5%";
        modalimg.style.marginTop = 0;
        modal.scrollTop = modalimg.scrollHeight * (y / window.innerHeight)/2;
        console.log(modalimg.scrollTop)
        console.log(modalimg.scrollHeight * (y / window.innerHeight)/2)
      
        zoom = true
    } else {
        modalimg.style.cursor = "zoom-in"
        zoom = false
        fixModalSize()
    }
})

$.ajax({
    // type: "method",
    url: assetPath,
    // dataType: "dataType",
    success: function (response) {
        imgs = []
        imgsExt.forEach(element => {
            $(response).find(`a:contains(.${element})`).each(function(){
                imgs.push($(this).attr("href"))
            })
        })
        imgs.forEach(element => {
            const currentImg = document.getElementById('container1').appendChild(imgNode.cloneNode())
            console.log(element)
            currentImg.setAttribute("style","padding: 5px;")
            const img = document.createElement("img")
            img.setAttribute("class","img")
            currentImg.appendChild(img)
            var newText = element.replaceAll("%5C","/")
            var newPath = newText.replaceAll("/assets","")
            
            if (window.location.hostname == "fankyu.blog") {
                var path = "/art/assets/" + newText
                img.setAttribute("src",path)
                console.log('im on website')
                console.log(newText)
            }else {
                img.setAttribute("src",newText)
            }
            const currentPopin =  currentImg.appendChild(popinNode.cloneNode())
            const divNode = document.createElement("div")
            const bottomNode = document.createElement("div")
            bottomNode.setAttribute("class","bottomPopin")
            currentPopin.appendChild(divNode)
            currentPopin.appendChild(bottomNode)
            
            const fullscreenButton = document.createElement("img")
            fullscreenButton.setAttribute("class","cButton")
            fullscreenButton.setAttribute("src","fullscreen.png")
            currentPopin.appendChild(fullscreenButton)

            var fileName = newPath.replaceAll("/art/","")

            divNode.innerHTML = fileName
            currentImg.addEventListener("mouseover", function() {
                currentPopin.setAttribute("style","display: block;")
            })
            currentImg.addEventListener("mouseout", function() {
                currentPopin.setAttribute("style","display: none;")
            })
            fullscreenButton.addEventListener("click", function() {
                const modal = document.querySelector(".modal");
                const modalImage = document.getElementById("modalImage");
                modal.style.display = "block";
                modalImage.src = img.src;
            })
        })
    }
});