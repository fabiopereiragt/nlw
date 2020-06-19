import { Request, Response } from 'express';
import knex from '../database/connection';


export default class PointsController {

  async index(request: Request, response: Response) {
    const { city, uf, items } = request.query;

    const parsedItems = String(items)
      .split(',')
      .map(item => Number(item.trim()));

    const points = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*');

      const serializedPoints = points.map((point) => {
        return {
          ...point,
          image_url: `http://localhost:3333/uploads/${point.image}`,
        }
      });

    return response.json(serializedPoints);
  }

  async create(request: Request, response: Response) {

    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = request.body;

    const point = {
      image: request.file.fieldname,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    }

    const trx = await knex.transaction(); //se alguma das queries derem errado ela não executa nenhuma

    const insertedIds = await trx("points").insert(point); //O método insert do knex retorna os ids dos registros inseridos

    const point_id = insertedIds[0];

    const pointItems = items  //items é uma string "1,2,3"
      .split(',') //divide os items e retorna um array. Ex: a string '1,2,3' vira [1, 2, 3]
      .map((item: string) => Number(item.trim())) //Converte para número e retira os espaços de cada item. Como é um array, utiliza Map
      .map((item_id: number) => {
      return {
        item_id,
        point_id
      };
    });

    await trx("point_items").insert(pointItems);

    await trx.commit(); //Ao usar transaction vc deve usar o commit para executar a query. Daí quando todas derem certo, ele vai comitar no banco. 

    return response.json({
      id: point_id,
      ...point, //copia um objeto para outro "..."
    });
  }

  async show(request: Request, response: Response) {

    const id = request.params.id;

    const point = await knex('points').where('id', id).first();

    if (!point) {
      return response.status(400).json({ error: 'Point not found' });
    }

    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title');

      const serializedPoint = {
          ...point,
          image_url: `http://localhost:3333/uploads/${point.image}`,        
      };

    return response.json({ point: serializedPoint, items });

  }

}

