/** Pagination */
/**
 * Pagination - When to use?
 * - When you have structured and definitive data - use pagination
 * - Moving back and forth between pages is easy
 * - Able to see Footer
 */

/**
 * Infinite Scroll - When to use?
 * - When you have unstructured and indefinite data - use infinite scroll - real time data
 * - When you want application to be addictive - like social media
 * Note: Infinite scroll is not good for SEO,Searching is not well suited for infinite scroll
 */

/**
 * Front end Pagination
 * Page change is faster as we fetched all data at once
 * Easy to implement - we can do whatever we want with the data
 * But, initial load time of the page is high
 * It is browser heavy - make your browser slow
 */

/**
 * Server side Pagination
 * For each page, fetch data from server.
 * Good for large data, page load is faster.
 * More api calls
 * Any data manipulation is done on server side - sorting, filtering, etc
 * Back end dependency
 * This is also called - Offset Pagination
 * API - will have query - page and count --> offset/skip and limit
 * API response will have meta data - total count, count,limit and skip
 * Total count is needed because we need to show pagination and it is dependent on total count
 */

/**
 * Problem with offset pagination
 * Say we have 3 pages - 12 total counts - 4 per page
 * Page - 1 --> offset - 0 limit - 4
 * Page - 2 --> offset - 4 limit - 4
 * Page - 3 --> offset - 8 limit - 4
 * Say when user uses is in page 2 and goes to page 3 --> at the same time new data is being added in the backend - 2 new data
 * What happens now? total count - 14 - page 3 will have 2 data which is already shown in page 2 because 4th page will there now after two data is being added
 * This causes data duplication when data is real time and dynamic
 */

/**
 * Welcome to Cursor Pagination
 * Solves the problem of offset pagination - data duplication when real time and dynamics
 * No skip here and missing data
 * Faster than offset pagination - because cursor points to correct data which is unique - kind of array index
 */

/**
 * Cursor pagination is introduced by Facebook
 * Instead of offset - we will give cursor
 * What is cursor? - It is a unique identifier for each data
 * Most of the time cursor is timestamp - therefore it is generally unique and sortable
 */

/**
 * Cons of Cursor pagination
 * Very much tied to infinite scrolling
 * We can't keep track of pages
 * Sorting is difficult
 */

import React from "react";
import useEffect from "react";
const LIMIT = 10;

const Pagination = () => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [noOfPages, setNoOfPages] = useState(0);
  useEffect(() => {
    fetchData();
  }, [currentPageIndex]); // whenever current page changes , it will fetch the data

  /**
   * Note skip is dynamic - it is dependent on current page
   * Current page is also changes - so it will from state
   * For pageIndex(not page number) - 0 --> skip - 0 - 0*10
   * For pageIndex(not page number) - 1 --> skip - 10 - 1*10
   * For pageIndex(not page number) - 2 --> skip - 20 - 2*10
   * Basically skip = pageIndex * LIMIT
   */
  const fetchData = async () => {
    const data = await fetch(
      `https://dummyjson.com/products?limit=${LIMIT}&skip=${
        currentPageIndex * LIMIT
      }&select=title,price,description,thumbnail,discount`
    );
    const res = await data.json();
    setNoOfPages(Math.ceil(res.total / LIMIT));
  };
  /**
   * Basic shortcut
   * Create page numbers based on - no of pages
   * Shortcut is [...Array(noOfPages).keys()]
   */
  return <div>Pagination</div>;
};

export default Pagination;
