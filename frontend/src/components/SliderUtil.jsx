import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieCard from "../pages/Movies/MovieCard";

const SliderUtil = ({ data }) => {
  const settings = {
    dots: true,
    infinite: data?.length > 4,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { 
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "30px" 
        },
      },
    ],
  };

  return (
    <div className="slider-container -mx-4"> {/* Container ko margin handle karne ke liye expand kiya */}
      <Slider {...settings}>
        {data?.map((movie) => (
          // FIX: px-4 add karne se movies ke darmiyan professional gap aa jayega
          <div key={movie._id} className="px-4 outline-none">
            <MovieCard movie={movie} />
          </div>
        ))}
      </Slider>

      <style jsx>{`
        .slick-prev:before, .slick-next:before {
          color: #3b82f6;
          font-size: 25px;
        }
        .slick-dots li button:before {
          color: white;
        }
        .slick-dots li.slick-active button:before {
          color: #3b82f6;
        }
        .slick-prev {
        left: -12px;
        }
        .slick-next {
        right: -12px;
        }
        /* Slider list ko thora sa padding dena zaroori hai arrows ke liye */
        .slick-list {
          padding: 10px 0;
        }
      `}</style>
    </div>
  );
};

export default SliderUtil;