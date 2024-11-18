import '@testing-library/jest-dom'
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { ToastContainer } from 'react-toastify';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import NewUserPage from '..';
import { formatData } from '~/formatters/format-data';
import useRegistrationStore from '~/store/registration';
import { removeCharacters } from '~/formatters/remove-characters';

jest.mock('~/store/registration');
const mockCreateRegistration = jest.fn();

describe('NewUserPage Component', () => {

  beforeEach(() => {

    (useRegistrationStore as jest.Mock).mockReturnValue({
      createRegistration: mockCreateRegistration,
    });
  });

  it('should render the form and handle submission successfully', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <ToastContainer />
        <NewUserPage />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText('Nome'), {
      target: { value: 'José Leão' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'jose@caju.com.br' },
    });
    fireEvent.change(screen.getByPlaceholderText('CPF'), {
      target: { value: '785.022.700-01' },
    });
    fireEvent.change(screen.getByLabelText('Data de admissão'), {
      target: { value: '2023-01-01' },
    });

    fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }));

    mockCreateRegistration.mockResolvedValueOnce({});

    await waitFor(() => {
      expect(mockCreateRegistration).toHaveBeenCalledWith({
        employeeName: 'José Leão',
        email: 'jose@caju.com.br',
        cpf: removeCharacters('785.022.700-01'),
        admissionDate: formatData('2023-01-01'),
        status: 'REVIEW',
      });

      expect(screen.getByText('Registro adicionado com sucesso!')).toBeInTheDocument();

      expect(history.location.pathname).toBe('/dashboard');
    });
  });

  it('should show error toast on submission failure', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <ToastContainer />
        <NewUserPage />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText('Nome'), {
      target: { value: 'José Leão' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'jose@caju.com.br' },
    });
    fireEvent.change(screen.getByPlaceholderText('CPF'), {
      target: { value: '785.022.700-01' },
    });
    fireEvent.change(screen.getByLabelText('Data de admissão'), {
      target: { value: '2023-01-01' },
    });

    fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }));

    mockCreateRegistration.mockRejectedValueOnce({
      response: { data: { message: 'Erro ao criar registro!' } },
    });

    await waitFor(() => {
      expect(mockCreateRegistration).toHaveBeenCalled();
      expect(screen.getByText('Erro ao criar registro!')).toBeInTheDocument();
    });
  });

  it('should navigate back to home when back button is clicked', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <NewUserPage />
      </Router>
    );

    fireEvent.click(screen.getByLabelText('back'));

    expect(history.location.pathname).toBe('/dashboard');
  });
});
