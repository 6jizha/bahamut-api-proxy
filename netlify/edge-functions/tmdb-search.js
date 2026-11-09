// 代理 Apple Music (iTunes) 搜索 API
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

  const appleUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(keyword)}&entity=song&limit=${limit}&country=cn`;

  try {
    const response = await fetch(appleUrl);
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
