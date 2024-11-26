export default function NewsCard({ article }) {
  const { title, description, url, urlToImage, source, publishedAt } = article;

  // Format the publishedAt date
  const formattedDate = publishedAt
    ? new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "UTC",
      }).format(new Date(publishedAt))
    : "Unknown date";

  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s ease",
        textDecoration: "none",
      }}
    >
      <img
        src={urlToImage || "https://fakeimg.pl/300x200?text=No+Image"}
        alt={title}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
        }}
      />
      <div
        style={{
          padding: "15px",
        }}
      >
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: "none",
            color: "black",
          }}
        >
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              margin: "10px 0",
            }}
          >
            {title}
          </h3>
        </a>
        <p
          style={{
            fontSize: "14px",
            margin: "10px 0",
            color: "#666",
          }}
        >
          {description || "This News might have been removed"}
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "black",
            textDecoration: "none",
            fontWeight: "bold",
            marginTop: "10px",
            display: "inline-block",
          }}
        >
          Read More...
        </a>
        <p
          style={{
            marginTop: "10px",
            fontSize: "12px",
            color: "#aaa",
          }}
        >
          Source: {source?.name || "Bilinmiyor"}
        </p>
        <p
          style={{
            marginTop: "10px",
            fontSize: "12px",
            color: "#aaa",
          }}
        >
          {formattedDate}
        </p>
      </div>
    </div>
  );
}
