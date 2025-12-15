import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SummaryReport from './components/SummaryReport';
import OrderForm from './components/OrderForm';
import { STUDENTS, PRODUCTS } from './constants';
import { SheetService } from './services/sheetService';
import { OrderMap, Student, StudentOrder } from './types';
import Swal from 'sweetalert2';

const App: React.FC = () => {
  const [orders, setOrders] = useState<OrderMap>({});
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await SheetService.getOrders();
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch data", error);
      Swal.fire('Error', 'ไม่สามารถโหลดข้อมูลได้', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStudentClick = (student: Student) => {
    setSelectedStudent(student);
  };

  const handleCloseForm = () => {
    setSelectedStudent(null);
  };

  const handleSaveOrder = async (order: StudentOrder) => {
    try {
      await SheetService.saveOrder(order);
      // Optimistic update or refetch
      setOrders(prev => ({
        ...prev,
        [order.studentId]: order
      }));
      handleCloseForm();
    } catch (error) {
      throw error; // Let the form handle the error UI
    }
  };

  const handleClearOrder = async (studentId: string) => {
    try {
      await SheetService.deleteOrder(studentId);
      setOrders(prev => {
        const newOrders = { ...prev };
        delete newOrders[studentId];
        return newOrders;
      });
      handleCloseForm();
    } catch (error) {
        throw error;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8 flex-grow">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
          </div>
        ) : (
          <>
            <SummaryReport students={STUDENTS} orders={orders} />

            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
              <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  รายชื่อนักเรียน ({STUDENTS.length} คน)
                </h2>
                <div className="text-sm text-gray-500">
                  คลิกที่ชื่อเพื่อบันทึก/แก้ไขข้อมูล
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-center w-16">เลขที่</th>
                      <th className="py-3 px-6 text-center w-24">รหัสนักเรียน</th>
                      <th className="py-3 px-6">ชื่อ - สกุล</th>
                      <th className="py-3 px-6 text-center">สถานะ</th>
                      <th className="py-3 px-6 text-right">ยอดชำระ</th>
                      <th className="py-3 px-6 text-center">จัดการ</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700 text-sm">
                    {STUDENTS.map((student) => {
                      const order = orders[student.id];
                      const isPaid = !!order;
                      
                      return (
                        <tr 
                          key={student.id} 
                          className={`border-b border-gray-100 hover:bg-blue-50 transition cursor-pointer ${isPaid ? 'bg-green-50/30' : ''}`}
                          onClick={() => handleStudentClick(student)}
                        >
                          <td className="py-3 px-6 text-center font-medium">{student.no}</td>
                          <td className="py-3 px-6 text-center">{student.id}</td>
                          <td className="py-3 px-6 font-medium text-gray-900">
                            {student.prefix}{student.name} {student.surname}
                          </td>
                          <td className="py-3 px-6 text-center">
                            {isPaid ? (
                              <span className="bg-green-100 text-green-800 py-1 px-3 rounded-full text-xs font-bold shadow-sm border border-green-200">
                                ชำระแล้ว
                              </span>
                            ) : (
                              <span className="bg-red-100 text-red-800 py-1 px-3 rounded-full text-xs font-bold shadow-sm border border-red-200">
                                ยังไม่จ่าย
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-6 text-right font-bold text-gray-800">
                            {isPaid ? `฿${order.totalAmount}` : '-'}
                          </td>
                          <td className="py-3 px-6 text-center">
                            <button className="text-primary hover:text-blue-900 font-semibold text-xs border border-primary px-3 py-1 rounded hover:bg-blue-100 transition">
                                {isPaid ? 'แก้ไข' : 'บันทึก'}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </main>

      {selectedStudent && (
        <OrderForm 
          student={selectedStudent}
          existingOrder={orders[selectedStudent.id]}
          onSave={handleSaveOrder}
          onClear={handleClearOrder}
          onCancel={handleCloseForm}
        />
      )}

      <Footer />
    </div>
  );
};

export default App;