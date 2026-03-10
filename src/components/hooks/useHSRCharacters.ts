import useSWR from "swr"
import fetcher from "./fetcher"

export default function useHSRCharacters() {
  const { data, error, isLoading } = useSWR('https://hoyodle.fly.dev/api/v1/hsr/characters', fetcher)

  return {
    characters: data,
    isLoading,
    isError: error
  }
}