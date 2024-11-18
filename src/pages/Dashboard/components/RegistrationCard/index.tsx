import { ButtonSmall } from "~/components/Buttons";
import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";

import { STATUS } from "../Columns";
import useRegistrationStore from "~/store/registration";
import { toast } from "react-toastify";
import RegistrationCardSkeleton from "./skeleton";

type Props = {
  data: any;
};

const RegistrationCard = (props: Props) => {
  const { fetchRegistration, updateRegistration, deleteRegistration, isLoading }: any = useRegistrationStore();

  const handleStatusUpdate = async (newStatus: string) => {
    handleAction(async () => await updateRegistration(props.data.id, newStatus), "Registro atualizado com sucesso!")
  };

  const handleDelete = async () => {
    handleAction(async () => await deleteRegistration(props.data.id), "Registro deletado com sucesso!")
  };

  const handleAction = async (callback: () => void, message: string) => {
    const resposta = confirm("Você tem certeza que deseja continuar?");
    if (resposta) {
      await callback();
      await fetchRegistration()
      toast(message, { type: "success" })
    } else {
      console.log("Usuário cancelou.");
    }
  };


  return isLoading ? <RegistrationCardSkeleton /> : (
    <S.Card>
      <S.IconAndText>
        <HiOutlineUser />
        <h3>{props.data.employeeName}</h3>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineMail />
        <p>{props.data.email}</p>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineCalendar />
        <span>{props.data.admissionDate}</span>
      </S.IconAndText>
      <S.Actions>
        {props.data.status === STATUS.REVIEW && (
          <>
            <ButtonSmall
              disabled={isLoading}
              bgcolor="rgb(255, 145, 154)"
              onClick={() => handleStatusUpdate(STATUS.REPROVED)}
            >
              Reprovar
            </ButtonSmall>
            <ButtonSmall
              disabled={isLoading}
              bgcolor="rgb(155, 229, 155)"
              onClick={() => handleStatusUpdate(STATUS.APPROVED)}
            >
              Aprovar
            </ButtonSmall>
          </>
        )}
        {(props.data.status === STATUS.REPROVED || props.data.status === STATUS.APPROVED) && (
          <ButtonSmall
            disabled={isLoading}
            bgcolor="#ff8858"
            onClick={() => handleStatusUpdate(STATUS.REVIEW)}
          >
            Revisar novamente
          </ButtonSmall>
        )}
        <HiOutlineTrash id="deleteBtn" data-testid="deleteBtn" onClick={handleDelete} />{" "}
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
