import { Avatar, Box, Center, Container, Flex, Heading, Spinner, VStack, Text } from '@chakra-ui/react'
import styles from '@/styles/Messages.module.css';
import MessageResponse from './interfaces';
import CharacterResponse from './interfaces';
import { trim } from '@/scripts/util';

type MessagesGameProps = {
  characters: CharacterResponse[],
  gameId: string,
  message: MessageResponse,
  totalGuesses?: number,
  imgPath: string,
}

export default function MessagesGame({ characters, gameId, message, totalGuesses = 5, imgPath }: MessagesGameProps) {
  function renderMessages() {
    return (
      <VStack display={'flex'}>
        <Container className={styles.messages}>
          {message.messages.map(messageContent => {
            const isSender = messageContent.sender == "NPC";

            return (
              <Flex
                className={`${styles.messageContainer} 
                ${styles[messageContent.sender]}`} key={messageContent.id}
                direction={messageContent.sender == 'NPC' ? 'row' : 'row-reverse'}
              >
                <Avatar
                  className={styles.messageAvatar}
                  src={isSender ? "" : `/images/${imgPath}/characters/stelle.webp`}
                  size='lg'
                />
                <Flex flexDirection={'column'} className={styles.messageContent}>
                  <Text className={styles.messageName} textAlign={isSender ? 'left' : 'right'} size='md'>
                    {isSender ? '???' : 'Stelle'}
                  </Text>
                  <Box className={`${styles.messageBox} ${styles[messageContent.sender]}`}>
                    {messageContent.text}
                  </Box>
                </Flex>
              </Flex>
            )
          })}
        </Container>
        <Container className={styles.playerGuesses}>
        </Container>
      </VStack>
    )
  }

  return (
    <Container className={styles.messagesContainer}>
      <Container className={styles.messageHeader}>
        <Heading>
          Serval
        </Heading>
        <Heading className={styles.messageStatus} size='md' as="h3">
          Lacking sleep and inspiration
        </Heading>
      </Container>
      {renderMessages()}
    </Container>
  )
}
