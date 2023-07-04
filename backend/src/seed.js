const faker = require('@faker-js/faker/locale/vi').faker;

let firstName = faker.person.firstName();
let lastName = faker.person.lastName();

let jobTitle = faker.person.jobTitle();
let prefix = faker.person.prefix(); 
let suffix = faker.person.suffix();
let jobArea = faker.person.jobArea();
let phone = faker.phone.number();

console.log(`Employee: ${prefix} ${firstName} ${lastName} ${suffix}`);
console.log(`Job title: ${jobTitle}`);
console.log(`Job area: ${jobArea}`);
console.log(`Phone: ${phone}`);
console.log(faker.lorem.text());