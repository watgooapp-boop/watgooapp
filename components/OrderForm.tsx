import React, { useState, useEffect } from 'react';
import { Student, OrderItem, StudentOrder } from '../types';
import { PRODUCTS } from '../constants';
import Swal from 'sweetalert2';

interface OrderFormProps {
  student: Student;
  existingOrder?: StudentOrder;
  onSave: (order: StudentOrder) => Promise<void>;
  onClear: (studentId: string) => Promise<void>;
  onCancel: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ student, existingOrder, onSave, onClear, onCancel }) => {
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  
  useEffect(() => {
    if (existingOrder) {
      setSelectedProductIds(existingOrder.selectedItems);
    } else {
      setSelectedProductIds([]);
    }
  }, [existingOrder]);

  const toggleProduct = (productId: string) => {
    setSelectedProductIds(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const calculateTotal = () => {
    return selectedProductIds.reduce((sum, id) => {
      const product = PRODUCTS.find(p => p.id === id);
      return sum + (product ? product.price : 0);
    }, 0);
  };

  const handleSave = async () => {
    if (selectedProductIds.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'ยังไม่ได้เลือกรายการ',
        text: 'กรุณาเลือกรายการอย่างน้อย 1 รายการ หรือกด "ยกเลิก"',
        confirmButtonColor: '#1e40af',
      });
      return;
    }

    const total = calculateTotal();
    const order: StudentOrder = {
      studentId: student.id,
      selectedItems: selectedProductIds,
      totalAmount: total,
      isPaid: true, // Assuming saving means paid/recorded as per requirements context
      timestamp: new Date().toISOString()
    };

    // Show loading
    Swal.fire({
      title: 'กำลังบันทึกข้อมูล...',
      text: 'กรุณารอสักครู่',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      await onSave(order);
      Swal.fire({
        icon: 'success',
        title: 'บันทึกสำเร็จ',
        text: `ยอดชำระ ${total} บาท`,
        timer: 1500,
        showConfirmButton: false
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: 'ไม่สามารถบันทึกข้อมูลได้',
      });
    }
  };

  const handleClear = async () => {
    Swal.fire({
        title: 'ยืนยันการลบข้อมูล?',
        text: "ข้อมูลการชำระเงินของนักเรียนคนนี้จะถูกลบออกจากระบบ (Sheet)",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'ใช่, ลบข้อมูล',
        cancelButtonText: 'ยกเลิก'
      }).then(async (result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'กำลังลบข้อมูล...',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            try {
                await onClear(student.id);
                Swal.fire(
                    'ลบสำเร็จ!',
                    'ข้อมูลถูกลบเรียบร้อยแล้ว',
                    'success'
                );
            } catch (err) {
                 Swal.fire('Error', 'ไม่สามารถลบข้อมูลได้', 'error');
            }
        }
      })
  };

  const total = calculateTotal();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-fade-in-up">
        <div className="bg-primary px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl text-white font-bold">บันทึกข้อมูล: {student.prefix}{student.name} {student.surname}</h2>
          <button onClick={onCancel} className="text-white hover:text-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4">
             <div className="flex items-center space-x-2 text-gray-700 mb-2">
                <span className="font-bold">รหัสประจำตัว:</span>
                <span>{student.id}</span>
             </div>
             <div className="flex items-center space-x-2 text-gray-700">
                <span className="font-bold">เลขที่:</span>
                <span>{student.no}</span>
             </div>
          </div>

          <hr className="my-4 border-gray-200" />

          <h3 className="font-bold text-lg mb-3 text-gray-800">เลือกรายการ (เลือกได้มากกว่า 1)</h3>
          
          <div className="space-y-4">
            {/* Individual Photos */}
            <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">รูปเดี่ยว (60 บาท)</h4>
                {PRODUCTS.filter(p => p.category === 'individual').map(product => (
                    <label key={product.id} className="flex items-start space-x-3 p-2 hover:bg-blue-100 rounded cursor-pointer transition">
                        <input 
                            type="checkbox" 
                            className="mt-1 h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                            checked={selectedProductIds.includes(product.id)}
                            onChange={() => toggleProduct(product.id)}
                        />
                        <div>
                            <span className="font-medium text-gray-900 block">{product.name}</span>
                            <span className="text-sm text-gray-500">{product.description}</span>
                        </div>
                        <div className="ml-auto font-bold text-gray-700">฿{product.price}</div>
                    </label>
                ))}
            </div>

            {/* Group Photos */}
            <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">รูปหมู่</h4>
                {PRODUCTS.filter(p => p.category === 'group').map(product => (
                    <label key={product.id} className="flex items-start space-x-3 p-2 hover:bg-purple-100 rounded cursor-pointer transition">
                        <input 
                            type="checkbox" 
                            className="mt-1 h-5 w-5 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                            checked={selectedProductIds.includes(product.id)}
                            onChange={() => toggleProduct(product.id)}
                        />
                         <div>
                            <span className="font-medium text-gray-900 block">{product.name}</span>
                            <span className="text-sm text-gray-500">{product.description}</span>
                        </div>
                        <div className="ml-auto font-bold text-gray-700">฿{product.price}</div>
                    </label>
                ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center bg-gray-100 p-4 rounded-lg">
            <span className="text-lg font-bold text-gray-700">ยอดสุทธิที่ต้องชำระ</span>
            <span className="text-3xl font-bold text-primary">฿{total}</span>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row justify-between gap-3">
          {existingOrder ? (
              <button 
                onClick={handleClear}
                className="w-full sm:w-auto px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition font-medium flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                เคลียร์ข้อมูล (ลบ)
              </button>
          ) : (
             <div className="hidden sm:block"></div> 
          )}
          
          <div className="flex gap-3 w-full sm:w-auto">
            <button 
                onClick={onCancel}
                className="w-full sm:w-auto px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition font-medium"
            >
                ยกเลิก
            </button>
            <button 
                onClick={handleSave}
                className="w-full sm:w-auto px-6 py-2 bg-primary hover:bg-blue-700 text-white rounded-lg transition font-bold shadow-lg transform active:scale-95"
            >
                บันทึกการชำระ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;