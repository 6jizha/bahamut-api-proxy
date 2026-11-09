// 代理 Open Library 搜索 API
export default async (request, context) => {
  const url = new URL(request.url);
  const keyword = url.searchParams.get("keyword");
  const limit = url.searchParams.get("limit") || "20";
    let query = keyword;
  if (query.length < 3) query = query + "  ";

  if (!keyword) {
    return new Response(JSON.stringify({ error: "Missing keyword" }), {
      status: 400,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }

  // 限制只返回需要的字段，减少传输体积
  const fields = "key,title,author_name,first_publish_year,publisher,cover_i,isbn";
  const olUrl = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=${limit}&fields=${fields}`;

  try {
    const response = await fetch(olUrl);
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
