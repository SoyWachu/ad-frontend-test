import { getGames, GamesResponse } from "@/services/gamesService";

describe("getGames service", () => {
  const mockFetch = jest.fn();

  beforeAll(() => {
    global.fetch = mockFetch as any;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("hace una petición GET con los parámetros correctos (solo page)", async () => {
    const mockResponse: GamesResponse = {
      games: [],
      availableFilters: ["Action", "Adventure"],
      totalPages: 1,
      currentPage: 1,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await getGames(1);

    expect(mockFetch).toHaveBeenCalledWith("/api/games?page=1", {
      method: "GET",
    });
    expect(result).toEqual(mockResponse);
  });

  it("hace una petición GET con los parámetros correctos (page y genre)", async () => {
    const mockResponse: GamesResponse = {
      games: [],
      availableFilters: ["Action"],
      totalPages: 2,
      currentPage: 1,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await getGames(2, "Action");

    expect(mockFetch).toHaveBeenCalledWith("/api/games?page=2&genre=Action", {
      method: "GET",
    });
    expect(result).toEqual(mockResponse);
  });

  it("lanza un error si la respuesta no es ok", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
    });

    await expect(getGames(1)).rejects.toThrow("Error fetching games");
  });
});
