import { hris_api } from "../config/api";
import { ManagementDto } from "../dtos/management.dto";
import { userDto, userSchema } from "../dtos/user.dto";
import { getErrorMessage } from "../utils/errors.utility";


const getUserInfo = async (user_id: string): Promise<userDto> => {
    try {
        const response = await hris_api.get<{ user: unknown }>(`/api/hris-user-accounts/${user_id}/basic-info`);

        const parsedUser = userSchema.safeParse(response.data.user);

        if (!parsedUser.success) throw new Error(`Error parsing the response data. ${parsedUser.error.message}`);

        return parsedUser.data;
    } catch (error) {
        throw new Error(`Failed to fetch user info for user id: ${user_id}. Error: ${getErrorMessage(error)}`);
    }
};

export const AttachUserInfoToManagement = async (managements: ManagementDto[]) => {

    return Promise.all(
        managements.map(async (m) => {
            const user: userDto = await getUserInfo(m.user_id);

            return {
                ...m,
                ...user,
            };
        })
    );
};