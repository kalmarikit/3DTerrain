function insertAfter(newNode, referenceNode ) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }



function drawMap( pano ){
    el=document.createElement('div');
    el.id = "ergakiMap";
    hs ='';
		hs+='height : 400px;';
		hs+='left : 25%;';
		hs+='position : absolute;';
		hs+='top : 0%;';
		hs+='visibility : inherit;';
		hs+='width : 600px;';
        hs+='pointer-events: auto;';
        hs+='z-Index : 14;';
    el.setAttribute('style',hs);
    maindiv = document.getElementById("container");
    insertAfter(el, maindiv);

    const ergakiMap = L.map('ergakiMap').setView([52.8290, 93.3440], 13);
    // const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    // const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    // const tiles = L.tileLayer(tileUrl,{attribution});
    //tiles.addTo(ergakiMap);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11', //'mapbox/streets-v11', //satellite-v9',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoia2FsbWFyaWtpdCIsImEiOiJjazY4dWZtZW8wOGhvM2pxajlsY2VmOHAyIn0.jLXGdbZRI5k_GYYQ7OszXg'
}).addTo(ergakiMap);

pano.on("configloaded", function() {
    const nodesIdArray = pano.getNodeIds();
    console.log(pano.getPan());
    const nodesCount = nodesIdArray.length;
    for(let i = 0; i <nodesCount ; i++) {
    var nodeLangetude = pano.getNodeLatLng(nodesIdArray[i]);
    console.log(nodeLangetude);
    if ( nodeLangetude !=null){

        var marker = L.marker(nodeLangetude);
        marker.title = nodesIdArray[i];
        marker.on("click", function() {
            const id = this.title;
            console.log("{" + id +"}");
            pano.openNext(  "{" + id +"}" );

        });
        marker.addTo(ergakiMap);
    }
    }
    //const marker = L.marker([52.83891, 93.39978]).addTo(ergakiMap);
    });
}