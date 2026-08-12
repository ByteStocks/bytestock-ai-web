export type MessageRole = 'user' | 'assistant' | 'system'

export type Message = {
  id: string
  role: MessageRole
  content: string
}

export interface Chat extends Record<string, any> {
  id: string
  title: string
  createdAt: Date
  userId: string
  path: string
  messages: Message[]
  sharePath?: string
}

export type ServerActionResult<Result> = Promise<
  | Result
  | {
      error: string
    }
>

export interface Session {
  user: {
    id: string
    email: string
  }
}

export interface AuthResult {
  type: string
  message: string
}

export interface User extends Record<string, any> {
  id: string
  email: string
  password: string
  salt: string
}

export type RawNewsArticle = {
  id?: number
  headline?: string
  summary?: string
  source?: string
  url?: string
  datetime?: number
  image?: string
  category?: string
  related?: string
}

export type MarketNewsArticle = {
  id: number
  headline: string
  summary: string
  source: string
  url: string
  datetime: number
  image?: string
  category: string
  related: string
}

export type UserForNewsEmail = {
  id: string
  email: string
  name: string
}
