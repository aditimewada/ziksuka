import { QuizConfig } from './quiz-config';
import { Question } from './question';

export class Quiz {
    id: number;
    test_name: string;
    description: string;
    max_score: number;
    config: QuizConfig;
    questions: Question[];

    constructor(data: any) {
        if (data) {
            this.id = data.id;
            this.test_name = data.test_name;
            this.description = data.description;
            this.max_score = data.max_score;
            this.config = new QuizConfig(data.config);
            this.questions = [];
            data.questions.forEach(q => {
                this.questions.push(new Question(q));
            });
        }
    }
}
