import React from 'react'
import { range } from '../../utils/utils'


const YearSelect = (props) => {
  const { start, end, cls, value } = props
  
  const yearsRange = range(start, end + 1)
  

	const handleChange = (e) => {
		props.onChange && props.onChange(e.target.value)
	}

  return (
		<select value={value} className={cls} onChange={handleChange}>
			<option disabled value={""} hidden></option>
			{yearsRange.map((year, i) => (
				<option value={year} key={year}>
					{year}
				</option>
			))}
		</select>
	)
}



export default YearSelect

