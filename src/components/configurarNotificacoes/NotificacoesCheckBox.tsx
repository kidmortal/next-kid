import { Checkbox } from "@chakra-ui/checkbox";
import { Stack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useAppContext } from "../../context/AppContext";
import { MongoUser } from "../../models/mongoUser";

export function NotificacoesCheckBox() {
  const { mongoUser, setMongoUser } = useAppContext();
  const toast = useToast();

  async function toastNotify(success: boolean) {
    if (success) {
      toast({
        title: "Cadastrado Notificacao",
        status: "success",
        description: "Sem data",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } else {
      toast({
        title: "Erro",
        status: "error",
        description: "Sem data",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  }

  async function handleRelatorioDiario() {
    let active = !mongoUser?.notificar.RELATORIO_DIARIO;
    let response = await axios.post("/api/mongodb/usuarios", {
      call: "relatorioDiarioNotification",
      email: mongoUser?.email,
      active,
    });
    toastNotify(response.data);
    if (response.data) {
      let newMongoUser: MongoUser = {
        ...mongoUser,
      };
      newMongoUser.notificar.RELATORIO_DIARIO = active;
      setMongoUser(newMongoUser);
    }
  }
  async function handleSemData() {
    let active = !mongoUser?.notificar.DATA_INCORRETA;
    let response = await axios.post("/api/mongodb/usuarios", {
      call: "pedidoSemDataNotification",
      email: mongoUser?.email,
      active,
    });
    toastNotify(response.data);
    if (response.data) {
      let newMongoUser: MongoUser = {
        ...mongoUser,
      };
      newMongoUser.notificar.DATA_INCORRETA = active;
      setMongoUser(newMongoUser);
    }
  }
  async function handleSemCodicao() {
    let active = !mongoUser?.notificar.SEM_CONDICAO;
    let response = await axios.post("/api/mongodb/usuarios", {
      call: "pedidoSemCondicaoNotification",
      email: mongoUser?.email,
      active,
    });
    toastNotify(response.data);
    if (response.data) {
      let newMongoUser: MongoUser = {
        ...mongoUser,
      };
      newMongoUser.notificar.SEM_CONDICAO = active;
      setMongoUser(newMongoUser);
    }
  }

  async function handleComPendencia() {
    let active = !mongoUser?.notificar.CLIENTE_COM_PENDENCIA;
    let response = await axios.post("/api/mongodb/usuarios", {
      call: "pedidoSemCondicaoNotification",
      email: mongoUser?.email,
      active,
    });
    toastNotify(response.data);
    if (response.data) {
      let newMongoUser: MongoUser = {
        ...mongoUser,
      };
      newMongoUser.notificar.CLIENTE_COM_PENDENCIA = active;
      setMongoUser(newMongoUser);
    }
  }
  async function handleErroSuspeito() {
    let active = !mongoUser?.notificar.ERRO_SUSPEITO;
    let response = await axios.post("/api/mongodb/usuarios", {
      call: "pedidoSemCondicaoNotification",
      email: mongoUser?.email,
      active,
    });
    toastNotify(response.data);
    if (response.data) {
      let newMongoUser: MongoUser = {
        ...mongoUser,
      };
      newMongoUser.notificar.ERRO_SUSPEITO = active;
      setMongoUser(newMongoUser);
    }
  }

  return (
    <Stack pl={6} mt={1} spacing={1}>
      <Checkbox
        isChecked={mongoUser?.notificar?.RELATORIO_DIARIO}
        onChange={(e) => handleRelatorioDiario()}
      >
        Relatorio Diario
      </Checkbox>
      <Checkbox
        isChecked={mongoUser?.notificar?.DATA_INCORRETA}
        onChange={(e) => handleSemData()}
      >
        Pedido Concluido sem Data de Saida
      </Checkbox>
      <Checkbox
        isChecked={mongoUser?.notificar?.SEM_CONDICAO}
        onChange={(e) => handleSemCodicao()}
      >
        Pedido Concluido sem Condição de pagamento
      </Checkbox>
      <Checkbox
        isChecked={mongoUser?.notificar?.CLIENTE_COM_PENDENCIA}
        onChange={(e) => handleComPendencia()}
      >
        Pedido de Cliente Com pendencia
      </Checkbox>
      <Checkbox
        isChecked={mongoUser?.notificar?.ERRO_SUSPEITO}
        onChange={(e) => handleErroSuspeito()}
      >
        Pedido com Suspeita de Erro
      </Checkbox>
    </Stack>
  );
}
