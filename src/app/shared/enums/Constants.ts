export class AppConstant {
	public static readonly maxFileSize = 10 * 1024 * 1024; // ten MB

	public static readonly maritalStatus = [
		{ value: 'married', name: 'Married' },
		{ value: 'unmarried', name: 'Unmarried' },
		{ value: 'divorced', name: 'Divorced' },
	];

	public static readonly gender = [
		{ id: 1, name: 'Male' },
		{ id: 2, name: 'Female' },
		{ id: 3, name: 'Other' },
	];

	public static readonly ticketStatus = [
		{ id: 1, name: 'NEW', description: 'When the ticket is new', priority: 0 },
		{ id: 2, name: 'PENDING', description: 'Waiting for evidence from the Complainant', priority: 0 },
		{ id: 3, name: 'ACKNOWLEDGED', description: 'Acknowledged by AD', priority: 0 },
		{ id: 4, name: 'UNASSIGNED', description: 'Waiting to be assigned by AD', priority: 0 },
		{ id: 5, name: 'ASSIGNED', description: 'Assigned by AD to respective department', priority: 0 },
		{ id: 6, name: 'ON GOING', description: 'The respected department is working on the complaint', priority: 0 },
		{ id: 7, name: 'HOLD', description: 'Hold by AD', priority: 0 },
		{ id: 8, name: 'DONE', description: 'Action taken and forwarded to AD', priority: 0 },
		{ id: 9, name: 'CLOSE', description: 'Finalize by AD', priority: 0 },
		{ id: 10, name: 'REOPENED', description: 'Reopened by citizen or AD', priority: 0 },
		{ id: 11, name: 'REJECTED', description: 'Rejected by AD', priority: 0 },
		{ id: 12, name: 'WITHDRAWN', description: 'Withdrawn by citizen', priority: 0 },
		{ id: 13, name: 'CANCELLED', description: 'Cancelled by AD', priority: 0 },
	];

	public static readonly ticketStatusForAD = [
		{ id: 5, name: 'ASSIGNED', description: 'Assigned by AD to respective department', priority: 0 },
		{ id: 7, name: 'HOLD', description: 'Hold by AD', priority: 0 },
		{ id: 9, name: 'CLOSE', description: 'Finalize by AD', priority: 0 },
		{ id: 11, name: 'REJECTED', description: 'Rejected by AD', priority: 0 },
		{ id: 13, name: 'CANCELLED', description: 'Cancelled by AD', priority: 0 },
	];

	public static readonly ticketStatusForRD = [
		{ id: 8, name: 'DONE', description: 'Action taken and forwarded to AD', priority: 0 },
	];

	public static readonly ticketStatusForAgent = [
		{ id: 2, name: 'PENDING', description: 'Waiting for evidence from the Complainant', priority: 0 },
	];


}
