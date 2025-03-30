import TipoServicoService from '../services/TipoServicoService.js';

class TipoServicoController {
  async create(req, res) {
    try {
      const tipoServico = await TipoServicoService.create(req.body);
      return res.status(201).json(tipoServico);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async findAll(req, res) {
    try {
      const tiposServico = await TipoServicoService.findAll();
      return res.status(200).json(tiposServico);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async findById(req, res) {
    try {
      const tipoServico = await TipoServicoService.findById(req.params.id);
      return res.status(200).json(tipoServico);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const tipoServico = await TipoServicoService.update(req.params.id, req.body);
      return res.status(200).json(tipoServico);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      await TipoServicoService.delete(req.params.id);
      return res.status(204).send();
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }
}

export default new TipoServicoController();