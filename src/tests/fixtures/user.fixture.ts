import faker from 'faker'

const password = 'superpassword'

export const user = {
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  email: faker.internet.email(),
  password
}
