import { useDispatch } from "react-redux"

export function range(start, end) {
	let data = []
	for (var i = start; i < end; i++) {
		data.push(i)
	}
	return data
}

export function getRepeatMsg(chat, messages) {
	return messages.reduce((prev, curr) => {
		if (curr.parentId) {
			const parentMsg = messages.find((val) => val.id === curr.parentId)
			curr = { ...curr, parentId: parentMsg }
			return [...prev, curr]
		} else {
			return [...prev, curr]
		}
	}, [])
}