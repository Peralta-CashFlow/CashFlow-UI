import axios from 'axios';
import LocalEnvironment from '../../config/LocalEnvironment';
import { PersonalInformationFormData } from '../../dto/profile/PersonalInformationFormData';
import { formatDateToBackend } from '../../utils/date/DateHandler';
import { User } from '../../stores/user/UserStore';

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

    async editPersonalInformation(language: string, user: User, personalInformationData: PersonalInformationFormData) {
        personalInformationData.birthDay = formatDateToBackend(personalInformationData.birthDay);
        personalInformationData.gender = personalInformationData.gender.charAt(0);
        personalInformationData.userId = user.id;
        personalInformationData.taxNumber = personalInformationData.taxNumber == '' ? null : personalInformationData.taxNumber;
        const response = await axios.patch(
            this.personalInformationUrl,
            JSON.stringify(personalInformationData),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Language': language,
                    'Authorization': user.jwt
                }
            } 
        )
        return response;
    }
}

const profileService = new ProfileService();
export default profileService;