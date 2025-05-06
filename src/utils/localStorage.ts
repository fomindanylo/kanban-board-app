import type { Board } from '../types'

export class LocalStorageManager {
    // Keys
    private static readonly KEYS = {
        BOARDS: 'kanban_boards'
    }

    // Private generic setter
    private static set<T>(key: string, data: T): void {
        localStorage.setItem(key, JSON.stringify(data))
    }

    // Private generic getter
    private static get<T>(key: string): T | null {
        const value = localStorage.getItem(key)
        return value ? JSON.parse(value) as T : null
    }

    // Public API
    public static getBoards(): Board[] {
        return this.get<Board[]>(this.KEYS.BOARDS) || []
    }

    public static setBoards(boards: Board[]): void {
        this.set(this.KEYS.BOARDS, boards)
    }
}