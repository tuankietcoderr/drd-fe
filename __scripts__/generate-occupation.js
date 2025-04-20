const {faker} = require('@faker-js/faker');
const fs = require('fs');
const {resolve} = require('path');

function generateOccupations() {
  const occupations = [];
  let idCounter = 1;

  // Một số ngành nghề chính (ngành cha)
  const mainOccupations = [
    'Công nghệ thông tin',
    'Kế toán - Tài chính',
    'Marketing',
    'Sản xuất - Vận hành',
    'Xây dựng',
    'Y tế - Sức khỏe',
    'Giáo dục - Đào tạo',
    'Du lịch - Nhà hàng - Khách sạn',
    'Bán hàng - Kinh doanh',
    'Hành chính - Văn phòng',
    'Nhân sự',
    'Logistics - Vận tải',
    'Nghệ thuật - Thiết kế',
    'Bất động sản',
    'Ngân hàng - Chứng khoán',
    'Pháp lý - Luật',
    'Dịch vụ khách hàng',
    'Kỹ thuật - Công nghệ',
    'Nông nghiệp - Thủy sản',
    'Thương mại điện tử',
    'Truyền thông - Quảng cáo',
    'Thời trang - Làm đẹp',
    'Thể thao - Giải trí',
    'Ngành nghề khác',
  ];

  // Tạo ngành nghề cha
  mainOccupations.forEach(name => {
    occupations.push({
      id: idCounter,
      parent_id: 0,
      name: name,
      count: faker.number.int({min: 5, max: 100}),
    });
    idCounter++;
  });

  const parentCount = occupations.length;

  // Tạo ngành nghề con (2-4 ngành con mỗi ngành cha)
  for (let i = 1; i <= parentCount; i++) {
    const numChildren = faker.number.int({min: 2, max: 4});
    for (let j = 0; j < numChildren; j++) {
      occupations.push({
        id: idCounter,
        parent_id: i,
        name: faker.person.jobArea(),
        count: faker.number.int({min: 1, max: 50}),
      });
      idCounter++;
    }
  }

  return occupations;
}

// Generate and write to JSON
const occupations = generateOccupations();
fs.writeFileSync(
  resolve(__dirname, '../__data__/occupations.json'),
  JSON.stringify(occupations, null, 2),
);
console.log('Generated occupations.json with hierarchical data.');
