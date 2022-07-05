import React from 'react'
import styled from 'styled-components'
import { useAllRegisteredUsers } from 'lib/hooks'
import { User } from './User'

export const Home = () => {
    const { users } = useAllRegisteredUsers()

    return (
        <HomeContainer>
            <UserAccountContainer>
                {users && users.map(user => (
                    <User
                        key={user.uid}
                        {...user}
                    />
                ))}
            </UserAccountContainer>
            <MessagesContainer>
                <MessageList>
                    Messages will be here
                </MessageList>
                <input placeholder="Type message"/>
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
    background-color: gainsboro;
`

const MessagesContainer = styled.div`
    flex: 1;
`

const MessageList = styled.div`

`
