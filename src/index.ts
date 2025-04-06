import { Octokit, App } from "octokit"
import dotenv from 'dotenv'
import UserAgent from "./services/profile/user.js"

dotenv.config()

export default class Gitter
{
    private _gitClient:Octokit
    private _userAgent:UserAgent

    constructor(token:string, agentName?:string)
    {
        if (!agentName) agentName = "unspecified"

        this._gitClient = new Octokit( 
            {auth:token,userAgent:agentName}
        )

        this._userAgent = new UserAgent(this._gitClient)
    }

    getUserRepos = async (username:string) => await this._userAgent.getRepos(username)

    getUserInfo = async (username:string) => await this._userAgent.searchUser(username)

}

async function Main()
{
    const _gitClient = new Octokit( 
        { auth: String(process.env.GITHUB_KEY), userAgent: String(process.env.GITHUB_USER_AGENT) }
    )

    const userAgent = new UserAgent(_gitClient)

    const repos = await userAgent.getRepos("x99oly")
    console.log(repos)

    const {
        data: { login },
    } = await _gitClient.rest.users.getAuthenticated()

    console.log(`Hello, ${login}`)
}
Main()