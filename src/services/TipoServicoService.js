import { TipoServico } from '../models/TipoServico.js';

class TipoServicoService {
  async create(data) {
    return await TipoServico.create(data);
  }

  async findAll() {
    return await TipoServico.findAll();
  }

  async findById(id) {
    const tipoServico = await TipoServico.findByPk(id);
    if (!tipoServico) {
      throw new Error('Tipo de Serviço não encontrado!');
    }
    return tipoServico;
  }

  async update(id, data) {
    const tipoServico = await this.findById(id);
    return await tipoServico.update(data);
  }

  async delete(id) {
    const tipoServico = await this.findById(id);
    return await tipoServico.destroy();
  }
}

export default new TipoServicoService();