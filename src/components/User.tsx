import React from 'react'
import styled from 'styled-components'
import { UserResponseModel } from 'lib/types'
import { Icons } from 'assets'

type UserStatusProps = {
    isActive: boolean
}

type UserProps = {
    user: UserResponseModel,
    onClick(user: UserResponseModel): void
}

export const User: React.FunctionComponent<UserProps> = ({
    user,
    onClick
}) => {
    const { isOnline, name } = user

    return (
        <UserCard onClick={() => onClick(user)}>
            <AvatarContainer>
                <Icons.Avatar/>
                <UserStatus isActive={isOnline}/>
            </AvatarContainer>
            <div>
                {name}
            </div>
        </UserCard>
    )
}

const UserCard = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    background-color: ${({ theme }) => theme.colors.lightBlue};
    padding: 20px;
    justify-content: space-between;
    cursor: pointer;
    border-radius: 3px;
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
    background-color: ${({ isActive, theme }) => isActive ? theme.colors.green : theme.colors.red};
    border-radius: 50%;
`

