import { useState, useEffect } from "react";
import axios from "axios";

const News = () => {
  // State variables to hold news data and current page number
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);

  // Fetch news data from NewsAPI when the page state changes
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          // Use NewsAPI URL with query parameters for Bitcoin news, API key, page, and page size
          `https://newsapi.org/v2/everything?q=bitcoin&apiKey=${
            import.meta.env.VITE_API_KEY
          }&page=${page}&pageSize=5`
        );
        // Update news state by merging previous news with newly fetched articles
        setNews((prevNews) => [...prevNews, ...response.data.articles]);
      } catch (error) {
        // Log any errors that occur during the API request
        console.error("Error fetching news:", error);
      }
    };

    // Call the fetchNews function when the page state changes
    fetchNews();
  }, [page]); // Depend on page state to trigger the effect

  // Function to increment the page state when the "Show More" button is clicked
  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // Show the news articles with images, titles, descriptions, sources, and dates
  return (
    <div className="container mx-auto p-10">
      <h2 className="text-2xl font-bold my-4">Latest News Headlines</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {news.map((article) => (
          <div key={article.title} className="bg-gray-100 p-4 rounded">
            <img
              src={article.urlToImage}
              alt={article.title}
              className="rounded mb-2"
              style={{ maxHeight: "200px", objectFit: "cover" }}
            />
            <h3 className="text-lg font-bold mb-2">{article.title}</h3>
            <p className="text-gray-700 mb-2">{article.description}</p>
            <p className="text-sm text-gray-600">
              Source: {article.source.name}
            </p>
            <p className="text-sm text-gray-600">
              Published at: {article.publishedAt}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <button
          onClick={handleShowMore}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Show More
        </button>
      </div>
    </div>
  );
};

export default News;
