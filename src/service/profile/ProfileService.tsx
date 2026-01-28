import axios from 'axios';
import LocalEnvironment from '../../config/LocalEnvironment';
import { PersonalInformationFormData } from '../../dto/profile/PersonalInformationFormData';
import { formatDateToBackend } from '../../utils/date/DateHandler';
import { User } from '../../stores/user/UserStore';
import { FinancialInformationFormData } from '../../dto/profile/FinancialInformationFormData';
import { parseLocaleNumberStr } from '../../utils/number/NumberHandler';
import { ChangePasswordFormData } from '../../dto/profile/ChangePasswordFormData';
import { DeleteAccountFormData } from '../../dto/profile/DeleteAccountFormData';

class ProfileService {

    userInformationUrl = LocalEnvironment.API_AUTH_URL + '/user';
    personalInformationUrl = this.userInformationUrl + '/personal-information';
    financialInformationUrl = LocalEnvironment.API_AUTH_URL + '/financial-profile';

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

    async getFinancialInformation(language: string, user: User): Promise<FinancialInformationFormData> {
        const response = await axios.get(
            this.financialInformationUrl + '/' + user.id,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Language': language,
                    'Authorization': user.jwt
                }
            }
        )
        return response.data;
    }

    async editFinancialInformation(language: string, user: User, financialInformationData: FinancialInformationFormData): Promise<FinancialInformationFormData> {
        financialInformationData.expense = parseLocaleNumberStr(financialInformationData.expense, language);
        financialInformationData.income = parseLocaleNumberStr(financialInformationData.income, language);
        financialInformationData.goals = financialInformationData.goals == '' ? null : financialInformationData.goals;
        financialInformationData.occupation = financialInformationData.occupation == '' ? null : financialInformationData.occupation;
        const response = await axios.patch(
            this.financialInformationUrl,
            JSON.stringify(financialInformationData),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Language': language,
                    'Authorization': user.jwt
                }
            }
        )
        return response.data;
    }

    async changePassword(language: string, changePasswordData: ChangePasswordFormData, user: User) {
        await axios.patch(
            this.userInformationUrl + '/change-password',
            JSON.stringify(changePasswordData),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Language': language,
                    'Authorization': user.jwt
                }
            }
        )
    }

    async deleteAccount(language: string, deleteAccountData: DeleteAccountFormData, user: User) {
        await axios.delete(
            this.userInformationUrl + '/delete-account',
            {
                data: JSON.stringify(deleteAccountData),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Language': language,
                    'Authorization': user.jwt
                }
            }
        )
    }
}

const profileService = new ProfileService();
export default profileService;