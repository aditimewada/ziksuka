import { Option } from './option';

export class Question {
    id: number;
    question: string;
    questionTypeId: number;
    options: Option[];
    answered: boolean;
    start_time: Date;
    end_time: Date;
    difficulty: number;

    constructor(data: any) {
        data = data || {};
        this.id = data.id;
        this.question = data.question;
        this.questionTypeId = data.question_class;
        this.options = [];
        this.difficulty = data.difficulty;
        data.options.forEach(o => {
            this.options.push(new Option(o));
        });
    }
}
