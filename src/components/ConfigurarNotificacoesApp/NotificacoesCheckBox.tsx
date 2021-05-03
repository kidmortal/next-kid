import { Checkbox } from "@chakra-ui/checkbox";
import { Stack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { MongoUser } from "../../models/mongoUser";

export function NotificacoesCheckBox() {
  const { mongoUser, setMongoUser } = useAppContext();
  const toast = useToast();

  async function handleRelatorioDiario() {
    let active = !mongoUser?.notificar.RELATORIO_DIARIO;
    let response = await axios.post("/api/mongodb/usuarios", {
      call: "relatorioDiarioNotification",
      email: mongoUser?.email,
      active,
    });
    if (response.data) {
      let newMongoUser: MongoUser = {
        ...mongoUser,
      };
      newMongoUser.notificar.RELATORIO_DIARIO = active;
      setMongoUser(newMongoUser);
      toast({
        title: "Cadastrado Notificacao",
        status: "success",
        description: "Relatorio diario",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } else {
      toast({
        title: "Erro",
        status: "error",
        description: "Relatorio diario",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  }
  async function handleSemData() {
    let active = !mongoUser?.notificar.DATA_INCORRETA;
    let response = await axios.post("/api/mongodb/usuarios", {
      call: "pedidoSemDataNotification",
      email: mongoUser?.email,
      active,
    });
    if (response.data) {
      let newMongoUser: MongoUser = {
        ...mongoUser,
      };
      newMongoUser.notificar.DATA_INCORRETA = active;
      setMongoUser(newMongoUser);
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
  async function handleSemCodicao() {
    let active = !mongoUser?.notificar.SEM_CONDICAO;
    let response = await axios.post("/api/mongodb/usuarios", {
      call: "pedidoSemCondicaoNotification",
      email: mongoUser?.email,
      active,
    });
    if (response.data) {
      let newMongoUser: MongoUser = {
        ...mongoUser,
      };
      newMongoUser.notificar.SEM_CONDICAO = active;
      setMongoUser(newMongoUser);
      toast({
        title: "Cadastrado Notificacao",
        status: "success",
        description: "Sem Condição",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } else {
      toast({
        title: "Erro",
        status: "error",
        description: "Sem Condição",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  }

  return (
    <Stack pl={6} mt={1} spacing={1}>
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
        isChecked={mongoUser?.notificar?.RELATORIO_DIARIO}
        onChange={(e) => handleRelatorioDiario()}
      >
        Relatorio Diario
      </Checkbox>
    </Stack>
  );
}
