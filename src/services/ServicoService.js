import { Servico } from '../models/Servico.js';

class ServicoService {
  async create(data) {
    return await Servico.create(data);
  }

  async findAll() {
    return await Servico.findAll();
  }

  async findById(id) {
    const servico = await Servico.findByPk(id);
    if (!servico) {
      throw new Error('Serviço não encontrado!');
    }
    return servico;
  }

  async update(id, data) {
    const servico = await this.findById(id);
    return await servico.update(data);
  }

  async delete(id) {
    const servico = await this.findById(id);
    return await servico.destroy();
  }
}

export default new ServicoService();
