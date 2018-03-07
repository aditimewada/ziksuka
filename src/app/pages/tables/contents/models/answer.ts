import {QuestAnswered} from './quest_answered';
export class Answer {
    student_id: number;
    na_test_id: number;
    a_test_id: number;
    s_test_id: number;
    test_start_time: Date;
    test_end_time: Date;
    total_score: number;
    answer: QuestAnswered[];
}