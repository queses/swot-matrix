export type tStateTask = {
  tasks: tPartedTasks,
  taskCounter: number,
	error: string,
	partTaskCounter: tPartTaskCounter,
  goodsCounter: number,
  badsCounter: number,
}

export type tPartTaskCounter = { [part: number]: number	}

export interface iTask {
	title: string,
	text?: string,
	id: number,
	matrixPart: number,
	priorRating?: number,
	probRating?: number,
	weight: number
}

export interface tPartedTasks {
	  0: Array<iTask>,
	  1: Array<iTask>,
	  2: Array<iTask>,
	  3: Array<iTask>,
	  4: Array<iTask>
}

export interface iPartedTasks {
	parts: tPartedTasks,
	getOnlyParted: () => any,
	getPart: (part: number) => Array<iTask>,
	getAllTasks: () => Array<iTask>,
  addTask: (task: iTask) => boolean
}

export declare namespace nActions {
	export type tChangeTaskPart = { id: number, oldPart: number, newPart: number }
}

