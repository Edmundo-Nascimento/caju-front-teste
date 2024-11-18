import * as S from "./styles";
import RegistrationCard from "../RegistrationCard";
import { useMemo } from "react";
import { RegistrationProps } from "~/types";

export enum STATUS {
  REVIEW = "REVIEW",
  APPROVED = "APPROVED",
  REPROVED = "REPROVED"
}

const allColumns = [
  { status: STATUS.REVIEW, title: "Pronto para revisar" },
  { status: STATUS.APPROVED, title: "Aprovado" },
  { status: STATUS.REPROVED, title: "Reprovado" },
];

type Props = {
  registrations?: RegistrationProps[];
};

const Collumns = (props: Props) => {
  const { registrations } = props;

  const filteredRegistrations = useMemo(() => {
    return registrations?.reduce((acc: any, registration: RegistrationProps) => {
      if (!acc[registration.status]) {
        acc[registration.status] = [];
      }
      acc[registration.status].push(registration);
      return acc;
    }, {});
  }, [registrations]);

  return (
    <S.Container>
      {allColumns.map((collum: any) => {
        return (
          <S.Column status={collum.status} key={collum.title}>
            <>
              <S.TitleColumn status={collum.status}>
                {collum.title}
              </S.TitleColumn>
              <S.CollumContent>
                {(filteredRegistrations[collum.status] || []).map(
                  (registration: RegistrationProps) => (
                    <RegistrationCard
                      data={registration}
                      key={registration.id}
                    />
                  )
                )}
              </S.CollumContent>
            </>
          </S.Column>
        );
      })}
    </S.Container>
  );
};
export default Collumns;
