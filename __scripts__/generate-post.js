const {faker} = require('@faker-js/faker');
const fs = require('fs');
const {resolve} = require('path');

function generatePost(id) {
  const title = faker.person.jobTitle();
  const salary = parseFloat(faker.finance.amount(3, 30, 0)) * 30000; // Giả sử lương là từ 3 triệu đến 30 triệu
  const minSalary = parseFloat((salary * 0.8).toFixed(0));
  const maxSalary = parseFloat((salary * 1.2).toFixed(0));

  return {
    id: id,
    recruiter_id: faker.number.int({min: 1, max: 100}),
    created_at: faker.date.past(),
    updated_at: faker.date.recent(),
    views: faker.number.int({min: 0, max: 100000}),
    applicants: faker.number.int({min: 0, max: 1000}),
    title: title,
    total_quantity: faker.number.int({min: 0, max: 1000}),
    male_quantity: faker.number.int({min: 0, max: 1000}),
    female_quantity: faker.number.int({min: 0, max: 1000}),
    description: faker.lorem.paragraph(),
    benefit: faker.lorem.sentence(),
    health_condition_requirement: faker.lorem.sentence(),
    disability_requirement: faker.lorem.sentence(),
    education_level: faker.number.int({min: 0, max: 5}), // Ví dụ: 0 - Không yêu cầu, 1 - THCS, 2 - THPT, 3 - CĐ, 4 - ĐH, 5 - Cao học
    professional_level: faker.person.jobType(),
    working_time: `${faker.number.int({min: 6, max: 12})} tiếng/ngày`,
    salary: salary,
    min_salary: minSalary,
    max_salary: maxSalary,
    type: faker.helpers.arrayElement([
      'Toàn thời gian',
      'Bán thời gian',
      'Thực tập',
      'Remote',
    ]),
    status: faker.datatype.boolean(),
  };
}

function generatePosts(count = 10) {
  const posts = [];
  for (let i = 1; i <= count; i++) {
    posts.push(generatePost(i));
  }
  return posts;
}

// Tạo và lưu ra file JSON
const data = generatePosts(50); // Generate 50 post

fs.writeFileSync(
  resolve(__dirname, '../__data__/posts.json'),
  JSON.stringify(data, null, 2),
);
console.log('Generated posts.json with 50 posts.');
