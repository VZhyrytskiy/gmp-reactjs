export const runtimeService = {
    /**
     * Converts a runtime string in the format "HHh MMmin" to total minutes.
     * @param runtimeString - The runtime string to convert.
     * @returns The total runtime in minutes.
     */
    convertRuntimeToMinutes(runtimeString: string): number {
        const runtimeMatch = runtimeString.match(/(?:(\d+)h)?\s*(?:(\d+)min?)?/i);

        if (runtimeMatch) {
            const hours = runtimeMatch[1] ? parseInt(runtimeMatch[1], 10) : 0; 
            const minutes = runtimeMatch[2] ? parseInt(runtimeMatch[2], 10) : 0; 
            return hours * 60 + minutes;
        }
    
        return parseInt(runtimeString, 10) || 0;
    },

    /**
     * Formats a runtime in minutes to a string in the format "HHh MMmin".
     * @param runtime - The runtime in minutes to format.
     * @returns The formatted runtime string.
     */
    formatRuntime(runtime: number | undefined): string {
        if (!runtime) return "";
        const hours = Math.floor(runtime / 60);
        const minutes = runtime % 60;
        return `${hours}h ${minutes}min`;
    },
};