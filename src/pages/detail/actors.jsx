import { Splide, SplideSlide } from "@splidejs/react-splide";
import { baseImgUrl } from "../../utils/constants";

const Actors = ({ cast }) => {
  const isRender = cast && cast.length > 0;

  const getPicture = (actor) => {
    return actor.profile_path
      ? baseImgUrl + actor.profile_path
      : actor.gender === 1
      ? "/woman.jpg"
      : actor.gender === 2
      ? "/man.jpg"
      : "/default.webp";
  };

  return isRender ? (
    <div className="mb-10">
      <h2 className="font-semibold text-lg md:text-xl my-5">Oyuncular</h2>

      <Splide
        options={{
          autoWidth: true,
          gap: "20px",
          pagination: false,
          type: "loop",
          focus: "center", // Slaytları merkezde odaklanacak şekilde ayarla
          arrows: true,
        }}
      >
        {cast.map((actor) => (
          <SplideSlide key={actor.id}>
            <div
              title={actor.name}
              className="w-[160px] h-full flex flex-col space-y-2"
            >
              <img
                src={getPicture(actor)}
                className="h-full object-cover rounded"
              />
              <h2 className="text-center font-semibold mt-2 line-clamp-1">
                {actor.name}
              </h2>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  ) : (
    <div className="mb-10 text-center text-zinc-400">
      Oyuncu bilgisi alınamadı
    </div>
  );
};

export default Actors;
