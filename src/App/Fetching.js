export class FetchData {
    async getData(url) {
        try {
            const response = await fetch(url);
            const rs = await response.json();
            return rs;
        } catch (error) {
            throw error;
        }

    };
}


