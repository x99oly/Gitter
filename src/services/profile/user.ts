import { Octokit } from "octokit";

export default class UserAgent
{
    private _agent:Octokit

    constructor(agent:Octokit)
    {
        this._agent = agent
    }

    searchUser = async (username:string) => await this._agent.rest.users.getByUsername({username})

    getRepos = async (username:string) => await this._agent.rest.repos.listForUser({username})
}