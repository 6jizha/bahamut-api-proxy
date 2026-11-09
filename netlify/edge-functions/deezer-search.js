// 代理 Deezer 音乐搜索 API
export default async (request, context) => {
  const url = new URL(request.url);
  const keyword = url.searchParams.get("keyword");
  const limit = url.searchParams.get("limit") || "20";

  if (!keyword) {
    return new Response(JSON.stringify({ error: "Missing keyword" }), {
      status: 400,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }

  // 直接请求 Deezer 搜索接口
  const deezerUrl = `https://api.deezer.com/search?q=${encodeURIComponent(keyword)}&limit=${limit}`;

  try {
    const response = await fetch(deezerUrl);
    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Proxy fetch failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }
};
