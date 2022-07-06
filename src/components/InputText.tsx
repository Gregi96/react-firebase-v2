import React from 'react'
import styled from 'styled-components'

type InputTextProps = {
    value: string,
    onClick: VoidFunction,
    isLoading: boolean,
    onChange(text: string): void
}

export const InputText: React.FunctionComponent<InputTextProps> = ({
    value,
    onChange,
    onClick,
    isLoading
}) => (
    <InputContainer>
        <Input
            disabled={isLoading}
            placeholder="type message"
            value={value}
            onChange={event => onChange(event.target.value)}
        />
        <button
            disabled={isLoading}
            onClick={onClick}
        >
            Send
        </button>
    </InputContainer>
)

const InputContainer = styled.div`
    width: 100%;
    display: flex;
`

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-right: 10px;
    border-radius: 4px;
`
