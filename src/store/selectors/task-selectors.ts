import { iTask, tPartedTasks } from 'types/task'

const tasksInitial = (): tPartedTasks => ({ 0: [], 1: [], 2: [], 3: [], 4: [] })

const onlyParted = (parts: tPartedTasks) => {
	return Object.keys(parts).reduce((result, part) => {
			if (parseInt(part) > 0) result[part] = parts[part]
			return result
		},
	{} )
}

const taskPart = (parts: tPartedTasks, part: number): iTask[] => {
	return parts[part] || []
}

const allTasks = (parts: tPartedTasks): iTask[] => {
  let otherTasks: Array<iTask> = []
  Object.keys(parts).map((part) => parts[part].map((loTask) => {
    otherTasks.push(loTask)
  }))
  return otherTasks
}

export { tasksInitial, onlyParted, taskPart, allTasks }