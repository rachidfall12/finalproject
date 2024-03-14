import React from 'react'
import { Container, Stack } from 'react-bootstrap'
import UserChat from '../components/UserChat'
import { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'
import { AuthContext } from '../context/AuthContext';

const Chat = () => {
  const { userChats, isuserChatsLoading, userChatsError } = useContext(ChatContext)
  const { user } = useContext(AuthContext)

  return (
    <Container>
      {userChats?.length < 1 ? null : (
        <Stack direction='horizontal' gap={4} className='align-items-start'>
          <Stack className='messages-box flex-grow-0 pe-3' gap={3}>
            {userChats?.map((chat, index) => (
              <div key={index}>
                <UserChat chat={chat} user={user} />
              </div>
            ))}
          </Stack>
          <p>ChatBox</p>
        </Stack>
      )}
    </Container>
  )
}

export default Chat