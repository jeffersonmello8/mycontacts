const { v4 } = require('uuid');

const db = require('../../database');

let contacts = [
  {
    id: v4(),
    name: 'Jefferson Melo',
    email: 'jefferson.mello8@hotmail.com',
    phone: '85988776655',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'Marcelo Paz',
    email: 'marcelo.paz@hotmail.com',
    phone: '85988774455',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'Gilberto Gil',
    email: 'gil.gil@yahoo.com.br',
    phone: '85988774433',
    category_id: v4(),
  },
];

class ContactsRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`SELECT * FROM contacts ORDER BY name ${direction}`);
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(
      'SELECT * FROM contacts WHERE id = $1',
      [id],
    );

    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query(
      'SELECT * FROM contacts WHERE email = $1',
      [email],
    );

    return row;
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }

  async create({
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(
      `
      INSERT INTO contacts(name, email, phone, category_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [name, email, phone, category_id],
    );

    return row;
  }

  update(id, {
    name, email, phone, category_id,
  }) {
    return new Promise((resolve) => {
      const updatedContact = {
        id,
        name,
        email,
        phone,
        category_id,
      };

      contacts = contacts.map((contact) => (
        contact.id === id ? updatedContact : contact
      ));

      resolve(updatedContact);
    });
  }
}

module.exports = new ContactsRepository();
