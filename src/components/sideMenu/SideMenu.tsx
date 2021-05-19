import { ArrowUpDownIcon, BellIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Text,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { Router } from "next/router";
import { RiUserSettingsLine, RiListSettingsLine } from "react-icons/ri";
import { GoGraph } from "react-icons/go";
import { TiArrowShuffle } from "react-icons/ti";
import { VscSettingsGear } from "react-icons/vsc";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import Link from "next/link";
import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { MenuButton } from "./MenuButton";
import { useSession } from "next-auth/client";

export function SideMenu() {
  const [session, loading] = useSession();
  const { mongoUser } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);

  Router.events.on("routeChangeComplete", (url) => {
    setIsOpen(false);
  });

  return (
    <>
      <Button
        disabled={!mongoUser}
        bg="gray.500"
        _hover={{ bg: "gray.400" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <HamburgerIcon />
      </Button>
      <Drawer isOpen={isOpen} placement="left" onClose={() => setIsOpen(false)}>
        <DrawerOverlay>
          <DrawerContent bg="gray.600">
            <DrawerCloseButton />
            <DrawerHeader>
              <HStack spacing={5}>
                <Icon as={AiOutlineAppstoreAdd} color="blue.100" />
                <Text as="span">Aplicativos</Text>
              </HStack>
            </DrawerHeader>

            <DrawerBody>
              <Stack>
                <Link href="/baixarcontas">
                  <MenuButton
                    disabled={!mongoUser?.apps?.BAIXAR_CONTAS}
                    leftIcon={<ArrowUpDownIcon color="blue.100" />}
                  >
                    Baixar Contas a Receber - OMIE
                  </MenuButton>
                </Link>
                <Link href="/relatoriovendas">
                  <MenuButton
                    disabled={!mongoUser?.apps?.NOTIFICACOES}
                    leftIcon={<Icon as={GoGraph} color="blue.100" />}
                  >
                    Relatorio Vendas
                  </MenuButton>
                </Link>
                <Link href="/fluxocaixa">
                  <MenuButton
                    disabled={!mongoUser?.apps?.USUARIOS}
                    leftIcon={<Icon as={TiArrowShuffle} color="blue.100" />}
                  >
                    Fluxo de Caixa
                  </MenuButton>
                </Link>
                <Link href="/minhasconfiguracoes">
                  <MenuButton
                    disabled={!mongoUser?.apps?.NOTIFICACOES}
                    leftIcon={<Icon as={VscSettingsGear} color="blue.100" />}
                  >
                    Minhas Configuracoes
                  </MenuButton>
                </Link>
                <Link href="/configurarusuarios">
                  <MenuButton
                    disabled={!mongoUser?.apps?.USUARIOS}
                    leftIcon={<Icon as={RiUserSettingsLine} color="blue.100" />}
                  >
                    Configurar Usuarios
                  </MenuButton>
                </Link>
                <Link href="/funcoesadministrativas">
                  <MenuButton
                    disabled={!mongoUser?.apps?.FUNCOES_ADMINISTRATIVAS}
                    leftIcon={<Icon as={RiListSettingsLine} color="blue.100" />}
                  >
                    Funçoes Administrativas
                  </MenuButton>
                </Link>
              </Stack>
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}
