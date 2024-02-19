import { Request, Response } from 'express';

import errorM from './errorM';

export async function storeObject(
  req: Request,
  res: Response,
  model: any
): Promise<void> {
  try {
    const newModelObject = await model.create(req.body);
    res.status(200).json(newModelObject);
  } catch (e: any) {
    res.status(400).json({
        errors: e.errors?.map((err: any) => err.message) || [{ message: e.message }],
    });
  }
}

export async function removeObject(
  req: Request,
  res: Response,
  model: any
): Promise<any> {
  try {
    const id = req.params.id;
    if (!id) return res.status(401).json(errorM('ID não enviado'));

    const modelObject = await model.findByPk(id);
    if (!modelObject) return res.status(404).json(errorM('User não encontrado' ));
    await modelObject.destroy();
    res.status(200).json(modelObject);
  } catch (e: any) {
    res.status(400).json({
        errors: e.errors?.map((err: any) => err.message) || [{ message: e.message }],
    });
  }
}

export async function updateObject(
  req: Request,
  res: Response,
  model: any,
  id: Number
): Promise<any> {
  try {
    const oldModelObject = await model.findByPk(id);
    if (!oldModelObject) return res.status(404).json(errorM('User não encontrado'));

    const newModelObject = await oldModelObject.update(req.body);
    res.status(200).json(newModelObject);
  } catch (e: any) {
    res.status(400).json({
        errors: e.errors?.map((err: any) => err.message) || [{ message: e.message }],
    });
  }
}


interface IncludeObject {
  model: any;
  attributes: string[];
}
type Include = IncludeObject[] | null;

export async function showObject(
  req: Request,
  res: Response,
  model: any,
  include?: Include
): Promise<any> {
  try {
    const id = req.params.id
    if (!id) return res.status(401).json(errorM('ID nao enviado'))
    
    const modelObject = await model.findByPk(id, {include: include})
    if (!modelObject) return res.status(404).json(errorM('Model não encontrado'))
    res.status(200).json(modelObject)
  } catch (e: any) {
    res.status(400).json({
      errors: e.errors.map((err: any) => err.message)
    })
  }
}