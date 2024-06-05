import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Button,
  Typography,
  Box,
  InputAdornment
} from "@mui/material";
import { Envelope, Eye, EyeSlash, Lock, XCircle } from "@phosphor-icons/react";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";

interface log {
  email: string;
  senha: string;
}

type LoginProps = {
  atualizarVariavel: (novaVariavel: number) => void;
  fecharModal: () => void;
};

const LoginModal = ({ atualizarVariavel, fecharModal }: LoginProps) => {
  const urlServidor = localStorage.getItem("urlServidor");
  const [mostrarSenha, setMostrarSenha] = useState<boolean>(false);
  const verSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  const recuperaNome = (nomeCompleto: string) => {
    var posicaoEspaco = nomeCompleto.indexOf(" ");

    var nome = posicaoEspaco !== -1 ? nomeCompleto.substring(0, posicaoEspaco) : nomeCompleto;

    localStorage.setItem("nome", nome);
  };

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [tentativas, setTentativas] = useState<number>(2);
  const [errorMessage, setErrorMessage] = useState("");

  let userBlock: boolean = false;
  let userAttempts: number = 3;
  const conta: log = {
    email: email,
    senha: senha,
  };

  const Logar = (contador: number) => {
    axios
      .post(`${urlServidor}/auth/authenticate`, conta)
      .then((response) => {
        setVisibility(false);
        localStorage.setItem("token", response.data.token);
        recuperaNome(response.data.nome);
        setLoading(false);
        window.location.reload();
      })
      .catch((error) => {
        setLoading(false);

        if (userBlock === true) {
          setErrorMessage("Usuário bloqueado!");
          setVisibility(true);
        } else if (contador === -1) {
          setVisibility(true);
          setErrorMessage("E-mail não cadastrado!");
        } else {
          setVisibility(true);
          setErrorMessage(
            `Usuário ou senha incorretos!\nVocê tem ${2 - contador} tentativas.`
          );
        }
      });
  };

  const CountDown = () => {
    setLoading(true);
    axios
      .get(`${urlServidor}/auth/authenticate/${email}`)
      .then((response) => {
        userBlock = response.data.usuarioBloqueado;
        userAttempts = userAttempts - response.data.numErros;

        if (tentativas <= 0) {
        } else {
          setTentativas(2 - response.data.numErros);
          setVisibility(true);
        }
        console.log(`usuario acesso: ${userBlock}`);
        Logar(response.data.numErros);
      })
      .catch((error) => {
        console.log(`Houve um erro no countdown: ${error}`);
        setLoading(false);
      });
  };

  return (
    <Dialog
      open={true}
      onClose={fecharModal}
      maxWidth="sm"
      fullWidth={true}
      PaperProps={{
        style: {
          maxWidth: "500px", // Aumenta a largura do modal
        },
      }}
    >
      <DialogTitle>
        <IconButton
          onClick={fecharModal}
          style={{
            position: "absolute",
            right: 5,
            top: 5,
            cursor: "pointer",
          }}
        >
          <XCircle color="#45674C" weight="fill" size={26} />
        </IconButton>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography color="#45674C" variant="h5" fontWeight="600">
            Autenticação
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center" width="100%">
          <TextField
            fullWidth
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Envelope style={{ color: "#45674C" }} />
                </InputAdornment>
              ),
            }}
            style={{ marginBottom: "1rem" }} // Ajusta o espaço inferior
          />
          <TextField
            fullWidth
            placeholder="Senha"
            onChange={(e) => setSenha(e.target.value)}
            type={mostrarSenha ? "text" : "password"}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock style={{ color: "#45674C" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={verSenha}
                    edge="end"
                  >
                    {mostrarSenha ? <Eye style={{ color: "#45674C" }} /> : <EyeSlash style={{ color: "#45674C" }} />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            style={{ marginBottom: "1rem" }} // Ajusta o espaço inferior
          />
          {visibility && (
            <Box
              style={{
                color: "red",
                width: "100%",
                textAlign: "center",
                marginBottom: "1rem",
              }}
            >
              {errorMessage.split("\n").map((line, index) => (
                <Typography key={index}>
                  {line}
                </Typography>
              ))}
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions style={{ padding: "0 24px 24px" }}>
        <Button
          onClick={CountDown}
          variant="contained"
          fullWidth
          style={{
            backgroundColor: "#45674C", 
            color: "white",
            marginBottom: "1rem"
          }}
        >
          {loading ? (
            <ColorRing
              visible={true}
              height="40"
              width="40"
              ariaLabel="blocks-loading"
              wrapperClass="blocks-wrapper"
              colors={["#45674C", "#45674C", "#45674C", "#45674C", "#45674C"]}
            />
          ) : (
            "Login"
          )}
        </Button>

        {/*
        <Typography>
          Não possui conta?{" "}
          <span
            onClick={() => {
              atualizarVariavel(3);
            }}
            style={{ cursor: "pointer", color: "blue" }}
          >
            Faça seu cadastro aqui
          </span>
        </Typography>
         */}
      </DialogActions>
    </Dialog>
  );
};

export default LoginModal;
