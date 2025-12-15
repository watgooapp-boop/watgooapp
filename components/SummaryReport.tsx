import React from 'react';
import { Student, OrderMap, StudentOrder } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface SummaryReportProps {
  students: Student[];
  orders: OrderMap;
}

const SummaryReport: React.FC<SummaryReportProps> = ({ students, orders }) => {
  const totalStudents = students.length;
  
  // Calculate stats
  const paidCount = Object.keys(orders).length; // Assuming existence in orders map means "interacted/paid" for this simple logic, or check isPaid flag
  
  // Actually, let's filter specifically by the valid orders
  const validOrders = Object.values(orders) as StudentOrder[];
  const totalPaidAmount = validOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const paidStudentsCount = validOrders.length;
  const unpaidStudentsCount = totalStudents - paidStudentsCount;

  const data = [
    { name: 'ชำระแล้ว', value: paidStudentsCount },
    { name: 'ยังไม่ชำระ', value: unpaidStudentsCount },
  ];

  const COLORS = ['#10B981', '#EF4444']; // Emerald-500, Red-500

  // Find unpaid students
  const unpaidList = students.filter(s => !orders[s.id]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Stat Card 1: Total Money */}
      <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500">
        <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">ยอดเงินรวมทั้งหมด</h3>
        <p className="text-4xl font-bold text-gray-900 mt-2">฿{totalPaidAmount.toLocaleString()}</p>
        <p className="text-sm text-gray-400 mt-2">จากนักเรียน {paidStudentsCount} คน</p>
      </div>

      {/* Stat Card 2: Chart */}
      <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-purple-500 flex flex-col items-center justify-center">
        <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider w-full text-left mb-2">สถิติการชำระเงิน</h3>
        <div className="h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} คน`, 'จำนวน']} />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

       {/* Stat Card 3: Unpaid List Preview */}
       <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-red-500 flex flex-col h-full max-h-60">
        <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">
           ยังไม่ชำระ ({unpaidStudentsCount} คน)
        </h3>
        <div className="overflow-y-auto flex-1 pr-2">
            {unpaidList.length === 0 ? (
                <p className="text-green-500 font-semibold">ครบทุกคนแล้ว!</p>
            ) : (
                <ul className="space-y-1">
                    {unpaidList.map(s => (
                        <li key={s.id} className="text-sm text-gray-700 border-b border-gray-100 last:border-0 py-1">
                           <span className="font-semibold text-gray-500 w-6 inline-block">{s.no}.</span> 
                           {s.prefix}{s.name} {s.surname}
                        </li>
                    ))}
                </ul>
            )}
        </div>
      </div>
    </div>
  );
};

export default SummaryReport;