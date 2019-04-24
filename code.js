var valorReferencia = 700;

var centroX = valorReferencia / 2;
var centroY = valorReferencia / 2;
var MaxX = valorReferencia;
var MaxY =valorReferencia;
var MinX = 0;
var MinY = 0;

var ctxSur = null;
var ctxNorte = null;
var listaEstrellas = null;

jQuery(document).ready(

function () {
    MostrarPlanoCartesiano();

    CargarEstrellas();

});
function MostrarPlanoCartesiano() {

    // Polo Sur 
    var cSur = document.getElementById("divCanvasSur");
    cSur.height = valorReferencia ; 
    cSur.width = valorReferencia ; 
    ctxSur = cSur.getContext("2d");

    // EJE DE ABSCISAS 
    ctxSur.moveTo(0, centroY);
    ctxSur.lineTo(MaxX, centroY);

    //EJE DE ORDENADAS
    ctxSur.moveTo(centroX, 0);
    ctxSur.lineTo(centroX, MaxY);

    ctxSur.strokeStyle = 'blue';
    ctxSur.lineWidth = 0.4;
    ctxSur.stroke();
    // Fin Polo Sur 

    // Polo Norte 
    var cNorte = document.getElementById("divCanvasNorte");
    cNorte.height = valorReferencia; 
    cNorte.width = valorReferencia; 
    ctxNorte = cNorte.getContext("2d");

    // EJE DE ABSCISAS 
    ctxNorte.moveTo(0, centroY);
    ctxNorte.lineTo(MaxX, centroY);

    //EJE DE ORDENADAS
    ctxNorte.moveTo(centroX, 0);
    ctxNorte.lineTo(centroX, MaxY);

    ctxNorte.strokeStyle = 'blue';
    ctxNorte.lineWidth = 0.4;
    ctxNorte.stroke();
    // Fin Polo Norte
}
function CargarEstrellas() {
    listaEstrellas = eval('(' + $('#hiddenListaEstrellas').val() + ')');
    for (var i = 0; i < listaEstrellas.length; i++) {
        if (listaEstrellas[i].dec <= 0) {
            var vectEstrella = obtenerVectorComponente(ObtenerMagnitud((listaEstrellas[i].dec * -1)), ((Math.PI * 2) * listaEstrellas[i].ra) / 24);
            ctxSur.fillRect(vectEstrella.x + centroX, centroY - vectEstrella.y,2, 2);
        } else {
            var vectEstrella = obtenerVectorComponente(ObtenerMagnitud(listaEstrellas[i].dec), ((Math.PI * 2) * listaEstrellas[i].ra) / 24);
            ctxNorte.fillRect(vectEstrella.x + centroX, centroY - vectEstrella.y, 2, 2);

        }
    }
}
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
