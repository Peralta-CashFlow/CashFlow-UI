import { useUserStore } from '../../stores/user/UserStore';

export const useUserValidator = () => {
  const user = useUserStore((state) => state.user);

  const userIsLoggedIn = () => {
    return user.id !== 0 && user.id !== undefined;
  };

  return { userIsLoggedIn };
};