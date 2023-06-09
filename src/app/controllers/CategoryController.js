const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
  async index(request, response) {
    const categories = await CategoriesRepository.findAll();

    response.json(categories);
  }

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    if (await CategoriesRepository.findByName({ name })) {
      return response.status(400).json({ error: 'Name already in use' });
    }

    const newCategory = await CategoriesRepository.create({ name });

    response.json(newCategory);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    const categoryExistsById = await CategoriesRepository.findById(id);

    if (!categoryExistsById) {
      return response.status(404).json({ error: 'Category is not found' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Category name is required' });
    }

    const updatedCategory = await CategoriesRepository.update(id, { name });

    response.json(updatedCategory);
  }

  async delete(request, response) {
    const { id } = request.params;

    await CategoriesRepository.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new CategoryController();
