import { Moment } from 'moment';

export interface LtGoal {
  _id?: string;
  goal_title: string;
  description: string;
  outcome: string;
  obstacles: string;
  plan: string;
  created_date: Moment;
  updated_date: Moment;
  priority: string;
  goal_type: string;
  is_long_term: boolean;
  target_date: Moment;
  total_parts?: number;
  completed_parts?: number;
  is_deleted?: boolean;
  closing_comment?: string;
}
