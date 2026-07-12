var imgs = []
var imgsExt = ["png","jpg","jpeg","webp"]

var assetPath = "/panels/assets/"

const imgNode = document.createElement("img")
imgNode.setAttribute("class","img")

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
            var newText = element.replaceAll("%5C","/")
            var newPath = newText.replaceAll("/assets","")
            if (window.location.hostname == "fankyu.blog") {
                currentImg.setAttribute("src",newText)
            }else {
                currentImg.setAttribute("src",newText)
            }
        })
    }
});