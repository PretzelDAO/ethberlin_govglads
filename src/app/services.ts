import { Dao } from "@/domains/dao";
import { Delegate } from "@/domains/delegate";
import { ProposalRequest, ProposalResponse } from "@/domains/proposal";
import { daos } from "@/domains/mocks";


const url = "https://localhost:8000/"

export function getDaos(): Promise<Dao[]> {
//     return fetch(url + 'daos').then(res => res.json());
    return Promise.resolve(daos);
}

export function getDelegates(daoId: string): Promise<Delegate[]> {
    return fetch(url + 'delegates?dao=' + daoId).then(res => res.json());
}

export function submitProposal(daoId: string, request: ProposalRequest): Promise<ProposalResponse> {
    return fetch(url + 'proposal?dao=' + daoId,
        {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        }
    ).then(res => res.json());
}