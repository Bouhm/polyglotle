import { useCountdown } from "./hooks/useCountdown";
import { Box, Flex, Heading, Progress, Text } from "@chakra-ui/react";

type CountdownProps = {
  label?: string,
  nowDate: Date,
  targetDate: Date
}

export default function Countdown({ nowDate, targetDate, label }: CountdownProps) {
  const diffMs = (targetDate.getTime() - nowDate.getTime());
  const diffMins = Math.round(diffMs / 60000);
  const [progress, hours, minutes, seconds] = useCountdown(diffMins);

  return (
    <Box
      color="white"
      textAlign="center"
      margin="2rem"
    >
      {label && <Text as='sub'>{label}</Text>}
      <Flex justifyContent="center">
        <Heading>{`${hours}h ${minutes}m ${seconds}s`}</Heading>
      </Flex>
    </Box>
  );
}
