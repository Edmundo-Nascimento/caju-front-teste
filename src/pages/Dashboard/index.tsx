import Collumns from "./components/Columns";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";
import { useEffect } from "react";
import useRegistrationStore from "~/store/registration";

const DashboardPage = () => {
  const { registrations, fetchRegistration }: any = useRegistrationStore();

  useEffect(() => {
    fetchRegistration();
  }, []);

  return (
    <S.Container>
      <SearchBar />
      <Collumns registrations={registrations} />
    </S.Container>
  );
};
export default DashboardPage;
