const errorM = require('./errorM');

async function storeObject(req, res, model) {
  try {
    const newModelObject = await model.create(req.body);
    res.status(200).json(newModelObject);
  } catch (e) {
    res.status(400).json({
      errors: e.errors?.map((err) => err.message) || [{ message: e.message }],
    });
  }
}

async function removeObject(req, res, model) {
  try {
    const id = req.params.id;
    if (!id) return res.status(401).json(errorM('ID não enviado'));

    const modelObject = await model.findByPk(id);
    if (!modelObject) return res.status(404).json(errorM('User não encontrado'));
    await modelObject.destroy();
    res.status(200).json(modelObject);
  } catch (e) {
    res.status(400).json({
      errors: e.errors?.map((err) => err.message) || [{ message: e.message }],
    });
  }
}

async function updateObject(req, res, model, id) {
  try {
    const oldModelObject = await model.findByPk(id);
    if (!oldModelObject) return res.status(404).json(errorM('User não encontrado'));

    const newModelObject = await oldModelObject.update(req.body);
    res.status(200).json(newModelObject);
  } catch (e) {
    res.status(400).json({
      errors: e.errors?.map((err) => err.message) || [{ message: e.message }],
    });
  }
}

async function showObject(req, res, model, include) {
  try {
    const id = req.params.id;
    if (!id) return res.status(401).json(errorM('ID nao enviado'));

    const modelObject = await model.findByPk(id, { include });
    if (!modelObject) return res.status(404).json(errorM('Model não encontrado'));
    res.status(200).json(modelObject);
  } catch (e) {
    res.status(400).json({
      errors: e.errors.map((err) => err.message),
    });
  }
}

module.exports = {
  storeObject,
  removeObject,
  updateObject,
  showObject,
};
