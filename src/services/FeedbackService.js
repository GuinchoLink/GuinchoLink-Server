//Leandro Carvalho Fraga

import { Feedback } from "../models/Feedback.js";

class FeedbackService {
  
  static async findAll(req, res) {
    const objs = await Feedback.findAll();
    return objs;
  }

  static async findByPk(req, res) {
    const { id } = req.params;
    const obj = await Feedback.findByPk(id);
    return obj;
  }

  static async create(req, res) {
    const { nota, comentario, fim_servico_id } = req.body;

    const objByServId = await Feedback.findAll({where : {fim_servico_id: fim_servico_id}});
    if (objByServId.length == 1){
      throw new Error ("Já existe um serviço finalizado com esse feedback!");
    }

    // Verificar se já existe uma empresa com o mesmo CNPJ
    //    const existingFeedback = await Feedback.findOne({ where: { cnpj } });
    //    if (existingFeedback) {
      //    throw new Error("Já existe uma empresa cadastrada com este CNPJ.");
    //    }

    const obj = await Feedback.create({ nota, comentario, fim_servico_id });
    return obj;
  }

  static async update(req, res) {
    const { id } = req.params;
    const { nota, comentario } = req.body;


    var obj = await Feedback.findOne({ where: { id: id } });
    Object.assign(obj, { nota, comentario });
    obj = await obj.save();
    return obj;
  }

  static async delete(req, res) {
    const { id } = req.params;
    var obj = await Feedback.findByPk(id);
    obj = await obj.destroy();
    return obj;
  }

}

export { FeedbackService };
