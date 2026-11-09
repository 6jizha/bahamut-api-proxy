// 代理 TMDB 搜索 API
export default async (request, context) => {
  const url = new URL(request.url);
  const keyword = url.searchParams.get("keyword");
  const type = url.searchParams.get("type") || "movie"; // movie 或 tv

  if (!keyword) {
    return new Response(JSON.stringify({ error: "Missing keyword" }), {
      status: 400,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    }); 
  }

const API_KEY = "d36945bfacea17f668c41e4d07e37bbc";
  const tmdbUrl = `https://api.themoviedb.org/3/search/${type}?query=${encodeURIComponent(keyword)}&language=zh-CN&api_key=${API_KEY}`;

  try {
    const response = await fetch(tmdbUrl);
    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // 允许你的前端跨域访问
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Proxy fetch failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }
};
