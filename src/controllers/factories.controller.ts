import { Factory } from '@/interfaces/factories.interface';
import FactoriesService from '@/services/factories.service';
import { NextFunction, Request, Response } from 'express';

class FactoriesController {
  public factoriesService = new FactoriesService();

  public getFactories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const factories: Factory[] = await this.factoriesService.findAllFactories();
      res.status(200).json({ data: factories, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public createFactory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const factory: Factory = req.body;
      console.log(factory);
      const factoryData: Factory = await this.factoriesService.createFactory(factory);
      res.status(201).json({ data: factoryData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateFactory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const factoryId = req.params.id;
      const factorydata: Partial<Factory> = req.body;
      const updateFactoryData = await this.factoriesService.updateFactory(factoryId, factorydata);
      res.status(200).json({ data: updateFactoryData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
}

export default FactoriesController;
