import { GoogleGenerativeAI } from "@google/generative-ai";
import { Category } from "../types";
import { ETransactionType } from "../enums/transaction";

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY || "";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export interface ScanResult {
  amount: number;
  note: string;
  categoryId: number;
  type: ETransactionType;
}

export const analyzeReceipt = async (
  base64Image: string,
  categories: any[]
): Promise<ScanResult | null> => {
  if (!GEMINI_API_KEY) {
    throw new Error("Missing EXPO_PUBLIC_GEMINI_API_KEY in .env");
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const categoriesPrompt = categories
      .map((c) => `- ID: ${c.id}, Name: ${c.name}, Type: ${c.type}`)
      .join("\n");

    const prompt = `
      Bạn là một trợ lý ảo chuyên phân tích hóa đơn mua sắm/tiêu dùng. 
      Vui lòng trích xuất các thông tin sau từ hình ảnh hóa đơn:
      1. Tổng số tiền (amount): Trích xuất tổng số tiền phải thanh toán (chỉ trả về số, không chứa ký tự tiền tệ).
      2. Ghi chú (note): Trích xuất tên cửa hàng hoặc mô tả ngắn gọn về hóa đơn (VD: "Highland Coffee", "Siêu thị Co.opmart").
      3. Danh mục (categoryId) và Loại (type): Dựa vào nội dung hóa đơn, hãy chọn 1 danh mục phù hợp nhất từ danh sách sau:
      ${categoriesPrompt}

      Trả về KẾT QUẢ DUY NHẤT dưới dạng chuỗi JSON thuần túy (không có markdown \`\`\`json \`\`\`), với cấu trúc sau:
      {
        "amount": 50000,
        "note": "Tên cửa hàng hoặc nội dung",
        "categoryId": 1,
        "type": "EXPENSE"
      }
    `;

    // Chuẩn bị dữ liệu hình ảnh
    const imageParts = [
      {
        inlineData: {
          data: base64Image,
          mimeType: "image/jpeg",
        },
      },
    ];

    const result = await model.generateContent([prompt, ...imageParts]);
    const responseText = result.response.text();
    
    // Clean up potential markdown formatting in response
    const cleanJson = responseText.replace(/```json/gi, "").replace(/```/gi, "").trim();
    
    const parsedData: ScanResult = JSON.parse(cleanJson);
    return parsedData;
  } catch (error) {
    console.error("Error analyzing receipt:", error);
    throw error;
  }
};
