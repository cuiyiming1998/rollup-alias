import { describe, expect, it } from 'vitest'
import { alias } from '.'

describe('alias', () => {
	describe('entries为对象的情况', () => {
		it('匹配时需要替换字符', () => {
			const aliasObj: any = alias({
				entries: {
					'@': './utils',
					utils: './utils'
				}
			})

			expect(aliasObj.resolveId('@/add')).toBe('./utils/add.js')
			expect(aliasObj.resolveId('utils/add')).toBe('./utils/add.js')
		})

		it('不匹配时应该直接返回原数据', () => {
			const aliasObj: any = alias({
				entries: {
					'@': './utils'
				}
			})

			expect(aliasObj.resolveId('!/add')).toBe('!/add')
		})
	})

	describe('entries为数组的情况', () => {
		it('匹配时需要替换字符', () => {
			const aliasObj: any = alias({
				entries: [
					{
						find: '@',
						replacement: './utils'
					}
				]
			})

			expect(aliasObj.resolveId('@/add')).toBe('./utils/add.js')
		})
	})
})
