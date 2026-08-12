import { Separator } from '@/components/ui/separator'
import { ChatMessage } from '@/lib/chat/actions'
import { Session } from '@/lib/types'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { UserMessage, BotMessage, SpinnerMessage } from './stock/message'

export interface ChatListProps {
  messages: ChatMessage[]
  session?: Session
  isShared: boolean
}

export function ChatList({ messages, session, isShared }: ChatListProps) {
  if (!messages.length) {
    return null
  }

  return (
    <div className="relative mx-auto max-w-2xl px-4">
      {messages.map((message, index) => (
        <div key={message.id}>
          {message.role === 'user' ? (
            <UserMessage>{message.content}</UserMessage>
          ) : (
            <BotMessage content={message.content} />
          )}
          {index < messages.length - 1 && <Separator className="my-4" />}
        </div>
      ))}
    </div>
  )
}
