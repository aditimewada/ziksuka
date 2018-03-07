import { Option } from './option';

export class Question {
    id: number;
    question: string;
    questionTypeId: number;
    options: Option[];
    answered: boolean;
    start_time: Date;
    end_time: Date;

    constructor(data: any) {
        data = data || {};
        this.id = data.id;
        this.question = data.question;
        this.questionTypeId = data.question_class;
        this.options = [];
        data.options.forEach(o => {
            this.options.push(new Option(o));
        });
    }
}
