import React, { useEffect, useRef } from "react"
import { range } from "../../utils/utils"

const DaySelect = ({ cls, setValue, y, m, value, onChange }) => {
	const changeOptionHandler = (e) => {
		setValue(e.target.value)
	}

	const handleChange = (e) => {
		onChange && onChange(e.target.value)
	}

	const year = Number(y)
	const month = Number(m)

	const last = new Date(year, month, 0).getDate()

	const copyValue = value > last ? "" : value

	return (
		<select value={copyValue} className={cls} onChange={handleChange}>
			<option value={""} disabled hidden></option>
			{range(1, last + 1).map((el, i) => (
				<option value={`${i + 1}`} key={`${el}-${i}`}>
					{el}
				</option>
			))}
		</select>
	)
}
export default DaySelect
