// 代理 Google Books 搜索 API
export default async (request, context) => {
  const url = new URL(request.url);
  const keyword = url.searchParams.get("keyword");
  if (!keyword) {
    return new Response(JSON.stringify({ error: "Missing keyword" }), { status: 400, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
  }

  // 建议在 Netlify 环境变量中配置 GOOGLE_BOOKS_KEY，这里留空则使用无密钥模式（共享配额，易限流）
  const API_KEY = Netlify.env.get("GOOGLE_BOOKS_KEY") || "";
  const keyParam = API_KEY ? `&key=${API_KEY}` : "";
  
  const gbUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(keyword)}&maxResults=20&langRestrict=zh${keyParam}`;

  try {
    const response = await fetch(gbUrl);
    const data = await response.json();
    return new Response(JSON.stringify(data), { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Proxy fetch failed" }), { status: 500, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
  }
};
