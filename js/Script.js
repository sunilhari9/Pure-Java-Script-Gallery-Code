var xmlhttp;

if (window.XMLHttpRequest)
{// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
}
else
{// code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}
xmlhttp.onreadystatechange = function()
{
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
       list =document.getElementById("imglist");
       slider= document.getElementById("slider");
       des= document.getElementById("des");
        response = eval(xmlhttp.responseText);
        x=4;
        j=0;
        nextList();

        var img = document.createElement("img");
        img.src =response[0].url;
        img.id="displayImage";
        slider.appendChild(img);

        var p = document.createElement("p")
        p.innerHTML = lessDes(response[0].des);
        p.id ="displayImgDes" ;
        p.setAttribute("onmouseover" , "more(this)" );
        p.setAttribute("onmouseout" , "less(this)" );

        p.setAttribute("name",0);
        des.appendChild(p);

    }
}

function nextList(){
    for(i=j; i<x; i++){
        var img = document.createElement("img");
        img.src = response[i].url;
        img.id = i;
        img.setAttribute("onclick","updateMainImage(this)");
        img.setAttribute("class","listOfImages");
        list.appendChild(img);
    }
}

function more(data){
    id = data.getAttribute("name");
    document.getElementById("displayImgDes").innerHTML= response[id].des;
}
function less(data){
    id = data.getAttribute("name");
    document.getElementById("displayImgDes").innerHTML= response[id].des.substring(0, 200);
}

function lessDes(text){
  return text.substring(0, 200);
}


function nextImages(){
    x=x+4;
    j=j+4
    nextList();
}

xmlhttp.open("GET","js/images.json",true);
xmlhttp.send();

function updateMainImage(img){
    var id = img.id;
    document.getElementById("displayImage").setAttribute("src", response[id].url);
    document.getElementById("displayImgDes").innerHTML= lessDes(response[id].des);
    document.getElementById("displayImgDes").setAttribute("name",id);
    document.getElementById("left").setAttribute("name", id);
    document.getElementById("right").setAttribute("name", id);

}
function next(img){

    var id = parseInt(img.name);
    nextImg = id+1;
    img.setAttribute("name",nextImg);

    document.getElementById("left").setAttribute("name", nextImg);
    document.getElementById("displayImage").setAttribute("src",response[nextImg].url );
    document.getElementById("displayImgDes").innerHTML=lessDes(response[nextImg].des);
    document.getElementById("displayImgDes").setAttribute("name",nextImg);

}
function back(img){
        var id = parseInt(img.name);
        backImg = id-1;
        img.setAttribute("name",backImg);
    document.getElementById("right").setAttribute("name", backImg);
    document.getElementById("displayImage").setAttribute("src", response[backImg].url)
    document.getElementById("displayImgDes").innerHTML=response[backImg].des;
    document.getElementById("displayImgDes").setAttribute("name",backImg);

}


