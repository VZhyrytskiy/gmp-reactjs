import { describe, test, expect } from "vitest";
import { runtimeService } from "./runtimeService";

describe("runtimeService", () => {
    describe("convertRuntimeToMinutes", () => {
        test("should convert '2h 30min' to 150 minutes", () => {
            const result = runtimeService.convertRuntimeToMinutes("2h 30min");
            expect(result).toBe(150);
        });

        test("should convert '1h' to 60 minutes", () => {
            const result = runtimeService.convertRuntimeToMinutes("1h");
            expect(result).toBe(60);
        });

        test("should convert '45min' to 45 minutes", () => {
            const result = runtimeService.convertRuntimeToMinutes("45min");
            expect(result).toBe(45);
        });

        test("should return 0 for invalid runtime strings", () => {
            const result = runtimeService.convertRuntimeToMinutes("invalid");
            expect(result).toBe(0);
        });

        test("should return 0 for empty string input", () => {
            const result = runtimeService.convertRuntimeToMinutes("");
            expect(result).toBe(0);
        });
    });

    describe("formatRuntime", () => {
        test("should format 150 minutes as '2h 30min'", () => {
            const result = runtimeService.formatRuntime(150);
            expect(result).toBe("2h 30min");
        });

        test("should format 60 minutes as '1h 0min'", () => {
            const result = runtimeService.formatRuntime(60);
            expect(result).toBe("1h 0min");
        });

        test("should format 45 minutes as '0h 45min'", () => {
            const result = runtimeService.formatRuntime(45);
            expect(result).toBe("0h 45min");
        });

        test("should return an empty string for 0 minutes", () => {
            const result = runtimeService.formatRuntime(0);
            expect(result).toBe("");
        });

        test("should return an empty string for undefined input", () => {
            const result = runtimeService.formatRuntime(undefined);
            expect(result).toBe("");
        });
    });
});