import {IContact} from "../types/types";

export default class ServiceStore {

    _inputsValue: IContact | object

    constructor() {
        this._inputsValue = {}
    }

    setInputsValue(value: IContact){
        return this._inputsValue = value
    }

    deleteInputValue(){
        this._inputsValue = {}
    }

    get InputsValue(){
        return this._inputsValue;
    }
}