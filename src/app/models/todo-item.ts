export interface TodoItem {
  id: string;
  name: string;
  project?: string;
  dueDate?: string;
  completed: boolean;
}
