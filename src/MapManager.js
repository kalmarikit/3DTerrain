import '/output/pano2vr_player'
import '/output/skin'
import '/output/webxr/three.min'
import '/output/webxr/webxr-polyfill.min'


function configure() {

    const PhotoContainer = document.createElement('div');
    PhotoContainer.id = "container";
    var hs = '';
    hs += 'height : 100%;';
    hs += 'width : 100%;';
    hs += 'overflow: hidden;';
    PhotoContainer.setAttribute('style', hs);
    document.body.appendChild(PhotoContainer);

    pano = pano2vrPlayer("container");
    // add the skin object
    skin = pano2vrSkin(pano);
    // load the configuration

    window.addEventListener("load", function() {
        pano.readConfigUrlAsync("pano.xml");
    });
}

export { configure };