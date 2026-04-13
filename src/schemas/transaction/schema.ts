import { z } from "zod";
import { ETransactionType } from "../../enums/transaction";

export const transactionSchema = z.object({
  type: z.nativeEnum(ETransactionType),
  amount: z.string().min(1, "Vui lòng nhập số tiền"),
  categoryId: z.number().min(1, "Vui lòng chọn danh mục"),
  note: z.string(),
});
