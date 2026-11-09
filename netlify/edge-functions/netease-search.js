// 代理网易云音乐搜索 API
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

  const neteaseUrl = `https://music.163.com/api/search/get?s=${encodeURIComponent(keyword)}&type=1&limit=${limit}&offset=0`;

  try {
    const response = await fetch(neteaseUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Referer": "https://music.163.com/",
        "Cookie": "appver=2.0.2",
      },
    });
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
