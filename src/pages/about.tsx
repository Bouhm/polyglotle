import { Container, Divider, Heading, ListItem, Stack, UnorderedList, Text } from "@chakra-ui/react";
import Head from "next/head";

export default function About() {
  return (
    <Container maxW="container.lg" color="white" paddingTop="2rem">
      <Head>
        <title>Polyglotle - About</title>
      </Head>
      <Heading as='h1' size='2xl' marginBottom="2rem">About Polyglotle</Heading>
      <Stack spacing={3}>
        <Text>
          Polyglotle is a project made (by a human, not AI) on a whim based on a friend's inquiry which was word-for-word:
        </Text>
        <Text textStyle="italic">
          "Does anyone know of an app that will give you a daily vocabulary word for a selection of chosen languages? Like the same word across all languages"
        </Text>
        <Text textStyle="italic">
          "But actually maybe this doesn't exist lol? I guess I could get a daily vocabulary word for one language and look it up in all the other ones manually"
        </Text>
        <Divider />
        <Heading as='h1'>
          Stretch Goals (meaning I won't add unless requested)
        </Heading>
        <UnorderedList>
          <ListItem>Support base languages other than English</ListItem>
          <ListItem>Support more languages</ListItem>
          <ListItem>Different difficulties, hints system</ListItem>
          <ListItem>Pronunciation guide</ListItem>
        </UnorderedList>
      </Stack>
    </Container>
  )

}
