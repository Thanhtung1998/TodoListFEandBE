
import React from 'react';
import styled from 'styled-components'


const ErrorText = styled.span`
    color: red;
`

export function ShowError(props: any) {

    // console.log(props);
    return (
        <ErrorText >{props.children}</ErrorText>
    )

}