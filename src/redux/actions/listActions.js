import ActionTypes from "../actionTypes";
import api from "../../utils/api";

// Kullanıcı id sı
const account_id = import.meta.env.VITE_ACCOUNT_ID;

// Listedeki filmleri alan asenkron thunk aksiyonu
export const getWatchList = () => async (dispatch) => {
  dispatch({ type: ActionTypes.LIST_LOADING });

  api
    .get(`/account/${account_id}/watchlist/movies`)
    .then((res) =>
      dispatch({ type: ActionTypes.LIST_SUCCESS, payload: res.data.results })
    )
    .catch((err) =>
      dispatch({ type: ActionTypes.LIST_ERROR, payload: err.message })
    );
};

// Film listede varsa kaldıran yoksa ekleyen asenkron thunk aksiyonu
export const toggleMovieList = (movie, isAdded) => async (dispatch) => {
  // Body içeriğini hazırla
  const body = {
    media_type: "movie",
    media_id: movie.id,
    watchlist: isAdded,
  };

  // Api isteği at
  api
    .post(`/account/${account_id}/watchlist`, body)
    .then(() => {
      // Ekleme/Çıkarma durumuna göre reducer'a haber ver
      isAdded
        ? dispatch({ type: ActionTypes.ADD_TO_LIST, payload: movie })
        : dispatch({ type: ActionTypes.REMOVE_FROM_LIST, payload: movie });
    })
    .catch((err) => console.log(err));
};
