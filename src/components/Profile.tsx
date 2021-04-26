import { ChangeEvent, useEffect, useState } from "react";
import { MdCheckCircle, MdError } from "react-icons/md";
import {
  Button,
  Input,
  Container,
  List,
  ListItem,
  ListIcon,
  Tag,
  Stack,
  VStack,
  Box,
  HStack,
  Checkbox,
  Text,
  useToast,
  Avatar,
} from "@chakra-ui/react";

interface GoogleUser {
  googleId: string;
  imageUrl: string;
  email: string;
  name: string;
  givenName: string;
  familyName: string;
}

interface ProfileProps {
  user: GoogleUser;
}

export function Profile({ user }: ProfileProps) {
  return (
    <HStack>
      <Avatar name={user.givenName} src={user.imageUrl} />
      <Text>{user.givenName}</Text>
    </HStack>
  );
}
