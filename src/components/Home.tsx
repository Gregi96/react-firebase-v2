import React, { useState } from 'react'
import styled from 'styled-components'
import { getUnixTime } from 'date-fns'
import { auth } from 'firebase'
import { useAllRegisteredUsers, useSendMessage, useUserMessages } from 'lib/hooks'
import { MessageResponse, UserResponseModel } from 'lib/types'
import { User } from './User'
import { Message } from './Message'
import { InputText } from './InputText'

export const Home: React.FunctionComponent = () => {
    const { users } = useAllRegisteredUsers()
    const [selectedUser, setSelectedUser] = useState<UserResponseModel>()
    const [messageText, setMessageText] = useState('')
    const [messages, setMessages] = useState<Array<MessageResponse>>([])
    const { sendMessage: sendMessageAction, isLoading } = useSendMessage()
    const { getMessages } = useUserMessages(setMessages)

    const sendMessage = () => {
        if (messageText && auth.currentUser?.uid && selectedUser?.uid) {
            sendMessageAction({
                message: messageText,
                firstUserUid: auth.currentUser.uid,
                secondUserUid: selectedUser.uid
            })
                .catch(() => console.log('Error in send message'))
                .finally(() => setMessageText(''))
        }
    }

    const onSelectedUser = (user: UserResponseModel) => {
        setSelectedUser(user)

        if (auth.currentUser?.uid && user.uid) {
            getMessages({
                firstUserUid: auth.currentUser.uid,
                secondUserUid: user.uid
            })
        }
    }

    return (
        <HomeContainer>
            <UserAccountContainer>
                {users?.map(user => (
                    <User
                        key={user.uid}
                        user={user}
                        onClick={onSelectedUser}
                    />
                ))}
            </UserAccountContainer>
            <MessagesContainer>
                <div>
                    <Heading>
                        {selectedUser ? (
                            <h1>
                                Start talking with {selectedUser.name}
                            </h1>
                        ) : (
                            <h1>
                                Select user to start typing
                            </h1>
                        )}
                    </Heading>
                    <MessagesList>
                        {messages?.map((message, index) => {
                            const date = message.createdAt.toDate()

                            return (
                                <Message
                                    key={`${getUnixTime(date)}`}
                                    message={message}
                                />
                            )
                        })}
                    </MessagesList>
                </div>
                {selectedUser && (
                    <InputText
                        isLoading={isLoading}
                        value={messageText}
                        onChange={setMessageText}
                        onClick={sendMessage}
                    />
                )}
            </MessagesContainer>
        </HomeContainer>
    )
}

const HomeContainer = styled.div`
    height: 100%;
    display: flex;
`

const UserAccountContainer = styled.div`
    width: 20%;
    padding: 20px 15px;
    background-color: ${({ theme }) => theme.colors.lightGray};
`

const MessagesContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 30px;
`

const MessagesList = styled.div`
    display: flex;
    flex-direction: column;
`

const Heading = styled.div`
    font-size: 40px;
    text-align: center;
    color: ${({ theme }) => theme.colors.brown};
    margin-bottom: 20px;
`
