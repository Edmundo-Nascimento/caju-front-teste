import { STATUS } from './../../src/pages/Dashboard/components/Columns/index';

export const mockRegistrations = [
  {
    "admissionDate": "22/10/2023",
    "email": "luiz@caju.com.br",
    "employeeName": "Luiz Filho",
    "status": STATUS.REVIEW,
    "cpf": "56642105087",
    "id": "3"
  },
  {
    "id": "1",
    "admissionDate": "22/10/2023",
    "email": "filipe@caju.com.br",
    "employeeName": "Filipe Marins",
    "status": STATUS.APPROVED,
    "cpf": "78502270001"
  },
  {
    "id": "2",
    "admissionDate": "22/10/2023",
    "email": "jose@caju.com.br",
    "employeeName": "José Leão",
    "status": STATUS.REPROVED,
    "cpf": "78502270001"
  },
];