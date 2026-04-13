export interface ICategory {
  id: number;
  name: string;
  priority: number | null;
  status: string;
  color: string;
  icon: string;
  isDefault: boolean;
  type: string;
}
