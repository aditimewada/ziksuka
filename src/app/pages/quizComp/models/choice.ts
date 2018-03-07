import {Select} from '../models/select';
export class Choice {
    choice: Select[];
      constructor(data: string[]) {

        data = data || [];
        this.choice = [];
        data.forEach(o => {this.choice.push(new Select(o));
        });
}
}