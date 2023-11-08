const { NEXT_PUBLIC_VERCEL_URL } = process.env;

const BASE_URL = `${NEXT_PUBLIC_VERCEL_URL || ""}/api`;

export const api = {
  async get<ResponseType = any>(
    path: `/${string}`,
    props?: RequestInit
  ): Promise<ResponseType> {
    const response = await fetch(`${BASE_URL}${path.replace("/api", "")}`, {
      ...props,
      method: "GET",
    });

    const data = await response.json();

    return data;
  },
};
