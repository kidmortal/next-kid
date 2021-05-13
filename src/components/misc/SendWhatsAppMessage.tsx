import { IconButton } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { useToast } from "@chakra-ui/toast";
import { RiWhatsappLine } from "react-icons/ri";
import { MongoUser } from "../../models/mongoUser";

interface SendWhatsAppMessageProps {
  user: MongoUser;
}

export function SendWhatsAppMessage({ user }: SendWhatsAppMessageProps) {
  const toast = useToast();

  async function handleSendMessage() {
    let message = `Mensagem no zap zap 😂👌`;
    let messageEncoded = encodeURI(message);
    fetch(
      `https://api.callmebot.com/whatsapp.php?phone=${user.celular}&text=${messageEncoded}&apikey=${user.callmebotKey}`,
      { mode: "no-cors" }
    ).then((response) => {
      toast({
        title: "Mensagem enviada",
        description: `Enviado zap para ${user.nome}`,
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    });
  }

  return (
    <IconButton
      variant="solid"
      bg="blue.600"
      _hover={{ bg: "blue.500" }}
      _focus={{ border: "none" }}
      aria-label="Send Message"
      onClick={handleSendMessage}
      icon={<Icon color="green.200" fontSize="x-large" as={RiWhatsappLine} />}
    />
  );
}
