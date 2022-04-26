import Ract from 'react'

interface Proptype {
	value: string
	onClick(): void
	color: boolean
	winLine: number[] | string
}

export const Square = (props: Proptype) => {
	
	const guessColor = () => props.color ? props.value == 'X' ? 'blueS' : 'redS' : ''
	return (
		<button className={'Square ' + (props.winLine ? props.winLine : guessColor())} onClick={props.onClick}>
			{props.value}
		</button>
	)
}