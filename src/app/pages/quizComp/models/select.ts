import {Choice} from '../models/choice';

export class Select{
    choice: string;
    selected: boolean;

    constructor(data: any) {
        data = data || {};
        this.choice = data;
    }
}