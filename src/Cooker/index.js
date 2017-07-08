import FunctionTree from 'function-tree'
import { join } from 'path'
import { NpmProvider } from './providers/NpmProvider'
import { GitProvider } from './providers/GitProvider'
import { execCommand, logCommand } from './execCommand'

export function Cooker({
  devtools,
  path = '.',
  providers = [],
  dryRun,
  packagesPath,
}) {
  const runCommand =
    dryRun === true
      ? logCommand
      : typeof dryRun === 'function' ? dryRun : execCommand

  const getPackagePath = packagesPath
    ? packageName => join(path, packagesPath, packageName)
    : packageName => path

  const ft = new FunctionTree(
    [
      NpmProvider({ path, runCommand, getPackagePath }),
      GitProvider({ path, runCommand, getPackagePath }),
    ].concat(providers)
  )

  if (devtools !== null && process.env.NODE_ENV !== 'production') {
    const Devtools = require('function-tree/devtools').default
    const tools = new Devtools({
      host: devtools ? devtools.host : 'localhost:9090',
    })

    tools.add(ft)
  }

  return ft
}