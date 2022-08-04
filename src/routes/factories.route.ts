import FactoriesController from '@/controllers/factories.controller';
import { Routes } from '@/interfaces/routes.interface';
import { Router } from 'express';

class FactoriesRoute implements Routes {
  public path = '/factories';
  public router = Router();
  public factoryController = new FactoriesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.factoryController.getFactories);
    this.router.post(`${this.path}`, this.factoryController.createFactory);
    this.router.put(`${this.path}/:id`, this.factoryController.updateFactory);
  }
}

export default FactoriesRoute;
