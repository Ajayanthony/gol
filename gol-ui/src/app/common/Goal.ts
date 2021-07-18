import { Moment } from "moment";

export interface IGoal {
    id?: string,
    goal_title: string,
    goal_description: string,
    created_date?: Moment,
    updated_date?: Moment,
    priority: string,
    goal_type: string,
    start_date?: Moment,
    actual_val?: number,
    target_val?: number,
    status: string,
    close_comment?: string,
}