import { OptionPost } from './option';
import { QuestionType} from './question_type';
import {Imagee} from './image';

export class QuestionPost {
    id: number;
    question: string;
    question_image: Imagee;
    difficulty: number;
    question_class: number;
    question_subject: number;
    question_book: number;
    question_chapter: number;
    question_topic: number;
    question_subtopic: number;
    question_type: QuestionType;
    options:  OptionPost[];

}