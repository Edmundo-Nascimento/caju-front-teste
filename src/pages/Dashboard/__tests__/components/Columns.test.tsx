import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";

import Collumns from "~/pages/Dashboard/components/Columns";
import { mockRegistrations } from "../../../../../__tests__/mocks/data";


describe("Collumns Component", () => {


  it("should render the Collumns component", () => {
    render(<Collumns registrations={mockRegistrations} />);

    expect(screen.getByText("Pronto para revisar")).toBeInTheDocument();
    expect(screen.getByText("Aprovado")).toBeInTheDocument();
    expect(screen.getByText("Reprovado")).toBeInTheDocument();
  });

  it("should correctly filter and display registrations by status", () => {
    render(<Collumns registrations={mockRegistrations} />);

    const reviewColumn = screen.getByText("Pronto para revisar");
    expect(reviewColumn).toBeInTheDocument();
    expect(reviewColumn.parentElement).toHaveTextContent(mockRegistrations[0].employeeName);
    expect(reviewColumn.parentElement).toHaveTextContent(mockRegistrations[0].email);

    const approvedColumn = screen.getByText("Aprovado");
    expect(approvedColumn).toBeInTheDocument();
    expect(approvedColumn.parentElement).toHaveTextContent(mockRegistrations[1].employeeName);
    expect(approvedColumn.parentElement).toHaveTextContent(mockRegistrations[1].email);

    const reprovedColumn = screen.getByText("Reprovado");
    expect(reprovedColumn).toBeInTheDocument();
    expect(reprovedColumn.parentElement).toHaveTextContent(mockRegistrations[2].employeeName);
    expect(reprovedColumn.parentElement).toHaveTextContent(mockRegistrations[2].email);
  });

  it("should not render any RegistrationCard if there are no registrations", () => {
    render(<Collumns registrations={[]} />);


    expect(screen.queryByText(mockRegistrations[0].employeeName)).not.toBeInTheDocument();
    expect(screen.queryByText(mockRegistrations[1].employeeName)).not.toBeInTheDocument();
    expect(screen.queryByText(mockRegistrations[2].employeeName)).not.toBeInTheDocument();
  });

  it("should render correct number of RegistrationCards", () => {
    render(<Collumns registrations={mockRegistrations} />);


    expect(screen.getAllByText(mockRegistrations[0].employeeName)).toHaveLength(1);
    expect(screen.getAllByText(mockRegistrations[1].employeeName)).toHaveLength(1);
    expect(screen.getAllByText(mockRegistrations[2].employeeName)).toHaveLength(1);
  });
});
