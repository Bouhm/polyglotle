import { Heading, Box, AbsoluteCenter, Text, Container, Link, Center, VStack, HStack } from "@chakra-ui/react"
import Image from "next/image";
import { useEffect, useState } from "react";
import Countdown from "./Countdown";
import Footer from "./Footer";
import styles from '@/styles/Home.module.css'

export default function Landing() {
  const [nowDate, setNowDate] = useState<Date>();
  const [resetDate, setResetDate] = useState<Date>();

  useEffect(() => {
    const now = new Date();
    const nowUtc = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(),
      now.getUTCDate(), now.getUTCHours(),
      now.getUTCMinutes(), now.getUTCSeconds()));

    let nextResetUtc = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        9,
        0,
        0
      )
    );

    if (nowUtc >= nextResetUtc) {
      nextResetUtc.setDate(nextResetUtc.getDate() + 1)
    }

    setNowDate(nowUtc)
    setResetDate(nextResetUtc)
  }, [])

  return (
    <Box paddingTop="2rem">
      {/* <Container className={styles.videoBackground}>
        <video id="bgVideo" preload="true" autoPlay loop>
          <source src="/images/hsr/choochooAnimated.webm" type="video/webm" />
        </video>
      </Container> */}
      <Container>
        <Center color="gray">
          <VStack>
            <Container centerContent>
              <Link href="/hsr/classic">
                <Image
                  src="/images/hsr/pompom.webp"
                  className="glow-on-hover"
                  width={200}
                  height={200}
                  alt="Pom Pom"
                />
              </Link>
              <Text color="white">Play Daily Puzzle</Text>
            </Container>
            <Container>
              {resetDate &&
                <Countdown nowDate={nowDate!} targetDate={resetDate} label={"NEW GAME IN"} />
              }
            </Container>
          </VStack>
        </Center>
      </Container>
      <Footer />
    </Box >
  )

}