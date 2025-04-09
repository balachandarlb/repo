export interface ChargePointData {
    id: string;
    serialNumber: string;
}

export default class ChargePointModel{
    private _id:string='qyweuiouyq12iuhinw';
    private _serialNumber:string='8521469';

    get id(){
        return this._id;
    }

    get serialNumber(){
        return this._serialNumber;
    }

    setID(id:string){
        this._id = id;
        return this;
    }

    setSerialNumber(serialNumber:string){
        this._serialNumber = serialNumber;
        return this;
    }

    toJSON(): ChargePointData {    
        return {
            id: this.id,
            serialNumber: this.serialNumber
        };
    }
}