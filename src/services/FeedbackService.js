//Leandro Carvalho Fraga

import { Feedback } from "../models/Feedback.js";

class FeedbackService {
  
  static async findAll(req, res) {
    const objs = await Feedback.findAll({
      include: [ {
        association: "fim_servico",
        include: [ {
          association: "servico",
          include: [ { association: "cliente" } ]
        } ]
      } ]
  });
    return objs;
  }

  static async findByPk(req, res) {
    const { id } = req.params;
    const obj = await Feedback.findByPk(id);
    return obj;
  }

  static async create(req, res) {
    const { nota, comentario, fim_servico_id } = req.body;

    // ---------------------------------------------------
    // Regra de negocio 1: apenas um feedback por serviço
    const existingFeedback = await Feedback.findOne({where : {fim_servico_id: fim_servico_id}});
    if (existingFeedback){
      throw new Error ("Já existe um serviço finalizado com esse feedback!");
    }
    // ---------------------------------------------------



    // ---------------------------------------------------
    // Regra de negocio 2: o serviço deve estar finalizado
    const fimServicoExists = await import('../models/FimServico.js').then(module => {
      const FimServico = module.FimServico;
      return FimServico.findByPk(fim_servico_id);
    });
    const servicoExists = await import('../models/Servico.js').then(module => {
      const Servico = module.Servico;
      return Servico.findByPk(fim_servico_id);
    });
    // Aqui ele verifica se o serviço em si existe
    if (!fimServicoExists && !servicoExists) {
      throw new Error("O serviço informado não existe no sistema!");
    // Aqui caso o serviço exista, porém o serviço não está com o status finalizado
    } else if(servicoExists && !fimServicoExists) {
      throw new Error("Não é possivel adicionar feedback, pois o serviço ainda não foi finalizado!")
    }
    // ---------------------------------------------------
    
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

  static async findByNota(req, res) {
    const { nota } = req.query;

    let whereClause = {};
    if (nota && nota.trim() !== '') {
      whereClause = { nota: nota };
    }

    const feedbackNota = await Feedback.findAll({
      where: whereClause
    });

    const quantidade = feedbackNota.length;

    return {
      feedbackNota,
      quantidade,
      nota: nota || 'Todas as notas'
    };
  }

}

export { FeedbackService };
