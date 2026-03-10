import useSWR from "swr"
import fetcher from "./fetcher"

export default function useHSRMessage(messageId: string) {
  const { data, error, isLoading } = useSWR('https://hoyodle.fly.dev/api/v1/hsr/messages/' + messageId, fetcher)

  return {
    message: data,
    isLoading,
    isError: error
  }
}