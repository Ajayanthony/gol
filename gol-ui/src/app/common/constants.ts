export const GoalPriorities = [
  { text: 'High', value: 'high', desc: '(Ugliest Frog)' },
  { text: 'Medium', value: 'medium', desc: '(Ugly Frog)' },
  { text: 'Low', value: 'low', desc: '(Do last)' },
];

export const PriorityIcons = new Map()
  .set('high', 'assets/images/high_three.png')
  .set('medium', 'assets/images/normal.png')
  .set('low', 'assets/images/low.png');

export const GoalTypes = [
  {
    text: 'Professional',
    value: 'professional',
    desc: '',
    icon: 'laptop_chromebook',
    icon_class: 'professional',
  },
  {
    text: 'Health',
    value: 'health',
    desc: '',
    icon: 'favorite',
    icon_class: 'health',
  },
  {
    text: 'Self Improvement',
    value: 'selfImprovement',
    desc: '',
    icon: 'self_improvement',
    icon_class: 'self-improvement',
  },
  {
    text: 'Personal/Family',
    value: 'personal',
    desc: '',
    icon: 'family_restroom',
    icon_class: 'personal',
  },
  {
    text: 'Financial',
    value: 'financial',
    desc: '',
    icon: 'credit_card',
    icon_class: 'financial',
  },
];

export const GoalStatuses = [
  { value: 'in_progress', text: 'In Progress', icon: 'double_arrow', desc: '' },
  { value: 'success', text: 'Success', icon: 'done', desc: '' },
  { value: 'failure', text: 'Failure', icon: 'close', desc: '' },
];

export const API_URL = '/api/v1/';

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
  {
    text: 'Professional',
    value: 'career',
    icon: 'laptop_chromebook',
    icon_class: 'professional',
  },
  {
    text: 'Health',
    value: 'health',
    icon: 'favorite',
    icon_class: 'health',
  },
  {
    text: 'Self Improvement',
    value: 'selfImprovement',
    icon: 'self_improvement',
    icon_class: 'self-improvement',
  },
  {
    text: 'Financial',
    value: 'financial',
    icon: 'credit_card',
    icon_class: 'financial',
  },
  {
    text: 'Personal/Family',
    value: 'personal',
    icon: 'family_restroom',
    icon_class: 'personal',
  },
];

export const LtgSortFields = ['priority', 'type'];

export const ltgDateFormat = 'YYYY-MM-DDTHH:mm:ss';
