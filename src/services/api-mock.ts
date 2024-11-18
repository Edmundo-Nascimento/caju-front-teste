import MockAdapter from 'axios-mock-adapter';
import httpClient from './http-client';
import { mockRegistrations } from '../../__tests__/mocks/data';


// Configura o mock
const mockAPI = new MockAdapter(httpClient);

// Simula as requisições GET, POST, PUT e DELETE
mockAPI.onGet('').reply(200, mockRegistrations);

mockAPI.onPost('registrations').reply(config => {
  const newRegister = JSON.parse(config.data);
  newRegister.id = mockRegistrations.length + 1;
  mockRegistrations.push(newRegister);
  return [201, newRegister];
});

mockAPI.onPatch(/\registrations\/\d+/).reply((config: any) => {
  const id = String(config.url.match(/\registrations\/(\d+)/)[1]);
  const updatedData = JSON.parse(config.data);
  const index = mockRegistrations.findIndex(register => register.id === id);

  if (index !== -1) {
    mockRegistrations[index] = { ...mockRegistrations[index], ...updatedData };
    return [200, mockRegistrations[index]];
  } else {
    return [404, { message: 'Registro não encontrado' }];
  }
});

mockAPI.onDelete(/\registrations\/\d+/).reply((config: any) => {
  alert()
  const id = String(config.url.match(/\registrations\/(\d+)/)[1]);
  const index = mockRegistrations.findIndex(register => register.id === id);

  if (index !== -1) {
    mockRegistrations.splice(index, 1);
    return [200, { message: `Registro com id ${id} removido com sucesso.` }];
  } else {
    return [404, { message: 'Registro não encontrado' }];
  }
});

export default mockAPI;
