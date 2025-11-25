import type {DefaultTheme} from "vitepress";
import * as fs from "node:fs"
import * as path from 'node:path';
import {formatNoteName, resolveSidebarInfo} from "./util";
import {Constants} from "../constants";

interface SimpleNav {
    text: string
    items?: SimpleNav[]
}

const simpleNav: SimpleNav[] = [
    {
        text: "测试目录",
        items: [
            {
                text: "测试",
            }
        ]
    }
]

function resolveNavPath(sidebarConf: string[]) {
    const configs = sidebarConf.map(conf => resolveSidebarInfo(conf))
    let currSeq = -1
    const stack = []
    for (let config of configs) {
        if (currSeq < config.seq) {
            stack.push(config.name)
        } else {
            break
        }
        currSeq = config.seq
    }
    return stack.join('/')
}

export const getNav = () => {
    const fileNames = fs.readdirSync(path.join(process.cwd(), Constants.SIDEBAR_PATH))
    const sidebarNames = fileNames.map(fileName => formatNoteName(fileName.replace(".conf", "")))

    const map = new Map<string, string>
    for (let sidebarName of sidebarNames) {
        const fullPath = path.join(Constants.ROOT_PATH, Constants.SIDEBAR_PATH, `${sidebarName}.conf`)
        if (!fs.existsSync(fullPath)) {
            fs.writeFileSync(fullPath, '', 'utf-8')
        }
        const fileContent = fs
            .readFileSync(fullPath, 'utf-8')
            .split('\n')
            .map(line => line.replace("\r", "").trim())
            .filter(line => line !== '' && /^[1-9]+\./.test(line))
        fileContent.unshift('0.')
        const navPath = resolveNavPath(fileContent)
        map.set(sidebarName, navPath)
    }

    return simpleNav.map(nav => {
        const result: DefaultTheme.NavItem = {
            text: nav.text,
            activeMatch: nav.items.map(item => formatNoteName(item.text)).join('|'),
            items: nav.items?.map(item => {
                const noteName = formatNoteName(item.text)
                return {
                    text: item.text,
                    link: `/${noteName}${map.get(noteName)}`,
                    activeMatch: `${noteName}`
                }
            }) ?? []
        }
        return result
    })
}