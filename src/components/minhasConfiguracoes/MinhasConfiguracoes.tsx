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
    <Stack justify="center" align="center" spacing={8}>
      <Text color="gray.200" fontStyle="italic" fontSize="2xl">
        Configuracoes
      </Text>
      <Stack>
        <HStack>
          <ConfigurarInformacoesModal
            mongoUser={mongoUser}
            fetchUsers={fetchUser}
          />
          <Text color="gray.200" fontStyle="italic" fontSize="xl">
            Informacoes
          </Text>
        </HStack>
        <HStack>
          <ConfigurarNotificacoesModal
            mongoUser={mongoUser}
            fetchUsers={fetchUser}
          />
          <Text color="gray.200" fontStyle="italic" fontSize="xl">
            Notificacoes
          </Text>
        </HStack>
        <HStack>
          <ConfigurarSeparadoModal
            mongoUser={mongoUser}
            fetchUsers={fetchUser}
          />
          <Text color="gray.200" fontStyle="italic" fontSize="xl">
            Notificar Separado
          </Text>
        </HStack>
        <HStack>
          <ConfigurarExcecoesBloqueioModal
            mongoUser={mongoUser}
            fetchUsers={fetchUser}
          />
          <Text color="gray.200" fontStyle="italic" fontSize="xl">
            Pedidos Pre-Aprovados
          </Text>
        </HStack>
        <HStack>
          <SendWhatsAppMessage user={mongoUser} />
          <Text color="gray.200" fontStyle="italic" fontSize="xl">
            Enviar Mensagem de Teste
          </Text>
        </HStack>
      </Stack>
    </Stack>
  ) : (
    <Tag justifyContent="center">Voce num tem permissione 😂😂👌</Tag>
  );
}
