var imgs = []
var imgsExt = ["png","jpg","jpeg","webp"]

var assetPath = "/art/assets/"

const imgNode = document.createElement("div")
imgNode.setAttribute("class","img")
const popinNode = document.createElement("div")
popinNode.setAttribute("class","popin")

document.getElementById("themodal").addEventListener("click", function() {
    const topElement = document.elementFromPoint(event.clientX, event.clientY);
    if (!topElement.classList.contains("modal-image")) {
        const modal = document.querySelector(".modal");
        modal.style.display = "none";
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
                img.setAttribute("src",newText)
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