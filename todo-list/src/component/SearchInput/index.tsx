import * as React from 'react';
import { useRef, useState } from 'react'
import PropTypes from 'prop-types'

export interface SearchInputProps {
    onSubmit: any
}

SearchInput.propTypes = {
    onSubmit: PropTypes.func,
}

SearchInput.defaultProps = {
    obSubmit: null,
}

export function SearchInput(props: SearchInputProps) {

    const inputSearchRef: any = useRef(null)
    const typingTimeOutRef: any = useRef(null)
    const [input, setInput] = useState<any>('')

    const { onSubmit } = props

    const handleInput = (e: any) => {
        const value = e.target.value
        setInput(value)

        if (!onSubmit) return;

        // SetTimeOut
        if (typingTimeOutRef.current) {
            clearTimeout(typingTimeOutRef.current)
        }

        typingTimeOutRef.current = setTimeout(() => {
            const formSearchTerm = {
                input: value,
            }
            onSubmit(formSearchTerm)
        }, 300)

    }

    return (
        <form>
            <div className="w-full flex item-center justify-center mb-8">
                <input className="w-full outline-none p-3 rounded-md" name="search" placeholder="Search Here" value={input} ref={inputSearchRef} onChange={handleInput} ></input>
            </div>
        </form>
    );
}
