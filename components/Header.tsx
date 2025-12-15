import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center gap-6">
        <div className="flex-shrink-0">
          <img 
            src="https://img2.pic.in.th/pic/-removebg-previewfac8301a24095f66.png" 
            alt="School Logo" 
            className="h-24 md:h-32 w-auto object-contain drop-shadow-sm hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            ระบบเก็บเงินค่ารูป ติด ปพ. และรูปรุ่น
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mt-2">
            นักเรียน ห้อง ม.3/7 ปีการศึกษา 2/2568
          </h2>
        </div>
      </div>
    </header>
  );
};

export default Header;