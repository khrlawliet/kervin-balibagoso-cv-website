import axios from 'axios';

    const MY_DETAILS_API_URL = '/resumeData.json';

class AppService {

    getMyDetails() {
        return axios.get(MY_DETAILS_API_URL);
    }


}

export default new AppService();