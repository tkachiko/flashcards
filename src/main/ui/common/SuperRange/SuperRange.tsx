import React from 'react'

export const SuperRange: React.FC = (props) => {
    return (
        <input type={'range'}
            style={{ // стили для слайдера
                color: '#00CC22', width: '150px'
            }}
        />
    )
}