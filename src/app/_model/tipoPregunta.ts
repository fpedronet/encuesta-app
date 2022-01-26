export class TipoPregunta {
    constructor(_nIdTipo?: number, _cDescripcion?: string) {
        this.nIdTipo = _nIdTipo;
        this.cDescripcion = _cDescripcion;
    }
    nIdTipo?: number;
    cDescripcion?: string;
}