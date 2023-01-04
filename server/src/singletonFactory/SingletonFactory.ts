import { HistoryService } from "../history/History";

const serviceTypes: any = {HistoryService}

export class SingletonFactory {
  createSingleton(type: string, attr: any) {
    const serviceType = serviceTypes[type as typeof type];
    if(!serviceType.instance){
      serviceType.instance = new serviceType(attr);
    }

    return serviceType.instance;
  }
}