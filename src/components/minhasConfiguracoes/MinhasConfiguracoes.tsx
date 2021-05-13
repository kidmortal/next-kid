import { HStack, Stack, Text } from "@chakra-ui/layout";
import { Tag } from "@chakra-ui/tag";
import axios from "axios";
import { useAppContext } from "../../context/AppContext";
import { MongoUser } from "../../models/mongoUser";
import { ConfigurarAppsModal } from "../configurarUsuarios/ConfigurarAppsModal";
import { SendWhatsAppMessage } from "../misc/SendWhatsAppMessage";
import { ConfigurarExcecoesBloqueioModal } from "./ConfigurarExcecoesBloqueioModal";
import { ConfigurarInformacoesModal } from "./ConfigurarInformacoesModal";
import { ConfigurarNotificacoesModal } from "./ConfigurarNotificacoesModal";
import { ConfigurarSeparadoModal } from "./ConfigurarSeparadoModal";
import { NotificacoesDados } from "./NotificacoesDados";

export function MinhasConfiguracoes() {
  const { mongoUser, setMongoUser } = useAppContext();

  async function fetchUser() {
    let call = "getUserById";
    let { data } = await axios.post<MongoUser>(`/api/mongodb/usuarios`, {
      call,
      id: mongoUser._id,
    });
    setMongoUser(data);
  }

  return mongoUser?.apps?.NOTIFICACOES ? (
    <Stack justify="center" align="center" spacing={4}>
      <NotificacoesDados />
      <HStack>
        <ConfigurarInformacoesModal
          mongoUser={mongoUser}
          fetchUsers={fetchUser}
        />
        <ConfigurarNotificacoesModal
          mongoUser={mongoUser}
          fetchUsers={fetchUser}
        />
        <ConfigurarSeparadoModal mongoUser={mongoUser} fetchUsers={fetchUser} />
        <ConfigurarExcecoesBloqueioModal
          mongoUser={mongoUser}
          fetchUsers={fetchUser}
        />
        <SendWhatsAppMessage user={mongoUser} />
      </HStack>
    </Stack>
  ) : (
    <Tag justifyContent="center">Voce num tem permissione 😂😂👌</Tag>
  );
}
