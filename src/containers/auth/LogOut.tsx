import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { goToLogin, logout } from "../../actions/auth";
import Loading from "../../components/Loading";

const LogOut = () => {
  const navigate = useNavigate();

  const {
    mutate: onLogout,
    isLoading,
  } = useMutation<void, unknown, void>(logout, {
    onSuccess: () => {
      navigate(goToLogin());
    },
  });

  useEffect(() => onLogout(), [onLogout]);

  if (isLoading) {
    return <Loading />;
  }

  return null;
};

export default LogOut;
