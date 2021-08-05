import { useDispatch } from "react-redux"

export function range(start, end) {
	let data = []
	for (var i = start; i < end; i++) {
		data.push(i)
	}
	return data
}

export function getRepeatMsg(messages) {
	return messages.reduce((prev, curr) => {
		if (typeof curr.parentId === 'number') {
			const parentMsg = messages.find((val) => val.id === curr.parentId) || curr.parentId
			curr = { ...curr, parentId: parentMsg }
			return [...prev, curr]
		} else {
			return [...prev, curr]
		}
	}, [])
}