import { useEffect, useState } from "react";

const ImageSlider = () => {
  const images = [
    "https://marketingmind.in/wp-content/uploads/2019/01/free.jpg",
    "https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-spring-summer-day-in-green-nature-mountains-free-photo.jpg?w=2210&quality=70",
    "https://i0.wp.com/picjumbo.com/wp-content/uploads/a-lot-of-macarons-in-a-row-free-photo.jpg?w=1024&quality=50",
    "https://i0.wp.com/picjumbo.com/wp-content/uploads/creative-designer-photographer-workspace-desk-setup-free-photo.jpg?w=1024&quality=50",
    "https://i0.wp.com/picjumbo.com/wp-content/uploads/ingredients-for-homemade-baking.jpg?w=1024&quality=50",
  ];
  const [active, setActive] = useState(0); // active image index

  useEffect(() => {
    const i = setInterval(() => {
      loadNextImage(); // load next image
    }, 2000); // set interval to change image every 2 seconds

    return () => {
      clearInterval(i); // clear interval on component unmount
    };
  }, []);

  const loadNextImage = () => {
    setActive((active) => (active + 1) % images.length); //  modulus operator to loop back to 0
  };

  const loadPreviousImage = () => {
    setActive((active) => (active - 1 < 0 ? images.length - 1 : active - 1)); // if active is 0, set it to last index
  };

  return (
    <div>
      <div>
        {/* have constant width to images */}
        <img src={images[active]} alt="slider" width={800} />
        <img
          onClick={loadPreviousImage}
          src={"https://cdn-icons-png.flaticon.com/512/109/109618.png"}
          alt="left-arrow"
          width={20}
          height={20}
        />
        <img
          onClick={loadNextImage}
          src={"https://cdn-icons-png.flaticon.com/512/109/109618.png"}
          alt="right-arrow"
          width={20}
          height={20}
        />
      </div>
    </div>
  );
};

export default ImageSlider;
