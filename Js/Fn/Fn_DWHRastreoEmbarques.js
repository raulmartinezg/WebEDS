
var FormatoCeldaLlegadaReal = function (datos, cell, record) {
    var tmpVar;
    // ReSharper disable AssignedValueIsNeverUsed
    switch (record.data.TipoFechaLlegada) {
        case 'FechaRegistroLleg':
            tmpVar = '*';
            break;
        case 'Ambas':
            tmpVar = '**';
            break;
        default:
            tmpVar = '';
    }
    return String.format((record.data.LlegadaReal == null) ? '' : record.data.LlegadaReal.format('d/M/Y H:i:s').toString()); //+ tmpVar);
};

var FormatoCeldaSalidaReal = function (datos, cell, record) {
    var tmpVar;
    // ReSharper disable AssignedValueIsNeverUsed
    switch (record.data.TipoFechaSalida) {
        case 'FechaRegistroSal':
            tmpVar = '*';
            break;
        case 'Ambas':
            tmpVar = '**';
            break;
        default:
            tmpVar = '';
    }
    return String.format((record.data.SalidaReal == null) ? '' : record.data.SalidaReal.format('d/M/Y H:i:s').toString()); //+ tmpVar);
};

















