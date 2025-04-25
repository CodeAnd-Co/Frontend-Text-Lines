import  {CuotaSetModelo} from './CuotaSetModelo.js';

export class ListaCuotas {
    constructor({ mensaje, cuotas }) {
        this.mensaje = mensaje;
        this.cuotas = Array.isArray(cuotas) ? cuotas.map((cuota) => new CuotaSetModelo(cuota)) : [];
    }
    }