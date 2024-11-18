export enum STATUS {
  REVIEW = "REVIEW",
  APPROVED = "APPROVED",
  REPROVED = "REPROVED",
}

export const allColumns = [
  { status: STATUS.REVIEW, title: "Pronto para revisar" },
  { status: STATUS.APPROVED, title: "Aprovado" },
  { status: STATUS.REPROVED, title: "Reprovado" },
];
