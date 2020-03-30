import { useEffect, useReducer, useContext, createContext } from "react";

const getGeoLoc = cb => {
  navigator.geolocation.getCurrentPosition(
    res => {
      cb(res);
    },
    err => {
      console.log(err);
    }
  );
};

const initAppState = {
  user: {
    isAuthed: false,
    uid: null,
    photoURL: null,
    displayName: null
  },
  client: {
    location: null
  }
};

const appReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_USER":
      return { ...state, user: action.payload };
    case "CLEAR_USER":
      return { ...state, user: initAppState.user };
    case "UPDATE_LOCATION":
      return { ...state, client: { location: action.payload } };
    default:
      throw new Error();
  }
};

export const useAppState = api => {
  const [appState, appStateDispatcher] = useReducer(appReducer, initAppState);

  useEffect(() => {
    doClientLocation(appStateDispatcher);
    const unsub = doSubscribeAuth(appStateDispatcher, api);

    return () => unsub();
  }, []);

  return [appState, appStateDispatcher];
};

const doSubscribeAuth = (dispatch, api) => {
  const unsub = api.auth.subscribeToAuthState(user => {
    if (user) {
      dispatch({
        type: "UPDATE_USER",
        payload: {
          isAuthed: true,
          uid: user.uid,
          photoURL: user.photoURL,
          displayName: user.displayName
        }
      });
    } else {
      dispatch({ type: "CLEAR_USER" });
    }
  });
  return () => unsub();
};

const doClientLocation = dispatch => {
  getGeoLoc(loc => {
    dispatch({
      type: "UPDATE_LOCATION",
      payload: [loc.coords.latitude, loc.coords.longitude]
    });
  });
};

export const AppStateContext = createContext();
