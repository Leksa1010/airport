import type { AuthModel } from "@/models/auth.model.ts";

export class AuthService {
    static saveAuth(model: AuthModel) {
        localStorage.setItem("auth", JSON.stringify(model));
    }

    static getAuth(): AuthModel | null {
        const auth = localStorage.getItem("auth");
        if (!auth) return null;
        try {
            return JSON.parse(auth);
        } catch {
            return null;
        }
    }

    static hasAuth(): boolean {
        return this.getAuth() !== null;
    }

    static getAccessToken(): string | null {
        return this.getAuth()?.access || null;
    }

    static getRefreshToken(): string | null {
        return this.getAuth()?.refresh || null;
    }

    static getUserEmail(): string {
        return this.getAuth()?.email || '';
    }

    static clearAuth() {
        localStorage.removeItem("auth");
    }
}
