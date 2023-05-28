const { uuid } = require('uuidv4');

const contacts = [
  {
    id: uuid(),
    name: 'Jefferson Melo',
    email: 'jefferson.mello8@hotmail.com',
    phone: '85988776655',
    category_id: uuid(),
  },
];

class ContactsRepository {
  findAll() {
    return new Promise((resolve) => {
      resolve(contacts);
    });
  }
}

module.exports = new ContactsRepository();
