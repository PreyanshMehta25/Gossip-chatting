import axiosInstance from '../lib/axios.js';

const useGroupStore = () => {
  const createGroup = async (name, members) => {
    try {
      const response = await axiosInstance.post('/api/groups', { name, members });
      return response.data;
    } catch (error) {
      console.error('Error creating group:', error);
      throw error;
    }
  };

  return {
    createGroup
  };
};

export default useGroupStore;
