import '@testing-library/jest-dom'
import { jest } from "@jest/globals";
import { act } from 'react';
import { fireEvent, screen, render } from '@testing-library/react';
import { toast } from "react-toastify";

import RegistrationCard from '../../components/RegistrationCard';
import { mockRegistrations } from "../../../../../__tests__/mocks/data";

jest.mock("react-toastify", () => ({
  toast: jest.fn(),
}));

describe("Should test handleStatusUpdate e handleDelete", () => {
  const mockUpdateRegistration = jest.fn().mockResolvedValue(undefined);
  const mockDeleteRegistration = jest.fn().mockResolvedValue(undefined);
  const mockFetchRegistration = jest.fn().mockResolvedValue(undefined);

  let registration = mockRegistrations[0]

  beforeEach(() => {
    jest.clearAllMocks();
    global.confirm = jest.fn();

  });

  const handleAction = async (callback: () => Promise<any>, message: string) => {
    const resposta = confirm("Você tem certeza que deseja continuar?");
    if (resposta) {
      await callback();
      await mockFetchRegistration();
      toast(message, { type: "success" });
    } else {
      console.log("Usuário cancelou.");
    }
  };

  const handleStatusUpdate = async (newStatus: string) => {
    await handleAction(
      async () => await mockUpdateRegistration(registration.id, newStatus),
      "Registro atualizado com sucesso!"
    );
  };

  const handleDelete = async () => {
    await handleAction(
      async () => await mockDeleteRegistration(registration.id),
      "Registro deletado com sucesso!"
    );
  };

  test("Should update the record status to APPROVED", async () => {

    act(() => {
      render(<RegistrationCard data={registration} />);
    });

    const btn = screen.getByText("Aprovar");
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn)

    global.confirm.mockReturnValue(true);

    expect(global.confirm).toHaveBeenCalledTimes(1);
    expect(global.confirm).toHaveBeenCalledWith("Você tem certeza que deseja continuar?");

    await handleStatusUpdate("APPROVED");

    expect(mockUpdateRegistration).toHaveBeenCalledTimes(1);
    expect(mockUpdateRegistration).toHaveBeenCalledWith(registration.id, "APPROVED");

    expect(mockFetchRegistration).toHaveBeenCalledTimes(1);

    expect(toast).toHaveBeenCalledWith("Registro atualizado com sucesso!", { type: "success" });

    expect(screen.getByText(registration.email)).toBeInTheDocument();
    expect(screen.getByText(registration.admissionDate)).toBeInTheDocument();
    expect(screen.getByText(registration.employeeName)).toBeInTheDocument();
  });

  test("Should update the record status to REPROVED", async () => {

    act(() => {
      render(<RegistrationCard data={registration} />);
    });

    const btn = screen.getByText("Reprovar");
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn)

    global.confirm.mockReturnValue(true);

    expect(global.confirm).toHaveBeenCalledTimes(1);
    expect(global.confirm).toHaveBeenCalledWith("Você tem certeza que deseja continuar?");

    await handleStatusUpdate("REPROVED");

    expect(mockUpdateRegistration).toHaveBeenCalledTimes(1);
    expect(mockUpdateRegistration).toHaveBeenCalledWith(registration.id, "REPROVED");

    expect(mockFetchRegistration).toHaveBeenCalledTimes(1);

    expect(toast).toHaveBeenCalledWith("Registro atualizado com sucesso!", { type: "success" });

    expect(screen.getByText(registration.email)).toBeInTheDocument();
    expect(screen.getByText(registration.admissionDate)).toBeInTheDocument();
    expect(screen.getByText(registration.employeeName)).toBeInTheDocument();
  });

  test("Should delete the register", async () => {

    act(() => {
      render(<RegistrationCard data={registration} />);
    });

    const deleteButton = screen.getByTestId('deleteBtn');
    expect(deleteButton).toBeInTheDocument();
    fireEvent.click(deleteButton)

    global.confirm.mockReturnValue(true);

    expect(global.confirm).toHaveBeenCalledTimes(1);
    expect(global.confirm).toHaveBeenCalledWith("Você tem certeza que deseja continuar?");

    await handleDelete();

    expect(mockDeleteRegistration).toHaveBeenCalledTimes(1);
    expect(mockDeleteRegistration).toHaveBeenCalledWith(registration.id);

    expect(mockFetchRegistration).toHaveBeenCalledTimes(1);

    expect(toast).toHaveBeenCalledWith("Registro deletado com sucesso!", { type: "success" });

    expect(screen.getByText(registration.email)).toBeInTheDocument();
    expect(screen.getByText(registration.admissionDate)).toBeInTheDocument();
    expect(screen.getByText(registration.employeeName)).toBeInTheDocument();
  });


  test("Should verify the cancel message in the prompt", async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    act(() => {
      render(<RegistrationCard data={registration} />);
    });

    const btn = screen.getByText("Aprovar");
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn)

    global.confirm.mockReturnValue(false);

    await handleStatusUpdate("APPROVED");

    expect(consoleSpy).toHaveBeenCalledTimes(2);
    expect(consoleSpy).toHaveBeenCalledWith("Usuário cancelou.");

    consoleSpy.mockRestore();
  });

});


describe("RegistrationCard", () => {

  const mockData = mockRegistrations;
  let mockDataWithReviewData = mockData[0];
  let mockDataWithApprovedData = mockData[1];
  let mockDataWithRepprovedData = mockData[2];

  test("renders registration card with correct data", () => {
    render(<RegistrationCard data={mockDataWithReviewData} />);

    expect(screen.getByText(mockDataWithReviewData.employeeName)).toBeInTheDocument();
    expect(screen.getByText(mockDataWithReviewData.email)).toBeInTheDocument();
    expect(screen.getByText(mockDataWithReviewData.admissionDate)).toBeInTheDocument();
  });

  test("renders buttons based on table status REVIEW", () => {
    render(<RegistrationCard data={mockDataWithReviewData} />);

    expect(screen.getByText("Reprovar")).toBeInTheDocument();
    expect(screen.getByText("Aprovar")).toBeInTheDocument();
  });

  test("renders buttons based on table status APPROVED or REPROVED", () => {
    render(<RegistrationCard data={mockDataWithApprovedData} />);

    expect(screen.getByText("Revisar novamente")).toBeInTheDocument();
  });


  test("renders 'Revisar novamente' button when status is REPROVED", () => {
    render(<RegistrationCard data={mockDataWithRepprovedData} />);

    expect(screen.getByText("Revisar novamente")).toBeInTheDocument();
  });
});