import { Student, OrderItem } from './types';

export const STUDENTS: Student[] = [
  { no: 1, id: "24388", prefix: "ด.ช.", name: "ธีรภัทร", surname: "คำวงษา" },
  { no: 2, id: "24398", prefix: "ด.ช.", name: "อนุรักษ์", surname: "กังวนงาน" },
  { no: 3, id: "24503", prefix: "ด.ช.", name: "กฤตเมธ", surname: "รอดเจริญ" },
  { no: 4, id: "24504", prefix: "ด.ช.", name: "คุณาวิชญ์", surname: "ดวงแก้ว" },
  { no: 5, id: "24505", prefix: "ด.ช.", name: "ชวรัตน์", surname: "แซ่คิ้ว" },
  { no: 6, id: "24506", prefix: "ด.ช.", name: "ชัยวิวัฒน์", surname: "กะตะศิลา" },
  { no: 7, id: "24508", prefix: "ด.ช.", name: "ณัฐพงษ์", surname: "ทองแดง" },
  { no: 8, id: "24509", prefix: "ด.ช.", name: "ดุลยวฤทธิ์", surname: "คำภีระ" },
  { no: 9, id: "24511", prefix: "ด.ช.", name: "ธีรภัทร", surname: "สัจจสังข์" },
  { no: 10, id: "24512", prefix: "ด.ช.", name: "วรภพ", surname: "เจิมสุวรรณ์" },
  { no: 11, id: "24513", prefix: "ด.ช.", name: "พงศ์พิพัฒน์", surname: "ฮาดวิเศษ" },
  { no: 12, id: "24514", prefix: "ด.ช.", name: "พิชยดนย์", surname: "สะท้านถิ่น" },
  { no: 13, id: "24516", prefix: "ด.ช.", name: "ภูริภัทร", surname: "กรองนอก" },
  { no: 14, id: "24517", prefix: "ด.ช.", name: "วัชรพงษ์", surname: "พิทักษ์เชื้อ" },
  { no: 15, id: "24518", prefix: "ด.ช.", name: "วัชรากร", surname: "ต่างสมบูรณ์" },
  { no: 16, id: "24519", prefix: "ด.ช.", name: "อดิศร", surname: "ชมโคกสูง" },
  { no: 17, id: "24520", prefix: "ด.ช.", name: "อดิศักดิ์", surname: "ครองเคหัง" },
  { no: 18, id: "24521", prefix: "ด.ช.", name: "อาณา", surname: "สุภี" },
  { no: 19, id: "24436", prefix: "ด.ญ.", name: "กัญญาณัฐ", surname: "คณาภักดิ์" },
  { no: 20, id: "24404", prefix: "ด.ญ.", name: "จิรฉัตร", surname: "กุลแก้ว" },
  { no: 21, id: "24405", prefix: "ด.ญ.", name: "จรุจิต", surname: "คนเพียร" },
  { no: 22, id: "24414", prefix: "ด.ญ.", name: "พีรดา", surname: "แก้ววงษ์ศรี" },
  { no: 23, id: "24418", prefix: "ด.ญ.", name: "วรรณวิภา", surname: "สุวรรณปาล" },
  { no: 24, id: "24523", prefix: "ด.ญ.", name: "กรกาญ", surname: "เมามีจันทร์" },
  { no: 25, id: "24526", prefix: "ด.ญ.", name: "จริญญา", surname: "วงชาลี" },
  { no: 26, id: "24527", prefix: "ด.ญ.", name: "ฉัตราภรณ์", surname: "ต่อชัยภูมิ" },
  { no: 27, id: "24528", prefix: "ด.ญ.", name: "ชมภูนุช", surname: "ปลั่งกลาง" },
  { no: 28, id: "24530", prefix: "ด.ญ.", name: "ญาณาธร", surname: "ดวงชมภู" },
  { no: 29, id: "24534", prefix: "ด.ญ.", name: "ธวัลรัตน์", surname: "มงคลปทุมมาวดี" },
  { no: 30, id: "24536", prefix: "ด.ญ.", name: "นภัสปภา", surname: "คะดุน" },
  { no: 31, id: "24537", prefix: "ด.ญ.", name: "นภัสสร", surname: "เพียรหาผล" },
  { no: 32, id: "24539", prefix: "ด.ญ.", name: "นิติยาพร", surname: "สิทธิพรมมา" },
  { no: 33, id: "24540", prefix: "ด.ญ.", name: "ประภัสสร", surname: "บุญยัง" },
  { no: 34, id: "24542", prefix: "ด.ญ.", name: "ภัทรวดี", surname: "ชาเนตร" },
  { no: 35, id: "25680", prefix: "ด.ญ.", name: "ขวัญมณี", surname: "ศรีสะพุง" },
  { no: 36, id: "26388", prefix: "ด.ช.", name: "กฤติพงศ์", surname: "คำสีทา" },
];

export const PRODUCTS: OrderItem[] = [
  {
    id: 'indiv_set1',
    name: 'รูปเดี่ยว เซตที่ 1',
    description: 'ขนาด 1.5 นิ้ว จำนวน 3 โหล',
    price: 60,
    category: 'individual'
  },
  {
    id: 'indiv_set2',
    name: 'รูปเดี่ยว เซตที่ 2',
    description: 'ขนาด 1.5 นิ้ว (2 โหล) + 1.5 นิ้ว (1 โหล)',
    price: 60,
    category: 'individual'
  },
  {
    id: 'group_set1',
    name: 'รูปหมู่ เซตที่ 1',
    description: 'ขนาด 8x12 นิ้ว จำนวน 1 กรอบ',
    price: 290,
    category: 'group'
  },
  {
    id: 'group_set2',
    name: 'รูปหมู่ เซตที่ 2',
    description: 'ขนาด 10x15 นิ้ว จำนวน 1 กรอบ',
    price: 390,
    category: 'group'
  }
];