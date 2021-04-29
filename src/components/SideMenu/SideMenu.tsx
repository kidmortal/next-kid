import { ArrowUpDownIcon, BellIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { MenuButton } from "./MenuButton";

export function SideMenu() {
  const { googleUser, mongoUser } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button
        disabled={!!!googleUser}
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
            <DrawerHeader>Aplicativos</DrawerHeader>

            <DrawerBody>
              <Stack>
                <Link href="/baixarcontas">
                  <MenuButton
                    disabled={!mongoUser?.apps.BAIXAR_CONTAS}
                    leftIcon={<ArrowUpDownIcon />}
                  >
                    Baixar Contas a Receber - OMIE
                  </MenuButton>
                </Link>
                <Link href="/notificacoes">
                  <MenuButton
                    disabled={!mongoUser?.apps.NOTIFICACOES}
                    leftIcon={<BellIcon />}
                  >
                    Configurar Notificacoes
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
