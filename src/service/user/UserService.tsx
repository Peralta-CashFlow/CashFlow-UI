import axios from 'axios';
import LocalEnvironment from '../../config/LocalEnvironment';
import { RegisterFormData } from '../../dto/user/UserRegisterFormData';

class UserService {

    async registerUser(userData: RegisterFormData) {
        const response = await axios.post(
            LocalEnvironment.API_AUTH_URL + '/user/register',
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
}

const userService = new UserService();
export default userService;