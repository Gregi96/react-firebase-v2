import React from 'react'
import styled from 'styled-components'

export const LoaderDots: React.FunctionComponent = () => (
    <DotFlashing />
)

const DotFlashing = styled.div`
    position: relative;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #9880ff;
    color: #9880ff;
    animation: dotFlashing 1s infinite linear alternate;
    animation-delay: .5s;
    &:before {
        content: '';
        display: inline-block;
        position: absolute;
        top: 0;
        left: -15px;
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background-color: #9880ff;
        color: #9880ff;
        animation: dotFlashing 1s infinite alternate;
        animation-delay: 0s;
    }
    &:after {
        content: '';
        display: inline-block;
        position: absolute;
        top: 0;
        left: 15px;
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background-color: #9880ff;
        color: #9880ff;
        animation: dotFlashing 1s infinite alternate;
        animation-delay: 1s;
        @keyframes dotFlashing {
            0% {
                background-color: #9880ff;
            }
            50%,
            100% {
                background-color: #ebe6ff;
            }
        }
    }
`
