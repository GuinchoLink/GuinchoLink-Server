import FimServicoService from '../services/FimServicoService.js';

class FimServicoController {
  async create(req, res) {
    try {
      const fimServico = await FimServicoService.create(req.body);
      return res.status(201).json(fimServico);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async findAll(req, res) {
    try {
      const finalizacoes = await FimServicoService.findAll();
      return res.status(200).json(finalizacoes);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async findById(req, res) {
    try {
      const fimServico = await FimServicoService.findById(req.params.id);
      return res.status(200).json(fimServico);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  async findByServicoId(req, res) {
    try {
      const fimServico = await FimServicoService.findByServicoId(req.params.servicoId);
      return res.status(200).json(fimServico);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }
  
  async findByClienteId(req, res) {
    try {
      const finalizacoes = await FimServicoService.findByClienteId(req.params.clienteId);
      return res.status(200).json(finalizacoes);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const fimServico = await FimServicoService.update(req.params.id, req.body);
      return res.status(200).json(fimServico);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      await FimServicoService.delete(req.params.id);
      return res.status(204).send();
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }


  async getClienteStatistics(req, res) {
    try {
      const clienteId = req.params.clienteId || null;
      const statistics = await FimServicoService.getClienteStatistics(clienteId);
      return res.status(200).json(statistics);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new FimServicoController();
