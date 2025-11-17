import axios from 'axios';
import LocalEnvironment from '../../config/LocalEnvironment';

class ProfileService {

    personalInformationUrl = LocalEnvironment.API_AUTH_URL + '/user/personal-information';

    async getPersonalInformation(language: string, authorization: string, userId: number) {
        const response = await axios.get(
            this.personalInformationUrl + '/' + userId,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Language': language,
                    'Authorization': authorization
                }
            }
        )
        return response;
    }

}

const profileService = new ProfileService();
export default profileService;