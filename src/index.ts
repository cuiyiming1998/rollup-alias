import { Plugin } from 'rollup'

interface AliasOptions {
	entries: {
		[key: string]: string
	}
}

export function alias(options: AliasOptions): Plugin {
	const { entries } = options
	return {
		name: 'alias',
		resolveId(source: string, importer: string | undefined) {
			// 1. 看看是不是有对应的 alias match
			const key = Object.keys(entries).find(e => {
				return source.startsWith(e)
			})

			if (!key) {
				return source
			}

			return source.replace(key, entries[key]) + '.js'
		}
	}
}
