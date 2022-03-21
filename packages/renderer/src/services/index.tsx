import jsonFileService from './jsonFile';

const serviceMap = new Map([['jsonFile', jsonFileService]]);

export default function getServiceById(id: string) {
  const service = serviceMap.get(id);

  if (!service) {
    throw new Error(`Unable to find service with id "${id}".`);
  }

  return service;
}
