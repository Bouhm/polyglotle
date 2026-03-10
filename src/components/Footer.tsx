import { Box, Container, Link, Stack, Text, useColorModeValue } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box
      position="absolute"
      bottom="1rem"
      left={0}
      right={0}
      color={useColorModeValue('gray.700', 'gray.200')}
      zIndex={0}
    >
      <Container
        color="white"
        as={Stack}
        maxW={'6xl'}
        spacing={4}
        justify={'center'}
        align={'center'}
      >
        <Stack direction={'row'} spacing={6}>
          <Link href={'/about'}>About</Link>
          <Link href={'/changelog'}>Changelog</Link>
        </Stack>
      </Container>
      <Box>
        <Text pt={6} fontSize={'xs'} textAlign={'center'}>
          Honkai: Star Rail and Genshin Impact are registered trademarks of miHoYo Co., Ltd.
        </Text>
      </Box>
    </Box>

  )
}
