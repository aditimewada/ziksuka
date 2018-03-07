export class Option {
    id: number;
    questionId: number;
    option_text: string;
    isAnswer: boolean;
    selected: boolean;

    constructor(data: any) {
        data = data || {};
        this.id = data.id;
        this.questionId = data.question;
        this.option_text = data.option_text;
        this.isAnswer = data.isAnswer;
    }
}
