import ServicoService from '../services/ServicoService.js';

class ServicoController {
  async create(req, res) {
    try {
      const servico = await ServicoService.create(req.body);
      return res.status(201).json(servico);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async findAll(req, res) {
    try {
      const servicos = await ServicoService.findAll();
      return res.status(200).json(servicos);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async findById(req, res) {
    try {
      const servico = await ServicoService.findById(req.params.id);
      return res.status(200).json(servico);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const servico = await ServicoService.update(req.params.id, req.body);
      return res.status(200).json(servico);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  async delete(req, res) {
    try {
      await ServicoService.delete(req.params.id);
      return res.status(204).send();
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  /**
   * Método para obter relatório de serviços por cliente específico
   * @param {Object} req - Objeto de requisição
   * @param {Object} res - Objeto de resposta
   * @returns {Object} Relatório de serviços do cliente
   */
  async findByCliente(req, res) {
    try {
      const servicos = await ServicoService.findByCliente(req);
      return res.status(200).json(servicos);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  /**
   * Método para obter relatório de serviços por status específico
   * @param {Object} req - Objeto de requisição
   * @param {Object} res - Objeto de resposta
   * @returns {Object} Relatório de serviços com status específico
   */
  async findByStatus(req, res) {
    try {
      const servicos = await ServicoService.findByStatus(req);
      return res.status(200).json(servicos);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new ServicoController();