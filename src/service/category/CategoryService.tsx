import axios from "axios";
import LocalEnvironment from "../../config/LocalEnvironment";
import { CategoryCreationRequest } from "../../dto/category/CategoryCreationRequest";
import { CategoryResponse } from "../../dto/category/CategoryResponse";
import { PageResponse } from "../../dto/page/PageResponse";

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

    async listCategories(language: string, authorization: string, page: number, size: number, search: string): Promise<PageResponse<CategoryResponse>> {
        const response = await axios.get(
            `${this.categoryApiUrl + '/list'}?pageNumber=${page}&pageSize=${size}&search=${search}`,
            {
                headers: {
                    'Accept-Language': language,
                    'Authorization': authorization
                }
            }
        )
        return response.data;
    }

    async getCategory(language: string, authorization: string, categoryId: number): Promise<CategoryResponse> {
        const response = await axios.get(
            `${this.categoryApiUrl}/${categoryId}`,
            {
                headers: {
                    'Accept-Language': language,
                    'Authorization': authorization
                }
            }
        )
        return response.data;
    }

    async updateCategory(language: string, authorization: string, value: CategoryResponse): Promise<CategoryResponse> {
        const response = await axios.patch(
            this.categoryApiUrl,
            JSON.stringify(value),
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