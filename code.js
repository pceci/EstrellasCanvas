var centroX = 350;
var centroY = 350;
var MaxX = 700;
var MaxY = 700;
var MinX = 0;
var MinY = 0;
//var pxReferencia = 0.00001;
//var radReferencia = 1 + (((Math.PI * 2) * (1)) / 86400);
// Declinación 0 a 90 grados
//var decReferencia = 1 + ((500 * 0.00002) * 90);
var ctx = null;
var ctxNorte = null;
var listaEstrellas = null;

jQuery(document).ready(

function () {

    var c = document.getElementById("divCanvasSur");
    ctx = c.getContext("2d");
    // Polo Norte 
    var cNorte = document.getElementById("divCanvasNorte");
    ctxNorte = cNorte.getContext("2d");

    // EJE DE ABSCISAS 
    ctxNorte.moveTo(0, centroY);
    ctxNorte.lineTo(MaxX, centroY);

    //EJE DE ORDENADAS
    ctxNorte.moveTo(centroX, 0);
    ctxNorte.lineTo(centroX, MaxY);

    ctxNorte.strokeStyle = 'blue';
    ctxNorte.stroke();

    //ctxNorte.strokeStyle = '#5A3F3F';


    // Fin Polo Norte
    // EJE DE ABSCISAS 
    ctx.moveTo(0, centroY);
    ctx.lineTo(MaxX, centroY);

    //EJE DE ORDENADAS
    ctx.moveTo(centroX, 0);
    ctx.lineTo(centroX, MaxY);

    ctx.strokeStyle = 'blue';
    ctx.stroke();

    //ctx.strokeStyle = '#5A3F3F';


    //ctx.strokeStyle = 'red';

    ObtenerEstrellas();

});

function ObtenerMagnitud(pValor) {
    var resultado = 0;
    if (pValor == 90) {
        resultado = 0;
    } else if (pValor == 0) {
        resultado = centroX;
    } else {
        resultado = (centroX * (90 - pValor)) / 90;
    }
    return resultado;
}

function obtenerVectorComponente(pMagnitud, pAnguloRadianes) {


    var obj = new VectorComponente();
    obj.x = pMagnitud * Math.cos(pAnguloRadianes);
    obj.y = pMagnitud * Math.sin(pAnguloRadianes);


    return obj;
}
function VectorComponente() {


    this.x = 0;


    this.y = 0;
}


function ObtenerEstrellas() {
    listaEstrellas = eval('(' + $('#hiddenListaEstrellas').val() + ')');
    for (var i = 0; i < listaEstrellas.length; i++) {
        if (listaEstrellas[i].dec <= 0) {
            var vectEstrella = obtenerVectorComponente(ObtenerMagnitud((listaEstrellas[i].dec * -1)), ((Math.PI * 2) * listaEstrellas[i].ra) / 24);
            ctx.fillRect(vectEstrella.x + centroX, centroY - vectEstrella.y,2, 2);
        } else {
            var vectEstrella = obtenerVectorComponente(ObtenerMagnitud(listaEstrellas[i].dec), ((Math.PI * 2) * listaEstrellas[i].ra) / 24);
            ctxNorte.fillRect(vectEstrella.x + centroX, centroY - vectEstrella.y, 2, 2);

        }
    }
}