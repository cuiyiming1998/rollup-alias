import { Plugin } from 'rollup'

function normalizeEntries(entries: AliasOptions['entries']) {
	if (Array.isArray(entries)) {
		// array
		return entries.map(({ find, replacement }) => {
			return new Entry(find, replacement)
		})
	} else {
		// object
		return Object.keys(entries).map(key => {
			return new Entry(key, entries[key])
		})
	}
}

class Entry {
	constructor(private find: string, private replacement: string) {}

	// 判断是否匹配
	match(filePath: string) {
		return filePath.startsWith(this.find)
	}

	// 替换
	replace(filePath: string) {
		return filePath.replace(this.find, this.replacement) + '.js'
	}
}

interface AliasOptions {
	entries:
		| {
				[key: string]: string
		  }
		| { find: string; replacement: string }[]
}

export function alias(options: AliasOptions): Plugin {
	// 规范化options, 生成entries
	const entries = normalizeEntries(options.entries)
	return {
		name: 'alias',
		resolveId(source: string, importer: string | undefined) {
			// 看看是不是有对应的 alias match
			const entry = entries.find(e => {
				return e.match(source)
			})

			if (!entry) {
				return source
			}

			return entry.replace(source)
		}
	}
}
