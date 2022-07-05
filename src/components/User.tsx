import React from 'react'
import { UserResponseModel } from 'lib/types'
import { Avatar } from 'assets/Avatar'
import styled from 'styled-components'

type UserStatusProps = {
    isActive: boolean
}

export const User: React.FunctionComponent<UserResponseModel> = ({
        email,
        isOnline,
        name,
        uid
    }) => {

    return (
        <UserCard>
            <AvatarContainer>
                <Avatar />
                <UserStatus isActive={isOnline}/>
            </AvatarContainer>
            <div>{name}</div>
        </UserCard>
    )
}

const UserCard = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    background-color: aliceblue;
    padding: 20px;
    justify-content: space-between;
    cursor: pointer;
    &:hover {
      filter: brightness(95%);
    }
`

const AvatarContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: silver;
    padding: 5px;
    border-radius: 50%;
    position: relative;
`

const UserStatus = styled.div<UserStatusProps>`
    width: 10px;
    height: 10px;
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: ${({isActive}) => isActive ? 'green' : 'red'};
    border-radius: 50%;
`

