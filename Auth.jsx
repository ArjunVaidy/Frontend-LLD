/**
 * For auth - we are going to use JWT token
 * Mostly we will be using access token and refresh token - both are essentially JWT tokens
 * When user login to the application - request will be sent to the server with username and password.
 * Server will validate the user and if user is valid, it will generate Refresh(JWT) token based on any details of the particular user.
 * Refresh token will be with server - httpOnly set to true.
 * From the refresh token, server will generate access token and send it to the client.
 * Access token will have shorter expiry time - say 15 minutes.
 * Refresh token will have longer expiry time - say 1 month.
 * Note: Both are JWT tokens.JWT is encrypted one based on algorithms - Structure of JWT token is Header.Payload.OptionalSignature
 */

/**
 * Where to store? - LocalStorage or Cookies or sessionStorage?
 * LocalStorage - It is not secure. It is accessible by any script in the page.
 * Cookies - It is secure. We can set httpOnly to true. It is accessible by the server.
 * sessionStorage - It is secure. It is accessible by the same tab.
 * But when you think deep, browser based storage - has script access (by plain JS) - so it is not secure.
 * Think of it storing it in application in-memory - in context of react application - it is state.
 * It is lot harder to access the memory of the application than accessing the browser storage.
 */

/**
 * How to handle expiration?
 * When the user refreshes the application - in-memory will be cleared - access token will be undefined.
 * From perspective of server, in both scenarios(application refresh or token expiry) - server will generate new access token from refresh token.
 * Note: Refresh token will be single source of truth and it will enable user experience seamless because user don't have to login again for generating token
 */

import { createContext, useContext, useLayoutEffect } from "react";

const createAuthContext = createContext(undefined);

export const useAuth = () => {
  const authContext = useContext(createAuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return authContext;
};

const AuthProvider = ({ children }) => {
  // state to store the token
  const [token, setToken] = useState();

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await api.get("/api/me");
        setToken(response.data.accessToken);
      } catch (err) {
        setToken(null);
      }
    };
    fetchMe();
  }, []);

  // This effect is used to add an interceptor to the API requests.
  // Before sending the request, we add the token to the request headers.
  // If the request is not a retry and a token exists, we set the Authorization header with the token.
  // If the request is a retry or no token exists, we leave the Authorization header as it is.
  // The interceptor is removed when the component unmounts or before the next effect is run.
  useLayoutEffect(() => {
    // before sending the request - we are going to add the token to the request
    const authInterceptor = api.interceptors.request.use((config) => {
      config.headers.Authorization =
        !config._retry && token
          ? `Bearer ${token}`
          : config.headers.Authorization;
      return config;
    });

    return () => {
      api.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  // This effect is used to add an interceptor to the API responses.
  // If the server responds with a 403 Unauthorized error, we try to refresh the token.
  // We send a request to the /api/refreshToken endpoint to get a new access token.
  // If the request is successful, we update the token in the state and retry the original request with the new token.
  // If the request fails, we clear the token in the state.
  // The interceptor is removed when the component unmounts or before the next effect is run.
  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      // when token is expired, server gives a new accessToken based on refresh token
      (response) => response,
      async (error) => {
        const originalRequest = error.config; // original request that failed

        if (
          error.response.status === 403 &&
          error.response.data.message === "Unauthorized"
        ) {
          try {
            const response = await api.get("/api/refreshToken");
            setToken(response.data.accessToken);

            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
            originalRequest._retry = true; // this flag is made to true and it is connected to request interceptor header token setting

            return api(originalRequest);
          } catch (err) {
            setToken(null);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(refreshInterceptor);
    };
  }, []);
};
