import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/Chat'
import { ChatProvider } from '@/lib/chat/actions'
import { getMissingKeys } from '@/app/actions'

export default async function IndexPage() {
  const id = nanoid()
  const missingKeys = await getMissingKeys()

  return (
    <ChatProvider>
      <Chat id={id} missingKeys={missingKeys} />
    </ChatProvider>
  )
}
