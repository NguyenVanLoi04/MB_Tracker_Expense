export interface IUserProfile {
  user_created_at: string;
  user_updated_at: string;
  user_deleted_at: string | null;
  user_version: number;
  user_id: number;
  user_name: string;
  user_user_name: string;
  user_pass_word: string;
  user_is_block: boolean;
  user_is_admin: boolean;
  categoryCount: string;
  transactionCount: string;
}
