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
import { RiUserSettingsLine, RiWhatsappLine } from "react-icons/ri";
import { BsCardHeading } from "react-icons/bs";
import { GoGraph } from "react-icons/go";
import { TiArrowShuffle } from "react-icons/ti";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import Link from "next/link";
import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { MenuButton } from "./MenuButton";

export function SideMenu() {
  const { googleUser, mongoUser } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);

  Router.events.on("routeChangeComplete", (url) => {
    setIsOpen(false);
  });

  return (
    <>
      <Button
        disabled={!googleUser}
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
                    disabled={!mongoUser?.apps?.CHEQUE_DEVOLVIDO}
                    leftIcon={<Icon as={GoGraph} color="blue.100" />}
                  >
                    Relatorio Vendas
                  </MenuButton>
                </Link>
                <Link href="/fluxocaixa">
                  <MenuButton
                    disabled={!mongoUser?.apps?.CHEQUE_DEVOLVIDO}
                    leftIcon={<Icon as={TiArrowShuffle} color="blue.100" />}
                  >
                    Fluxo de Caixa
                  </MenuButton>
                </Link>
                <Link href="/chequedevolvido">
                  <MenuButton
                    disabled={!mongoUser?.apps?.CHEQUE_DEVOLVIDO}
                    leftIcon={<Icon as={BsCardHeading} color="blue.100" />}
                  >
                    Cheque Devolvido
                  </MenuButton>
                </Link>
                <Link href="/minhasconfiguracoes">
                  <MenuButton
                    disabled={!mongoUser?.apps?.NOTIFICACOES}
                    leftIcon={<BellIcon color="blue.100" />}
                    rightIcon={<Icon as={RiWhatsappLine} color="green.200" />}
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
                    leftIcon={<Icon as={RiUserSettingsLine} color="blue.100" />}
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
