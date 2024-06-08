import { useEffect } from "react";

const InfiniteScroll = () => {
  const [posts, setPosts] = useState([]);
  /**
   * Window.innerHeight - Height of the visible part of the window
   * document.body.scrollHeight - Height of the entire document(web page)
   * Window.scrollY -How much I have scrolled?
   * window.innerHeight + window.scrollY - (document.body.scrollHeight)
   * Condition to check if the user has scrolled to the bottom of the page is (window.innerHeight + window.scrollY >= document.body.scrollHeight)
   */
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
      fetchApi();
    }
  };
  useEffect(() => {
    fetchApi();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchApi = async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/20"
    );
    const data = await response.json();
    setPosts((posts) => [...posts, ...data]);
  };
  return <div>InfiniteScroll</div>;
};

export default InfiniteScroll;
