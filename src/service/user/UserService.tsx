import axios from 'axios';
import LocalEnvironment from '../../config/LocalEnvironment';
import { UserRegisterFormData } from '../../dto/user/UserRegisterFormData';
import { UserLoginFormData } from '../../dto/user/UserLoginFormData';

class UserService {

    authUserUrl = LocalEnvironment.API_AUTH_URL + '/user'

    async registerUser(userData: UserRegisterFormData) {
        const response = await axios.post(
            this.authUserUrl + '/register',
            JSON.stringify(userData),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Language': 'en-US',
                }
            }
        )
        return response;
    }

    async loginUser(userData: UserLoginFormData) {
        const response = await axios.get(
            this.authUserUrl + '/login?' +
            'email=' + userData.email + '&' +
            'password=' + userData.password,
            {
                headers: {
                    'Accept-Language': 'en-US',
                },
                validateStatus: (status) => {
                    return status === 200 || status === 401;
                }
            }
        )
        return response;
    }
}

const userService = new UserService();
export default userService;