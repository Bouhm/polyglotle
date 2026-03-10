import useSWR from "swr"
import fetcher from "./fetcher"

export default function useHSRGame() {
  const { data, error, isLoading } = useSWR('https://hoyodle.fly.dev/api/v1/hsr/games/today', fetcher)

  return {
    game: data,
    isLoading,
    isError: error
  }
}