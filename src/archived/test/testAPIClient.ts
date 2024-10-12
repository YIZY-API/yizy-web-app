export interface Agent {
	name: string;
	age: number;
	department: string;
}

export interface Grenade {
	code: number;
	msg: string;
	name: string;
}

export interface GetAgentByNameRequest {
	name: string;
}

export interface GetAgentByNameResponse {
	error: Grenade | null;
	agent: Agent;
}

export async function getAgentByName(req: GetAgentByNameRequest): Promise<GetAgentByNameResponse> {
	const response = await fetch('http://localhost:4010/agents/getAgentByName', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(req)
	});

	const result: GetAgentByNameResponse = await response.json();
	return result;
}
