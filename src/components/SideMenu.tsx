import {
  Button,
  Input,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Icon,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";

export function SideMenu() {
  const { user } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button
        disabled={!!!user}
        bgColor="gray.500"
        onClick={() => setIsOpen(!isOpen)}
      />
      <Drawer isOpen={isOpen} placement="left" onClose={() => setIsOpen(false)}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Create your account</DrawerHeader>

            <DrawerBody>
              <Input placeholder="Type here..." />
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme="blue">Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}
