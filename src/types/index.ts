export interface Task {
  id: string
  title: string
  description?: string
}

export interface Column {
  id: string
  title: string
  tasks: Task[]
}

export interface Board {
  id: string
  title: string
  columns: Column[],
  color?: string // optional hex or className
}