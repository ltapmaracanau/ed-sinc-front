import { useEffect, useState } from "react";
import { FundoEscuro } from "../GlobalStyles";
import LoginModal from "./Modais/LoginModal";
/*
import MudarSenhaModal from "./MudarSenhaModal";
import CadastroModal from "./CadastroModal";
import FinalizarCadastroModal from "./FinalizarCadastroModal";
import FinalizarMudarSenhaModal from "./FinalizarMudarSenhaModal";
*/
interface iniciar {
  handleMostrarIniciarSessao: () => void;
}

const IniciarSessao = ({ handleMostrarIniciarSessao }: iniciar) => {
  const [telaAtual, setTelaAtual] = useState(1);
  const [escolha, setEscolha] = useState<any>();

  const atualizarVariavel = (novaVariavel: number) => {
    setTelaAtual(novaVariavel);
  };

  const escolherTela = () => {
    switch (telaAtual) {
      case 1:
        setEscolha(
          <LoginModal
            atualizarVariavel={atualizarVariavel}
            fecharModal={handleMostrarIniciarSessao}
          />
        );
        break;
        /*
      case 2:
        setEscolha(
          <MudarSenhaModal
            atualizarVariavel={atualizarVariavel}
            fecharModal={handleMostrarIniciarSessao}
          />
        );
        break;
      case 3:
        setEscolha(
          <CadastroModal
            atualizarVariavel={atualizarVariavel}
            fecharModal={handleMostrarIniciarSessao}
          />
        );
        break;
      case 4:
        setEscolha(
          <FinalizarCadastroModal
            atualizarVariavel={atualizarVariavel}
            fecharModal={handleMostrarIniciarSessao}
          />
        );
        break;
        case 5:
          setEscolha(
            <FinalizarMudarSenhaModal
              atualizarVariavel={atualizarVariavel}
              fecharModal={handleMostrarIniciarSessao}
            />
          );
          break;
          */
      default:
        setEscolha(
          <LoginModal
            atualizarVariavel={atualizarVariavel}
            fecharModal={handleMostrarIniciarSessao}
          />
        );
    }
  };

  useEffect(() => {
    escolherTela();
  }, [telaAtual]);

  return <FundoEscuro>{escolha}</FundoEscuro>;
};

export default IniciarSessao;
