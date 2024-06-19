import axios from 'axios';


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '70e71a7e-5d1b-4284-82b3-3a6364ed9f2a',
    }
})


export const usersAPI = {
    async getUsers(pageSize: number, page: number) {
        try {
            const response = await instance.get(
                `users?count=${pageSize}&page=${page}`
            )
            return response.data;
        } catch (error) {
            console.error('Error getting users:', error);
            throw error;
        }
    },
    async followUser(userId: string) {
        try {
            const response = await instance.post(
                `follow/${userId}`
            )
            return response.data;
        } catch (error) {
            console.error('Error following user:', error);
            throw error;
        }
    },
    async unfollowUser(userId: string) {
        try {
            const response = await instance.delete(
                `follow/${userId}`
            )
            return response.data;
        } catch (error) {
            console.error('Error unfollowing user:', error);
            throw error;
        }
    }
}



export const userAuthAPI = {
    async authUser() {
        try {
            const response = await instance.get(
                `auth/me`
            )
            return response.data;
        } catch (error) {
            console.error('Error user`s authorisation:', error);
            throw error;
        }
    },
}



export const profileAPI = {
    async getUsersProfile(userId: string) {
        try {
            const response = await instance.get(
                `profile/${userId}`,
            )
            return response.data;
        } catch (error) {
            console.error('Error user`s authorisation:', error);
            throw error;
        }
    },
    async getUsersStatus(userId: string) {
        try {
            const response = await instance.get(
                `profile/status/${userId}`,
            )
            return response.data;
        } catch (error) {
            console.error('Error user`s authorisation:', error);
            throw error;
        }
    },
    async updateUsersStatus(status: string) {
        try {
            const response = await instance.put(
                `profile/status`, {
                    status: status,
                }
            )
            return response.data;
        } catch (error) {
            console.error('Error user`s authorisation:', error);
            throw error;
        }
    },
}
