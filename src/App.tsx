import Router from "~/router";
import { Header } from "./components/Header";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Header>
        <h1>Caju Front Teste</h1>
      </Header>
      <Router />
      <ToastContainer />
    </>
  );
}

export default App;
