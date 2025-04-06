import { Octokit, App } from "octokit"
import dotenv from 'dotenv'

dotenv.config()

async function Main()
{
    const _gitClient = new Octokit( { auth: String(process.env.GITHUB_KEY)})

    const {
        data: { login },
    } = await _gitClient.rest.users.getAuthenticated()

    console.log(`Hello, ${login}`)
}

Main()