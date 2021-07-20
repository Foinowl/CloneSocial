import React from "react"


const data = [
	"Январь",
	"Февраль",
	"Март",
	"Апрель",
	"Май",
	"Июнь",
	"Июль",
	"Август",
	"Сентябрь",
	"Октябрь",
	"Ноябрь",
	"Декабрь",
]


const MonthSelect = ({ cls, setValue, value, onChange }) => {
	const handleChange = (e) => {
		onChange && onChange(e.target.value)
	}

	return (
		<select value={value} className={cls} onChange={handleChange}>
			<option value={""} disabled hidden></option>
			{data.map((el, i) => (
				<option value={`${i + 1}`} key={`${el}-${i}`}>
					{el}
				</option>
			))}
		</select>
	)
}

export default MonthSelect
