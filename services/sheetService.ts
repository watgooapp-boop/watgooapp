import { OrderMap, StudentOrder } from '../types';

// TODO: นำ URL ที่ได้จากการ Deploy Google Apps Script มาวางตรงนี้
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxoGqFarp0-w2hWsPg2ls6QxJA1qo4UqISx0ZTRFQJTjrVRus9XaAdLGB9ZHl7CwNZrLA/exec';

export const SheetService = {
  getOrders: async (): Promise<OrderMap> => {
    // กรณีที่ยังไม่ได้ใส่ URL หรือ URL ไม่ถูกต้อง จะใช้ LocalStorage ชั่วคราวเพื่อให้แอปไม่พัง
    if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes('PASTE_YOUR')) {
      console.warn("Google Script URL is not configured. Falling back to local storage.");
      const data = localStorage.getItem('student_photo_orders_2568');
      return data ? JSON.parse(data) : {};
    }

    try {
      const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=getOrders`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      return {};
    }
  },

  saveOrder: async (order: StudentOrder): Promise<void> => {
    if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes('PASTE_YOUR')) {
        const currentDataString = localStorage.getItem('student_photo_orders_2568');
        const currentData: OrderMap = currentDataString ? JSON.parse(currentDataString) : {};
        currentData[order.studentId] = order;
        localStorage.setItem('student_photo_orders_2568', JSON.stringify(currentData));
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return;
    }

    // ใช้ fetch แบบ POST ส่งข้อมูล JSON
    // ต้องใช้ Content-Type: text/plain เพื่อหลีกเลี่ยง CORS Preflight ในบางกรณีของ GAS
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8', 
      },
      body: JSON.stringify({
        action: 'saveOrder',
        data: order
      })
    });
    
    const result = await response.json();
    if (result.status !== 'success') {
        throw new Error(result.message || 'Failed to save');
    }
  },

  deleteOrder: async (studentId: string): Promise<void> => {
    if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes('PASTE_YOUR')) {
        const currentDataString = localStorage.getItem('student_photo_orders_2568');
        if (currentDataString) {
            const currentData: OrderMap = JSON.parse(currentDataString);
            if (currentData[studentId]) {
                delete currentData[studentId];
                localStorage.setItem('student_photo_orders_2568', JSON.stringify(currentData));
            }
        }
        await new Promise(resolve => setTimeout(resolve, 500));
        return;
    }

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({
        action: 'deleteOrder',
        studentId: studentId
      })
    });

    const result = await response.json();
    if (result.status !== 'success') {
        throw new Error(result.message || 'Failed to delete');
    }
  },

  clearAll: async (): Promise<void> => {
     // ฟังก์ชันนี้ไม่ได้ถูกเรียกใช้ใน UI หลัก แต่ใส่ไว้ตาม Structure เดิม
  }
};