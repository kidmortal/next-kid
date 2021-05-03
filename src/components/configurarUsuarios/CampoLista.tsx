import { Box, HStack, Icon, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface CampoListaProps {
  icon: IconType;
  name: string;
  value: string;
}

export function CampoLista({ icon, name, value }: CampoListaProps) {
  return (
    <HStack>
      <Icon as={icon} />
      <HStack>
        <Text as="span" color="pink.300">
          {`${name}: `}
        </Text>
        <Text as="span">{value || `Sem ${name}`}</Text>
      </HStack>
    </HStack>
  );
}
