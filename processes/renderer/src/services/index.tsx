import { Service } from '@domain';
import jsonFileService from './jsonFile';

const serviceMap = new Map<string, Service>([['jsonFile', jsonFileService]]);

export default function getServiceById(id: string): Service {
  const service = serviceMap.get(id);

  if (!service) {
    throw new Error(`Unable to find service with id "${id}".`);
  }

  return service;
}
