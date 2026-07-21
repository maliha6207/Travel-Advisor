import axios from "axios";
// const URL = 

export const getPlacesData = async (type, sw, ne) => {
    console.log({ sw, ne })
    try {
    const { data: { data } } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng
            },
            headers: {
                'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
                'x-rapidapi-host': import.meta.env.VITE_RAPIDAPI_HOST,
                'Content-Type': 'application/json'
            }
        });
        return data
    } catch (error) {
        if (error.response?.status === 429) {
            console.error("Rate limit hit! Check your network tab for infinite loops.");
        } else {
            console.error("API Fetch Error:", error);
        }
        return []
    }
}
