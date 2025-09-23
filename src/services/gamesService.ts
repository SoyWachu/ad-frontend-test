export interface Game {
  id: string;
  genre: string;
  image: string;
  name: string;
  description: string;
  price: number;
  isNew: boolean;
}

export interface GamesResponse {
  games: Game[];
  availableFilters: string[];
  totalPages: number;
  currentPage: number;
}

export async function getGames(
  page: number = 1,
  genre?: string
): Promise<GamesResponse> {
  const apiBase = process.env.NEXT_PUBLIC_API_URL;
  const params = new URLSearchParams();
  params.append("page", page.toString());
  if (genre) params.append("genre", genre);

  const res = await fetch(`${apiBase}/games?${params.toString()}`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Error fetching games");
  }

  return res.json();
}
