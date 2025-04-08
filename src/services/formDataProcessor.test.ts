import { describe, it, expect, vi, beforeEach } from "vitest";
import { processFormData } from "./formDataProcessor";
import { runtimeService } from "../services/runtimeService";

vi.mock("../services/runtimeService");

describe("processFormData", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should process valid formData and return a Movie object", () => {
        const formData = new FormData();
        formData.append("title", "Inception");
        formData.append("runtime", "2h 28min");
        formData.append("vote_average", "8.8");

        vi.spyOn(runtimeService, "convertRuntimeToMinutes").mockReturnValue(148);

        const result = processFormData(formData);

        expect(result).toEqual({
            title: "Inception",
            runtime: 148,
            vote_average: 8.8,
        });
        expect(runtimeService.convertRuntimeToMinutes).toHaveBeenCalledWith("2h 28min");
    });

    it("should handle missing runtime and not call runtimeService", () => {
        const formData = new FormData();
        formData.append("title", "Inception");
        formData.append("vote_average", "8.8");

        const result = processFormData(formData);

        expect(result).toEqual({
            title: "Inception",
            vote_average: 8.8,
        });
        expect(runtimeService.convertRuntimeToMinutes).not.toHaveBeenCalled();
    });
});