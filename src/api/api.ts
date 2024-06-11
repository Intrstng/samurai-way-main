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
            return await instance.get(
                `users?count=${pageSize}&page=${page}`
            ).then(response => response.data);
        } catch (error) {
            console.error('Error getting users:', error);
            throw error;
        }
    },
    async followUser(userId: string) {
        try {
            return await instance.post(
                `follow/${userId}`
            ).then(response => response.data);
        } catch (error) {
            console.error('Error following user:', error);
            throw error;
        }
    },
    async unfollowUser(userId: string) {
        try {
            return await instance.delete(
                `follow/${userId}`
            ).then(response => response.data);
        } catch (error) {
            console.error('Error unfollowing user:', error);
            throw error;
        }
    }
}