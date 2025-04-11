//EDUARDO RODRIGUES ALMEIDA

import { Servico } from '../models/Servico.js';
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
    const obj = await TipoServico.findByPk(id);
    if (!obj) {
      throw new Error("Tipo Serviço não encontrado.");
    }

    const servicoAssociado = await Servico.findOne({ where: { tipo_servico_id: id } });
    if (servicoAssociado) {
      throw new Error("Não é possível deletar o tipo serviço, pois ele está associado a um serviço.");
    }

    await obj.destroy();
    return obj;
  }
}

export default new TipoServicoService();