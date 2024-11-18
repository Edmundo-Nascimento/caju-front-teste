import { useHistory } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";

import { z } from "zod";
import { Formik, Form } from 'formik';
import { toast } from "react-toastify";
import { toFormikValidationSchema } from 'zod-formik-adapter';

import * as S from "./styles";
import routes from "~/router/routes";
import { RegistrationProps } from "~/types";
import { formatData } from "~/formatters/format-data";
import { removeCharacters } from "~/formatters/remove-characters";

import Button from "~/components/Buttons";
import TextField from "~/components/TextField";
import { STATUS } from "../Dashboard/components/Columns";
import MaskedTextField from "~/components/MaskedTextField";
import { IconButton } from "~/components/Buttons/IconButton";
import useRegistrationStore from "~/store/registration";

const NewUserSchema = z.object({
  cpf: z.string({ message: "Campo obrigatório" }),
  email: z.string({ message: "Campo obrigatório" }).email("Por favor, insira um email válido"),
  admissionDate: z.string({ message: "Campo obrigatório" }),
  employeeName: z.string({ message: "Campo obrigatório" })
    .min(2, "O nome deve ter pelo menos duas letras") // Garante um mínimo de 2 caracteres
    .min(2, "O nome deve ter pelo menos duas letras") // Garante um mínimo de 2 caracteres
    .refine((name: string) => /^[^\d]/.test(name), {
      message: "O nome não pode começar com um número", // Verifica que o nome não começa com um número
    })
    .refine((name: string) => /\s/.test(name), {
      message: "O nome completo deve conter pelo menos um espaço", // Garante que há pelo menos um espaço
    })
    .refine((name: string) => /[a-zA-Z]{2,}\s+[a-zA-Z]{2,}/.test(name), {
      message: "O nome completo deve conter pelo menos duas palavras com duas letras cada", // Valida a segunda palavra
    })
});

const NewUserPage = () => {
  const history = useHistory();
  const { createRegistration } = useRegistrationStore();

  const goToHome = () => {
    history.push(routes.dashboard);
  };

  const handleSubmit = async (values: RegistrationProps) => {
    const payload = {
      ...values,
      status: STATUS.REVIEW,
      admissionDate: formatData(values.admissionDate),
      cpf: removeCharacters(values.cpf) || "",
    };

    try {
      await createRegistration(payload);

      goToHome();

      toast("Registro adicionado com sucesso!", { type: "success" });
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Erro ao adicionar registro!";
      toast(errorMessage, { type: "error" });
    }
  };

  return (

    <S.Container>
      <Formik
        initialValues={{
          employeeName: "",
          email: "",
          cpf: "",
          admissionDate: "",
        }}
        validationSchema={toFormikValidationSchema(NewUserSchema)}
        onSubmit={(values: Partial<RegistrationProps>) => {
          handleSubmit(values)
        }}
      >
        {({ errors, handleChange, submitForm }) => (
          <Form>
            <S.Card>
              <IconButton onClick={() => goToHome()} aria-label="back">
                <HiOutlineArrowLeft size={24} />
              </IconButton>

              <TextField name="employeeName" placeholder="Nome" label="Nome" error={errors["employeeName"]} onChange={handleChange} />
              <TextField name="email" placeholder="Email" label="Email" type="email" error={errors["email"]} onChange={handleChange} />
              <MaskedTextField
                name="cpf"
                handleChange={handleChange}
                label="CPF"
                placeholder="CPF"
                error={errors["cpf"]}
              />
              <TextField name="admissionDate" label="Data de admissão" aria-label="Data de admissão" type="date" error={errors["admissionDate"]} onChange={handleChange} />
              <Button onSubmit={submitForm} type="submit">Cadastrar</Button>
            </S.Card>
          </Form>
        )}
      </Formik>
    </S.Container>
  );
};

export default NewUserPage;
