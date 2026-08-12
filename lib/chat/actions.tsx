'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import { nanoid } from '@/lib/utils'

export type ChatMessage = {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  display?: React.ReactNode
}

export type UIState = {
  id: string
  display: React.ReactNode
}[]

type ChatContextType = {
  messages: ChatMessage[]
  uiMessages: UIState
  isLoading: boolean
  append: (content: string) => Promise<void>
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://bytestock-ai-app.vercel.app'

async function fetchReply(messages: ChatMessage[]): Promise<string> {
  const res = await fetch(`${API_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages })
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Failed to get response' }))
    throw new Error(error.error || 'Failed to get response')
  }

  const data = await res.json()
  return data.reply || 'No response'
}

export function ChatProvider({
  children,
  initialMessages = []
}: {
  children: React.ReactNode
  initialMessages?: ChatMessage[]
}) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [isLoading, setIsLoading] = useState(false)

  const append = useCallback(async (content: string) => {
    const userMessage: ChatMessage = {
      id: nanoid(),
      role: 'user',
      content
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      const assistantContent = await fetchReply([...messages, userMessage])
      const assistantMessage: ChatMessage = {
        id: nanoid(),
        role: 'assistant',
        content: assistantContent
      }
      setMessages(prev => [...prev, assistantMessage])
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong'
      setMessages(prev => [
        ...prev,
        {
          id: nanoid(),
          role: 'assistant',
          content: `Error: ${errorMessage}`
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }, [messages])

  const uiMessages: UIState = messages.map(message => ({
    id: message.id,
    display: message.display || message.content
  }))

  return (
    <ChatContext.Provider value={{ messages, uiMessages, isLoading, append, setMessages }}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
}

export function useUIState() {
  const { uiMessages } = useChat()
  return [uiMessages, () => {}] as const
}

export function useAIState() {
  const { messages } = useChat()
  return [{ messages }, () => {}] as const
}

export function useActions() {
  const { append } = useChat()

  const submitUserMessage = useCallback(
    async (content: string) => {
      await append(content)
      return { id: nanoid(), display: content }
    },
    [append]
  )

  return { submitUserMessage }
}
