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
}

export default new ServicoController();