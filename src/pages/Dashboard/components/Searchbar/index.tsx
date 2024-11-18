import { useEffect, useRef, useState } from "react";
import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";

import Button from "~/components/Buttons";
import MaskedTextField from "~/components/MaskedTextField";
import { IconButton } from "~/components/Buttons/IconButton";

import * as S from "./styles";
import routes from "~/router/routes";
import useRegistrationStore from "~/store/registration";
import { removeCharacters } from "~/formatters/remove-characters";

export const SearchBar = () => {
  const history = useHistory();
  const [cpf, setCpf] = useState('');
  const { fetchRegistration }: any = useRegistrationStore();
  const isFirstRender = useRef(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = e.target.value.replace(/[^0-9]/g, "");
    setCpf(formattedValue);
  };

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }


    if (cpf.length === 11) {
      const query = {
        cpf: removeCharacters(cpf)
      }

      fetchRegistration(query)
    }

    if (cpf.length === 0) {
      fetchRegistration()
    }
  }, [cpf]);

  return (
    <S.Container>
      <MaskedTextField
        value={cpf}
        handleChange={handleChange}
        placeholder="Digite um CPF válido"
      />
      <S.Actions>
        <IconButton aria-label="refetch">
          <HiRefresh onClick={() => fetchRegistration()} />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};