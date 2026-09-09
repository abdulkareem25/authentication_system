import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  authRequest,
  authSuccess,
  successMessage,
  authFailure,
  authLogout,
  clearAuthError,
} from "../states/auth.slice";

import {
  loginUser,
  registerUser,
  logoutUser,
  getMe,
  refreshToken,
  getDashboardData,
} from "../service/auth.api";

const useAuth = () => {
  const dispatch = useDispatch();

  const { user, status, error, message } = useSelector((state) => state.auth);

  // Derived state
  const isAuthenticated = Boolean(user);
  const isLoading = status === "loading";

  // -----------------------------
  // Login
  // -----------------------------

  const login = useCallback(
    async (credentials) => {
      dispatch(authRequest());

      try {
        const data = await loginUser(credentials);

        const user = data.user;

        dispatch(authSuccess(user));

        return {
          success: true,
          user,
        };
      } catch (error) {
        const message = error.message || "Login failed";

        dispatch(authFailure(message));

        return {
          success: false,
          error: message,
        };
      }
    },
    [dispatch]
  );

  // -----------------------------
  // Register
  // -----------------------------

  const register = useCallback(
    async (userData) => {
      dispatch(authRequest());

      try {
        const data = await registerUser(userData);

        const message = "Registration successful. Login to continue.";

        dispatch(successMessage(message));

        return {
          success: true,
          message,
        };
      } catch (error) {
        const message = error.message || "Registration failed";

        dispatch(authFailure(message));

        return {
          success: false,
          error: message,
        };
      }
    },
    [dispatch]
  );

  // -----------------------------
  // Get current authenticated user
  // -----------------------------

  const checkAuth = useCallback(async () => {
    dispatch(authRequest());

    try {
      const data = await getMe();

      const user = data.user;

      dispatch(authSuccess(user));

      return {
        success: true,
        user,
      };
    } catch (error) {
      if (error.status === 401) {
        dispatch(authLogout());

        return {
          success: false,
          authenticated: false,
        };
      }

      const message = error.message || "Authentication check failed";

      dispatch(authFailure(message));

      return {
        success: false,
        error: message,
      };
    }
  }, [dispatch]);

  // -----------------------------
  // Logout
  // -----------------------------

  const logout = useCallback(async () => {
    try {
      await logoutUser();

      dispatch(authLogout());

      return {
        success: true,
        message: "Logout successful",
      };
    } catch (error) {
      if (error.status === 401) {
        dispatch(authLogout());

        return {
          success: true,
          authenticated: false,
        };
      }

      const message = error.message || "Logout failed";

      return {
        success: false,
        error: message,
      };
    }
  }, [dispatch]);

  // -----------------------------
  // Refresh authentication
  // -----------------------------

  const refresh = useCallback(async () => {
    try {
      const data = await refreshToken();

      dispatch(successMessage("Session refreshed successfully."));

      return {
        success: true,
        message: "Session refreshed successfully.",
      };
    } catch (error) {
      if (error.status === 401) {
        dispatch(authLogout());

        return {
          success: false,
          authenticated: false,
        };
      }

      const message = error.message || "Session refresh failed";

      dispatch(authFailure(message));

      return {
        success: false,
        error: message,
      };
    }
  }, [dispatch]);

  // -----------------------------
  // Fetch dashboard data
  // -----------------------------

  const fetchDashboardData = useCallback(async () => {
    try {
      const data = await getDashboardData();

      dispatch(successMessage(data.message || "Dashboard data fetched successfully."));

      return {
        success: true,
        message: data.message || "Dashboard data fetched successfully.",
        dashboardData: data,
      };
    } catch (error) {
      if (error.status === 401) {
        dispatch(authLogout());

        return {
          success: false,
          authenticated: false,
        };
      }

      const message = error.message || "Failed to fetch dashboard data";

      dispatch(authFailure(message));

      return {
        success: false,
        error: message,
      };
    }
  }, [dispatch]);

  // -----------------------------
  // Clear error
  // -----------------------------

  const clearError = useCallback(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  // -----------------------------
  // Public API of the hook
  // -----------------------------

  return {
    user,
    status,
    message,
    error,

    isAuthenticated,
    isLoading,

    login,
    register,
    checkAuth,
    logout,
    refresh,
    fetchDashboardData,
    clearError,
  };
};

export default useAuth;