const { v4 } = require('uuid');

const contacts = [
  {
    id: v4(),
    name: 'Jefferson Melo',
    email: 'jefferson.mello8@hotmail.com',
    phone: '85988776655',
    category_id: v4(),
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
