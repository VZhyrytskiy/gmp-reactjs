import { Movie } from "../models/Movie";
import { runtimeService } from "../services/runtimeService";

/**
 * Processes form data and converts it into a Movie object.
 * @param formData - The FormData object from the form.
 * @returns A Movie object with processed data.
 */
export const processFormData = (formData: FormData): Movie => {
    const data = Object.fromEntries(formData.entries()) as unknown as Movie;
    console.log('in processFormData fn:', data);

    // Convert runtime to number from string in format HHh MMmin
    if (data.runtime) {
        const runtimeString = data.runtime as unknown as string;
        data.runtime = runtimeService.convertRuntimeToMinutes(runtimeString); // Use the service method
    }

    const voteAverage = +data.vote_average;
    return { ...data, vote_average: voteAverage };
};