import axios from "axios";
import LocalEnvironment from "../../config/LocalEnvironment";
import { CategoryCreationRequest } from "../../dto/category/CategoryCreationRequest";
import { CategoryResponse } from "../../dto/category/CategoryResponse";

class CategoryService {

    categoryApiUrl = LocalEnvironment.API_CORE_DATA_URL + '/category';

    async registerCategory(language: string, authorization: string, categoryCreationRequest: CategoryCreationRequest): Promise<CategoryResponse> {
        const response = await axios.post(
            this.categoryApiUrl,
            JSON.stringify(categoryCreationRequest),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Language': language,
                    'Authorization': authorization
                }
            }
        )
        return response.data;
    }

}

const categoryService = new CategoryService();
export default categoryService;