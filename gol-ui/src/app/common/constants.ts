export const GoalPriorities = [
  { text: 'High', value: 'high', desc: '(Ugliest Frog)' },
  { text: 'Medium', value: 'medium', desc: '(Ugly Frog)' },
  { text: 'Low', value: 'low', desc: '(Do last)' },
];

export const GoalTypes = [
  { text: 'Professional', value: 'professional', desc: '' },
  { text: 'Health', value: 'health', desc: '' },
  { text: 'Self Improvement', value: 'selfImprovement', desc: '' },
  { text: 'Personal/Family', value: 'personal', desc: '' },
  { text: 'Financial', value: 'financial', desc: '' },
];

export const GoalStatuses = [
  { value: 'in_progress', text: 'In Progress', icon: 'double_arrow', desc: '' },
  { value: 'success', text: 'Success', icon: 'done', desc: '' },
  { value: 'failure', text: 'Failure', icon: 'close', desc: '' },
];

export const API_URL = 'http://localhost:8000/api/v1/';

export const Intervals = [
  {
    value: 'daily',
    text: 'Daily',
    desc: 'Daily Goals',
    baseUrl: API_URL + 'dailygoal/',
  },
  {
    value: 'weekly',
    text: 'Weekly',
    desc: 'Weekly Goals',
    baseUrl: API_URL + 'weeklygoal/',
  },
  {
    value: 'monthly',
    text: 'Monthly',
    desc: 'Monthly Goals',
    baseUrl: API_URL + 'monthlygoal/',
  },
];

export const SortFields = ['priority', 'status', 'type'];

//LTG Related Below//

export const LtgHomeTabs = [
  {
    value: 'current',
    text: 'Current',
    desc: 'Current Long term goals',
  },
  {
    value: 'successful',
    text: 'Completed',
    desc: 'Successful Long term goals',
  },
  {
    value: 'failed',
    text: 'Failed',
    desc: 'Failed Long term goals',
  },
  {
    value: 'archived',
    text: 'Archived/Infeasible',
    desc: 'Archived/Infeasible/On-hold goals',
  },
];

export const LtgType = [
  { value: 'career', text: 'Career' },
  { value: 'personal', text: 'Personal' },
];

export const LtgSortFields = ['priority', 'type'];

export const ltgDateFormat = 'YYYY-MM-DDTHH:mm:ss';