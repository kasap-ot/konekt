export function extractLocationName(url: string): string {
    try {
        const queryStart = url.indexOf('?');
        if (queryStart === -1) return '';

        const queryString = url.slice(queryStart + 1);

        const params = new URLSearchParams(queryString);
        const encodedName = params.get('q');

        if (!encodedName) return '';

        return decodeURIComponent(encodedName);
    } 
    catch (error) {
        console.error('Error parsing Google Maps URL:', error);
        return '';
    }
}