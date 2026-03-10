import { trim } from '@/scripts/util';
import { Button, Container, Grid, GridItem, Heading, Hide, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay, Popover, PopoverBody, PopoverContent, PopoverTrigger, ResponsiveValue, Square, Stack, Text, useDisclosure } from '@chakra-ui/react'
import { Select, SingleValue } from "chakra-react-select";
import { find, map, keys, includes, filter, orderBy, first, capitalize } from 'lodash'
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import GameResponse from './interfaces';
import CharacterResponse from './interfaces';
import { ArrowForwardIcon, StarIcon } from '@chakra-ui/icons';
import styles from '@/styles/Game.module.css'

enum Correctness {
  Correct = "Correct",
  Partial = "Partial",
  Incorrect = "Incorrect"
}

type Option = {
  label: string,
  value: string
}

type ClassicGameProps = {
  characters: CharacterResponse[],
  gameId: string,
  answer: string,
  totalGuesses?: number,
  imgPath: string,
}

export default function ClassicGame({ characters, gameId, answer, totalGuesses = 5, imgPath }: ClassicGameProps) {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [guessing, setGuessing] = useState<string>();
  const [isComplete, setIsComplete] = useState(false);
  const [guessedCorrectly, setGuessedCorrectly] = useState(false);
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure()
  const columns = ["name", "rarity", "element", "weapon", "faction"];
  const answerChar = find(characters, char => char._id == answer)!
  const initialRender = useRef(true);

  // Get cached data
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      let lastGameId = localStorage.getItem('lastGameId');
      let storedGuesses = JSON.parse(localStorage.getItem('guesses')!) as string[];
      let hasCompleted = JSON.parse(localStorage.getItem('hasCompleted')!) as boolean;

      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (lastGameId === gameId && Array.isArray(storedGuesses)) {
        setGuesses(storedGuesses);
        setIsComplete(hasCompleted);
      }
    }
  }, []);

  // Check for game completion
  useEffect(() => {
    if (guesses.length && (guesses.length >= totalGuesses || includes(guesses, answerChar.name))) {
      if (initialRender.current) {
        initialRender.current = false;
        return;
      }
      setIsComplete(true)
      setGuessedCorrectly(includes(guesses, answerChar.name))
      onModalOpen()
    }
  }, [guesses, answerChar.name, onModalOpen])

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    localStorage.setItem('lastGameId', gameId)
    localStorage.setItem('guesses', JSON.stringify(guesses))
  }, [guesses])

  useEffect(() => {
    localStorage.setItem('hasCompleted', JSON.stringify(isComplete))
  }, [isComplete])

  function generationOptions(guesses: string[]) {
    return map(
      orderBy(
        filter(characters, char => !includes(guesses, char.name)),
        char => char.name, ['asc']
      ),
      (char: CharacterResponse) => ({ label: char.name, value: char.name })
    );
  }

  function handleChange(newValue: SingleValue<Option>) {
    setGuessing(newValue!.value);
  }

  function handleSubmit() {
    if (!includes(guesses, guessing)) {
      setGuesses([...guesses, guessing!]);
    }
  }

  function areNamesEqual(name1: string, name2: string) {
    return trim(name1) === trim(name2)
  }

  function renderGuessItem(key: string, content: string, correctness: Correctness) {
    switch (key) {
      case "name":
        return;
      case "rarity":
        return <GuessItem correctness={correctness}>
          <Text display="flex" alignItems="center" textAlign="center">
            {content}{' '}<StarIcon fontSize={11} />
          </Text>
        </GuessItem>
      case "weapon":
      case "element":
        return <GuessItem correctness={correctness}>
          <Container
            display="flex"
            flexFlow="row"
            alignItems="center"
            justifyContent="center"
            height={"100%"}
          >
            <Popover>
              <PopoverTrigger>
                <Image
                  className={key === "element" ? "image-shadow" : ""}
                  src={`/images/${imgPath}/${key}s/${trim(content as string)}.webp`}
                  width={40}
                  height={40}
                  alt={content as string}
                  style={{ margin: "0 0.5rem", height: "40px", width: "40px" }}
                />
              </PopoverTrigger>
              <PopoverContent maxWidth={"7rem"} textAlign="center">
                <PopoverBody>{content}</PopoverBody>
              </PopoverContent>
            </Popover>
            <Hide breakpoint='(max-width: 768px)'><Text padding={1} minWidth="5.5rem">{content}</Text></Hide>
          </Container>
        </GuessItem>
      case "sex":
        return <GuessItem correctness={correctness}><Text textAlign="center">{first(content as string)?.toUpperCase()}</Text></GuessItem>
      case "faction":
      case "default":
        return <GuessItem correctness={correctness}><Text whiteSpace="pre-wrap" textAlign="center">{content}</Text></GuessItem>
    }
  }

  function renderGuessResults() {
    if (!guesses.length) return null;

    return <>
      {map(guesses, (guess, i) => {
        const guessChar = find(characters, char => areNamesEqual(char.name, guess))!;
        return <React.Fragment key={`${guessChar._id}-${i}`}>
          <>
            <Square display="flex" justifyContent="flex-end" className={`${styles[`rarity${guessChar.rarity}`]} ${styles.slideIn}`}>
              <Popover>
                <PopoverTrigger>
                  <Image
                    src={`/images/${imgPath}/characters/${trim(guessChar.name)}.webp`}
                    width="50" height="50"
                    alt={guessChar.name}
                  />
                </PopoverTrigger>
                <PopoverContent maxWidth={"7rem"} textAlign="center">
                  <PopoverBody>{guessChar.name}</PopoverBody>
                </PopoverContent>
              </Popover>
            </Square >
            {map(columns, (col, j) => {
              const key = col as keyof CharacterResponse;
              let correctness = guessChar[key] === answerChar[key] ? Correctness.Correct : Correctness.Incorrect;

              return <React.Fragment key={`${guessChar._id}-${i}-${j}`}>
                {renderGuessItem(col, guessChar[key].toString(), correctness)}
              </React.Fragment>
            })}
          </>
        </React.Fragment>
      })}
    </>
  }

  function renderResultMessage() {
    if (!guessedCorrectly) {
      return <>
        <Text textAlign="center">Today's guess was</Text>
        <Heading textAlign="center" size="md">{answerChar.name}</Heading>
        <Image src={`/images/hsr/characters/${trim(answerChar.name)}_splash.webp`} width="512" height="512" alt={answerChar.name} />
        <Text textAlign="center" style={{ marginTop: '1rem' }}>{"You were unable to guess correctly."}</Text >
      </>
    } else {
      return <>
        <Image src={`/images/hsr/characters/${trim(answerChar.name)}_splash.webp`} width="512" height="512" alt={answerChar.name} />
        <Text textAlign="center" style={{ marginTop: '1rem' }}>
          {'You guessed correctly in '}
          <span style={{ fontWeight: 700 }}>{guesses.length.toString()}</span>
          {guesses.length === 1 ? " try! 💯" : " tries!"}
        </Text >
      </>
    }
  }

  return (<>
    <Modal isOpen={isModalOpen} onClose={onModalClose} isCentered motionPreset='scale'>
      <ModalOverlay />
      <ModalContent color="white" className={styles.scaleIn}>
        <ModalCloseButton />
        <ModalBody marginTop="1rem">
          {renderResultMessage()}
        </ModalBody>
        <ModalFooter>
        </ModalFooter>
      </ModalContent>
    </Modal>
    <Container maxW="container.sm" centerContent>
      <Stack direction='row' w="100%" justifyContent={'center'} marginBottom="1rem">
        <Select
          useBasicStyles
          placeholder="Select a character..."
          classNamePrefix="rselect"
          name="guess-input"
          selectedOptionColorScheme="purple"
          onChange={handleChange}
          options={generationOptions(guesses)}
        />
        <Button
          mt={4}
          colorScheme='purple'
          type='submit'
          isDisabled={!guessing || isComplete}
          onClick={handleSubmit}
        ><ArrowForwardIcon /></Button>
      </Stack>
      {guesses.length ?
        <>
          <Grid templateRows={`repeat(${totalGuesses}, 1fr)`} templateColumns={`50px 50px 2fr 2fr 2fr`} gap={1} color="white">
            {map(columns, (col) => {
              let header = col;
              if (header === "weapon") header = "path"
              else if (header === "name") header = ""

              return (
                <React.Fragment key={`header${col}`}>
                  <Text display="flex" alignItems="flex-end" justifyContent="center">{capitalize(header)}</Text>
                </React.Fragment>
              )
            })}
            <React.Fragment>
              {renderGuessResults()}
            </React.Fragment>
          </Grid>
        </>
        :
        <Text color="white" marginTop="2rem">
          Start the game by making a guess.
        </Text>
      }
    </Container>
  </>
  )
}

type GuessItemProps = {
  correctness?: Correctness | null,
  children?: React.ReactNode
}

function GuessItem({ correctness = null, children }: GuessItemProps) {
  let color = "none";

  switch (correctness) {
    case Correctness.Correct:
      color = "green";
      break;
    case Correctness.Partial:
      color = "yellow";
      break;
    case Correctness.Incorrect:
      color = "red";
      break;
    default:
      break;
  }

  return (
    <GridItem
      bg={correctness ? `${color}.600` : ""}
      className={styles.slideIn}
    >
      <Square
        fontSize="sm"
        fontWeight={600}
        lineHeight="1rem"
        style={{ height: '100%' }}
        padding={[0, 0, 1, 1, 1]}
        border={correctness ? "1px solid rgba(255,255,255,0.4)" : ""}
      >
        {children}
      </Square>
    </GridItem >
  )
}

